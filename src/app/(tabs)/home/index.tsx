import Ionicons from '@expo/vector-icons/Ionicons'
import { Text, View, Dimensions } from 'react-native'

import { ButtonCustomizer } from '@/src/components/ButtonCustomizer'

import qrcodeImage from '@/src/assets/images/qrcode.svg'
import calculatorImage from '@/src/assets/images/calculator.svg'

import { theme } from '@/src/theme'
import { styles as globalStyles } from '@/src/app/styles'
import { styles } from './styles'

export default function Home() {
  const { height } = Dimensions.get('window')
  const dinamicVerticalPadding = height * 0.03

  return (
    <View style={styles.container}>
      <View
        style={[styles.header, { paddingVertical: dinamicVerticalPadding }]}
      >
        <Text style={styles.title}>Ola, Bora.</Text>

        <View style={styles.headerIcon}>
          <Ionicons
            name="notifications-outline"
            size={24}
            color={theme.colors.primaryColor}
          />
          <Ionicons
            name="help-circle-outline"
            size={24}
            color={theme.colors.primaryColor}
          />
        </View>
      </View>

      {/* Silder */}
      <View style={{ gap: 12, paddingVertical: 10 }}>
        <View style={{ height: 24, backgroundColor: 'gray' }}></View>
        <View style={{ height: 130, backgroundColor: 'gray' }}></View>
        <View style={{ height: 8, backgroundColor: 'gray' }}></View>
      </View>
      {/* Slider */}

      <View style={styles.buttonsContainer}>
        <ButtonCustomizer.Root
          type="tertiaryHalfWidth"
          onPress={() => console.log('Meu QR')}
          customStyles={{ backgroundColor: theme.colors.third, borderWidth: 0 }}
        >
          <ButtonCustomizer.Icon
            icon={qrcodeImage}
            customStyles={{ marginRight: 8 }}
          />
          <ButtonCustomizer.Title
            title="Meu QR"
            customStyles={globalStyles.tertiaryButtonText}
          />
        </ButtonCustomizer.Root>

        <ButtonCustomizer.Root
          type="primaryHalfWidth"
          onPress={() => console.log('Calculadora')}
          customStyles={globalStyles.primaryButtonHalfWidth}
        >
          <ButtonCustomizer.Icon
            icon={calculatorImage}
            customStyles={(globalStyles.primaryButtonIcon, { marginRight: 8 })}
          />
          <ButtonCustomizer.Title
            title="Calculadora"
            customStyles={globalStyles.primaryButtonText}
          />
        </ButtonCustomizer.Root>
      </View>

      {/* List */}
      {/* List */}
    </View>
  )
}
