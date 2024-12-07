import { Modal, Text, TouchableOpacity, View } from 'react-native'

import { styles } from './styles'
import { theme } from '@/src/theme'

type ModalComponentProps = {
  showModal: [
    completeModalVisible: boolean,
    setCompleteModalVisible: (visible: boolean) => void,
  ]
  friendName: string
  idConvite: string
  onPress: (idConvite: string) => void
}

export default function ResendEmailModal({
  showModal,
  friendName,
  idConvite,
  onPress,
}: ModalComponentProps) {
  const [resendEmailModalVisible, setResendEmailModalVisible] = showModal

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={resendEmailModalVisible}
      onRequestClose={() => {
        setResendEmailModalVisible(!resendEmailModalVisible)
      }}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <View style={styles.modalHeader}>
            <Text
              style={styles.modalTitle}
            >{`Reenviar convite para ${friendName}?`}</Text>

            <Text style={styles.modalText}>
              {`Enviaremos um e-mail para ${friendName} com o link do convite.`}
            </Text>
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.button, { backgroundColor: theme.colors.third }]}
              onPress={() =>
                setResendEmailModalVisible(!resendEmailModalVisible)
              }
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
              onPress={() => onPress(idConvite)}
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
