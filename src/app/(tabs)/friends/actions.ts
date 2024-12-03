import { axiosPrivateClient } from '@/src/utils/axios'

export const searchUser = async (email: string, userCod: string | null) => {
  const response = await axiosPrivateClient.get('user/list-usuarios', {
    params: { email, userCod },
  })
  return response.data
}

export const addNewFriend = async (
  userCod: string | string[],
  amigoId: string,
) => {
  try {
    const response = await axiosPrivateClient.post('amizade/add-amigo', {
      userCod,
      amigoId,
    })

    return response.data
  } catch (error) {
    const userMessage = JSON.stringify(
      error.response.data.errors[0].userMessage,
    )
    const statusCode = error.response.data.statusCode

    return { statusCode, userMessage }
  }
}

export const getPendingFriendRequests = async (userCod: string | null) => {
  try {
    const response = await axiosPrivateClient.get(
      '/amizade/lista-pendencias-amizades',
      {
        params: {
          userCod,
          'metaData.pageNumber': 1,
          'metaData.pageSize': 200,
        },
      },
    )

    if (response.data.statusCode === 200) {
      return response.data.metaData.totalRecords
    }
  } catch (error) {
    console.error('Failed to fetch pending friend requests:', error)
  }
}

export const getInvitationsSent = async (userCod: string | null) => {
  try {
    const response = await axiosPrivateClient.get('/convite/lista-convites', {
      params: {
        userCod,
      },
    })

    if (response.data.statusCode === 200) {
      return response.data.data.length
    }
  } catch (error) {
    console.error('Failed to fetch pending friend requests:', error)
  }
}
