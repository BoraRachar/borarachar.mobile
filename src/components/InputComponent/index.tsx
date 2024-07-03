import { View, Text, TextInput } from 'react-native'
import { styles } from '../../app/styles'
import { theme } from '@/src/theme'

interface InputComponentProps {
  control?: Control
  name?: string
  label?: string
  placeholder?: string
  secureTextEntry?: boolean
  errors?: Record<string, FieldErrors>
  icon?: React.FC
  onIconPress?: () => void
}

export default function InputComponent({
  control,
  name,
  label,
  placeholder,
  secureTextEntry,
  errors,
  icon,
  onIconPress,
}: InputComponentProps) {
  return (
    <View style={styles.inputContainer}>
      <View style={styles.inputLabelContainer}>
        <Text style={styles.inputLabelText}>{label}</Text>
        <Text>Forte</Text>
      </View>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        secureTextEntry={secureTextEntry}
        placeholderTextColor={theme.colors.Gray[500]}
        cursorColor={theme.colors.Gray[500]}
      />
    </View>
  )
}
