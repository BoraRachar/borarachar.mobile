import { FlatList, Text, TouchableOpacity, View } from 'react-native'
import { useLocalSearchParams } from 'expo-router'

import AvatarImageComponent from '@/src/components/AvatarImageComponent'
import PlusCircleIcon from '@/src/assets/images/plus-circle.svg'

import { styles } from '../styles'
import { axiosPrivateClient } from '@/src/utils/axios'

export default function FriendSearchResults() {
  const { userList, userCod } = useLocalSearchParams()
  const users = JSON.parse(userList as string)

  const handleAddNewFriend = async (amigoId: string) => {
    try {
      const response = await axiosPrivateClient.post('/amizade/add-amigo', {
        userCod,
        amigoId,
      })

      if (response.data.statusCode === 200) {
        console.log('Deu certo, Mudar o icone')
      }
    } catch (error) {
      console.log(error)
    }
  }
  const RenderItem = ({ item }) => {
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
            <PlusCircleIcon width={20} height={20} />
          </TouchableOpacity>
        </View>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Encontramos alguns usuários com esse nome
      </Text>

      <FlatList
        data={users}
        keyExtractor={(item) => item.amigoId.toString()}
        renderItem={RenderItem}
      />
    </View>
  )
}
