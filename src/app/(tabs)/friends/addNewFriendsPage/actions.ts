import { axiosPrivateClient } from '@/src/utils/axios'

export const searchUser = async (email: string, userCod: string | null) => {
  const response = await axiosPrivateClient.get('user/list-usuarios', {
    params: { email, userCod },
  })
  return response.data
}
