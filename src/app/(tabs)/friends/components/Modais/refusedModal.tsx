import { Modal, Text, TouchableOpacity, View } from 'react-native'

import { styles } from './styles'
import { theme } from '@/src/theme'

type ModalComponentProps = {
  showModal: [
    completeModalVisible: boolean,
    setCompleteModalVisible: (visible: boolean) => void,
  ]
  friendName: string
  id: string
  onPress: (id: string) => void
}

export default function RefusedModal({
  showModal,
  friendName,
  id,
  onPress,
}: ModalComponentProps) {
  const [completeModalVisible, setCompleteModalVisible] = showModal

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={completeModalVisible}
      onRequestClose={() => {
        setCompleteModalVisible(!completeModalVisible)
      }}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <View style={styles.modalHeader}>
            <Text
              style={styles.modalTitle}
            >{`Recusar solicitação de amizade de ${friendName}?`}</Text>

            <Text style={styles.modalText}>
              {`${friendName} não fará parte da sua lista de amigos.`}
            </Text>
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.button, { backgroundColor: theme.colors.third }]}
              onPress={() => setCompleteModalVisible(!completeModalVisible)}
            >
              <Text
                style={[
                  styles.buttonText,
                  { color: theme.colors.primaryColor },
                ]}
              >
                Cancelar
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.button,
                { backgroundColor: theme.colors.primaryColor },
              ]}
              onPress={() => onPress(id)}
            >
              <Text style={[styles.buttonText, { color: theme.colors.white }]}>
                Recusar
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  )
}
