import { Modal, Text, TouchableOpacity, View } from 'react-native'

import { styles } from './styles'
import { theme } from '@/src/theme'

type ModalComponentProps = [boolean, (visible: boolean) => void]

export default function ModalComponent({
  showModal,
}: {
  showModal: ModalComponentProps
}) {
  const [modalVisible, setModalVisible] = showModal
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(!modalVisible)
      }}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Reenviar convite para [NOME]?</Text>

            <Text style={styles.modalText}>
              Enviaremos um e-mail para [NOME] com o link do convite.
            </Text>
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.button, { backgroundColor: theme.colors.third }]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text
                style={[
                  styles.buttonText,
                  { color: theme.colors.primaryColor },
                ]}
              >
                Não Enviar
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.button,
                { backgroundColor: theme.colors.primaryColor },
              ]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={[styles.buttonText, { color: theme.colors.white }]}>
                Enviar
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  )
}
