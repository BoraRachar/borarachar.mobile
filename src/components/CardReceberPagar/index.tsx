import React from 'react'
import { View, FlatList } from 'react-native'
import { CarouselItem } from '../CarouselItem'
import { PaginationCarousel } from '../PaginationCarousel/index'
import { styles } from './style'

const carouselJSON = [
  {
    id: 1,
    title: 'A receber',
    value: '1.111,11',
  },
  {
    id: 2,
    title: 'A pagar',
    value: '2.222,22',
  },
]

export const Carousel: React.FC = () => {
  return (
    <View style={styles.flatListContainer}>
      <FlatList
        data={carouselJSON}
        renderItem={({ item }) => <CarouselItem item={item} />}
        horizontal
        pagingEnabled
        snapToAlignment="center"
        showsHorizontalScrollIndicator={false}
      ></FlatList>
      {/* <PaginationCarousel data={carouselJSON} /> */}
    </View>
  )
}
