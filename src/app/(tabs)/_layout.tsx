import { useAuthStore } from '@/src/store/useAuthStore'
import { Redirect, Tabs } from 'expo-router'

import { theme } from '@/src/theme'
import Ionicons from '@expo/vector-icons/Ionicons'
export default function Layout() {
  const { isAuthenticated } = useAuthStore()

  if (!isAuthenticated) {
    return <Redirect href="/login" />
  }

  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: theme.colors.primaryColor }}>
      <Tabs.Screen
        name="home/index"
        options={{
          title: 'Home',
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <Ionicons name="home-outline" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="activity"
        options={{
          title: 'Atividade',
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <Ionicons name="swap-horizontal-outline" size={24} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="expenses"
        options={{
          title: 'Despesas',
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <Ionicons name="add-circle-outline" size={24} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="friends"
        options={{
          title: 'Amigos',
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <Ionicons name="person-outline" size={24} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="groups"
        options={{
          title: 'Grupos',
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <Ionicons name="people-outline" size={24} color={color} />
          ),
        }}
      />
    </Tabs>
  )
}
