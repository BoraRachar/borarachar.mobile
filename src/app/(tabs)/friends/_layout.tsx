import { Stack, router } from 'expo-router'

import LeftIcon from '@/src/assets/images/arrowBack.svg'
import Question from '@/src/assets/images/question.svg'

export default function FriendsLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: 'Amigos',
          headerShown: true,
          headerTitleAlign: 'center',
          headerLeft: () => (
            <LeftIcon
              onPress={() => {
                router.back()
              }}
            />
          ),
          headerRight: () => <Question />,
        }}
      />

      <Stack.Screen
        name="invitations"
        options={{
          title: 'Convites',
          headerShown: true,
          headerTitleAlign: 'center',
          headerLeft: () => (
            <LeftIcon
              onPress={() => {
                router.back()
              }}
            />
          ),
          headerRight: () => <Question />,
        }}
      />
    </Stack>
  )
}
