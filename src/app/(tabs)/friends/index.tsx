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
import { useFriendStore } from '@/src/store/useFriendStore'
import { axiosPrivateClient } from '@/src/utils/axios'

type Friend = {
  amigoId: string
  nome: string
  imgUser: string
}

const FriendItem = ({ friend }: { friend: Friend }) => {
  const Avatar = friend.imgUser ? (
    <AvatarImageComponent image={friend.imgUser} size={48} />
  ) : (
    <View style={styles.avatarContainer}>
      <User width={24} height={24} />
    </View>
  )

  return (
    <View style={styles.contentFriend}>
      <View>{Avatar}</View>

      <View style={{ flex: 1 }}>
        <Text style={[styles.text, styles.textBold]}>{friend.nome}</Text>
        {/* <Text style={styles.text}>{`${friend.groups} grupos em comum`}</Text> */}
      </View>

      <View>
        <ChevronRight />
      </View>
    </View>
  )
}

export default function FriendPage() {
  const [isLoading, setIsLoading] = useState(false)

  const { userName, userCod } = useAuthStore()
  const {
    friendList,
    addFriendList,
    pendingInvitations,
    addPendingInvitations,
    emailInvitations,
    addEmailInvitations,
  } = useFriendStore()

  useFocusEffect(
    useCallback(() => {
      const fetchFriendsList = async () => {
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
            addFriendList(data.data)
          }
        } catch (error) {
          console.log('Lista de amigos Vazio')
        }
      }

      const fetchPendingRequests = async () => {
        try {
          const { data } = await axiosPrivateClient.get(
            'amizade/lista-pendencias-amizades',
            {
              params: {
                userCod,
                'metaData.pageNumber': 1,
                'metaData.pageSize': 10,
              },
            },
          )
          if (data && data.statusCode === 200) {
            addPendingInvitations(data.data)
          }
        } catch (error) {
          console.log('Convite pendentes não encontrado')
        }
      }

      const fetchEmailInvitations = async () => {
        try {
          const { data } = await axiosPrivateClient.get(
            'convite/lista-convites',
            {
              params: { userCod },
            },
          )
          if (data && data.statusCode === 200) {
            addEmailInvitations(data.data)
          }
          setIsLoading(false)
        } catch (error) {
          console.log('E-mails pendentes não encontrado')
        }
      }
      setIsLoading(true)
      fetchFriendsList()
      fetchPendingRequests()
      fetchEmailInvitations()
      setIsLoading(false)
    }, [userCod, addFriendList, addPendingInvitations, addEmailInvitations]),
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
        <Text style={styles.text}>{`${friendList.length} amigos`}</Text>

        <View style={styles.containerText}>
          <Text
            style={styles.text}
          >{`${emailInvitations.length} convites enviados`}</Text>
          <SeeMoreLink text="Ver" initialTab="0" />
        </View>

        <View style={styles.containerText}>
          <Text style={styles.text}>
            {`${pendingInvitations.length} solicitações de amizade pendentes`}
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
        {friendList.length === 0 ? (
          <EmptyListMessage title="Você ainda não tem amigos" />
        ) : (
          <FlatList
            data={friendList}
            renderItem={({ item }) => <FriendItem friend={item} />}
            keyExtractor={(item) => item.amigoId}
            extraData={friendList}
            showsVerticalScrollIndicator={false}
            ListHeaderComponent={<Text style={styles.title}>Amigos</Text>}
          />
        )}
      </View>
    </View>
  )
}
