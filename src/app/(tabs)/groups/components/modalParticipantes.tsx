import { Modal, Pressable, Text } from 'react-native'
import Animated, { FadeIn, SlideInDown } from 'react-native-reanimated'
export default function ModalParticipantes({ visible, setModalVisible }) {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={() => console.log('teste')}
    >
      <Animated.View
        entering={FadeIn}
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Animated.View
          entering={SlideInDown}
          style={{
            width: '100%',
            height: '95%',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'white',
          }}
        >
          <Pressable onPress={() => setModalVisible(false)}>
            <Text>Modal</Text>
          </Pressable>
        </Animated.View>
      </Animated.View>
    </Modal>
  )
}
