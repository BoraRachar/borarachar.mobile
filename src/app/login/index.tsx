import { KeyboardAvoidingView, Platform, Text, View } from 'react-native'
import { Link, router } from 'expo-router'
import { Controller, useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

import Header from '@/src/components/HeaderComponent'
import InputComponent from '@/src/components/InputComponent'

import ArrowBack from '@/src/assets/images/arrowBack.svg'
import opeEye from '@/src/assets/images/openEye.svg'
import closeEye from '@/src/assets/images/closeEye.svg'

import { styles as globalStyles } from '@/src/app/styles'
import { styles } from './styles'

const schema = yup.object().shape({
  email: yup
    .string()
    .email('Insira um e-mail válido')
    .required('O campo deve ser preenchido'),
  password: yup.string().required('O campo deve ser preenchido'),
})

export default function Login() {
  const {
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  })
  return (
    <View>
      <Header
        title="Login"
        leftIcon={{
          icon: <ArrowBack />,
          onPress: () => {
            router.push('/')
          },
        }}
      />

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <View>
          <Text style={styles.title}>Que bom que você voltou!</Text>
          <Text style={styles.subtitle}>
            Faça login e comece a dividir suas contas.
          </Text>
        </View>

        <View>
          <Controller
            control={control}
            name="email"
            render={({ field: { onChange, value } }) => (
              <InputComponent
                label="E-mail ou usuário"
                value={value}
                onChangeText={onChange}
                placeholder="joão@mail.com"
              />
            )}
          />
          {errors.email && <Text>{errors.email.message}</Text>}
        </View>

        <View>
          <Controller
            control={control}
            name="password"
            render={({ field: { onChange, value } }) => (
              <InputComponent
                label="Senha"
                value={value}
                onChangeText={onChange}
                secureTextEntry={true}
                icon={opeEye}
                onIconPress={() => {
                  console.log('clicou')
                }}
              />
            )}
          />
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            {/* {errors.password && <Text>{errors.password.message}</Text>} */}
            <Text style={globalStyles.errorText}>Senha incorreta</Text>
            <Link href={'/forgot-password'} style={styles.forgotPassword}>
              Esqueceu a senha?
            </Link>
          </View>
        </View>
      </KeyboardAvoidingView>
    </View>
  )
}
