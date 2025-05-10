import { StyleSheet, Text, View } from 'react-native'

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
import { Link } from 'expo-router'

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
        <View style={{ maxWidth: 80 }}>
          <Link href="/groups/newGroup" style={{ flexDirection: 'column' }}>
            <View style={styles.iconContainer}>
              <PencilBlack width={22} height={22} />
            </View>
            <Text style={styles.linkText}>Editar grupo</Text>
          </Link>
        </View>

        <View style={{ maxWidth: 80 }}>
          <Link href="/groups/newGroup" style={{ flexDirection: 'column' }}>
            <View style={styles.iconContainer}>
              <Money width={22} height={22} />
            </View>
            <Text style={styles.linkText}>Nova despesa</Text>
          </Link>
        </View>

        <View style={{ maxWidth: 80 }}>
          <Link
            href="/groups/newGroup"
            style={{
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <View style={styles.iconContainer}>
              <AddFriendIcon width={22} height={22} />
            </View>
            <Text style={styles.linkText}>Adicionar participantes</Text>
          </Link>
        </View>
      </View>
    </View>
  )
}

export const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.white,
    flex: 1,
    paddingHorizontal: horizontalScale(24),
  },
  header: {
    flexDirection: 'row',
    gap: rem(16),
    maxHeight: verticalScale(100),
  },
  imageContainer: {
    width: 80,
    height: '100%',
    borderWidth: 3,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: theme.colors.primaryColor,
    backgroundColor: theme.colors.third,
  },
  text: {
    fontSize: rem(16),
    lineHeight: verticalScale(24),
    color: theme.colors.primaryColor,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: verticalScale(12),
  },
  iconContainer: {
    width: 46,
    height: 46,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.third,
  },
  linkText: {
    fontFamily: theme.fontFamily.regular,
    fontSize: rem(14),
    color: theme.colors.primaryColor,
    textAlign: 'center',
  },
})

export default Details
