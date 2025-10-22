import { ScrollView, Text, View } from 'react-native'

import AvatarImageComponent from '@/src/components/AvatarImageComponent'
import { styles } from './styles'

import MoneyIcon from '@/src/assets/images/MoneyWavy.svg'

export default function UserActivity() {
  return (
    <View style={styles.container}>
      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <AvatarImageComponent />

          <View style={{ gap: 4 }}>
            <Text style={[styles.text, styles.title]}>
              Pagamentos da Cerveja
            </Text>
            <Text style={[styles.text]}>fut do Bora</Text>
          </View>
        </View>

        <View style={styles.textValueContainer}>
          <MoneyIcon width={24} height={24} />
          <Text style={[styles.text, { fontWeight: 'bold', fontSize: 20 }]}>
            R$ 200,00
          </Text>
        </View>

        <Text style={[styles.text, styles.description, { marginTop: 8 }]}>
          Cervejada na casa do Paulinho comemoração do niver da Aninha
        </Text>

        <Text style={[styles.text, styles.description, { marginTop: 12 }]}>
          Pagar para:
        </Text>
        <Text style={[styles.text, styles.description, { fontWeight: 'bold' }]}>
          Maria, Alice
        </Text>
      </ScrollView>
    </View>
  )
}
