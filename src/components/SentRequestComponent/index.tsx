import { FlatList, Text, View } from 'react-native'
import SentInvitationCard from './SentInvitationsCard'

import { styles } from './styles'

type Props = {
  friends: {
    id: number
    name: string
    avatar: string
    device: string
  }[]
  setModalVisible: (value: boolean) => void
}

export default function SentInvitationComponent({
  friends = [],
  setModalVisible,
}: Props) {
  return (
    <View>
      {friends.length === 0 && (
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 16,
            gap: 8,
          }}
        >
          <Text style={[styles.text, styles.textBold, { textAlign: 'center' }]}>
            Não existem solicitações enviadas
          </Text>
          <Text style={[styles.text, { textAlign: 'center' }]}>
            Clique em <Text style={styles.textBold}>Adicionar novo amigo</Text>{' '}
            para enviar convite para alguém que você conhece
          </Text>
        </View>
      )}

      <FlatList
        data={friends}
        renderItem={({ item }) => (
          <SentInvitationCard friend={item} setModalVisible={setModalVisible} />
        )}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
      />
    </View>
  )
}
