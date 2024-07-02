import { StyleSheet } from 'react-native'
import { theme } from '@/src/theme'

export const styles = StyleSheet.create({
  passwordInfoContainer: {
    width: '100%',
    marginTop: 20,
    gap: 10,
    marginBottom: 24,
  },
  passwordInfoTitle: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '500',
    color: theme.colors.primaryColor,
  },
  passwordInfoCheckContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  passwordInfoCheckText: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '500',
    color: theme.colors.primaryColor,
  },
  passwordInfoCheckIcon: {
    marginRight: 12,
  },
})
