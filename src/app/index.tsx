import React, { useEffect, useState } from 'react'
import { router } from 'expo-router'
import { useAsyncStorage } from '@react-native-async-storage/async-storage'
import { View, Text, Dimensions } from 'react-native'
import { ButtonCustomizer } from '../components/ButtonCustomizer'
import { styles } from './styles'
import OnboardingScreenOne from './onboarding-screens/onboardingOne'
import Logo from '../assets/images/logo.svg'
import NameSuggestionComponents from '../components/NameSuggestionComponents'

export default function Index() {
  const windowHeight = Dimensions.get('window').height
  const adaptativePaddingTopScreen = Number((windowHeight * 0.2).toFixed(0))

  const { getItem, setItem } = useAsyncStorage('isFirstTime')
  const [showOnboarding, setShowOnboarding] = useState<boolean | null>(null)
  const [isFirstTimeChecked, setIsFirstTimeChecked] = useState<boolean>(false)

  useEffect(() => {
    async function checkFirstTime() {
      const isFirstTime = await getItem()
      try {
        if (isFirstTime === null) {
          setShowOnboarding(true)
          setItem('false')
        } else {
          setShowOnboarding(false)
        }
        setIsFirstTimeChecked(true)
      } catch (error) {
        console.error('Erro ao checar o Primeiro Acesso', error)
      }
    }
    checkFirstTime()
  }, [])

  // Limpar depois
  const namesSuggestionFromApi = [
    '@joão_silva95',
    '@joãosilva2024',
    'joão.silva-br',
  ]

  const handleSelect = (option) => {
    console.log('selected option:', option)
  }

  return (
    <View>
      {isFirstTimeChecked && (
        <>
          {showOnboarding === true ? (
            <OnboardingScreenOne />
          ) : (
            <View
              style={[
                { paddingTop: adaptativePaddingTopScreen },
                styles.container,
              ]}
            >
              <Logo />
              <View style={styles.containerButtons}>
                <ButtonCustomizer.Root
                  type="primary"
                  onPress={() => router.push('/create-user/')}
                >
                  <ButtonCustomizer.Title
                    title="Criar minha conta"
                    customStyles={styles.primaryButtonText}
                  ></ButtonCustomizer.Title>
                </ButtonCustomizer.Root>
                <View style={styles.horizontalLineWithTextContainer}>
                  <View style={styles.horizontalLine} />
                  <Text style={styles.horizontalText}>OU</Text>
                  <View style={styles.horizontalLine} />
                </View>
                <ButtonCustomizer.Root
                  type="secondary"
                  onPress={() => router.push('/login/')}
                >
                  <ButtonCustomizer.Title
                    title="Fazer Login"
                    customStyles={styles.secondaryButtonText}
                  ></ButtonCustomizer.Title>
                </ButtonCustomizer.Root>
                <ButtonCustomizer.Root
                  type="tertiary"
                  onPress={() => router.push('/')}
                >
                  <ButtonCustomizer.Title
                    title="Calculadora"
                    customStyles={styles.tertiaryButtonText}
                  ></ButtonCustomizer.Title>
                </ButtonCustomizer.Root>
              </View>
              <NameSuggestionComponents
                namesSuggestionFromApi={namesSuggestionFromApi}
                onSelect={handleSelect}
              />
            </View>
          )}
        </>
      )}
    </View>
  )
}
