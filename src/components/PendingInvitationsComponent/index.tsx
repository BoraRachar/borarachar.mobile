import { Text, View } from 'react-native'
import AvatarImageComponent from '../AvatarImageComponent'

import CheckGreen from '@/src/assets/images/check-green.svg'
import CloseRed from '@/src/assets/images/close-red.svg'

import { styles } from './styles'

export default function PendingInvitationsComponent({ friend }) {
  return (
    <View style={styles.container}>
      <AvatarImageComponent image={friend.avatar} />

      <View style={styles.containerText}>
        <Text style={styles.text}>{friend.name}</Text>
      </View>

      <View style={styles.containerIcons}>
        <CheckGreen width={24} height={24} />
        <CloseRed width={24} height={24} />
      </View>
    </View>
  )
}
