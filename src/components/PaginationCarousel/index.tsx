import { StyleSheet, Text, View } from 'react-native'
import React from 'react';

interface CarouselItem {
  id: number;
  title: string;
  value: string;
}

// Defina as props que o componente filho vai receber
interface ChildComponentProps {
  data: CarouselItem[]; // O array com os dados
}


export const PaginationCarousel: React.FC<ChildComponentProps> = ({ data }) => {
  return (
    <View>
      {
        data.map((data)) => {
          return <View key={data.id} style={styles.dot} />
        })
      }
    </View>
  )
}

const styles = StyleSheet.create({

  container: {
    flexDirection: 'row',
    position: 'absolute'
  },

  dot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    color: '#000000',
    marginHorizontal: 3
  }

})