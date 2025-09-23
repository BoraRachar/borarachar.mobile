import { StyleSheet, Text, View } from 'react-native'
import ImageOfPage from '@/src/assets/images/celebration-amico.svg'

import {
  horizontalScale,
  rem,
  verticalScale,
} from '@/src/utils/responsiveUtils'
import { ButtonCustomizer } from '@/src/components/ButtonCustomizer'

import { styles as globalStyles } from '@/src/app/styles'
import { theme } from '@/src/theme'
import { router } from 'expo-router'
import { useExpenseStore } from '@/src/store/useExpenseStore'

export default function Success() {
  const { expenseData, removeExpenseData } = useExpenseStore()

  return (
    <View
      style={[
        styles.container,
        { alignItems: 'center', justifyContent: 'space-around' },
      ]}
    >
      <ImageOfPage width={horizontalScale(296)} height={verticalScale(296)} />

      <View style={{ gap: 8 }}>
        <Text style={styles.title}>Despesa lançada com sucesso!</Text>
        <Text style={styles.description}>
          Caso precise editar ou remover este lançamento, poderá encontrá-lo no
          grupo {expenseData?.nomeGrupo}.
        </Text>
      </View>

      <View style={styles.buttonContainer}>
        <ButtonCustomizer.Root
          type="tertiaryHalfWidth"
          onPress={() => {
            removeExpenseData()
            router.dismissAll()
            router.replace('/home')
          }}
          customStyles={globalStyles.tertiaryButtonHalfWidth}
        >
          <ButtonCustomizer.Title
            title="Voltar ao Início"
            customStyles={globalStyles.tertiaryButtonText}
          />
        </ButtonCustomizer.Root>

        <ButtonCustomizer.Root
          type="primaryHalfWidth"
          onPress={() => {
            removeExpenseData()
            router.replace('/(tabs)/expenses/newExpense')
          }}
          customStyles={globalStyles.primaryButtonHalfWidth}
        >
          <ButtonCustomizer.Title
            title="Nova Despesa"
            customStyles={globalStyles.primaryButtonText}
          />
        </ButtonCustomizer.Root>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
    padding: verticalScale(24),
    gap: 24,
  },
  title: {
    color: theme.colors.primaryColor,
    fontFamily: theme.fontFamily.bold,
    fontSize: rem(24),
    textAlign: 'center',
  },
  description: {
    fontFamily: theme.fontFamily.regular,
    fontSize: rem(16),
    color: theme.colors.primaryColor,
    lineHeight: verticalScale(22),
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 24,
  },
})
