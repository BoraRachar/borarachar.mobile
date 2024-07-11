import { useState } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'

import UnCheckedIcon from '@/src/assets/images/unCheckCircle.svg'
import CheckedIcon from '@/src/assets/images/CheckCircle.svg'

import { styles } from './styles'

type NameSuggestionProps = {
  suggestions: string[]
  onNameSelect?: (name: string) => void
}

export default function NameSuggestion({
  suggestions,
  onNameSelect,
}: NameSuggestionProps) {
  const [selectedName, setSelectedName] = useState('')

  const handleNameSelect = (name: string) => {
    setSelectedName(name)
    if (onNameSelect) {
      onNameSelect(name)
    }
  }

  return (
    <View style={{ marginHorizontal: 24 }}>
      {suggestions.map((name, index) => (
        <TouchableOpacity key={index} onPress={() => handleNameSelect(name)}>
          <View
            style={[
              styles.container,
              selectedName === name && styles.containerSelected,
            ]}
          >
            <Text
              style={[
                styles.text,
                selectedName === name && styles.textSelected,
              ]}
            >
              {name}
            </Text>
            {selectedName === name ? <CheckedIcon /> : <UnCheckedIcon />}
          </View>
        </TouchableOpacity>
      ))}
    </View>
  )
}
