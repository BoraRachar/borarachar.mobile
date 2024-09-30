import React from 'react'
import { View, FlatList, Text, TouchableOpacity } from 'react-native'
import { CarouselItem } from '../CarouselItem'
import { PaginationCarousel } from '../PaginationCarousel/index'

import ChevronArrowRight from '@/src/assets/images/chevron-arrow-right.svg'

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
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Meus Saldos</Text>
        <TouchableOpacity>
          <ChevronArrowRight width={24} height={24} />
        </TouchableOpacity>
      </View>

      <FlatList
        data={carouselJSON}
        renderItem={({ item }) => <CarouselItem item={item} />}
        horizontal
        pagingEnabled
        snapToAlignment="center"
        showsHorizontalScrollIndicator={false}
      />

      <View style={styles.paginationContainer}>
        <PaginationCarousel data={carouselJSON} />
      </View>
    </View>
  )
}
