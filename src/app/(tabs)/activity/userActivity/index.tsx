import React from 'react'
import { ScrollView, Text, View } from 'react-native'

import AvatarImageComponent from '@/src/components/AvatarImageComponent'
import { ButtonCustomizer } from '@/src/components/ButtonCustomizer'
import { styles } from './styles'

import { styles as globalStyles } from '@/src/app/styles'
import { verticalScale } from '@/src/utils/responsiveUtils'

const DATA = [
  {
    name: 'Gesane',
    percent: '20%',
    valor: 'R$ 100,00',
    info: 'adicional',
  },
  {
    name: 'Junior',
    percent: '30%',
    valor: 'R$ 250,00',
    info: 'adicional',
  },
  {
    name: 'Cibely',
    percent: '50%',
    valor: 'R$ 500,00',
    info: 'adicional',
  },
  {
    name: 'Alyson',
    percent: '80%',
    valor: 'R$ 500,00',
    info: 'adicional',
  },
  {
    name: 'Gesane',
    percent: '20%',
    valor: 'R$ 100,00',
    info: 'adicional',
  },
  {
    name: 'Junior',
    percent: '30%',
    valor: 'R$ 250,00',
    info: 'adicional',
  },
  {
    name: 'Cibely',
    percent: '50%',
    valor: 'R$ 500,00',
    info: 'adicional',
  },
  {
    name: 'Alyson',
    percent: '80%',
    valor: 'R$ 500,00',
    info: 'adicional',
  },
]

export default function UserActivity() {
  return (
    <View style={styles.container}>
      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
        {/* Header com avatar e nome */}
        <View style={styles.header}>
          <AvatarImageComponent
            image="https://github.com/junioralvesbr.png"
            size={76}
          />
          <View>
            <Text style={[styles.text, styles.title]}>Nome da despesa</Text>
            <Text style={[styles.text, styles.description]}>Nome do grupo</Text>
            <Text style={[styles.text, styles.description, { marginTop: 12 }]}>
              Breve descrição da despesa truncada...
            </Text>
          </View>
        </View>

        {/* Adicionado Por.. */}
        <Text style={[styles.text, styles.description]}>
          Adicionado por{' '}
          <Text style={{ fontWeight: 'bold' }}>Cibely - 02/12/2024</Text>
        </Text>

        {/* Resumo */}
        <View style={{ gap: 16, marginTop: verticalScale(16) }}>
          <View
            style={{ flexDirection: 'row', justifyContent: 'space-between' }}
          >
            <Text style={[styles.text, { fontSize: 20, fontWeight: 'bold' }]}>
              Valor Total
            </Text>
            <Text style={[styles.text, { fontSize: 20, fontWeight: 'bold' }]}>
              R$ 526,48
            </Text>
          </View>

          <View
            style={{ flexDirection: 'row', justifyContent: 'space-between' }}
          >
            <Text style={styles.text}>Valor pago</Text>
            <Text style={[styles.text, { color: 'green', fontWeight: 'bold' }]}>
              R$ 526,48
            </Text>
          </View>

          <View
            style={{ flexDirection: 'row', justifyContent: 'space-between' }}
          >
            <Text style={[styles.text]}>Valor em aberto</Text>
            <Text style={[styles.text, { color: 'red', fontWeight: 'bold' }]}>
              -R$ 526,48
            </Text>
          </View>
        </View>

        {/* Participantes */}
        <View style={{ marginTop: verticalScale(24), gap: 14 }}>
          <Text style={[styles.text, styles.title]}>Participantes</Text>
          {DATA.map((item, index) => (
            <View
              key={index}
              style={{ flexDirection: 'row', gap: 8, alignItems: 'center' }}
            >
              <AvatarImageComponent
                image="https://github.com/junioralvesbr.png"
                size={48}
              />

              <View style={{ flex: 1 }}>
                <Text style={[styles.text, { fontWeight: 'bold' }]}>
                  {item.name}
                </Text>
                <Text style={styles.text}>{item.percent}</Text>
              </View>

              <View style={{ alignItems: 'flex-end' }}>
                <Text style={{ color: 'green', fontWeight: 'bold' }}>
                  {item.valor}
                </Text>
                <Text style={styles.text}>{item.info}</Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
      {/* Botão */}
      <View
        style={{
          position: 'absolute',
          bottom: 0,
          width: '100%',
          marginHorizontal: 20,
        }}
      >
        <ButtonCustomizer.Root
          type="primary"
          customStyles={globalStyles.primaryButton}
          onPress={() => console.log('teste')}
        >
          <ButtonCustomizer.Title
            title="Cobrar"
            customStyles={globalStyles.primaryButtonText}
          />
        </ButtonCustomizer.Root>
      </View>
    </View>
  )
}
