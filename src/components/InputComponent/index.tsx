import React from 'react'
import { View, Text, TextInput, Pressable } from 'react-native'
import { styles } from '../../app/styles'
import { theme } from '@/src/theme'
import WarningCircle from '../../assets/images/WarningCircle.svg'
import CheckCircle from '../../assets/images/CheckCircle.svg'
interface InputComponentProps {
  label?: string
  placeholder?: string
  secureTextEntry?: boolean
  value: string
  onChangeText: (text: string) => void
  errorOrSucess?: string
  isValid?: boolean
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
  isValid,
  icon: Icon,
  onIconPress,
}) => {
  return (
    <View style={styles.inputContainer}>
      <View style={styles.inputLabelContainer}>
        <Text style={styles.inputLabelText}>{label}</Text>
      </View>
      <View
        style={[
          errorOrSucess
            ? styles.inputWrapperError
            : isValid
              ? styles.inputWrapperSuccess
              : styles.inputWrapper,
        ]}
      >
        <TextInput
          placeholder={placeholder}
          secureTextEntry={secureTextEntry}
          placeholderTextColor={theme.colors.Gray[500]}
          cursorColor={theme.colors.Gray[500]}
          value={value}
          onChangeText={onChangeText}
        />
        {errorOrSucess ? (
          <WarningCircle />
        ) : isValid ? (
          <CheckCircle />
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
