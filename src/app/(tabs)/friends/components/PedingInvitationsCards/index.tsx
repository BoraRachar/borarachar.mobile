import { Text, View } from 'react-native'
import AvatarImageComponent from '@/src/components/AvatarImageComponent'

import CheckGreen from '@/src/assets/images/check-green.svg'
import CloseRed from '@/src/assets/images/close-red.svg'

import { styles } from '../../styles'

type Props = {
  friend: {
    imgUser: string
    nome: string
  }
  setModalVisible: (value: boolean) => void
}

export default function PendingInvitationsCard({
  friend,
  setModalVisible,
}: Props) {
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
          onPress={() => setModalVisible(true)}
        />
        <CloseRed
          width={24}
          height={24}
          onPress={() => setModalVisible(true)}
        />
      </View>
    </View>
  )
}
