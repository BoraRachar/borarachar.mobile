import { Text, TouchableOpacity, View } from 'react-native'

import Plus from '@/src/assets/images/plus.svg'

import { styles } from './styles'

export default function AddFriendButton() {
  return (
    <View style={styles.containerButton}>
      <Text style={[styles.text, styles.textButton]}>Adicionar novo amigo</Text>
      <TouchableOpacity>
        <View style={styles.addButton}>
          <Plus />
        </View>
      </TouchableOpacity>
    </View>
  )
}
