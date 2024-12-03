import { Text, View } from 'react-native'
import AvatarImageComponent from '@/src/components/AvatarImageComponent'

import Email from '@/src/assets/images/e-mail.svg'
import Trash from '@/src/assets/images/trash.svg'

import { styles } from '../../styles'
import RemoveEmailModal from '../Modais/removeEmailModal'
import { useState } from 'react'
import { axiosPrivateClient } from '@/src/utils/axios'
import { useFriendStore } from '@/src/store/useFriendStore'
import ResendEmailModal from '../Modais/ResendEmailModal'
import { set } from 'react-hook-form'

type SentInvitationCardProps = {
  friend: {
    imgUser: string
    nome: string
    idConvite: string
  }
}

export default function SentInvitationCard({
  friend,
}: SentInvitationCardProps) {
  const [removeModalVisible, setRemoveModalVisible] = useState(false)
  const [resendEmailModalVisible, setResendEmailModalVisible] = useState(false)
  const { emailInvitations, addEmailInvitations } = useFriendStore()

  const handleRemoveInvitation = async (idConvite: string) => {
    try {
      const response = await axiosPrivateClient.delete('convite/deletar', {
        params: { idConvite },
      })

      if (response.data.statusCode === 204) {
        const filter = emailInvitations.filter(
          (item) => item.idConvite !== idConvite,
        )
        addEmailInvitations(filter)
        setRemoveModalVisible(false)
      }
    } catch (error) {
      console.log('Erro ao remover convite', error)
    }
  }

  const handleResendEmail = async (idConvite: string) => {
    try {
      const response = await axiosPrivateClient.post('convite/reenviar', {
        data: { idConvite },
      })
      if (response.data.statusCode === 204) {
        setResendEmailModalVisible(false)
      }
    } catch (error) {
      console.log('erro ao reenviar email', error)
    }
  }

  return (
    <View style={styles.invitationsCardcontainer}>
      <AvatarImageComponent image={friend.imgUser} size={48} />

      <View style={{ flex: 1, marginLeft: 16 }}>
        <Text style={[styles.text, styles.textBold]}>{friend.nome}</Text>
        <Text style={styles.text}>Enviado via E-mail</Text>
      </View>

      <View style={styles.invitationsCardContainerIcons}>
        <Email
          width={24}
          height={24}
          onPress={() => setResendEmailModalVisible(true)}
        />
        <Trash
          width={24}
          height={24}
          onPress={() => setRemoveModalVisible(true)}
        />
      </View>

      <RemoveEmailModal
        showModal={[removeModalVisible, setRemoveModalVisible]}
        friendName={friend.nome}
        idConvite={friend.idConvite}
        onPress={handleRemoveInvitation}
      />

      <ResendEmailModal
        showModal={[resendEmailModalVisible, setResendEmailModalVisible]}
        friendName={friend.nome}
        idConvite={friend.idConvite}
        onPress={handleResendEmail}
      />
    </View>
  )
}
