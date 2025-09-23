import { ScrollView, Text, TouchableOpacity, View } from 'react-native'
import { useExpenseStore } from '@/src/store/useExpenseStore'

import PencilIcon from '@/src/assets/images/pencil-strong.svg'
import { styles } from './styles'
import { styles as globalStyles } from '@/src/app/styles'
import { ButtonCustomizer } from '@/src/components/ButtonCustomizer'
import { router, Href } from 'expo-router'
import { axiosPrivateClient } from '@/src/utils/axios'
import { useState } from 'react'
import CancelExpenseModal from './CancelExpenseModal'

const formatadorMoeda = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
})

export default function Resume() {
  const [isModalVisible, setIsModalVisible] = useState(false)
  const { expenseData } = useExpenseStore()

  const handleInsertExpense = async () => {
    try {
      axiosPrivateClient.post('/despesas', {
        nome: expenseData?.nome,
        valorDespesa: expenseData?.valorDespesa,
        descricao: expenseData?.descricao,
        dataRealizacao: String(expenseData?.dataRealizacao),
        idGrupo: expenseData?.idGrupo,
        pagadoresIds: expenseData?.pagadores,
        recebedoresIds: expenseData?.recebedores,
      })

      router.replace('/(tabs)/expenses/newExpense/success')
    } catch (error) {
      console.error('Error inserting expense:', error)
    }
  }

  const ListItem = ({
    title,
    content,
    editlink,
  }: {
    title: string
    content: string | number | undefined
    editlink: Href<string>
  }) => {
    return (
      <View style={styles.listItem}>
        <View>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.content}>{content}</Text>
        </View>
        <TouchableOpacity
          onPress={() => router.push(editlink)}
          disabled={!editlink}
        >
          <PencilIcon width={20} height={20} />
        </TouchableOpacity>
      </View>
    )
  }

  return (
    <ScrollView style={styles.container}>
      <ListItem
        title="O que"
        content={expenseData?.nome}
        editlink="/(tabs)/expenses/newExpense"
      />

      <ListItem
        title="Quanto"
        content={
          expenseData?.valorDespesa &&
          formatadorMoeda.format(expenseData?.valorDespesa)
        }
        editlink="/(tabs)/expenses/newExpense/value"
      />
      <ListItem
        title="Onde (Grupo)"
        content={expenseData?.nomeGrupo}
        editlink="/(tabs)/expenses/newExpense/group"
      />
      <ListItem
        title="Quem bancou"
        content={expenseData?.recebedoresNome?.join(',')}
        editlink="/(tabs)/expenses/newExpense/receivers"
      />
      <ListItem
        title="Quem vai pagar"
        content={expenseData?.pagadoresNome?.join(',')}
        editlink="/(tabs)/expenses/newExpense/payers"
      />
      <ListItem
        title="Quando"
        content={expenseData?.dataRealizacao?.toLocaleDateString('pt-BR')}
        editlink="/(tabs)/expenses/newExpense"
      />
      {expenseData?.descricao && (
        <ListItem
          title="Descrição"
          content={expenseData?.descricao}
          editlink="/(tabs)/expenses/newExpense"
        />
      )}

      <View style={styles.buttonContainer}>
        <ButtonCustomizer.Root
          type="tertiaryHalfWidth"
          onPress={() => setIsModalVisible(true)}
          customStyles={globalStyles.tertiaryButtonHalfWidth}
        >
          <ButtonCustomizer.Title
            title="Cancelar"
            customStyles={globalStyles.tertiaryButtonText}
          />
        </ButtonCustomizer.Root>

        <ButtonCustomizer.Root
          type="primaryHalfWidth"
          onPress={() => handleInsertExpense()}
          customStyles={globalStyles.primaryButtonHalfWidth}
        >
          <ButtonCustomizer.Title
            title="Incluir"
            customStyles={globalStyles.primaryButtonText}
          />
        </ButtonCustomizer.Root>
      </View>
      <CancelExpenseModal
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
      />
    </ScrollView>
  )
}
