import { Text, View } from 'react-native'
import AvatarImageComponent from '../AvatarImageComponent'

import Email from '@/src/assets/images/e-mail.svg'
import Trash from '@/src/assets/images/trash.svg'

import { styles } from './styles'

export default function SentInvitationComponent({ friend }) {
  return (
    <View style={styles.container}>
      <AvatarImageComponent image={friend.avatar} />

      <View style={styles.containerText}>
        <Text style={[styles.text, styles.textName]}>{friend.name}</Text>
        <Text style={styles.text}>{friend.device}</Text>
      </View>

      <View style={styles.containerIcons}>
        <Email width={24} height={24} />
        <Trash width={24} height={24} />
      </View>
    </View>
  )
}
