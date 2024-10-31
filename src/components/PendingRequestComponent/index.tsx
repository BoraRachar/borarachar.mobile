import { FlatList, Text, View } from 'react-native'
import PendingInvitationsCard from './PendingInvitationsCard'

import { styles } from './styles'

export default function PendingRequestComponent({ list = [] }) {
  return (
    <View>
      {list.length === 0 && (
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
        data={list}
        renderItem={({ item }) => <PendingInvitationsCard friend={item} />}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
      />
    </View>
  )
}
