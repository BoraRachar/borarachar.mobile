import { theme } from '@/src/theme'
import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 24,
  },
  content: {
    flex: 1,
  },
  subTitle: {
    color: theme.colors.primaryColor,
    fontFamily: theme.fontFamily.bold,
    fontWeight: 'bold',
    fontSize: 24,
  },
  otpContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 24,
  },
  otpInput: {
    borderWidth: 2,
    borderColor: theme.colors.Gray[300],
    borderRadius: 6,
    color: theme.colors.Gray[700],
    fontSize: 30,
    width: 48,
    height: 48,
    textAlign: 'center',
    paddingHorizontal: 8,
    paddingVertical: 5,
  },
  otpSeparator: {
    width: 20,
    height: 5,
    backgroundColor: theme.colors.primaryColor,
    borderRadius: 6,
  },
  footer: {
    flexShrink: 1,
    paddingBottom: 24,
    gap: 8,
  },
  button: {
    width: '100%',
    height: 48,
    backgroundColor: theme.colors.primaryColor,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
    borderRadius: 6,
  },
  buttonText: {
    color: theme.colors.white,
    fontFamily: theme.fontFamily.semiBold,
    fontSize: 16,
  },
  receivedCodeContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    marginBottom: 18,
  },
  receivedCodeText: {
    color: theme.colors.primaryColor,
    fontFamily: theme.fontFamily.regular,
    fontSize: 14,
  },
  receivedCodeLink: {
    color: theme.colors.primaryColor,
    fontFamily: theme.fontFamily.bold,
    fontSize: 14,
    textDecorationLine: 'underline',
  },
})
