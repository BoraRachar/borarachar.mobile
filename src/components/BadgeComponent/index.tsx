import React from 'react'
import { View, Text } from 'react-native'
import { styles } from './styles'
import { theme } from '@/src/theme'

type Strength = 'Fraca' | 'Média' | 'Forte'

interface BadgeProps {
  strength: Strength
}

const Badge: React.FC<BadgeProps> = ({ strength }) => {
  let backgroundColor
  let textColor

  switch (strength) {
    case 'Fraca':
      backgroundColor = theme.colors.Error[500]
      textColor = theme.colors.Error[100]
      break
    case 'Média':
      backgroundColor = theme.colors.Warning[300]
      textColor = theme.colors.Warning[100]
      break
    case 'Forte':
      backgroundColor = theme.colors.Success[500]
      textColor = theme.colors.Success[100]
      break
    default:
      backgroundColor = 'grey'
  }

  return (
    <View style={[styles.badge, { backgroundColor }]}>
      <Text style={[styles.text, { color: textColor }]}>{strength}</Text>
    </View>
  )
}

export default Badge
