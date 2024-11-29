import { create } from 'zustand'
import * as SecureStore from 'expo-secure-store'

interface AuthState {
  userName: string | null
  userCod: string | null
  isAuthenticated: boolean
  login: (
    accessToken: string,
    userName: string,
    userCod: string,
  ) => Promise<void>
  logout: () => Promise<void>
}

export const useAuthStore = create<AuthState>((set) => ({
  userName: null,
  userCod: null,
  isAuthenticated: false,

  login: async (accessToken, userName, userCod) => {
    await SecureStore.setItemAsync('accessToken', accessToken)
    set({ userName, userCod, isAuthenticated: true })
  },

  logout: async () => {
    await SecureStore.deleteItemAsync('acessToken')
    set({ userName: null, userCod: null, isAuthenticated: false })
  },
}))
