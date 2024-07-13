import React, { useRef, useState } from 'react'
import {
  KeyboardAvoidingView,
  NativeSyntheticEvent,
  Platform,
  Pressable,
  Text,
  TextInput,
  TextInputKeyPressEventData,
  View,
} from 'react-native'

import resetPasswordStore from '@/src/store/ResetPasswordStore'
import { ButtonCustomizer } from '@/src/components/ButtonCustomizer'
import ArrowRight from '@/src/assets/images/arrowRight.svg'
import ArrowRightDisable from '@/src/assets/images/arrowRightDisable.svg'

import { theme } from '@/src/theme'
import { styles as globalStyles } from '@/src/app/styles'
import { styles } from './styles'

type OTPInputProps = {
  increaseStep: () => void
}

export default function OTPInput({ increaseStep }: OTPInputProps) {
  const [otp, setOTP] = useState<string[]>([])
  const inputRefs = useRef<TextInput[]>([])
  const [isButtonDisabled, setIsButtonDisabled] = useState(true)
  const { setResetPassword } = resetPasswordStore()

  const getOTPvalue = (text: string, index: number) => {
    const newOTP = [...otp]
    newOTP[index] = text
    setOTP(newOTP)

    handleButtonDisable(newOTP)
  }

  const handleButtonDisable = (newOTP: string[]) => {
    const newOtpOnlyValue = newOTP.filter((item) => item !== '')

    if (newOtpOnlyValue.length === 7) {
      setIsButtonDisabled(false)
      return
    }

    setIsButtonDisabled(true)
  }

  const handleOTPNextInput = (text: string, index: number) => {
    if (text.length === 0 && index > 0) {
      if (index === 4) {
        inputRefs.current[index - 2].focus()
        getOTPvalue(text, index)
        return
      }
      inputRefs.current[index - 1].focus()
    } else if (text.length === 1 && index < 6) {
      if (index === 2) {
        inputRefs.current[index + 2].focus()
        getOTPvalue(text, index)
        return
      }
      inputRefs.current[index + 1].focus()
    }
    getOTPvalue(text, index)
  }

  const handleBackspaceKeyboardKey = (index: number) => {
    if (index > 0) {
      if (index === 4) {
        inputRefs.current[index - 2].focus()
        return
      }
      inputRefs.current[index - 1].focus()
    }
  }

  const onSubmit = () => {
    const otpString = otp.join('')
    const otpNumber = parseInt(otpString, 10)
    setResetPassword({ code: otpNumber })
    increaseStep()
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <View style={styles.content}>
        <Text style={styles.subTitle}>
          Insira o código enviado ao seu e-mail
        </Text>

        <View style={styles.otpContainer}>
          {Array.from({ length: 7 }, (_, index) => {
            if (index === 3) {
              return <View key={index} style={styles.otpSeparator}></View>
            }
            return (
              <TextInput
                key={index}
                ref={(ref) => (inputRefs.current[index] = ref as TextInput)}
                style={styles.otpInput}
                placeholder="0"
                placeholderTextColor={theme.colors.Gray[300]}
                cursorColor={theme.colors.Gray[700]}
                maxLength={1}
                keyboardType="numeric"
                secureTextEntry={false}
                onChangeText={(text) => handleOTPNextInput(text, index)}
                onKeyPress={({
                  nativeEvent,
                }: NativeSyntheticEvent<TextInputKeyPressEventData>) => {
                  if (nativeEvent.key === 'Backspace') {
                    handleBackspaceKeyboardKey(index)
                  }
                }}
              />
            )
          })}
        </View>
      </View>

      <View style={styles.footer}>
        <ButtonCustomizer.Root
          type={'primary'}
          onPress={onSubmit}
          customStyles={
            isButtonDisabled
              ? globalStyles.primaryButtonDisabled
              : globalStyles.primaryButton
          }
        >
          <ButtonCustomizer.Title
            title="Nova Senha"
            customStyles={
              isButtonDisabled
                ? globalStyles.primaryButtonTextDisabled
                : globalStyles.primaryButtonText
            }
          />
          <ButtonCustomizer.Icon
            icon={isButtonDisabled ? ArrowRightDisable : ArrowRight}
            customStyles={
              isButtonDisabled
                ? globalStyles.primaryButtonIconDisabled
                : globalStyles.primaryButtonIcon
            }
          />
        </ButtonCustomizer.Root>

        <View style={styles.receivedCodeContainer}>
          <Text style={styles.receivedCodeText}>Não recebeu o código?</Text>
          <Pressable>
            <Text style={styles.receivedCodeLink}>Enviar novamente</Text>
          </Pressable>
        </View>
      </View>
    </KeyboardAvoidingView>
  )
}
