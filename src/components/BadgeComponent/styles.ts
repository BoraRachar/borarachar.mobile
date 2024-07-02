import { StyleSheet } from 'react-native'
import { theme } from '@/src/theme'

export const styles = StyleSheet.create({
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
    paddingVertical: 2,
    paddingHorizontal: 8,
    borderRadius: 16,
  },
  badgeText: {
    fontSize: 18,
    fontFamily: theme.fontFamily.medium,
  },
  badgeStrong: {
    backgroundColor: theme.colors.Success[50],
  },
  badgeMedium: {
    backgroundColor: theme.colors.Warning[50],
  },
  badgeError: {
    backgroundColor: theme.colors.Error[50],
  },
  badgeTextStrong: {
    color: theme.colors.Success[700],
  },
  badgeTextMedium: {
    color: theme.colors.Warning[700],
  },
  badgeTextError: {
    color: theme.colors.Error[700],
  },
})
