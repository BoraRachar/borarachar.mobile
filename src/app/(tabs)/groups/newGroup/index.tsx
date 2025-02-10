import { Pressable, Text, TextInput, View } from 'react-native'

import Photograph from '@/src/assets/images/photograph.svg'
import Pencil from '@/src/assets/images/pencil.svg'
import { styles } from './styles'

export default function NewGroups() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.imageContainer}>
          <Photograph width={32} height={32} />
          <Pressable
            style={styles.editIcon}
            onPress={() => {
              console.log('edit')
            }}
          >
            <Pencil width={12} height={12} />
          </Pressable>
        </View>
        <View style={{ flex: 1, gap: 8 }}>
          <Text style={styles.label}>Nome</Text>
          <TextInput
            style={styles.input}
            placeholder="Ex: Amigos do Bora"
            placeholderTextColor={'#9BA5B7'}
          />
        </View>
      </View>
    </View>
  )
}
