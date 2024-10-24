import { theme } from '@/src/theme'
import {
  horizontalScale,
  verticalScale,
  rem,
} from '@/src/utils/responsiveUtils'
import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: horizontalScale(24),
    paddingVertical: verticalScale(24),
  },
  content: {
    gap: verticalScale(16),
  },
  text: {
    fontSize: rem(16),
    lineHeight: verticalScale(24),
    fontFamily: theme.fontFamily.regular,
    color: theme.colors.primaryColor,
  },
  containerText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
})
