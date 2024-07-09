import { Text, TouchableOpacity, View } from 'react-native'

import UnCheckCircle from '@/src/assets/images/unCheckCircle.svg'
import CheckCircle from '@/src/assets/images/CheckCircle.svg'

import { styles } from './styles'
import { useState } from 'react'

export default function NameSuggestionComponents({
  namesSuggestionFromApi,
  onSelect,
}) {
  const [selected, setSelected] = useState(null)

  const handleSelect = (name) => {
    setSelected(name)
    if (onSelect) {
      onSelect(name)
    }
  }

  return (
    <View>
      {namesSuggestionFromApi.map((name, index) => (
        <TouchableOpacity key={index} onPress={() => handleSelect(name)}>
          <View
            style={[
              styles.container,
              selected === name && styles.containerSelected,
            ]}
          >
            <Text
              style={[styles.text, selected === name && styles.textSelected]}
            >
              {name}
            </Text>
            {selected === name ? <CheckCircle /> : <UnCheckCircle />}
          </View>
        </TouchableOpacity>
      ))}
    </View>
  )
}
