import { StyleSheet, Text, View, Dimensions } from 'react-native'
import React from 'react'
import { ButtonCustomizer } from '@/src/components/ButtonCustomizer'
import openEye from '@/src/assets/images/openEye.svg'
import { styles } from './style'

interface Item {
  id: number,
  title: string,
  value: string
}

export const CarouselItem: React.FC<{ item: Item }> = ({ item }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{item.title}</Text>
      <View style={styles.content}>
        <Text style={styles.value}>{item.value}</Text>
        <ButtonCustomizer.Icon icon={openEye} />
      </View>
    </View>
  )
}