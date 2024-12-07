import { Modal, Text, TouchableOpacity, View } from 'react-native'

import { styles } from './styles'
import { theme } from '@/src/theme'
import { verticalScale } from '@/src/utils/responsiveUtils'

type ModalComponentProps = {
  showModal: [
    simpleModalVisible: boolean,
    setSimpleModalVisible: (visible: boolean) => void,
  ]
  friendName: string
}

export default function AcceptModal({
  showModal,
  friendName,
}: ModalComponentProps) {
  const [simpleModalVisible, setSimpleModalVisible] = showModal
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={simpleModalVisible}
      onRequestClose={() => {
        console.log('clickou no fechar')
        setSimpleModalVisible(!simpleModalVisible)
      }}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>
              {`${friendName} agora faz parte da sua lista de amigos`}
            </Text>
          </View>

          <View
            style={[styles.buttonContainer, { marginTop: verticalScale(100) }]}
          >
            <TouchableOpacity
              style={[styles.button, { backgroundColor: theme.colors.third }]}
              onPress={() => setSimpleModalVisible(!simpleModalVisible)}
            >
              <Text
                style={[
                  styles.buttonText,
                  { color: theme.colors.primaryColor },
                ]}
              >
                Fechar
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  )
}
