import { useCallback, useState } from 'react'
import {
  Alert,
  FlatList,
  ListRenderItem,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import { useLocalSearchParams } from 'expo-router'

import AvatarImageComponent from '@/src/components/AvatarImageComponent'
import LinkToInviteByEmailPage from '../components/LinkToInviteByEmailPage'

import PlusCircleIcon from '@/src/assets/images/plus-circle.svg'
import CheckIcon from '@/src/assets/images/check.svg'

import { styles } from '../styles'
import { axiosPrivateClient } from '@/src/utils/axios'

type User = {
  amigoId: string
  userName: string
  email: string
  avatar: string
}

export default function FriendSearchResults() {
  const [isFriendAdded, setisFriendAdded] = useState(false)
  const { userList, userCod } = useLocalSearchParams<{
    userList: string
    userCod: string
  }>()
  const friendsList = JSON.parse(userList as string)

  const handleAddNewFriend = useCallback(
    async (amigoId: string) => {
      try {
        const { data } = await axiosPrivateClient.post('amizade/add-amigo', {
          userCod,
          amigoId,
        })

        if (data.statusCode === 201) {
          setisFriendAdded(true)
        }
      } catch (error) {
        if (error.response.data.errors[0].userMessage) {
          Alert.alert(error.response.data.errors[0].userMessage)
        }
      }
    },
    [userCod],
  )

  const RenderFriendItem = useCallback<ListRenderItem<User>>(
    ({ item }) => {
      return (
        <View style={styles.renderItemContent}>
          <View>
            <AvatarImageComponent image={item.avatar} size={48} />
          </View>

          <View style={{ flex: 1 }}>
            <Text style={[styles.text, styles.textBold]}>
              {`@${item.userName}`}
            </Text>
            <Text style={styles.text}>{item.email}</Text>
          </View>

          <View>
            <TouchableOpacity
              onPress={() => handleAddNewFriend(item.amigoId)}
              accessibilityLabel="Adicionar amigo"
              accessibilityRole="button"
            >
              {isFriendAdded ? (
                <CheckIcon width={20} height={20} />
              ) : (
                <PlusCircleIcon width={20} height={20} />
              )}
            </TouchableOpacity>
          </View>
        </View>
      )
    },
    [handleAddNewFriend, isFriendAdded],
  )

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Encontramos alguns usuários com esse nome
      </Text>

      <View>
        <FlatList
          data={friendsList}
          keyExtractor={(item) => item.amigoId}
          renderItem={RenderFriendItem}
          ListFooterComponent={<LinkToInviteByEmailPage withTitle />}
        />
      </View>
    </View>
  )
}
