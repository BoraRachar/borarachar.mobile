import { Text, View } from 'react-native'
import AvatarImageComponent from '@/src/components/AvatarImageComponent'

import CheckGreen from '@/src/assets/images/check-green.svg'
import CloseRed from '@/src/assets/images/close-red.svg'

import { styles } from './styles'

type Props = {
  friend: {
    avatar: string
    name: string
    device: string
  }
  setModalVisible: (value: boolean) => void
}

export default function PendingInvitationsCard({
  friend,
  setModalVisible,
}: Props) {
  return (
    <View style={styles.container}>
      <AvatarImageComponent image={friend.avatar} size={48} />

      <View style={styles.containerText}>
        <Text style={styles.text}>{friend.name}</Text>
      </View>

      <View style={styles.containerIcons}>
        <CheckGreen
          width={24}
          height={24}
          onPress={() => setModalVisible(true)}
        />
        <CloseRed
          width={24}
          height={24}
          onPress={() => setModalVisible(true)}
        />
      </View>
    </View>
  )
}
