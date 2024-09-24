import Ionicons from '@expo/vector-icons/Ionicons'
import { Text, View } from 'react-native'

import { ButtonCustomizer } from '@/src/components/ButtonCustomizer'

import { theme } from '@/src/theme'
import { styles as globalStyles } from '@/src/app/styles'
import { styles } from './styles'

export default function Home() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
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

      <View style={{ gap: 12, paddingVertical: 10 }}>
        <View style={{ height: 24, backgroundColor: 'gray' }}></View>
        <View style={{ height: 130, backgroundColor: 'gray' }}></View>
        <View style={{ height: 8, backgroundColor: 'gray' }}></View>
      </View>

      <View style={styles.buttonsContainer}>
        <ButtonCustomizer.Root
          type="tertiaryHalfWidth"
          onPress={() => console.log('Meu QR')}
        >
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
          <ButtonCustomizer.Title
            title="Calculadora"
            customStyles={globalStyles.primaryButtonText}
          />
          {/* <ButtonCustomizer.Icon
            icon={isButtonDisable ? ArrowRightDisable : ArrowRight}
            customStyles={
              isButtonDisable
                ? globalStyles.primaryButtonIconDisabled
                : globalStyles.primaryButtonIcon
            }
          /> */}
        </ButtonCustomizer.Root>
      </View>
    </View>
  )
}
