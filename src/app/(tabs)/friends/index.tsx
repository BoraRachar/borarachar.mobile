import { FlatList, Text, View } from 'react-native'

import { useAuthStore } from '@/src/store/useAuthStore'

import SeeMoreLink from './components/SeeMoreLink.tsx'
import LinkToAddNewFriendsPage from './components/LinkToAddNewFriendsPage'
import EmptyListMessage from './components/EmptyListMessage'

import { styles } from './styles'
import { verticalScale } from '@/src/utils/responsiveUtils'

import User from '@/src/assets/images/user.svg'
import ChevronRight from '@/src/assets/images/chevron-arrow-right.svg'
import AvatarImageComponent from '@/src/components/AvatarImageComponent'
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
  const { user } = useAuthStore()

  return (
    <View style={styles.container}>
      {/* Resumo do usuário */}
      <View style={styles.resumeContent}>
        <Text style={styles.text}>{`${user}, você tem:`}</Text>
        <Text style={styles.text}>10 amigos</Text>

        <View style={styles.containerText}>
          <Text style={styles.text}>4 convites enviados</Text>
          <SeeMoreLink text="Ver" initialTab="0" />
        </View>

        <View style={styles.containerText}>
          <Text style={styles.text}>3 solicitações de amizade pendentes</Text>
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
          <View>
            <Text style={styles.title}>Amigos</Text>

            <FlatList
              data={friends}
              renderItem={({ item }) => <FriendItem friend={item} />}
              keyExtractor={(item) => item.id.toString()}
              showsVerticalScrollIndicator={false}
            />
          </View>
        )}
      </View>
    </View>
  )
}
