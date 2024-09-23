import Ionicons from '@expo/vector-icons/Ionicons'
import { Text, View } from 'react-native'

export default function Home() {
  return (
    <View>
      <View>
        <Text>Ola, Bora</Text>

        <View>
          <Ionicons name="notifications-outline" size={24} color="black" />
          <Ionicons name="help-circle-outline" size={24} color="black" />
        </View>
      </View>
    </View>
  )
}
