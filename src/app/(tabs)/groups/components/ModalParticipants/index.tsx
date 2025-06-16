import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { colors } from '@/src/theme/colors'
import { fontFamily } from '@/src/theme/font-family'
import ModalComponent from '@/src/components/ModalComponent'

import { useGroupStore } from '@/src/store/useGroupStore'
import { useAuthStore } from '@/src/store/useAuthStore'

import {
  horizontalScale,
  rem,
  verticalScale,
} from '@/src/utils/responsiveUtils'

import CloseIcon from '@/src/assets/images/close-roudend.svg'
import { useState } from 'react'

export default function ModalParticipants({
  modalVisible,
  setModalVisible,
  item,
}) {
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const { userCod } = useAuthStore()
  const { groupData } = useGroupStore()

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

              <TouchableOpacity onPress={() => setShowDeleteModal(true)}>
                <Text style={[styles.text, { color: 'red' }]}>
                  Remover participantes
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      <ModalComponent
        showModal={[showDeleteModal, setShowDeleteModal]}
        type="complete"
        title={`Deseja remover o PARTICIPANTES?`}
        textButton1="Não remover"
        textButton2="Remover"
        onPress={() => setShowDeleteModal(true)}
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
