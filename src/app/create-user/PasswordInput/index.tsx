import { useState, useRef, useEffect } from 'react'
import {
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native'
import { useNavigationControls } from '@/src/utils/CreateUserButtonsNavigation'
import useStore from '../../../store/CreateUserstore'
import { useForm, Controller, FieldValues, useWatch } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import useKeyboardStatus from '@/src/utils/keyboardUtils'
import { ButtonCustomizer } from '../../../components/ButtonCustomizer'
import { styles } from '../styles'
import { styles as globalStyles } from '../../styles'
import InputComponent from '@/src/components/InputComponent'
import ArrowRight from '../../../assets/images/arrowRight.svg'
import ArrowRightDisable from '../../../assets/images/arrowRightDisable.svg'
import OpenEye from '../../../assets/images/openEye.svg'
import CloseEye from '../../../assets/images/closeEye.svg'

const schema = yup
  .object({
    password: yup
      .string()
      .required('O campo deve ser preenchido')
      .min(8, 'A senha deve ter pelo menos 8 caracteres'),
    confirmPassword: yup
      .string()
      .required('O campo deve ser preenchido')
      .oneOf([yup.ref('password')], 'As senhas devem ser iguais'),
  })
  .required()

export default function PasswordInput() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  })
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false)
  const { handleNavigationButton } = useNavigationControls()
  const password = useWatch({ control, name: 'password', defaultValue: '' })
  const { addUser } = useStore()
  const [isButtonDisable, setIsButtonDisable] = useState(true)
  const isKeyboardVisible = useKeyboardStatus()
  const scrollViewRef = useRef<ScrollView>(null)

  const handleShowPassword = () => {
    setShowPassword(!showPassword)
  }

  const handleShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword)
  }

  const handleScrollToEnd = () => {
    scrollViewRef.current?.scrollToEnd({ animated: true })
  }

  const onSubmit = (data: FieldValues) => {
    addUser({ password: data.password })
    handleNavigationButton()
  }

  useEffect(() => {
    if (password.trim().length > 0) {
      setIsButtonDisable(false)
    } else {
      setIsButtonDisable(true)
    }
  }, [password])

  useEffect(() => {
    if (isKeyboardVisible) {
      handleScrollToEnd()
    }
  }, [isKeyboardVisible])

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <View style={styles.contentForm}>
        <ScrollView ref={scrollViewRef} showsVerticalScrollIndicator={false}>
          <View>
            <Text style={globalStyles.createUserTitle}>
              Crie uma senha para a sua conta
            </Text>
            <Text style={globalStyles.text}>
              Sua senha deve ter no minimo 8 caracteres, inclua uma letra
              maiúscula, um número e um caractere especial (como @, #, $, &).
            </Text>
            <Controller
              control={control}
              name="password"
              render={({ field: { onChange, value } }) => {
                return (
                  <InputComponent
                    value={value}
                    onChangeText={onChange}
                    label="Senha"
                    secureTextEntry={!showPassword}
                    icon={showPassword ? CloseEye : OpenEye}
                    onIconPress={handleShowPassword}
                  />
                )
              }}
            />
            {errors.password && (
              <Text style={globalStyles.errorText}>
                {errors.password.message}
              </Text>
            )}
            <Controller
              control={control}
              name="confirmPassword"
              render={({ field: { onChange, value } }) => {
                return (
                  <InputComponent
                    value={value}
                    onChangeText={onChange}
                    label="Confirmar senha"
                    secureTextEntry={!showConfirmPassword}
                    icon={showConfirmPassword ? CloseEye : OpenEye}
                    onIconPress={handleShowConfirmPassword}
                  />
                )
              }}
            />
            {errors.password && (
              <Text style={globalStyles.errorText}>
                {errors.password.message}
              </Text>
            )}
          </View>
        </ScrollView>
      </View>
      {!isKeyboardVisible && (
        <View style={styles.buttonsContainer}>
          <ButtonCustomizer.Root
            type={'primary'}
            onPress={handleSubmit(onSubmit)}
            disabled={isButtonDisable}
            customStyles={
              isButtonDisable
                ? globalStyles.primaryButtonDisabled
                : globalStyles.primaryButton
            }
          >
            <ButtonCustomizer.Title
              title="Termos"
              customStyles={
                isButtonDisable
                  ? globalStyles.primaryButtonTextDisabled
                  : globalStyles.primaryButtonText
              }
            />
            <ButtonCustomizer.Icon
              icon={isButtonDisable ? ArrowRightDisable : ArrowRight}
              customStyles={
                isButtonDisable
                  ? globalStyles.primaryButtonIconDisabled
                  : globalStyles.primaryButtonIcon
              }
            />
          </ButtonCustomizer.Root>
        </View>
      )}
    </KeyboardAvoidingView>
  )
}
