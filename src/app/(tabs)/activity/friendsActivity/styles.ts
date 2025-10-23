import { theme } from '@/src/theme'
import {
  horizontalScale,
  moderateScale,
  rem,
  verticalScale,
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
    fontSize: rem(20),
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
  },
  badge: {
    borderRadius: 50,
    width: 60,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageContainer: {
    width: horizontalScale(56),
    height: verticalScale(56),
    borderWidth: 3,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: theme.colors.primaryColor,
    backgroundColor: theme.colors.third,
    position: 'relative',
  },
})
