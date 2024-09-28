import { create } from 'zustand'
import * as SecureStore from 'expo-secure-store'

interface User {
  nome: string
}

interface AuthState {
  user: User | null
  isAuthenticated: boolean
  login: (token: string, userData: User) => Promise<void>
  logout: () => Promise<void>
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,

  login: async (accessToken, userData) => {
    await SecureStore.setItemAsync('accessToken', accessToken)
    set({ user: userData, isAuthenticated: true })
  },

  logout: async () => {
    await SecureStore.deleteItemAsync('acessToken')
    set({ user: null, isAuthenticated: false })
  },
}))
