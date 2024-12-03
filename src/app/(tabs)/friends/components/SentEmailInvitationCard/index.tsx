import { Text, View } from 'react-native'
import AvatarImageComponent from '@/src/components/AvatarImageComponent'

import Email from '@/src/assets/images/e-mail.svg'
import Trash from '@/src/assets/images/trash.svg'

import { styles } from '../../styles'

type SentInvitationCardProps = {
  friend: {
    avatar: string
    nome: string
    device: string
  }
  setModalVisible: (visible: boolean) => void
}

export default function SentInvitationCard({
  friend,
  setModalVisible,
}: SentInvitationCardProps) {
  return (
    <View style={styles.invitationsCardcontainer}>
      <AvatarImageComponent image={friend.avatar} size={48} />

      <View style={{ flex: 1, marginLeft: 16 }}>
        <Text style={[styles.text, styles.textBold]}>{friend.nome}</Text>
        <Text style={styles.text}>Enviado via E-mail</Text>
      </View>

      <View style={styles.invitationsCardContainerIcons}>
        <Email width={24} height={24} onPress={() => setModalVisible(true)} />
        <Trash width={24} height={24} onPress={() => setModalVisible(true)} />
      </View>
    </View>
  )
}
