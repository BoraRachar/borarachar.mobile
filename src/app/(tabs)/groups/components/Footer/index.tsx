import React, { useState } from 'react'
import { View } from 'react-native'
import { router } from 'expo-router'

import { useGroupStore } from '@/src/store/useGroupStore'
import { ButtonCustomizer } from '@/src/components/ButtonCustomizer'
import ModalComponent from '@/src/components/ModalComponent'

import { styles as globalStyles } from '@/src/app/styles'

type FooterProps = {
  handleSubmit: () => void
}

const Footer = ({ handleSubmit }: FooterProps) => {
  const [modalVisible, setModalVisible] = useState(false)
  const { removeGroupData } = useGroupStore()

  const handleCancelAddGroup = () => {
    removeGroupData()
    router.replace('/groups')
  }

  return (
    <View>
      <ModalComponent
        type="complete"
        title="Deseja realmente sair?"
        description="Você perderá a edição do grupo"
        textButton1="Cancelar"
        textButton2="Confirmar"
        onPress={() => handleCancelAddGroup()}
        showModal={[modalVisible, setModalVisible]}
      />

      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <ButtonCustomizer.Root
          type="tertiaryHalfWidth"
          onPress={() => setModalVisible(true)}
        >
          <ButtonCustomizer.Title
            title="Cancelar"
            customStyles={globalStyles.secondaryButtonText}
          />
        </ButtonCustomizer.Root>

        <ButtonCustomizer.Root type="primaryHalfWidth" onPress={handleSubmit}>
          <ButtonCustomizer.Title
            title="Proximo"
            customStyles={globalStyles.primaryButtonText}
          />
        </ButtonCustomizer.Root>
      </View>
    </View>
  )
}

export default Footer
