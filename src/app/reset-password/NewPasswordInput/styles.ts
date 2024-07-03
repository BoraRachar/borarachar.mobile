import { theme } from '@/src/theme'
import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  subTitle: {
    color: theme.colors.primaryColor,
    fontFamily: theme.fontFamily.bold,
    fontWeight: 'bold',
    fontSize: 30,
    lineHeight: 38,
  },
  description: {
    color: theme.colors.primaryColor,
    fontFamily: theme.fontFamily.regular,
    fontWeight: 'regular',
    fontSize: 16,
    marginTop: 8,
    lineHeight: 24,
    paddingRight: 60,
  },
  labelContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  label: {
    color: theme.colors.Gray[600],
    fontFamily: theme.fontFamily.medium,
    fontWeight: '500',
    fontSize: 14,
  },
  input: {
    borderColor: theme.colors.Gray[300],
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginTop: 6,
  },
  textInput: {
    width: '90%',
    fontFamily: theme.fontFamily.regular,
    fontSize: 24,
    color: theme.colors.Gray[900],
  },
  error: {
    fontFamily: theme.fontFamily.regular,
    fontSize: 14,
    color: theme.colors.Error[500],
  },
})
