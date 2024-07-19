import { Pressable, Text, View } from 'react-native'
import { useRouter } from 'expo-router'

import CloseFramer from '@/src/assets/images/closeFrame.svg'
import ResetPasswordSucess from '@/src/assets/images/reset-password-sucess.svg'

import { styles } from './styles'

export default function Sucess() {
  const router = useRouter()

  return (
    <View style={{ flex: 1, paddingHorizontal: 24 }}>
      <View style={{ paddingVertical: 25, alignSelf: 'flex-end' }}>
        <Pressable onPress={() => router.replace('/')}>
          {<CloseFramer />}
        </Pressable>
      </View>

      <View style={{ paddingTop: 60, alignItems: 'center' }}>
        <View style={{ marginTop: 24 }}>
          <ResetPasswordSucess />
        </View>

        <View style={{ marginTop: 42 }}>
          <Text style={styles.subtitle}>Senha redefinida com sucesso!</Text>
          <Text style={styles.description}>
            Enviaremos uma notificação por e-mail confirmando a criação de uma
            nova senha.
          </Text>
        </View>
      </View>
    </View>
  )
}
