import { useState, useEffect } from 'react'
import { View, Text } from 'react-native'
import { styles } from './styles'
import SucessCircle from '../../assets/images/sucessCircle.svg'

interface PasswordInfoProps {
  password: string
}

interface PasswordCriteria {
  hasUpperCase: boolean
  hasLowerCase: boolean
  hasNumber: boolean
  hasSpecialChar: boolean
}

const PasswordInfoComponent: React.FC<PasswordInfoProps> = ({ password }) => {
  const [passwordCriteria, setPasswordCriteria] = useState<PasswordCriteria>({
    hasUpperCase: false,
    hasLowerCase: false,
    hasNumber: false,
    hasSpecialChar: false,
  })

  const handlePasswordChange = (password: string) => {
    const criteria: PasswordCriteria = {
      hasUpperCase: /[A-Z]/.test(password),
      hasLowerCase: /[a-z]/.test(password),
      hasNumber: /[0-9]/.test(password),
      hasSpecialChar: /[!@#$%^&*()_]/.test(password),
    }

    setPasswordCriteria(criteria)
  }

  useEffect(() => {
    handlePasswordChange(password)
  }, [password])

  return (
    <View style={styles.passwordInfoContainer}>
      <Text style={styles.passwordInfoTitle}>
        Deve conter no mínimo 8 caracteres e 3 dos itens a seguir:
      </Text>
      <View style={styles.passwordInfoCheckContainer}>
        <Text style={styles.passwordInfoCheckText}>1 maiúculo</Text>
        {passwordCriteria.hasUpperCase && (
          <SucessCircle style={styles.passwordInfoCheckIcon} />
        )}
      </View>
      <View style={styles.passwordInfoCheckContainer}>
        <Text style={styles.passwordInfoCheckText}>1 minúsculo</Text>
        {passwordCriteria.hasLowerCase && (
          <SucessCircle style={styles.passwordInfoCheckIcon} />
        )}
      </View>
      <View style={styles.passwordInfoCheckContainer}>
        <Text style={styles.passwordInfoCheckText}>
          1 numeral (1, 2, 3, 4...)
        </Text>
        {passwordCriteria.hasNumber && (
          <SucessCircle style={styles.passwordInfoCheckIcon} />
        )}
      </View>
      <View style={styles.passwordInfoCheckContainer}>
        <Text style={styles.passwordInfoCheckText}>
          1 especial (!, @, #, $, %, &, *, - ...)
        </Text>
        {passwordCriteria.hasSpecialChar && (
          <SucessCircle style={styles.passwordInfoCheckIcon} />
        )}
      </View>
    </View>
  )
}

export default PasswordInfoComponent
