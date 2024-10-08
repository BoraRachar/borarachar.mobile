import { useEffect, useState } from 'react'
import { Keyboard } from 'react-native'

const useKeyboardStatus = () => {
  const [isKeyboardActive, setIsKeyboardActive] = useState(false)

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setIsKeyboardActive(true)
      },
    )

    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setIsKeyboardActive(false)
      },
    )

    return () => {
      keyboardDidShowListener.remove()
      keyboardDidHideListener.remove()
    }
  }, [])

  return isKeyboardActive
}

export default useKeyboardStatus
