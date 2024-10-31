import { FlatList, Text, View } from 'react-native'
import SentInvitationCard from './SentInvitationsCard'

import { styles } from './styles'

export default function SentInvitationComponent({ list = [] }) {
  return (
    <View>
      {list.length === 0 && (
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
        data={list}
        renderItem={({ item }) => <SentInvitationCard friend={item} />}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
      />
    </View>
  )
}
