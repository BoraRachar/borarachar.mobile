import { useFocusEffect } from 'expo-router'
import { useCallback, useState } from 'react'
import { ActivityIndicator, FlatList, Text, View } from 'react-native'

import { useAuthStore } from '@/src/store/useAuthStore'

import SeeMoreLink from './components/SeeMoreLink.tsx'
import LinkToAddNewFriendsPage from './components/LinkToAddNewFriendsPage'
import EmptyListMessage from './components/EmptyListMessage'

import { styles } from './styles'
import { verticalScale } from '@/src/utils/responsiveUtils'

import User from '@/src/assets/images/user.svg'
import ChevronRight from '@/src/assets/images/chevron-arrow-right.svg'
import AvatarImageComponent from '@/src/components/AvatarImageComponent'
import { getPendingRequests, getEmailInvitations } from './actions'
import { useFriendStore } from '@/src/store/useFriendStore'

// import { friends } from '@/src/mock/friends'
const friends = []

type Friend = {
  id: number
  name: string
  avatar: string
  groups: number
}

const FriendItem = ({ friend }: { friend: Friend }) => {
  const Avatar = friend.avatar ? (
    <AvatarImageComponent image={friend.avatar} size={48} />
  ) : (
    <View style={styles.avatarContainer}>
      <User width={24} height={24} />
    </View>
  )

  return (
    <View style={styles.contentFriend}>
      <View>{Avatar}</View>

      <View style={{ flex: 1 }}>
        <Text style={[styles.text, styles.textBold]}>{friend.name}</Text>
        <Text style={styles.text}>{`${friend.groups} grupos em comum`}</Text>
      </View>

      <View>
        <ChevronRight />
      </View>
    </View>
  )
}

export default function FriendPage() {
  const [pendingRequestsCount, setPendingRequestsCount] = useState(0)
  const [sentEmailInvitationsCount, setEmailInvitationsCount] = useState(0)
  const [isLoading, setIsLoading] = useState(false)

  const { userName, userCod } = useAuthStore()
  const { addPendingInvitations, addEmailInvitations } = useFriendStore()

  useFocusEffect(
    useCallback(() => {
      const fetchPendingRequests = async () => {
        try {
          const pendingRequests = await getPendingRequests(userCod)
          if (pendingRequests && pendingRequests.statusCode === 200) {
            setPendingRequestsCount(pendingRequests.metaData.totalRecords)
            addPendingInvitations(pendingRequests.data)
          }
        } catch (error) {
          console.log(error)
        }
      }

      const fetchEmailInvitations = async () => {
        try {
          const emailInvitations = await getEmailInvitations(userCod)
          if (emailInvitations && emailInvitations.statusCode === 200) {
            setEmailInvitationsCount(emailInvitations.data.length)
            addEmailInvitations(emailInvitations.data)
          }
        } catch (error) {
          console.log(error)
        }
      }
      fetchPendingRequests()
      fetchEmailInvitations()
    }, [userCod, addPendingInvitations, addEmailInvitations]),
  )

  if (isLoading) {
    return (
      <View
        style={[
          styles.container,
          { flex: 1, justifyContent: 'center', alignItems: 'center' },
        ]}
      >
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    )
  }

  return (
    <View style={styles.container}>
      {/* Resumo do usuário */}
      <View style={styles.resumeContent}>
        <Text style={styles.text}>{`${userName}, você tem:`}</Text>
        <Text style={styles.text}>10 amigos</Text>

        <View style={styles.containerText}>
          <Text
            style={styles.text}
          >{`${sentEmailInvitationsCount} convites enviados`}</Text>
          <SeeMoreLink text="Ver" initialTab="0" />
        </View>

        <View style={styles.containerText}>
          <Text style={styles.text}>
            {`${pendingRequestsCount} solicitações de amizade pendentes`}
          </Text>
          <SeeMoreLink text="Ver" initialTab="1" />
        </View>
      </View>

      {/* Link para pagina Adicionar Amigos */}
      <View style={{ marginTop: verticalScale(24) }}>
        <LinkToAddNewFriendsPage />
      </View>

      {/* Lista de amigos */}

      <View style={{ flex: 1 }}>
        {friends.length === 0 ? (
          <EmptyListMessage title="Você ainda não tem amigos" />
        ) : (
          <FlatList
            data={friends}
            renderItem={({ item }) => <FriendItem friend={item} />}
            keyExtractor={(item) => item.id.toString()}
            showsVerticalScrollIndicator={false}
            ListHeaderComponent={<Text style={styles.title}>Amigos</Text>}
          />
        )}
      </View>
    </View>
  )
}
