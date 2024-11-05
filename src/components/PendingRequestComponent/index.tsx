import { FlatList, Text, View } from 'react-native'
import PendingInvitationsCard from './PendingInvitationsCard'

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

export default function PendingRequestComponent({
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
          }}
        >
          <Text style={[styles.text, styles.textBold, { textAlign: 'center' }]}>
            Não existem solicitações de amizade pendentes
          </Text>
        </View>
      )}

      <FlatList
        data={friends}
        renderItem={({ item }) => (
          <PendingInvitationsCard
            friend={item}
            setModalVisible={setModalVisible}
          />
        )}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
      />
    </View>
  )
}
