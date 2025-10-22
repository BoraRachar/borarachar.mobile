import { theme } from '@/src/theme'
import {
  horizontalScale,
  moderateScale,
  rem,
} from '@/src/utils/responsiveUtils'
import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.white,
    paddingHorizontal: horizontalScale(20),
    paddingTop: moderateScale(20),
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
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
    lineHeight: 24,
  },
  textValueContainer: {
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
    marginTop: 12,
  },
})
