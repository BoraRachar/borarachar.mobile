import { router, Stack } from 'expo-router'

import LeftIcon from '@/src/assets/images/arrowBack.svg'
import Question from '@/src/assets/images/question.svg'
import Close from '@/src/assets/images/close-roudend.svg'
import { View } from 'react-native'

export default function GroupsLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: 'Meus grupos',
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
        name="newGroup/index"
        options={{
          title: 'Novo Grupo',
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
        name="newGroup/addParticipants/index"
        options={{
          title: 'Adicionar participantes',
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
        name="newGroup/conditionPage/index"
        options={{
          title: 'Novo Grupo',
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
        name="newGroup/resume/index"
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
          headerRight: () => <Question />,
        }}
      />

      <Stack.Screen
        name="newGroup/success/index"
        options={{
          title: 'Sucesso',
          headerShown: true,
          headerTitleAlign: 'center',
          headerLeft: () => <View />,
          headerRight: () => (
            <Close onPress={() => router.replace('/groups')} />
          ),
        }}
      />

      <Stack.Screen
        name="details/index"
        options={{
          title: 'Grupo',
          headerShown: true,
          headerTitleAlign: 'center',
          headerLeft: () => (
            <LeftIcon
              onPress={() => {
                router.push('/(tabs)/groups')
              }}
            />
          ),
          headerRight: () => <Question />,
        }}
      />

      <Stack.Screen
        name="editGroup/index"
        options={{
          title: 'Editar Grupo',
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
        name="manageParticipants/index"
        options={{
          title: 'Gerenciar Participantes',
          headerShown: true,
          headerTitleAlign: 'center',
          headerLeft: () => (
            <LeftIcon
              onPress={() => {
                router.push('/(tabs)/groups/details')
              }}
            />
          ),
          headerRight: () => <Question />,
        }}
      />
    </Stack>
  )
}
