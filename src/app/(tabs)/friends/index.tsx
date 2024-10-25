import { Link } from 'expo-router'
import { Text, View } from 'react-native'

import { styles } from './styles'
import { verticalScale } from '@/src/utils/responsiveUtils'

import AddFriendButton from '@/src/components/AddFriendButton'

export default function Amigos() {
  return (
    <View style={styles.container}>
      <View style={{ gap: verticalScale(20) }}>
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

      <View style={{ marginTop: verticalScale(24) }}>
        <AddFriendButton />
      </View>
    </View>
  )
}
