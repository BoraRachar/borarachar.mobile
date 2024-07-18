import { StyleSheet } from 'react-native'
import { theme } from '@/src/theme'

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontFamily: theme.fontFamily.bold,
    fontWeight: 'bold',
    fontSize: theme.sizes.fontSize30,
    lineHeight: 38,
    color: theme.colors.Gray[600],
  },
  subtitle: {
    fontFamily: theme.fontFamily.regular,
    fontSize: theme.sizes.fontSize16,
    lineHeight: 24,
    color: theme.colors.Gray[600],
  },
  forgotPassword: {
    fontFamily: theme.fontFamily.semiBold,
    fontSize: theme.sizes.fontSize14,
    lineHeight: 20,
    color: theme.colors.Gray[600],
    textDecorationLine: 'underline',
    marginTop: 8,
  },
})
