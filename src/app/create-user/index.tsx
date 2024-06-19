import { View } from 'react-native'
import { styles } from './styles'
import { styles as globalStyles } from '../styles'
import Header from '../../components/HeaderComponent'
import ProgressBarComponent from '../../components/ProgressBarComponent'
import PasswordInput from './PasswordInput'

export default function CreateUser() {
  return (
    <View style={styles.container}>
      <Header title="Criar conta" />
      <ProgressBarComponent totalSteps={3} currentStep={1} />
      <View style={globalStyles.formContainer}>
        <PasswordInput />
      </View>
    </View>
  )
}
