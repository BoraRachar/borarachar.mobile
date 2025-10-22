import { Image, ScrollView, Text, View } from 'react-native'

import Photograph from '@/src/assets/images/photograph.svg'
import { styles } from './styles'

import MoneyIcon from '@/src/assets/images/MoneyWavy.svg'
import { useState } from 'react'

export default function UserActivity() {
  const [groupImage] = useState<string>('')

  return (
    <View style={styles.container}>
      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View style={styles.imageContainer}>
            {groupImage ? (
              <Image
                source={{ uri: `data:image/jpeg;base64,${groupImage}` }}
                style={{ width: '100%', height: '100%' }}
                alt="imagem do grupo"
              />
            ) : (
              <Photograph width={22} height={22} />
            )}
          </View>

          <View style={{ gap: 4 }}>
            <Text style={[styles.text, styles.title]}>
              Pagamentos da Cerveja
            </Text>
            <Text style={[styles.text]}>fut do Bora</Text>
          </View>
        </View>

        <View style={{ marginTop: 12 }}>
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

          <Text
            style={[styles.text, styles.description, { fontWeight: 'bold' }]}
          >
            Maria, Alice
          </Text>
        </View>

        <View style={{ gap: 4, marginTop: 24 }}>
          <View style={[styles.badge, { backgroundColor: 'darkgreen' }]}>
            <Text style={{ color: 'white' }}>Pago</Text>
          </View>
          <Text style={styles.text}>Valor pago por mim</Text>
          <Text style={[styles.title, { color: 'darkgreen' }]}>R$ 296,30</Text>
        </View>
      </ScrollView>
    </View>
  )
}
