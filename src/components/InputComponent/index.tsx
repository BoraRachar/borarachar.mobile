import React from 'react'
import { View, Text, TextInput, Pressable } from 'react-native'
import { styles } from '../../app/styles'
import { theme } from '@/src/theme'

interface InputComponentProps {
  label?: string
  placeholder?: string
  secureTextEntry?: boolean
  value: string
  onChangeText: (text: string) => void
  errorOrSucess?: string
  icon?: React.FC
  onIconPress?: () => void
}

const InputComponent: React.FC<InputComponentProps> = ({
  label,
  placeholder,
  secureTextEntry,
  value,
  onChangeText,
  errorOrSucess,
  icon: Icon,
  onIconPress,
}) => {
  return (
    <View style={styles.inputContainer}>
      <View style={styles.inputLabelContainer}>
        <Text style={styles.inputLabelText}>{label}</Text>
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <TextInput
          style={errorOrSucess ? styles.inputError : styles.input}
          placeholder={placeholder}
          secureTextEntry={secureTextEntry}
          placeholderTextColor={theme.colors.Gray[500]}
          cursorColor={theme.colors.Gray[500]}
          value={value}
          onChangeText={onChangeText}
        />
        {errorOrSucess ? (
          <Text style={styles.errorText}>{errorOrSucess}</Text>
        ) : Icon ? (
          <Pressable onPress={onIconPress} style={styles.iconForm}>
            <Icon />
          </Pressable>
        ) : null}
      </View>
    </View>
  )
}

export default InputComponent
