import React, { useState, useEffect } from 'react'
import {
  View,
  Text,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from 'react-native'
import { useNavigationControls } from '@/src/utils/CreateUserButtonsNavigation'
import useStore from '../../../store/CreateUserstore'
import usekeyboardStatus from '../../../utils/keyboardUtils'
import { ButtonCustomizer } from '../../../components/ButtonCustomizer'
import { useForm, Controller, FieldValues, useWatch } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { router } from 'expo-router'
import { styles } from '../styles'
import { styles as globalStyles } from '../../styles'
import { theme } from '@/src/theme'
import ArrowRight from '../../../assets/images/arrowRight.svg'
import ArrowRightDisable from '../../../assets/images/arrowRightDisable.svg'
import WarningCircle from '../../../assets/images/WarningCircle.svg'
import InputComponent from '@/src/components/InputComponent'

const schema = yup
  .object({
    nome: yup.string().required('O campo deve ser preenchido'),
  })
  .required()

export default function NameInput() {
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
  const isKeyboardVisible = usekeyboardStatus()

  const nome = useWatch({ control, name: 'nome', defaultValue: '' })

  const onSubmit = (data: FieldValues) => {
    addUser({ nome: data.nome })
    handleNavigationButton()
  }

  useEffect(() => {
    if (nome.trim().length > 0) {
      setIsButtonDisable(false)
    } else {
      setIsButtonDisable(true)
    }
  }, [nome])

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <View style={styles.contentForm}>
        <View>
          <Text style={globalStyles.createUserTitle}>
            Como você gostaria de ser chamado?
          </Text>
          <Controller
            control={control}
            name="nome"
            render={({ field: { onChange, value } }) => (
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <TextInput
                  style={
                    errors.nome ? globalStyles.inputError : globalStyles.input
                  }
                  placeholder="Bora Rachar"
                  placeholderTextColor={theme.colors.Gray[300]}
                  value={value}
                  onChangeText={onChange}
                />
                {errors.nome && <WarningCircle style={globalStyles.iconForm} />}
              </View>
            )}
          />
          {errors.nome && (
            <Text style={globalStyles.errorText}>{errors.nome.message}</Text>
          )}
          <InputComponent label="Confirmar senha" placeholder="Bora Rachar" />
        </View>
      </View>
      {!isKeyboardVisible && (
        <View style={styles.buttonsContainer}>
          <ButtonCustomizer.Root
            type="tertiaryHalfWidth"
            onPress={() => router.push('/')}
          >
            <ButtonCustomizer.Title
              title="Cancelar"
              customStyles={globalStyles.tertiaryButtonText}
            />
          </ButtonCustomizer.Root>
          <ButtonCustomizer.Root
            type="primaryHalfWidth"
            onPress={handleSubmit(onSubmit)}
            disabled={isButtonDisable}
            customStyles={
              isButtonDisable
                ? globalStyles.primaryButtonHalfWidthDisabled
                : globalStyles.primaryButtonHalfWidth
            }
          >
            <ButtonCustomizer.Title
              title="E-mail"
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
