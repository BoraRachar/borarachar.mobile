import { Link } from 'expo-router'
import { Text, View } from 'react-native'

import { styles } from './styles'

export default function Amigos() {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.text}>Em Cibely, você tem:</Text>
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
    </View>
  )
}
