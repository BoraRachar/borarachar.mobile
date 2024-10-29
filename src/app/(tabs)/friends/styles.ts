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
  resumeContent: {
    gap: verticalScale(20),
  },
  title: {
    fontFamily: theme.fontFamily.bold,
    fontSize: rem(24),
    lineHeight: verticalScale(30),
    color: theme.colors.primaryColor,
    marginTop: verticalScale(16),
  },
  text: {
    fontSize: rem(16),
    lineHeight: verticalScale(24),
    fontFamily: theme.fontFamily.regular,
    color: theme.colors.primaryColor,
  },
  textBold: {
    fontFamily: theme.fontFamily.bold,
  },
  textButton: {
    fontFamily: theme.fontFamily.semiBold,
  },
  containerText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  tabLabelActive: {
    fontSize: rem(18),
    fontFamily: theme.fontFamily.semiBold,
  },
  containerButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: verticalScale(12),
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.Gray[300],
    marginTop: verticalScale(22),
  },
  addButton: {
    backgroundColor: theme.colors.third,
    borderRadius: 50,
    padding: 14,
  },
  contentFriend: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: horizontalScale(16),
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.third,
    paddingVertical: verticalScale(12),
  },
  avatarContainer: {
    backgroundColor: theme.colors.third,
    borderRadius: 50,
    padding: 14,
  },
  avatarImage: {
    flex: 1,
    width: 48,
    height: 48,
    borderRadius: 50,
    resizeMode: 'cover',
  },
})
