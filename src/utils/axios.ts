import axios from 'axios'

const API_BASE_URL =
  process.env.EXPO_PUBLIC_API_BASE_URL || 'https://api-hml.borarachar.online/v1'

export const axiosClient = axios.create({
  baseURL: API_BASE_URL,
})
