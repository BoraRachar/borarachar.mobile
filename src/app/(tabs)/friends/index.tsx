import { Link } from 'expo-router'
import { Text, TouchableOpacity, View } from 'react-native'

import { styles } from './styles'

import Plus from '@/src/assets/images/plus.svg'
import User from '@/src/assets/images/user.svg'
import ChevronRight from '@/src/assets/images/chevron-arrow-right.svg'

export default function Amigos() {
  return (
    <View style={styles.container}>
      <View style={styles.resumeContent}>
        <Text style={styles.text}>Cibely, você tem:</Text>
        <Text style={styles.text}>10 amigos</Text>
        <View style={styles.containerText}>
          <Text style={styles.text}>4 convites enviados</Text>
          <Link
            href="/friends/invitations"
            style={[styles.text, { textDecorationLine: 'underline' }]}
          >
            Ver
          </Link>
        </View>
        <View style={styles.containerText}>
          <Text style={styles.text}>3 solicitações de amizade pendentes</Text>
          <Link
            href="/friends/invitations"
            style={[styles.text, { textDecorationLine: 'underline' }]}
          >
            Ver
          </Link>
        </View>
      </View>

      <View style={styles.containerButton}>
        <Text style={[styles.text, styles.textButton]}>
          Adicionar novo amigo
        </Text>
        <TouchableOpacity>
          <View style={styles.addButton}>
            <Plus />
          </View>
        </TouchableOpacity>
      </View>

      <View>
        <Text style={styles.title}>Amigos</Text>
        <View>
          <View style={styles.contentFriend}>
            <View style={styles.avatarContainer}>
              <User width={24} height={24} />
            </View>
            <View style={styles.nameContainer}>
              <Text style={[styles.text, styles.textBold]}>Junior Alves</Text>
              <Text style={styles.text}>2 grupos em comum</Text>
            </View>
            <View>
              <ChevronRight />
            </View>
          </View>
        </View>
      </View>
    </View>
  )
}
