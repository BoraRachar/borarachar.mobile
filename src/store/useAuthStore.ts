import { create } from 'zustand'
import * as SecureStore from 'expo-secure-store'

const useAuthStore = create((set) => ({
  user: null,
  isAuthenticated: false,

  login: async (token, userData) => {
    await SecureStore.setItemAsync('token', token)
    set({ user: userData, isAuthenticated: true })
  },

  logout: async () => {
    await SecureStore.deleteItemAsync('token')
  },

  checkAuth: async () => {
    await SecureStore.getItemAsync('token')

    if (token) {
      console.log('verificar a validade do token')
    }
  },
}))
