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
  const [acceptModalVisible, setAcceptModalVisible] = showModal
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={acceptModalVisible}
      onRequestClose={() => {
        console.log('clickou no fechar')
        setAcceptModalVisible(!acceptModalVisible)
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
              onPress={() => setAcceptModalVisible(!acceptModalVisible)}
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
