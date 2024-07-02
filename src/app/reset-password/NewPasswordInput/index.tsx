import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'
import { useState } from 'react'
import { router } from 'expo-router'
import { axiosClient } from '@/src/utils/axios'
import { AxiosError } from 'axios'
import { ErrorResponse } from '@/src/interfaces/types'
import { useForm, Controller, FieldValues, useWatch } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import resetPasswordStore from '@/src/store/ResetPasswordStore'

import PasswordInfoComponent from '@/src/components/PasswordInfoComponent'
import CloseEye from '@/src/assets/images/closeEye.svg'
import OpenEye from '@/src/assets/images/openEye.svg'
import { theme } from '@/src/theme'

import { styles } from './styles'
import BadgeComponent from '@/src/components/BadgeComponent'

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
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) })
  const [showPassword1, setShowPassword1] = useState(false)
  const [showPassword2, setShowPassword2] = useState(false)
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
        router.push('/reset-password/success/')
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

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.subTitle}>Redefina sua senha</Text>
        <Text style={styles.description}>
          Siga as instruções abaixo para criar uma senha segura para a sua
          conta.
        </Text>

        <View style={styles.inputContainer}>
          <View>
            <View style={styles.labelContainer}>
              <Text style={styles.label}>Nova Senha</Text>
              {BadgeComponent(newPassword)}
            </View>

            <Controller
              control={control}
              name="newPassword"
              render={({ field: { onChange, value } }) => (
                <View style={styles.input}>
                  <TextInput
                    style={styles.textInput}
                    placeholderTextColor={theme.colors.secondaryColor}
                    cursorColor={theme.colors.secondaryColor}
                    secureTextEntry={!showPassword1}
                    value={value}
                    onChangeText={onChange}
                  />
                  <Pressable onPress={() => setShowPassword1(!showPassword1)}>
                    {!showPassword1 ? <OpenEye /> : <CloseEye />}
                  </Pressable>
                </View>
              )}
            />
            {errors.newPassword && (
              <Text style={styles.error}>{errors.newPassword.message}</Text>
            )}
          </View>

          <View>
            <Text style={styles.label}>Confirmar nova senha</Text>

            <Controller
              control={control}
              name="confirmPassword"
              render={({ field: { onChange, value } }) => (
                <View style={styles.input}>
                  <TextInput
                    style={styles.textInput}
                    secureTextEntry={!showPassword2}
                    value={value}
                    onChangeText={onChange}
                  />
                  <Pressable onPress={() => setShowPassword2(!showPassword2)}>
                    {!showPassword2 ? <OpenEye /> : <CloseEye />}
                  </Pressable>
                </View>
              )}
            />
            {errors.confirmPassword && (
              <Text style={styles.error}>{errors.confirmPassword.message}</Text>
            )}
          </View>
        </View>
        <PasswordInfoComponent password={newPassword} />
      </ScrollView>

      <TouchableOpacity
        style={[styles.button, { flexShrink: 1, marginBottom: 24 }]}
        onPress={handleSubmit(onSubmit)}
      >
        <Text style={styles.buttonText}>Criar nova senha</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  )
}
