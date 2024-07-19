import { FlatList, Pressable, Text, View } from 'react-native'

import { ButtonCustomizer } from '@/src/components/ButtonCustomizer'
import { politicaPrivacidade } from './politicaPrivacidade'

import UnCheckSquare from '@/src/assets/images/unCheckSquare.svg'
import CheckSquare from '@/src/assets/images/checkSquare.svg'
import ArrowRight from '@/src/assets/images/arrowRight.svg'

import { theme } from '@/src/theme'
import { styles as globalStyles } from '@/src/app/styles'
import { styles } from '../styles'
import { router } from 'expo-router'
import { useState } from 'react'

export default function PoliticasPrivacidade() {
  const [isChecked, setIsChecked] = useState(true)

  return (
    <View style={{ flex: 1, paddingHorizontal: 24, paddingVertical: 10 }}>
      <View style={{ gap: 24 }}>
        <Text style={styles.title}>Políticas de Privacidade</Text>
        <Text style={styles.text}>
          Sua privacidade é importante para nós. Esta Política de Privacidade
          descreve como coletamos, usamos e divulgamos suas informações
          pessoais.
        </Text>
      </View>

      <FlatList
        style={{ marginTop: 24 }}
        data={politicaPrivacidade}
        renderItem={({ item }) => (
          <View style={{ flexDirection: 'row', gap: 5 }}>
            <Text style={[styles.text, { fontFamily: theme.fontFamily.bold }]}>
              {`${item.id}.`}
            </Text>
            <Text style={styles.text}>
              <Text
                style={{ fontFamily: theme.fontFamily.bold }}
              >{`${item.subtitle} `}</Text>
              {item.text}
            </Text>
          </View>
        )}
      />
      <View
        style={{
          width: '100%',
          height: 2,
          borderRadius: 1,
          backgroundColor: theme.colors.Gray[200],
          marginVertical: 32,
        }}
      ></View>

      <Pressable
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          gap: 5,
          marginBottom: 24,
        }}
        onPress={() => setIsChecked(!isChecked)}
      >
        {isChecked ? <UnCheckSquare /> : <CheckSquare />}
        <Text style={styles.checkText}>
          Eu li e concordo com as Políticas de Privacidade
        </Text>
      </Pressable>

      <ButtonCustomizer.Root
        type="primary"
        onPress={() => router.push('/termos/sucess/')}
        disabled={isChecked}
        customStyles={
          isChecked
            ? globalStyles.primaryButtonDisabled
            : globalStyles.primaryButton
        }
      >
        <ButtonCustomizer.Title
          title="Criar conta"
          customStyles={
            isChecked
              ? globalStyles.primaryButtonTextDisabled
              : globalStyles.primaryButtonText
          }
        />
        <ButtonCustomizer.Icon icon={ArrowRight} />
      </ButtonCustomizer.Root>
    </View>
  )
}
