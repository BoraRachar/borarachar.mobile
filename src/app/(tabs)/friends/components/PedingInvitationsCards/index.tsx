import { Text, View } from 'react-native'
import AvatarImageComponent from '@/src/components/AvatarImageComponent'
import CompleteModal from '../CompleteModal'

import CheckGreen from '@/src/assets/images/check-green.svg'
import CloseRed from '@/src/assets/images/close-red.svg'

import { styles } from '../../styles'
import { useState } from 'react'
import { useAuthStore } from '@/src/store/useAuthStore'
import { useFriendStore } from '@/src/store/useFriendStore'
import { axiosPrivateClient } from '@/src/utils/axios'
import AcceptModal from '../Modais/acceptModal'
import { acceptPendingRequest, refusedPendingRequest } from '../../actions'

type Props = {
  friend: {
    imgUser: string
    nome: string
    amigoId: string
  }
}

export default function PendingInvitationsCard({ friend }: Props) {
  const [acceptModalVisible, setAcceptModalVisible] = useState(false)
  const [completeModalVisible, setCompleteModalVisible] = useState(false)

  const { userCod } = useAuthStore()
  const { pendingInvitations, addPendingInvitations } = useFriendStore()

  const handleAcceptFriend = async (amigoId: string) => {
    try {
      const response = await acceptPendingRequest(userCod, amigoId)
      console.log(response)

      if (response.statusCode === 201) {
        setAcceptModalVisible(true)
      }
    } catch (error) {
      console.log('Erro ao aceitar convite', error)
    }
  }

  const handleRefusedFriend = async (amigoId: string) => {
    try {
      const response = await refusedPendingRequest(userCod, amigoId)

      if (response.statusCode === 204) {
        console.log('204')
      }

      const filter = pendingInvitations.filter(
        (item) => item.amigoId !== amigoId,
      )
      addPendingInvitations(filter)
      setCompleteModalVisible(false)
    } catch (error) {
      setCompleteModalVisible(false)
      console.log('Erro ao recusar convite', error)
    }
  }

  return (
    <View style={styles.invitationsCardcontainer}>
      <AvatarImageComponent image={friend.imgUser} size={48} />

      <View style={{ flex: 1, marginLeft: 16 }}>
        <Text style={styles.text}>{friend.nome}</Text>
      </View>

      <View style={styles.invitationsCardContainerIcons}>
        <CheckGreen
          width={24}
          height={24}
          onPress={() => handleAcceptFriend(friend.amigoId)}
        />
        <CloseRed
          width={24}
          height={24}
          onPress={() => setCompleteModalVisible(true)}
        />
      </View>
      <AcceptModal
        showModal={[acceptModalVisible, setAcceptModalVisible]}
        friendName={friend.nome}
      />
      <CompleteModal
        showModal={[completeModalVisible, setCompleteModalVisible]}
        friendName={friend.nome}
        id={friend.amigoId}
        onPress={handleRefusedFriend}
      />
    </View>
  )
}
