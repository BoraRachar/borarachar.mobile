import { useState } from 'react'
import { ScrollView, View, Text, TextInput } from 'react-native'
import { Controller, useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

import useKeyboardStatus from '@/src/utils/keyboardUtils'

import InputComponent from '@/src/components/InputComponent'
import { ButtonCustomizer } from '@/src/components/ButtonCustomizer'

import ArrowRightDisable from '@/src/assets/images/arrowRightDisable.svg'
import ArrowRight from '@/src/assets/images/arrowRight.svg'

import { styles as globalStyles } from '@/src/app/styles'
import { styles } from '../styles'
import { verticalScale } from '@/src/utils/responsiveUtils'

const INPUT_TEXT_MESSAGE_DEFAULT = (name: string) =>
  `Oi, ${name}! \n \nEstou usando o Bora Rachar, um app fácil e divertido para dividir despesas. Baixe e use meu link [link], registre gastos, divida de forma justa e comece a usar nas próximas aventuras!`

const schema = yup.object().shape({
  inputName: yup.string().required('O campo deve ser preenchido'),
  inputEmail: yup
    .string()
    .email('Insira um e-mail válido')
    .required('O campo deve ser preenchido'),
  inputMessage: yup.string(),
})

export default function EmailInvitationPage() {
  const [isButtonDisable, setIsButtonDisable] = useState(true)
  const isKeyboardVisible = useKeyboardStatus()
  const {
    control,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) })
  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }}>
        <View>
          <Text style={styles.title}>
            Que tal convidar alguém para rachar com você?
          </Text>

          <View>
            <View>
              <Controller
                control={control}
                name="inputName"
                render={({ field: { onChange, value } }) => (
                  <InputComponent
                    label="Nome do Amigo"
                    value={value}
                    onChangeText={onChange}
                    errorOrSucess={errors.inputName?.message}
                  />
                )}
              />
              {errors.inputName && (
                <Text style={globalStyles.errorText}>
                  {errors.inputName.message}
                </Text>
              )}
            </View>

            <View>
              <Controller
                control={control}
                name="inputEmail"
                render={({ field: { onChange, value } }) => (
                  <InputComponent
                    label="E-mail do Amigo"
                    value={value}
                    onChangeText={onChange}
                    errorOrSucess={errors.inputEmail?.message}
                  />
                )}
              />
              {errors.inputEmail && (
                <Text style={globalStyles.errorText}>
                  {errors.inputEmail.message}
                </Text>
              )}
            </View>

            <View style={{ marginTop: 24 }}>
              <Text style={styles.text}>Mensagem (Opicional)</Text>

              <View style={styles.inputTextAreaContainer}>
                <Controller
                  control={control}
                  name="inputMessage"
                  render={({ field: { onChange, value } }) => (
                    <TextInput
                      onChangeText={onChange}
                      value={value}
                      multiline
                      maxLength={200}
                      maxFontSizeMultiplier={1.5}
                      placeholder={INPUT_TEXT_MESSAGE_DEFAULT('Junior')}
                      placeholderTextColor={'#9BA5B7'}
                      style={styles.InputTextArea}
                    />
                  )}
                />
              </View>
              <Text style={[styles.text, { marginTop: 8, fontSize: 14 }]}>
                Você pode enviar uma mensagem personalizada ou a nossa mensagem
                padrão
              </Text>
            </View>
          </View>
        </View>

        {!isKeyboardVisible && (
          <View style={{ marginTop: verticalScale(50) }}>
            <ButtonCustomizer.Root
              type={'primary'}
              onPress={() => console.log('teste')}
              disabled={isButtonDisable}
              customStyles={
                isButtonDisable
                  ? globalStyles.primaryButtonDisabled
                  : globalStyles.primaryButton
              }
            >
              <ButtonCustomizer.Title
                title="Enviar"
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
      </ScrollView>
    </View>
  )
}
