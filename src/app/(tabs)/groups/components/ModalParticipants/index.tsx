import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { colors } from '@/src/theme/colors'
import { fontFamily } from '@/src/theme/font-family'
import ModalComponent from '@/src/components/ModalComponent'

import {
  horizontalScale,
  rem,
  verticalScale,
} from '@/src/utils/responsiveUtils'

import CloseIcon from '@/src/assets/images/close-roudend.svg'
import { useState } from 'react'

// interface SelectedParticipantProps {
//   apelido: string
//   email: string
//   hasPendent: boolean
//   isAdm: boolean
//   nome: string
//   participanteId: string
// }

interface ModalParticipantsProps {
  modalVisible: boolean
  setModalVisible: (value: boolean) => void
  removeParticipant: () => void
}

export default function ModalParticipants({
  modalVisible,
  setModalVisible,
  removeParticipant,
}: ModalParticipantsProps) {
  const [showDeleteModal, setShowDeleteModal] = useState(false)

  const handleShowDeleteModal = () => {
    setModalVisible(false)
    setShowDeleteModal(true)
  }

  const handleRemoveParticipant = () => {
    removeParticipant()
    setShowDeleteModal(false)
  }

  // const handleRemoveParticipant = async () => {
  //   try {
  //     await axiosPrivateClient.delete('participantes/delete-participantes', {
  //       data: {
  //         userCod,
  //         grupoId: groupData.grupoId,
  //         idParticipantes: [selectedParticipant.participanteId],
  //       },
  //     })

  //     setParticipantsList((prev: SelectedParticipantProps[]) =>
  //       prev.filter(
  //         (item) => item.participanteId !== selectedParticipant.participanteId,
  //       ),
  //     )
  //   } catch (error) {
  //     console.log('Erro ao remover participante', error)
  //   } finally {
  //     setShowDeleteModal(false)
  //   }
  // }

  return (
    <View>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(!modalVisible)}
      >
        <View style={styles.container}>
          <View style={styles.content}>
            <TouchableOpacity
              onPress={() => setModalVisible(false)}
              style={styles.closeButton}
            >
              <CloseIcon />
            </TouchableOpacity>
            <View>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Text style={styles.text}>Tornar administrador</Text>
              </TouchableOpacity>

              <View style={styles.separator} />

              <TouchableOpacity onPress={() => handleShowDeleteModal()}>
                <Text style={[styles.text, { color: 'red' }]}>
                  Remover participantes
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Modal de deletar participantes */}
      <ModalComponent
        showModal={[showDeleteModal, setShowDeleteModal]}
        type="complete"
        title={`Deseja remover PARTICIPANTE?`}
        textButton1="Não remover"
        textButton2="Remover"
        onPress={handleRemoveParticipant}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    paddingHorizontal: 24,
  },
  content: {
    backgroundColor: 'white',
    width: '100%',
    borderRadius: 16,
    justifyContent: 'center',
    paddingVertical: verticalScale(62),
    paddingHorizontal: horizontalScale(16),
    position: 'relative',
  },
  text: {
    fontFamily: fontFamily.semiBold,
    fontSize: rem(20),
    lineHeight: verticalScale(30),
    color: colors.primaryColor,
  },
  separator: {
    width: '100%',
    height: 1,
    backgroundColor: colors.primaryColor,
    marginVertical: verticalScale(14),
  },
  closeButton: {
    position: 'absolute',
    top: 8,
    right: 8,
  },
})
