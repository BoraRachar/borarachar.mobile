import { theme } from '@/src/theme'
import { horizontalScale, rem } from '@/src/utils/responsiveUtils'
import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  header: {
    flexDirection: 'row',
    marginBottom: 16,
    gap: horizontalScale(16),
  },
  text: {
    color: theme.colors.primaryColor,
  },
  title: {
    fontFamily: theme.fontFamily.bold,
    fontSize: rem(24),
  },
  description: {
    fontFamily: theme.fontFamily.regular,
    fontSize: rem(16),
    maxWidth: '90%',
  },
} as const)
