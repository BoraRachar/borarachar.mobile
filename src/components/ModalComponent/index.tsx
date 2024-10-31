import { Modal, Pressable, Text, View } from 'react-native'

import { styles } from './styles'

export default function ModalComponent() {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={true}
      onRequestClose={() => {
        console.log('Fechou')
      }}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>Hello World!</Text>
          <Pressable
            style={[styles.button, styles.buttonClose]}
            onPress={() => console.log('foi')}
          >
            <Text style={styles.textStyle}>Hide Modal</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  )
}
