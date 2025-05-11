import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

import Photograph from '@/src/assets/images/photograph.svg'
import { theme } from '@/src/theme'
import {
  horizontalScale,
  rem,
  verticalScale,
} from '@/src/utils/responsiveUtils'

import PencilBlack from '@/src/assets/images/pencil-black.svg'
import Money from '@/src/assets/images/money.svg'
import AddFriendIcon from '@/src/assets/images/addFriendIcon.svg'

const Details = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.imageContainer}>
          <Photograph width={32} height={32} />
        </View>
        <View style={{ gap: 8 }}>
          <Text style={[styles.text, { fontFamily: theme.fontFamily.bold }]}>
            Nome do grupo
          </Text>
          <Text style={[styles.text, { fontFamily: theme.fontFamily.regular }]}>
            Categoria
          </Text>
          <Text style={[styles.text, { fontFamily: theme.fontFamily.regular }]}>
            Breve descrição do grupo
          </Text>
        </View>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button}>
          <View style={styles.iconContainer}>
            <PencilBlack width={22} height={22} />
          </View>
          <Text style={styles.label}>Editar{'\n'}grupo</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button}>
          <View style={styles.iconContainer}>
            <Money width={22} height={22} />
          </View>
          <Text style={styles.label}>Nova{'\n'}despesa</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button}>
          <View style={styles.iconContainer}>
            <AddFriendIcon width={22} height={22} />
          </View>
          <Text style={styles.label}>Adicionar{'\n'}participantes</Text>
        </TouchableOpacity>
      </View>

      <View>
        <Text style={styles.title}>Movimentações</Text>
        <View style={{ marginTop: verticalScale(24), gap: rem(8) }}>
          <Text
            style={[
              styles.text,
              { fontFamily: theme.fontFamily.bold, textAlign: 'center' },
            ]}
          >
            Ainda não existem despesas para este grupo
          </Text>
          <Text style={[styles.text, { textAlign: 'center' }]}>
            Adicione a primeira despesa do grupo
          </Text>
        </View>
      </View>
    </View>
  )
}

export const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.white,
    flex: 1,
    padding: horizontalScale(24),
    gap: rem(24),
  },
  header: {
    flexDirection: 'row',
    gap: rem(16),
    maxHeight: verticalScale(100),
  },
  imageContainer: {
    width: horizontalScale(80),
    height: '100%',
    borderWidth: 3,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: theme.colors.primaryColor,
    backgroundColor: theme.colors.third,
  },
  title: {
    color: theme.colors.primaryColor,
    fontFamily: theme.fontFamily.bold,
    fontSize: rem(24),
    lineHeight: verticalScale(30),
  },
  text: {
    fontSize: rem(16),
    lineHeight: verticalScale(24),
    color: theme.colors.primaryColor,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    alignItems: 'center',
    width: horizontalScale(100),
  },
  iconContainer: {
    backgroundColor: theme.colors.third,
    borderRadius: 12,
    padding: horizontalScale(16),
  },
  label: {
    fontFamily: theme.fontFamily.regular,
    fontSize: rem(14),
    color: theme.colors.primaryColor,
    textAlign: 'center',
  },
})

export default Details
