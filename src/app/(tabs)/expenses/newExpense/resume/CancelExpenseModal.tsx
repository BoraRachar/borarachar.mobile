import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { theme } from '@/src/theme'
import {
  horizontalScale,
  rem,
  verticalScale,
} from '@/src/utils/responsiveUtils'
import { router } from 'expo-router'
import { useExpenseStore } from '@/src/store/useExpenseStore'

export default function CancelExpenseModal({
  isModalVisible,
  setIsModalVisible,
}) {
  const { removeExpenseData } = useExpenseStore()

  return (
    <View style={styles.container}>
      <Modal
        visible={isModalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View style={styles.overlay}>
          <View style={styles.modalBox}>
            {/* Botão X para fechar */}
            <View style={styles.closeBtn}>
              <TouchableOpacity onPress={() => setIsModalVisible(false)}>
                <Ionicons
                  name="close"
                  size={24}
                  color={theme.colors.primaryColor}
                />
              </TouchableOpacity>
            </View>

            <Text style={styles.title}>
              Tem certeza que deseja cancelar essa despesa?
            </Text>
            <Text style={styles.subtitle}>
              Não perca essa experiência de rachar mais uma conta e organizar
              seu grupo
            </Text>

            {/* Botões */}
            <TouchableOpacity
              style={styles.primaryBtn}
              onPress={() => setIsModalVisible(false)}
            >
              <Text style={styles.primaryBtnText}>Voltar para o resumo</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.secondaryBtn}
              onPress={() => {
                removeExpenseData()
                setIsModalVisible(false)
                router.dismissAll()
                router.replace('/(tabs)/expenses/newExpense')
              }}
            >
              <Text style={styles.secondaryBtnText}>Sim, vou cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalBox: {
    backgroundColor: theme.colors.white,
    padding: horizontalScale(24),
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  closeBtn: {
    height: verticalScale(30),
    alignSelf: 'flex-end',
  },
  title: {
    fontSize: rem(22),
    fontWeight: '600',
    marginBottom: 10,
    marginTop: 30,
    textAlign: 'center',
    color: theme.colors.primaryColor,
  },
  subtitle: {
    fontSize: rem(14),
    color: theme.colors.primaryColor,
    marginBottom: 20,
    textAlign: 'center',
  },
  primaryBtn: {
    backgroundColor: theme.colors.primaryColor,
    paddingVertical: 12,
    borderRadius: 8,
    marginBottom: 10,
  },
  primaryBtnText: {
    color: theme.colors.white,
    textAlign: 'center',
    fontWeight: '600',
  },
  secondaryBtn: {
    borderWidth: 1,
    borderColor: theme.colors.primaryColor,
    paddingVertical: 12,
    borderRadius: 8,
  },
  secondaryBtnText: {
    color: theme.colors.primaryColor,
    textAlign: 'center',
    fontWeight: '600',
  },
})
