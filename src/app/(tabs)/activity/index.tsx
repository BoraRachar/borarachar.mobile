import { Link } from 'expo-router'
import { Text, View } from 'react-native'

export default function Activity() {
  return (
    <View>
      <Text>Activity</Text>
      <Link href="/(tabs)/activity/userActivity">userActivity</Link>
    </View>
  )
}
