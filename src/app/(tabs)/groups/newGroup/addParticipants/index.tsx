import { useCallback, useState } from 'react'
import { FlatList, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { router, useFocusEffect } from 'expo-router'
import Checkbox from 'expo-checkbox'
import { axiosPrivateClient } from '@/src/utils/axios'

import ActivityIndicatorComponent from '@/src/components/ActivityIndicatorComponent'
import ActionLinkButton from '@/src/components/ActionLinkButton'

import useKeyboardStatus from '@/src/utils/keyboardUtils'
import { useAuthStore } from '@/src/store/useAuthStore'

import LinkIcon from '@/src/assets/images/linkIcon.svg'
import AddFriendIcon from '@/src/assets/images/addFriendIcon.svg'
import Search from '@/src/assets/images/search.svg'

import { styles } from '../styles'
import { theme } from '@/src/theme'
import { useGroupStore } from '@/src/store/useGroupStore'
import Footer from '../../components/Footer'

interface Friend {
  amigoId: string
  gruposEmComun: number
  nome: string
}

export default function AddParticipants() {
  const [isLoading, setIsLoading] = useState(false)
  const [friendsList, setFriendsList] = useState<Friend[]>()
  const [selectedIds, setSelectedIds] = useState<string[]>([])
  const [filteredFriends, setFilteredFriends] = useState<Friend[] | undefined>(
    [],
  )
  const [selectedNames, setSelectedNames] = useState<string[]>([])

  const isKeyboardVisible = useKeyboardStatus()
  const { userCod } = useAuthStore()
  const { groupData, setGroupData } = useGroupStore()

  // Alterna a seleção de um amigo
  const toggleSelection = (item: Friend) => {
    const { amigoId, nome } = item

    setSelectedIds((prev) => {
      if (prev.includes(amigoId)) {
        return prev.filter((item) => item !== amigoId)
      }

      return [...prev, amigoId]
    })

    setSelectedNames((prev) => {
      if (prev.includes(nome)) {
        return prev.filter((item) => item !== nome)
      }

      return [...prev, nome]
    })
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
            setFriendsList(data.data)
            setFilteredFriends(data.data)
            setSelectedIds([...(groupData.participantes || [])])
            setSelectedNames([...(groupData.nomeParticipantes || [])])
          }
        } catch (error) {
          console.log('Erro ao Buscar Amigos', error)
        } finally {
          setIsLoading(false)
        }
      }
      fetchFriends()
    }, [groupData.participantes, groupData.nomeParticipantes, userCod]),
  )

  // Atualiza a lista filtrada conforme o usuário digita
  const handleSearch = (text: string) => {
    const filtered = friendsList?.filter((friend) =>
      friend.nome.toLowerCase().includes(text.toLowerCase()),
    )
    setFilteredFriends(filtered)
  }

  const handleSubmit = () => {
    selectedIds &&
      setGroupData({
        participantes: selectedIds,
        nomeParticipantes: selectedNames,
      })

    router.push('/groups/newGroup/conditionPage')
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
                friendsList ? 'Procurar amigos...' : 'Sem amigos cadastrados'
              }
              onChangeText={handleSearch}
              style={{ flex: 1 }}
            />
            <Search width={24} height={24} />
          </View>

          {!isLoading && (filteredFriends?.length ?? 0) > 0 && (
            <View style={styles.participantsContainer}>
              <FlatList
                data={filteredFriends}
                keyExtractor={(item) => item.amigoId}
                renderItem={({ item }) => {
                  const isSelected = selectedIds.includes(item.amigoId)

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

        <View>
          <View>
            <ActionLinkButton
              text="Convidar com link"
              icon={<LinkIcon />}
              link="/friends/emailInvitationPage"
            />
          </View>

          <View>
            <ActionLinkButton
              text="Adicionar amigo"
              icon={<AddFriendIcon />}
              link="/friends/addNewFriendsPage"
            />
          </View>
        </View>
      </View>

      {/* Botão */}
      {!isKeyboardVisible && <Footer handleSubmit={handleSubmit} />}
    </View>
  )
}
