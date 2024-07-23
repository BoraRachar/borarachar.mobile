import { ButtonCustomizer } from '@/src/components/ButtonCustomizer'
import { Text, View } from 'react-native'

import ArrowRight from '@/src/assets/images/arrowRight.svg'

import { styles as globalStyles } from '@/src/app/styles'
import { styles } from '../styles'
import { router } from 'expo-router'

export default function TermosLegais() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'space-between',
        paddingHorizontal: 24,
        paddingVertical: 10,
      }}
    >
      <View>
        <Text style={styles.title}>Termos e política de privacidade</Text>
        <Text style={[styles.text, { marginTop: 24 }]}>
          Para utilizar nosso aplicativo é necessário ler e concordar com os
          nossos Termos de Serviço e Política de Privacidade disponíveis a
          seguir.
        </Text>
      </View>

      <View>
        <ButtonCustomizer.Root
          type={'primary'}
          customStyles={globalStyles.primaryButton}
          onPress={() => router.push('/termos/termos-servicos/')}
        >
          <ButtonCustomizer.Title
            title="Termos de Serviço"
            customStyles={globalStyles.primaryButtonText}
          />
          <ButtonCustomizer.Icon
            icon={ArrowRight}
            customStyles={globalStyles.primaryButtonIcon}
          />
        </ButtonCustomizer.Root>
      </View>
    </View>
  )
}
