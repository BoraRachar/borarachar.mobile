import {
  KeyboardAvoidingView,
  Platform,
  Text,
  View,
  ScrollView,
} from 'react-native'
import { useState } from 'react'
import { router } from 'expo-router'
import { axiosClient } from '@/src/utils/axios'
import { AxiosError } from 'axios'
import { useForm, Controller, FieldValues, useWatch } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

import { ButtonCustomizer } from '@/src/components/ButtonCustomizer'
import { ErrorResponse } from '@/src/interfaces/types'
import InputComponent from '@/src/components/InputComponent'
import resetPasswordStore from '@/src/store/ResetPasswordStore'

import CloseEye from '@/src/assets/images/closeEye.svg'
import OpenEye from '@/src/assets/images/openEye.svg'
import ArrowRight from '@/src/assets/images/arrowRight.svg'

import { styles as globalStyles } from '@/src/app/styles'
import { styles } from './styles'

const schema = yup.object().shape({
  newPassword: yup
    .string()
    .required('O campo "nova senha" não pode ser vázio')
    .matches(/[A-Z]/, 'Deve conter pelo menos uma letra maiúscula')
    .matches(/[a-z]/, 'Deve conter pelo menos uma letra minúscula')
    .matches(/[0-9]/, 'Deve conter pelo menos um número')
    .matches(
      /[!@#$%^&*()_]/,
      'Deve conter pelo menos um dos caracteres: !, @, #, $, %, &, -, ...',
    )
    .min(8, 'A senha deve conter no mínimo 8 caracteres'),
  confirmPassword: yup
    .string()
    .required('O campo "Confirmar nova senha" não pode ser vázio')
    .oneOf([yup.ref('newPassword')], 'A senhas não conferem'),
})

export default function NewPasswordInput() {
  const [showPassword1, setShowPassword1] = useState(false)
  const [showPassword2, setShowPassword2] = useState(false)
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) })
  const { setResetPassword, resetPassword } = resetPasswordStore()

  const newPassword = useWatch({
    control,
    name: 'newPassword',
    defaultValue: '',
  })

  const handleSaveToSate = (data: FieldValues) => {
    setResetPassword({
      novaSenha: data.newPassword,
      confirmacaoSenha: data.confirmPassword,
    })
  }

  const handleSubmitToApi = async () => {
    if (resetPassword.novaSenha && resetPassword.confirmacaoSenha) {
      try {
        await axiosClient.post('/user/reset-password', resetPassword)
        router.push('/reset-password/Success/')
      } catch (err) {
        const error = err as AxiosError
        const responseData = error.response?.data as ErrorResponse
        const userMessage = responseData.errors[0]?.userMessage
        console.log(userMessage)
      }
    }
  }

  const onSubmit = (data: FieldValues) => {
    handleSaveToSate(data)
    handleSubmitToApi()
  }

  const eyesIconTopassword1 = showPassword1 ? CloseEye : OpenEye
  const eyesIconToPassword2 = showPassword2 ? CloseEye : OpenEye

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ paddingVertical: 24, flex: 1 }}>
          <Text style={styles.subTitle}>Definir nova senha</Text>
          <Text style={styles.description}>
            Sua senha deve ter 8 caracteres, inclua uma letra maiúscula, um
            número e um caractere especial (como @, #, $, &).
          </Text>

          <View style={{ gap: 16, marginTop: 24 }}>
            <View>
              <Controller
                control={control}
                name="newPassword"
                render={({ field: { onChange, value } }) => (
                  <InputComponent
                    label="Nova senha"
                    value={value}
                    onChangeText={onChange}
                    secureTextEntry={!showPassword1}
                    icon={eyesIconTopassword1}
                    onIconPress={() => setShowPassword1(!showPassword1)}
                  />
                )}
              />
              {errors.newPassword && (
                <Text style={styles.error}>{errors.newPassword.message}</Text>
              )}
            </View>

            <View>
              <Controller
                control={control}
                name="confirmPassword"
                render={({ field: { onChange, value } }) => (
                  <InputComponent
                    label="Confirmar nova senha"
                    value={value}
                    onChangeText={onChange}
                    secureTextEntry={!showPassword2}
                    icon={eyesIconToPassword2}
                    onIconPress={() => setShowPassword2(!showPassword2)}
                  />
                )}
              />
              {errors.newPassword && (
                <Text style={styles.error}>{errors.newPassword.message}</Text>
              )}
            </View>
          </View>
        </View>
      </ScrollView>

      <View style={{ paddingVertical: 24 }}>
        <ButtonCustomizer.Root
          type="primary"
          customStyles={globalStyles.primaryButton}
          onPress={handleSubmit(onSubmit)}
        >
          <ButtonCustomizer.Title
            title="Criar nova senha"
            customStyles={globalStyles.primaryButtonText}
          />
          <ButtonCustomizer.Icon
            icon={ArrowRight}
            customStyles={globalStyles.primaryButtonIcon}
          />
        </ButtonCustomizer.Root>
      </View>
    </KeyboardAvoidingView>
  )
}
