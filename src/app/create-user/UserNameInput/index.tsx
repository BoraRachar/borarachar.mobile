import { View, Text, KeyboardAvoidingView, Platform } from 'react-native'
import { useNavigationControls } from '@/src/utils/CreateUserButtonsNavigation'
import useStore from '../../../store/CreateUserstore'
import useKeyboardStatus from '@/src/utils/keyboardUtils'
import { ButtonCustomizer } from '../../../components/ButtonCustomizer'
import { useForm, Controller, FieldValues, useWatch } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useState, useEffect } from 'react'
import * as yup from 'yup'
import { styles } from '../styles'
import { styles as globalStyles } from '../../styles'
import InputComponent from '@/src/components/InputComponent'
import ArrowRight from '../../../assets/images/arrowRight.svg'
import ArrowRightDisable from '../../../assets/images/arrowRightDisable.svg'

const schema = yup
  .object({
    usuario: yup.string().required('O campo deve ser preenchido'),
  })
  .required()

export default function UserName() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  })

  const { handleNavigationButton } = useNavigationControls()
  const { addUser } = useStore()
  const [isButtonDisable, setIsButtonDisable] = useState(true)
  const isKeyboardVisible = useKeyboardStatus()

  const usuario = useWatch({ control, name: 'usuario', defaultValue: '' })

  const onSubmit = (data: FieldValues) => {
    addUser({ usuario: data.usuario })
    handleNavigationButton()
  }

  useEffect(() => {
    if (usuario.trim().length > 0) {
      setIsButtonDisable(false)
    } else {
      setIsButtonDisable(true)
    }
  }, [usuario])

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <View style={styles.contentForm}>
        <View>
          <Text style={globalStyles.createUserTitle}>
            Agora escolha um {'\n'}nome de usuário
          </Text>
          <Controller
            control={control}
            name="usuario"
            defaultValue=""
            render={({ field: { onChange, value } }) => {
              return (
                <InputComponent
                  placeholder="BoraRachar123"
                  value={value}
                  onChangeText={onChange}
                />
              )
            }}
          />
          {errors.usuario && (
            <Text style={globalStyles.errorText}>{errors.usuario.message}</Text>
          )}
        </View>
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
              title="Senha"
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
