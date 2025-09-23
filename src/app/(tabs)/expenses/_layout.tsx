import { router, Stack } from 'expo-router'

import LeftIcon from '@/src/assets/images/arrowBack.svg'
import Question from '@/src/assets/images/question.svg'

export default function ExpensesLayout() {
  return (
    <Stack
      screenOptions={{
        headerShadowVisible: false,
      }}
    >
      <Stack.Screen
        name="newExpense/index"
        options={{
          title: 'Nova Despesa',
          headerShown: true,
          headerTitleAlign: 'center',
          headerLeft: () => (
            <LeftIcon
              onPress={() => {
                router.push('/home')
              }}
            />
          ),
          headerRight: () => <Question />,
        }}
      />
      <Stack.Screen
        name="newExpense/value/index"
        options={{
          title: 'Valor',
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
        name="newExpense/group/index"
        options={{
          title: 'Grupo',
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
        name="newExpense/payers/index"
        options={{
          title: 'Pagador',
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
        name="newExpense/receivers/index"
        options={{
          title: 'Para quem?',
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
        name="newExpense/resume/index"
        options={{
          title: 'Resumo',
          headerShown: true,
          headerTitleAlign: 'center',
          headerLeft: () => (
            <LeftIcon
              onPress={() => {
                router.back()
              }}
            />
          ),
        }}
      />
    </Stack>
  )
}
