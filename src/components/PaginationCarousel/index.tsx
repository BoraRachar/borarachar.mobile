import { theme } from '@/src/theme'
import React from 'react'
import { StyleSheet, View } from 'react-native'

interface CarouselItem {
  id: number
  title: string
  value: string
}

// Defina as props que o componente filho vai receber
interface ChildComponentProps {
  data: CarouselItem[] // O array com os dados
}

export const PaginationCarousel: React.FC<ChildComponentProps> = ({ data }) => {
  return (
    <>
      {data.map((data) => {
        return <View key={data.id} style={styles.dot} />
      })}
    </>
  )
}

const styles = StyleSheet.create({
  dot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: theme.colors.primaryColor,
    marginHorizontal: 3,
  },
})
