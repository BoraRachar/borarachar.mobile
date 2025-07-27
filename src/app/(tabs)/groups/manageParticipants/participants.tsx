import { useCallback, useState } from 'react'
import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'
import { router, useFocusEffect } from 'expo-router'
import Checkbox from 'expo-checkbox'
import { axiosPrivateClient } from '@/src/utils/axios'

import ActivityIndicatorComponent from '@/src/components/ActivityIndicatorComponent'
import useKeyboardStatus from '@/src/utils/keyboardUtils'
import { useAuthStore } from '@/src/store/useAuthStore'
import { useGroupStore } from '@/src/store/useGroupStore'
import { ButtonCustomizer } from '@/src/components/ButtonCustomizer'

import SearchIcon from '@/src/assets/images/search.svg'

import { theme } from '@/src/theme'
import { styles as globalStyles } from '@/src/app/styles'
import {
  horizontalScale,
  rem,
  verticalScale,
} from '@/src/utils/responsiveUtils'

interface Friend {
  amigoId: string
  gruposEmComun: number
  nome: string
}

export default function Participants() {
  const [isLoading, setIsLoading] = useState(false)
  const [friends, setFriends] = useState<Friend[]>()
  const [selected, setSelected] = useState<string[]>([])
  const [filteredFriends, setFilteredFriends] = useState<Friend[] | undefined>(
    [],
  )
  // const [amigoNome, setAmigoNome] = useState<string[]>([])

  const isKeyboardVisible = useKeyboardStatus()
  const { userCod } = useAuthStore()
  const { groupData, setGroupData } = useGroupStore()

  // Alterna a seleção de um amigo
  const toggleSelection = (item: Friend) => {
    const { amigoId } = item

    setSelected((prev) => {
      if (prev.includes(amigoId)) {
        return prev.filter((item) => item !== amigoId)
      }

      return [...prev, amigoId]
    })

    // setAmigoNome((prev) => {
    //   if (prev.includes(nome)) {
    //     return prev.filter((item) => item !== nome)
    //   }

    //   return [...prev, nome]
    // })
  }

  // Busca amigos na API ao carregar a tela
  useFocusEffect(
    useCallback(() => {
      const fetchFriends = async () => {
        setIsLoading(true)
        try {
          const { data } = await axiosPrivateClient.get(
            'amizade/lista-amizades',
            {
              params: {
                userCod,
                'metaData.pageNumber': 1,
                'metaData.pageSize': 10,
              },
            },
          )

          if (data.statusCode === 200) {
            console.log(groupData.participantes)
            const listOfNamesOfGroupParticipants = groupData.participantes?.map(
              (participant) => participant.nome,
            )

            const listOfFriendsNotParticipatingInTheGroup = data.data.filter(
              (friend: Friend) =>
                listOfNamesOfGroupParticipants?.includes(friend.nome) === false,
            )
            setFriends(listOfFriendsNotParticipatingInTheGroup)
            setFilteredFriends(listOfFriendsNotParticipatingInTheGroup)
            // setAmigoNome([...(groupData.nomeParticipantes || [])])
          }
        } catch (error) {
          console.log('Erro ao Buscar Amigos', error)
        } finally {
          setIsLoading(false)
        }
      }
      fetchFriends()
    }, [userCod, groupData.participantes]),
  )

  // Atualiza a lista filtrada conforme o usuário digita
  const handleSearch = (text: string) => {
    const filtered = friends?.filter((friend) =>
      friend.nome.toLowerCase().includes(text.toLowerCase()),
    )
    setFilteredFriends(filtered)
  }

  const handleSubmit = async () => {
    try {
      await axiosPrivateClient.post('participantes', {
        idParticipantes: selected,
        grupoId: groupData?.grupoId,
        userCod,
      })
      router.push('/groups/manageParticipants')
    } catch (error) {
      console.log('Error: ', error)
    }
  }

  if (isLoading) {
    return <ActivityIndicatorComponent />
  }

  return (
    <View style={styles.container}>
      <View style={{ flex: 1, gap: 30 }}>
        <View>
          <Text style={styles.label}>Adicionar participantes</Text>

          <View style={styles.searchInputContainer}>
            <TextInput
              placeholder={
                friends ? 'Procurar amigos...' : 'Sem amigos cadastrados'
              }
              onChangeText={handleSearch}
              style={{ flex: 1 }}
            />
            <SearchIcon width={24} height={24} />
          </View>

          {!isLoading && (filteredFriends?.length ?? 0) > 0 && (
            <View style={styles.participantsContainer}>
              <FlatList
                data={filteredFriends}
                keyExtractor={(item) => item.amigoId}
                renderItem={({ item }) => {
                  const isSelected = selected.includes(item.amigoId)

                  return (
                    <TouchableOpacity
                      style={[
                        styles.checkboxItem,
                        isSelected && { backgroundColor: theme.colors.third },
                      ]}
                      onPress={() => toggleSelection(item)}
                    >
                      <Checkbox
                        value={isSelected}
                        onValueChange={() => toggleSelection(item)}
                        color={
                          isSelected ? theme.colors.primaryColor : undefined
                        }
                        style={styles.checkbox}
                      />
                      <Text
                        style={[
                          styles.checkboxText,
                          isSelected && { fontFamily: theme.fontFamily.bold },
                        ]}
                      >
                        {item.nome}
                      </Text>
                    </TouchableOpacity>
                  )
                }}
              />
            </View>
          )}
        </View>
      </View>

      {/* Botão */}
      {!isKeyboardVisible && (
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <ButtonCustomizer.Root
            type="tertiaryHalfWidth"
            onPress={() => {
              setGroupData({ participantes: [], nomeParticipantes: [] })
              router.push('/(tabs)/groups/details')
            }}
          >
            <ButtonCustomizer.Title
              title="Cancelar"
              customStyles={globalStyles.secondaryButtonText}
            />
          </ButtonCustomizer.Root>

          <ButtonCustomizer.Root type="primaryHalfWidth" onPress={handleSubmit}>
            <ButtonCustomizer.Title
              title="Concluido"
              customStyles={globalStyles.primaryButtonText}
            />
          </ButtonCustomizer.Root>
        </View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
    padding: verticalScale(24),
    gap: 24,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: horizontalScale(18),
  },
  title: {
    color: theme.colors.primaryColor,
    fontFamily: theme.fontFamily.bold,
    fontSize: rem(24),
  },
  description: {
    fontFamily: theme.fontFamily.regular,
    fontSize: rem(16),
    color: theme.colors.primaryColor,
    lineHeight: verticalScale(22),
  },
  imageContainer: {
    width: 80,
    height: 80,
    borderWidth: 3,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: theme.colors.primaryColor,
    backgroundColor: theme.colors.third,
    position: 'relative',
  },
  editIcon: {
    backgroundColor: theme.colors.primaryColor,
    padding: 6,
    borderRadius: 3,
    position: 'absolute',
    bottom: -10,
    right: -10,
  },
  label: {
    fontFamily: theme.fontFamily.regular,
    fontSize: rem(14),
    color: theme.colors.primaryColor,
  },
  input: {
    borderWidth: 1,
    borderColor: theme.colors.primaryColor,
    borderRadius: 8,
    padding: 12,
    width: '100%',
  },
  error: {
    color: theme.colors.Error[500],
    fontSize: rem(12),
    lineHeight: verticalScale(16),
    marginTop: verticalScale(8),
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: theme.colors.primaryColor,
    borderRadius: 8,
    paddingHorizontal: 12,
    width: '100%',
    height: verticalScale(58),
  },
  participantsContainer: {
    borderWidth: 1,
    borderColor: theme.colors.primaryColor,
    borderRadius: 8,
    maxHeight: verticalScale(250),
  },
  checkboxItem: {
    flexDirection: 'row',
    gap: 10,
    padding: 12,
  },
  checkbox: {
    borderColor: theme.colors.primaryColor,
    borderWidth: 2,
    borderRadius: 4,
  },
  checkboxText: {
    fontFamily: theme.fontFamily.regular,
    fontSize: 16,
    color: theme.colors.primaryColor,
  },
})
