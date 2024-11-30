import { useState } from 'react'
import { Text, View, TextInput, Pressable, ScrollView } from 'react-native'
import { router } from 'expo-router'
import { Controller, FieldValues, useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

import { useAuthStore } from '@/src/store/useAuthStore'
import { axiosPrivateClient } from '@/src/utils/axios'
import useKeyboardStatus from '@/src/utils/keyboardUtils'

import { ButtonCustomizer } from '@/src/components/ButtonCustomizer'

import SearchIcon from '@/src/assets/images/search.svg'
import EmailIcon from '@/src/assets/images/email.svg'

import { styles as globalStyles } from '@/src/app/styles'
import { styles } from '../styles'
import { verticalScale } from '@/src/utils/responsiveUtils'

const yupSchema = yup.object().shape({
  inputSearch: yup.string().required('O campo deve ser preenchido'),
})

export default function AddNewFriendsPage() {
  const [userNotFound, setUserNotFound] = useState(false)
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(yupSchema),
  })
  const { userCod } = useAuthStore()
  const isKeyboardVisible = useKeyboardStatus()

  const searchUserInApi = async (data: FieldValues) => {
    const response = await axiosPrivateClient.get('user/list-usuarios', {
      params: { email: data.inputSearch, userCod },
    })
    return response
  }

  const onSubmit = async (data: FieldValues) => {
    try {
      const users = await searchUserInApi(data)

      if (users.data.statusCode === 200) {
        const userList = JSON.stringify(users.data.data)
        router.push({
          pathname: '/friends/addNewFriendsPage/searchResults',
          params: { userList },
        })
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: 'flex-start',
        }}
        keyboardShouldPersistTaps="handled"
      >
        <View style={{ flex: 1, justifyContent: 'flex-start' }}>
          <Text style={styles.title}>Encontre amigos que já usam o app!</Text>

          <View style={{ marginTop: verticalScale(16) }}>
            <Text style={[styles.text, styles.textSemiBold]}>
              E-mail ou nome de usuário
            </Text>

            <View style={styles.inputContainer}>
              <SearchIcon width={20} height={20} />
              <Controller
                control={control}
                name="inputSearch"
                rules={{ required: true }}
                render={({ field: { value, onChange, onBlur } }) => (
                  <TextInput
                    value={value}
                    style={styles.input}
                    cursorColor="#000"
                    onChangeText={onChange}
                    onBlur={onBlur}
                  />
                )}
              />
            </View>
            {errors.inputSearch && (
              <Text style={styles.error}>{errors.inputSearch.message}</Text>
            )}
          </View>
          {userNotFound && <InvitePrompt />}
        </View>
      </ScrollView>

      {!isKeyboardVisible && (
        <View>
          <ButtonCustomizer.Root
            type="primary"
            onPress={handleSubmit(onSubmit)}
            customStyles={globalStyles.primaryButton}
          >
            <ButtonCustomizer.Title
              title="Buscar"
              customStyles={globalStyles.primaryButtonText}
            />
          </ButtonCustomizer.Root>
        </View>
      )}
    </View>
  )
}

const InvitePrompt = () => {
  return (
    <View style={{ marginTop: verticalScale(48) }}>
      <Text style={styles.subTitle}>
        Ops! Parece que essa pessoa ainda não está no Bora Rachar!
      </Text>
      <View style={{ marginTop: verticalScale(12) }}>
        <Pressable
          style={styles.inviteButton}
          onPress={() => router.push('/home')}
        >
          <View style={styles.iconContainer}>
            <EmailIcon width={24} height={24} />
          </View>
          <Text style={styles.text}>Enviar convite por e-mail</Text>
        </Pressable>
      </View>
    </View>
  )
}
