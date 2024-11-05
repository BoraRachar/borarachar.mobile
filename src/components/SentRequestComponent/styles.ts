import { theme } from '@/src/theme'
import {
  horizontalScale,
  rem,
  verticalScale,
} from '@/src/utils/responsiveUtils'
import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.Gray[300],
    paddingVertical: verticalScale(16),
  },
  containerText: {
    flex: 1,
    marginLeft: horizontalScale(16),
  },
  text: {
    fontSize: rem(16),
    lineHeight: verticalScale(24),
    color: theme.colors.primaryColor,
    fontFamily: theme.fontFamily.regular,
  },
  textBold: {
    fontFamily: theme.fontFamily.bold,
  },
  textName: {
    fontFamily: theme.fontFamily.bold,
  },
  containerIcons: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: horizontalScale(16),
  },
})
