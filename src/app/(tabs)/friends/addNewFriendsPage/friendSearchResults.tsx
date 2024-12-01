import { Text, View } from 'react-native'
import { useLocalSearchParams } from 'expo-router'

export default function friendSearchResults() {
  const { userList } = useLocalSearchParams()
  console.log('Veio da qui', userList)
  return (
    <View>
      <Text>Resultado da pesquisa</Text>
    </View>
  )
}
