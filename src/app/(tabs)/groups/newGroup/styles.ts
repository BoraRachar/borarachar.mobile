import { theme } from '@/src/theme'
import { horizontalScale, verticalScale } from '@/src/utils/responsiveUtils'
import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
    padding: verticalScale(24),
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: horizontalScale(18),
  },
  imageContainer: {
    padding: 24,
    borderWidth: 3,
    borderColor: theme.colors.primaryColor,
    backgroundColor: theme.colors.third,
    position: 'relative',
  },
  editIcon: {
    backgroundColor: theme.colors.primaryColor,
    padding: 6,
    borderRadius: 3,
    position: 'absolute',
    bottom: -10,
    right: -10,
  },
})
