import { Text, View } from 'react-native'
import AvatarImageComponent from '@/src/components/AvatarImageComponent'

import Email from '@/src/assets/images/e-mail.svg'
import Trash from '@/src/assets/images/trash.svg'

import { styles } from './styles'

type SentInvitationCardProps = {
  friend: {
    avatar: string
    name: string
    device: string
  }
  setModalVisible: (visible: boolean) => void
}

export default function SentInvitationCard({
  friend,
  setModalVisible,
}: SentInvitationCardProps) {
  return (
    <View style={styles.container}>
      <AvatarImageComponent image={friend.avatar} size={48} />

      <View style={styles.containerText}>
        <Text style={[styles.text, styles.textName]}>{friend.name}</Text>
        <Text style={styles.text}>{friend.device}</Text>
      </View>

      <View style={styles.containerIcons}>
        <Email width={24} height={24} onPress={() => setModalVisible(true)} />
        <Trash width={24} height={24} onPress={() => setModalVisible(true)} />
      </View>
    </View>
  )
}
