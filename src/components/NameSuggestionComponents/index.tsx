import { useState } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'

import UnCheckCircle from '@/src/assets/images/unCheckCircle.svg'
import CheckCircle from '@/src/assets/images/CheckCircle.svg'

import { styles } from './styles'

type NameSuggestionComponentsProps = {
  namesSuggestionFromApi: string[]
  onSelect?: (name: string) => void
}

export default function NameSuggestionComponents({
  namesSuggestionFromApi,
  onSelect,
}: NameSuggestionComponentsProps) {
  const [selected, setSelected] = useState('')

  const handleSelect = (name: string) => {
    setSelected(name)
    if (onSelect) {
      onSelect(name)
    }
  }

  return (
    <View style={{ marginHorizontal: 24 }}>
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
