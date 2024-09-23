import { Tabs } from 'expo-router'
import Ionicons from '@expo/vector-icons/Ionicons'
import { theme } from '@/src/theme'
export default function Layout() {
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: theme.colors.primaryColor }}>
      <Tabs.Screen
        name="home/index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => (
            <Ionicons name="home-outline" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="activity/index"
        options={{
          title: 'Atividade',
          tabBarIcon: ({ color }) => (
            <Ionicons name="swap-horizontal-outline" size={24} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="expenses/index"
        options={{
          title: 'Desepesas',
          tabBarIcon: ({ color }) => (
            <Ionicons name="add-circle-outline" size={24} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="friends/index"
        options={{
          title: 'Amigos',
          tabBarIcon: ({ color }) => (
            <Ionicons name="person-outline" size={24} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="groups/index"
        options={{
          title: 'Grupos',
          tabBarIcon: ({ color }) => (
            <Ionicons name="people-outline" size={24} color={color} />
          ),
        }}
      />
    </Tabs>
  )
}
