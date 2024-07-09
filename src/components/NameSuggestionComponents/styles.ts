import { theme } from '@/src/theme'
import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
    width: '100%',
    borderWidth: 1,
    borderColor: theme.colors.Gray[300],
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  containerSelected: {
    borderColor: theme.colors.Success[300],
  },
  text: {
    fontFamily: theme.fontFamily.regular,
    fontSize: 16,
    lineHeight: 24,
    color: theme.colors.Gray[600],
  },
  textSelected: {
    color: theme.colors.Gray[900],
  },
})
