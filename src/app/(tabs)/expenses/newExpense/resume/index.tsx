import {
  KeyboardAvoidingView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import { useExpenseStore } from '@/src/store/useExpenseStore'

import PencilIcon from '@/src/assets/images/pencil-strong.svg'
import { styles } from './styles'
import { styles as globalStyles } from '@/src/app/styles'
import { ButtonCustomizer } from '@/src/components/ButtonCustomizer'
import { router } from 'expo-router'

const formatadorMoeda = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
})

export default function Resume() {
  const { expenseData } = useExpenseStore()
  const ListItem = ({
    title,
    content,
  }: {
    title: string
    content: string | number | undefined
  }) => {
    return (
      <View style={styles.listItem}>
        <View>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.content}>{content}</Text>
        </View>
        <TouchableOpacity>
          <PencilIcon width={20} height={20} />
        </TouchableOpacity>
      </View>
    )
  }

  return (
    <ScrollView style={styles.container}>
      <ListItem title="O que" content={expenseData?.expenseName} />
      <ListItem
        title="Quanto"
        content={
          expenseData?.value && formatadorMoeda.format(expenseData.value)
        }
      />
      <ListItem title="Onde (Grupo)" content={expenseData?.grupoId} />
      <ListItem
        title="Quem bancou"
        content={expenseData?.recebedores?.join(',')}
      />
      <ListItem
        title="Quem vai pagar"
        content={expenseData?.recebedores?.join(',')}
      />
      <ListItem
        title="Quando"
        content={expenseData?.selectedDate?.toLocaleDateString('pt-BR')}
      />
      {expenseData?.description && (
        <ListItem title="Descrição" content={expenseData?.description} />
      )}

      <View style={styles.buttonContainer}>
        <ButtonCustomizer.Root
          type="tertiaryHalfWidth"
          onPress={() => router.back()}
          customStyles={globalStyles.tertiaryButtonHalfWidth}
        >
          <ButtonCustomizer.Title
            title="Cancelar"
            customStyles={globalStyles.tertiaryButtonText}
          />
        </ButtonCustomizer.Root>

        <ButtonCustomizer.Root
          type="primaryHalfWidth"
          onPress={() => console.log('teste')}
          customStyles={globalStyles.primaryButtonHalfWidth}
        >
          <ButtonCustomizer.Title
            title="Incluir"
            customStyles={globalStyles.primaryButtonText}
          />
        </ButtonCustomizer.Root>
      </View>
    </ScrollView>
  )
}
