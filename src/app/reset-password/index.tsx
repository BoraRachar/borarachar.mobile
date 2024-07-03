import { useState } from 'react'
import { View } from 'react-native'

import Header from '@/src/components/HeaderComponent'
import ProgressBarComponent from '@/src/components/ProgressBarComponent'

import OTPInput from './OTPInput'
import NewPasswordInput from './NewPasswordInput'

import { styles as globalStyles } from '@/src/app/styles'

export default function ResetPassword() {
  const [step, setStep] = useState<number>(1)

  const totalSteps = 3

  const increaseStep = () => {
    setStep(step + 1)
  }

  return (
    <View style={{ flex: 1, paddingHorizontal: 24 }}>
      <View>
        <Header title="Redefinir senha" />
        <ProgressBarComponent totalSteps={totalSteps} currentStep={step} />
      </View>

      {step === 1 ? (
        <OTPInput increaseStep={increaseStep} />
      ) : (
        <NewPasswordInput />
      )}
    </View>
  )
}
