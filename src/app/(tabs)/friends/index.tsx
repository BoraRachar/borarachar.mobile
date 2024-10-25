import { Link } from 'expo-router'
import { FlatList, Image, Text, TouchableOpacity, View } from 'react-native'
import { friends } from '@/src/mock/friends'

import { styles } from './styles'

import Plus from '@/src/assets/images/plus.svg'
import User from '@/src/assets/images/user.svg'
import ChevronRight from '@/src/assets/images/chevron-arrow-right.svg'

type Friend = {
  id: number
  name: string
  avatar: string
  groups: number
}

export default function Amigos() {
  return (
    <View style={styles.container}>
      <View style={styles.resumeContent}>
        <Text style={styles.text}>Cibely, você tem:</Text>
        <Text style={styles.text}>10 amigos</Text>
        <View style={styles.containerText}>
          <Text style={styles.text}>4 convites enviados</Text>
          <Link
            href="/friends/invitations"
            style={[styles.text, { textDecorationLine: 'underline' }]}
          >
            Ver
          </Link>
        </View>
        <View style={styles.containerText}>
          <Text style={styles.text}>3 solicitações de amizade pendentes</Text>
          <Link
            href="/friends/invitations"
            style={[styles.text, { textDecorationLine: 'underline' }]}
          >
            Ver
          </Link>
        </View>
      </View>

      <View style={styles.containerButton}>
        <Text style={[styles.text, styles.textButton]}>
          Adicionar novo amigo
        </Text>
        <TouchableOpacity>
          <View style={styles.addButton}>
            <Plus />
          </View>
        </TouchableOpacity>
      </View>

      <View style={{ flex: 1 }}>
        <Text style={styles.title}>Amigos</Text>

        <FlatList
          data={friends}
          renderItem={({ item }) => <FriendItem friend={item} />}
          keyExtractor={(item) => item.id.toString()}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </View>
  )
}

const FriendItem = ({ friend }: { friend: Friend }) => {
  return (
    <View style={styles.contentFriend}>
      <View>
        {friend?.avatar ? (
          <Image
            source={{ uri: friend.avatar }}
            alt="avatar do usuario"
            style={styles.avatarImage}
          />
        ) : (
          <View style={styles.avatarContainer}>
            <User width={24} height={24} />
          </View>
        )}
      </View>

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
