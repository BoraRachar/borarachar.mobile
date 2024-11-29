import axios from 'axios'
import { router } from 'expo-router'
import { SecureStoreUtils } from '@/src/utils/secureStoreUtils'

const API_BASE_URL =
  process.env.EXPO_PUBLIC_API_BASE_URL ||
  'https://borarachar.microerp.solutions/v1/'

export const axiosClient = axios.create({
  baseURL: API_BASE_URL,
})

export const axiosPrivateClient = axios.create({
  baseURL: API_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
  // Authorization: `Bearer ${SecureStore.getItem('accessToken')}`,
})

axiosPrivateClient.interceptors.request.use(
  (config) => {
    try {
      const accessToken = SecureStoreUtils.getItem('accessToken')

      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`
      }

      return config
    } catch (error) {
      console.error('Erro ao recuperar o token:', error)
      return Promise.reject(error)
    }
  },
  (error) => {
    console.error('Erro na configuração da requisição:', error)
    Promise.reject(error)
  },
)

axiosPrivateClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    console.error(
      'Erro na resposta da requisição:',
      error.response || error.message,
    )

    if (error.response.status === 401) {
      try {
        console.warn(
          'token inválido ou expirado. Redirecionando para login ...',
        )
        await SecureStoreUtils.deleteItem('accessToken')
        router.push('/login')
      } catch (error) {
        console.error('Erro ao limpar o token:', error)
      }
    }
    return Promise.reject(error)
  },
)
