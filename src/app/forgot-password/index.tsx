import { useEffect, useState } from 'react'
import { KeyboardAvoidingView, Platform, Text, View } from 'react-native'
import { Link, router } from 'expo-router'
import { Controller, useForm, useWatch } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

import Header from '@/src/components/HeaderComponent'
import InputComponent from '@/src/components/InputComponent'
import { ButtonCustomizer } from '@/src/components/ButtonCustomizer'

import useKeyboardStatus from '@/src/utils/keyboardUtils'
import emailValidation from '@/src/utils/emailValidation'
import ArrowBack from '@/src/assets/images/arrowBack.svg'

import { styles as globalStyles } from '@/src/app/styles'
import { styles } from './styles'

const schema = yup.object().shape({
  email: yup
    .string()
    .email('Insira um e-mail válido')
    .required('O campo deve ser preenchido'),
})

export default function ForgotPassword() {
  const [isValidEmail, setIsValidEmail] = useState(false)
  const {
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  })
  const iskeyboardVisible = useKeyboardStatus()

  const email = useWatch({ control, name: 'email', defaultValue: '' })

  useEffect(() => {
    if (emailValidation(email)) {
      setIsValidEmail(true)
    } else {
      setIsValidEmail(false)
    }
  }, [email])

  return (
    <View style={{ flex: 1 }}>
      <Header
        title="Esqueceu sua senha?"
        leftIcon={{ icon: <ArrowBack />, onPress: () => router.push('/') }}
      />

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <View style={globalStyles.formContainer}>
          <Text style={styles.title}>Esqueceu sua senha?</Text>
          <Text style={styles.text}>
            Não se preocupe! Digite seu e-mail e enviaremos um código de
            recuperação para você criar uma nova senha.
          </Text>

          <View style={{ marginTop: 34 }}>
            <Controller
              control={control}
              name="email"
              render={({ field: { onChange, value } }) => (
                <InputComponent
                  label="E-mail"
                  placeholder="joão@email.com"
                  value={value}
                  onChangeText={onChange}
                  isValid={isValidEmail}
                />
              )}
            />
            {errors.email && (
              <Text style={globalStyles.errorText}>{errors.email.message}</Text>
            )}
          </View>
        </View>

        {!iskeyboardVisible && (
          <View style={{ marginHorizontal: 24 }}>
            <ButtonCustomizer.Root
              type="primary"
              onPress={() => router.push('/reset-password')}
              disabled={!isValidEmail}
              customStyles={
                isValidEmail
                  ? globalStyles.primaryButton
                  : globalStyles.primaryButtonDisabled
              }
            >
              <ButtonCustomizer.Title
                title="Enviar código de recuperação"
                customStyles={
                  isValidEmail
                    ? globalStyles.primaryButtonText
                    : globalStyles.primaryButtonTextDisabled
                }
              />
            </ButtonCustomizer.Root>
            <Link href={'/login'} style={styles.link}>
              Lembrou sua senha?
            </Link>
          </View>
        )}
      </KeyboardAvoidingView>
    </View>
  )
}
