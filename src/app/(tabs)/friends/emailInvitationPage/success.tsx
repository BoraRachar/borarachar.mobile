import { Text, View } from 'react-native'

import CelebrationFriendsIcon from '@/src/assets/images/celebration-amico.svg'
import { ButtonCustomizer } from '@/src/components/ButtonCustomizer'
import { router, useLocalSearchParams } from 'expo-router'

import { styles as globalStyles } from '@/src/app/styles'
import { styles } from '../styles'
import { horizontalScale, verticalScale } from '@/src/utils/responsiveUtils'

export default function Success() {
  const { name } = useLocalSearchParams()
  console.log(name)

  return (
    <View
      style={[
        styles.container,
        { alignItems: 'center', justifyContent: 'space-around' },
      ]}
    >
      <View style={{ gap: verticalScale(12) }}>
        <CelebrationFriendsIcon />

        <Text style={[styles.title, { textAlign: 'center' }]}>
          Convite enviado com sucesso!
        </Text>

        <Text style={[styles.text, { textAlign: 'center' }]}>
          Enviaremos uma notificação por e-mail para {name} com o convite para
          viver a experiência Bora Rachar com você.
        </Text>
      </View>

      <View
        style={{
          flexDirection: 'row',
          gap: horizontalScale(12),
        }}
      >
        <ButtonCustomizer.Root
          type="tertiaryHalfWidth"
          customStyles={globalStyles.tertiaryButtonHalfWidth}
          onPress={() => router.push('/friends/')}
        >
          <ButtonCustomizer.Title
            title="Voltar ao inicio"
            customStyles={globalStyles.secondaryButtonText}
          />
        </ButtonCustomizer.Root>

        <ButtonCustomizer.Root
          type="primaryHalfWidth"
          customStyles={globalStyles.primaryButtonHalfWidth}
          onPress={() => router.push('/friends/addNewFriendsPage')}
        >
          <ButtonCustomizer.Title
            title="Adicionar Amigo"
            customStyles={globalStyles.primaryButtonText}
          />
        </ButtonCustomizer.Root>
      </View>
    </View>
  )
}
