import { theme } from '@/src/theme'
import { Image, StyleSheet, View } from 'react-native'

import User from '@/src/assets/images/user.svg'

export default function AvatarImageComponent({ image }: { image: string }) {
  return (
    <View>
      {image ? (
        <Image
          source={{ uri: image }}
          alt="avatar do usuario"
          style={styles.avatarImage}
        />
      ) : (
        <View style={styles.avatarContainer}>
          <User width={24} height={24} />
        </View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  avatarImage: {
    flex: 1,
    width: 48,
    height: 48,
    borderRadius: 50,
    resizeMode: 'cover',
  },
  avatarContainer: {
    backgroundColor: theme.colors.third,
    borderRadius: 50,
    padding: 14,
  },
})
