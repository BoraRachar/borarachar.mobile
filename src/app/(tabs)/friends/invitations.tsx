import { View } from 'react-native'
import AddFriendButton from '@/src/components/AddFriendButton'

import { styles } from './styles'

export default function Invitations() {
  return (
    <View style={styles.container}>
      <AddFriendButton />
    </View>
  )
}
