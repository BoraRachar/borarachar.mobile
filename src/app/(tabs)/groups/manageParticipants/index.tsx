import { useState } from 'react'
import { FlatList, Text, View } from 'react-native'
import { router, useFocusEffect } from 'expo-router'

import { axiosPrivateClient } from '@/src/utils/axios'
import { useGroupStore } from '@/src/store/useGroupStore'
import ActionLinkButton from '@/src/components/ActionLinkButton'

import LinkIcon from '@/src/assets/images/linkIcon.svg'
import AddFriendIcon from '@/src/assets/images/addFriendIcon.svg'
import UserIcon from '@/src/assets/images/user-circle.svg'
import { ButtonCustomizer } from '@/src/components/ButtonCustomizer'

import useKeyboardStatus from '@/src/utils/keyboardUtils'
import ActivityIndicatorComponent from '@/src/components/ActivityIndicatorComponent'

import {
  horizontalScale,
  rem,
  verticalScale,
} from '@/src/utils/responsiveUtils'
import { colors } from '@/src/theme/colors'
import { styles as globalStyles } from '@/src/app/styles'
import { styles } from '../styles'

export default function ManagerParticipants() {
  const [isLoading, setIsLoading] = useState(true)
  const [participantsList, setParticipantsList] = useState([])

  const { groupData, setGroupData } = useGroupStore()
  const isKeyboardVisible = useKeyboardStatus()

  const fetchparticipantsList = async () => {
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

      console.log(data)
    } catch (error) {
      __DEV__ && console.log(error)
    } finally {
      setIsLoading(false)
    }
  }

  useFocusEffect(() => {
    fetchparticipantsList()
  })

  const RenderItem = ({ item }) => {
    return (
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
    )
  }

  if (isLoading) {
    return <ActivityIndicatorComponent />
  }

  return (
    <View style={styles.container}>
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
            link="/friends/addNewFriendsPage"
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
