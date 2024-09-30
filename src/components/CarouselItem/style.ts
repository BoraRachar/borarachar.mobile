
import { StyleSheet, Dimensions } from 'react-native'

import { theme } from '@/src/theme'
const {width, height} =  Dimensions.get('screen')



export const styles = StyleSheet.create({

  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
    width: 333,
    height: 131,
    borderRadius: 16,
    backgroundColor: `${theme.colors.third}`,
    gap: 10,
    paddingVertical: 34,
    paddingHorizontal: 15,
    marginHorizontal: 16
  },
  content: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',

    justifyContent: 'flex-start',
  },
  title: {
    fontSize: 14,
    fontWeight: 400,
    color: `${theme.colors.Gray[500]}`
  },
  value: {
    width: width * 0.5,
    fontWeight: 700,
    fontSize: 32,
    color: `${theme.colors.Gray[500]}`
  }

})