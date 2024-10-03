import React, { useEffect, useState } from 'react'
import { router, SplashScreen } from 'expo-router'
import { useAsyncStorage } from '@react-native-async-storage/async-storage'
import { View, Dimensions } from 'react-native'
import { ButtonCustomizer } from '../components/ButtonCustomizer'
import { styles } from './styles'
import OnboardingScreenOne from './onboarding-screens/onboardingOne'
import SeparatorComponent from '../components/SeparatorComponent'
import Logo from '../assets/images/logo.svg'

export default function Index() {
  const windowHeight = Dimensions.get('window').height
  const adaptativePaddingTopScreen = Number((windowHeight * 0.2).toFixed(0))

  const { getItem, setItem } = useAsyncStorage('isFirstTime')
  const [showOnboarding, setShowOnboarding] = useState<boolean | null>(null)
  const [isFirstTimeChecked, setIsFirstTimeChecked] = useState<boolean>(false)

  useEffect(() => {
    SplashScreen.preventAutoHideAsync()
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
    setTimeout(async () => {
      await SplashScreen.hideAsync()
    }, 1000)

    checkFirstTime()
  }, [])

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
                <SeparatorComponent />
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
                  type={'primary'}
                  onPress={() =>
                    router.push('/onboarding-screens/onboardingOne/')
                  }
                >
                  <ButtonCustomizer.Title
                    title="Como funciona?"
                    customStyles={styles.primaryButtonText}
                  />
                </ButtonCustomizer.Root>

                {/* <ButtonCustomizer.Root
                  type="tertiary"
                  onPress={() => router.push('/home')}
                >
                  <ButtonCustomizer.Title
                    title="Home"
                    customStyles={styles.tertiaryButtonText}
                  ></ButtonCustomizer.Title>
                </ButtonCustomizer.Root> */}
              </View>
            </View>
          )}
        </>
      )}
    </View>
  )
}
