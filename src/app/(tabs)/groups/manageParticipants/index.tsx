import { useCallback, useState } from 'react'
import { FlatList, Text, View, TouchableOpacity } from 'react-native'
import { router, useFocusEffect } from 'expo-router'

import ActionLinkButton from '@/src/components/ActionLinkButton'
import ActivityIndicatorComponent from '@/src/components/ActivityIndicatorComponent'
import { axiosPrivateClient } from '@/src/utils/axios'
import { useGroupStore } from '@/src/store/useGroupStore'
import { ButtonCustomizer } from '@/src/components/ButtonCustomizer'
import ModalParticipants from '../components/ModalParticipants'
import useKeyboardStatus from '@/src/utils/keyboardUtils'

import LinkIcon from '@/src/assets/images/linkIcon.svg'
import AddFriendIcon from '@/src/assets/images/addFriendIcon.svg'
import UserIcon from '@/src/assets/images/user-circle.svg'

import { useAuthStore } from '@/src/store/useAuthStore'
import {
  horizontalScale,
  rem,
  verticalScale,
} from '@/src/utils/responsiveUtils'
import { colors } from '@/src/theme/colors'
import { styles as globalStyles } from '@/src/app/styles'
import { styles } from '../styles'

interface ParticipantType {
  apelido: string
  email: string
  hasPendent: boolean
  isAdm: boolean
  nome: string
  participanteId: string
}

export default function ManagerParticipants() {
  const [isLoading, setIsLoading] = useState(true)
  const [participantsList, setParticipantsList] = useState<ParticipantType[]>(
    [],
  )
  const [selectedParticipant, setSelectedParticipant] =
    useState<ParticipantType>()
  const [modalVisible, setModalVisible] = useState(false)

  const { userCod } = useAuthStore()
  const { groupData } = useGroupStore()
  const isKeyboardVisible = useKeyboardStatus()

  const fetchparticipantsList = useCallback(async () => {
    try {
      const { data } = await axiosPrivateClient.get(
        'participantes/lista-participantes',
        {
          params: {
            grupoId: groupData?.grupoId,
          },
        },
      )

      setParticipantsList(data.data)
    } catch (error) {
      __DEV__ && console.log(error)
    } finally {
      setIsLoading(false)
    }
  }, [groupData])

  const handleSelectedParticipant = (item: ParticipantType) => {
    setSelectedParticipant(item)
    setModalVisible(true)
  }

  // Setar Usuário como admin
  const setAdmin = async () => {
    try {
      await axiosPrivateClient.post('participantes/isadm', {
        data: {
          grupoId: groupData.grupoId,
          participanteId: selectedParticipant?.participanteId,
        },
      })
    } catch (error) {
      __DEV__ && console.log(error)
    }
  }

  const removeParticipant = async () => {
    try {
      // Remove o participante na API
      await axiosPrivateClient.delete('participantes/delete-participantes', {
        data: {
          userCod,
          grupoId: groupData.grupoId,
          idParticipantes: [selectedParticipant?.participanteId],
        },
      })

      // Remove o participante da lista local
      setParticipantsList((prev) =>
        prev.filter(
          (item) => item.participanteId !== selectedParticipant?.participanteId,
        ),
      )
    } catch (error) {
      console.log('Erro ao remover participante', error)
    }
  }

  useFocusEffect(
    useCallback(() => {
      fetchparticipantsList()
    }, [fetchparticipantsList]),
  )

  const RenderItem = ({ item }: { item: ParticipantType }) => {
    return (
      <TouchableOpacity onPress={() => handleSelectedParticipant(item)}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: 8,
          }}
        >
          <View
            style={{ flexDirection: 'row', alignItems: 'center', gap: rem(16) }}
          >
            <UserIcon width={48} height={48} />

            <View>
              <Text style={styles.text}>{item.nome}</Text>
              <Text style={[styles.text, styles.textLight]}>
                {`@${item.apelido}`}
              </Text>
              <Text style={[styles.text, styles.textLight]}>{item.email}</Text>
            </View>
          </View>

          {item.isAdm && (
            <Text style={[styles.text, { paddingRight: horizontalScale(18) }]}>
              Admin
            </Text>
          )}
        </View>
      </TouchableOpacity>
    )
  }

  if (isLoading) {
    return <ActivityIndicatorComponent />
  }

  return (
    <View style={styles.container}>
      <ModalParticipants
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        removeParticipant={removeParticipant}
        setAdmin={setAdmin}
      />
      <View style={{ flex: 1 }}>
        <Text style={[styles.text, styles.textLight]}>
          Participantes: {participantsList.length}
        </Text>
        <View
          style={{
            flex: 1,
            borderWidth: 1,
            borderColor: colors.primaryColor,
            borderRadius: 8,
            marginTop: 8,
          }}
        >
          <FlatList
            data={participantsList}
            renderItem={RenderItem}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </View>

      <View style={{ marginTop: 16 }}>
        <View>
          <ActionLinkButton
            text="Convidar com link"
            icon={<LinkIcon />}
            link="/friends/emailInvitationPage"
          />
        </View>

        <View>
          <ActionLinkButton
            text="Adicionar participantes"
            icon={<AddFriendIcon />}
            link="/(tabs)/groups/manageParticipants/participants"
          />
        </View>

        {/* Botão */}
        {!isKeyboardVisible && (
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: verticalScale(24),
            }}
          >
            <ButtonCustomizer.Root
              type="tertiaryHalfWidth"
              onPress={() => router.push('/(tabs)/groups/')}
            >
              <ButtonCustomizer.Title
                title="Cancelar"
                customStyles={globalStyles.secondaryButtonText}
              />
            </ButtonCustomizer.Root>

            <ButtonCustomizer.Root
              type="primaryHalfWidth"
              onPress={() => router.push('/(tabs)/groups/details')}
            >
              <ButtonCustomizer.Title
                title="Concluido"
                customStyles={globalStyles.primaryButtonText}
              />
            </ButtonCustomizer.Root>
          </View>
        )}
      </View>
    </View>
  )
}
