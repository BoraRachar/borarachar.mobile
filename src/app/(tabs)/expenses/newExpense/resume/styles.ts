import { theme } from '@/src/theme'
import { horizontalScale, verticalScale } from '@/src/utils/responsiveUtils'
import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.white,
    paddingHorizontal: horizontalScale(24),
    paddingVertical: verticalScale(24),
  },
  listItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.Gray[300],
    paddingVertical: verticalScale(16),
  },
  title: {
    color: theme.colors.primaryColor,
    fontFamily: theme.fontFamily.regular,
    fontSize: theme.sizes.fontSize16,
  },
  content: {
    color: theme.colors.primaryColor,
    fontFamily: theme.fontFamily.semiBold,
    fontSize: theme.sizes.fontSize16,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 24,
  },
})
