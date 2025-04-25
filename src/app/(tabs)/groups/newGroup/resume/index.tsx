import { useState } from 'react'
import { View, Text, ScrollView, Alert } from 'react-native'
import { Link, router } from 'expo-router'

import { styles as globalStyles } from '@/src/app/styles'
import styles from './styles'

import { axiosPrivateClient } from '@/src/utils/axios'
import { useAuthStore } from '@/src/store/useAuthStore'
import { useGroupStore } from '@/src/store/useGroupStore'
import { ButtonCustomizer } from '@/src/components/ButtonCustomizer'

import UserImage from '@/src/assets/images/user-circle.svg'
import PencilBlack from '@/src/assets/images/pencil-black.svg'
import ActivityIndicatorComponent from '@/src/components/ActivityIndicatorComponent'

const validOptions = {
  0: 'Igualitária',
  1: 'Por valor exato',
  2: 'Por porcentual',
  3: 'Por cotas',
}

const Resume: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false)
  const { userCod } = useAuthStore()
  const { groupData, removeGroupData } = useGroupStore()

  const handleSubmit = async () => {
    setIsLoading(true)
    // remove descricaoCategoria e nomeParticipantes do payload
    const { descricaoCategoria, nomeParticipantes, ...rest } = groupData
    const payload = { userCod, ...rest }

    try {
      const response = await axiosPrivateClient.post('/grupos', payload)

      if (response.status !== 200) {
        throw new Error(
          'Erro ao criar grupo',
          response.data.errors[0].userMessage,
        )
      }

      removeGroupData()
      router.replace({
        pathname: '/groups/newGroup/success',
        params: { nome: groupData.nome },
      })
    } catch (error) {
      Alert.alert('Error', 'Erro ao criar grupo')
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoading) {
    return <ActivityIndicatorComponent />
  }

  return (
    <ScrollView style={styles.container} scrollEnabled={true}>
      {/* Header */}
      <Text style={styles.title}>Nova divisão</Text>

      {/* Resume list */}
      <View>
        <View style={styles.item}>
          <View>
            <Text style={styles.titleItem}>Nome do Grupo</Text>
            <Text style={styles.textItem}>{groupData.nome}</Text>
            <Text style={[styles.category, styles.titleItem]}>
              {groupData.descricaoCategoria}
            </Text>
          </View>
          <View>
            <Link href={'/groups/newGroup'}>
              <PencilBlack width={22} height={22} />
            </Link>
          </View>
        </View>

        <View style={styles.item}>
          <View>
            <Text style={styles.titleItem}>Descrição</Text>
            <Text style={styles.textItem}>{groupData.descricao || ''}</Text>
          </View>
          <View>
            <Link href={'/groups/newGroup'}>
              <PencilBlack width={22} height={22} />
            </Link>
          </View>
        </View>

        <View style={styles.item}>
          <View>
            <Text style={styles.titleItem}>Quando</Text>
            <Text style={styles.textItem}>
              {new Date().toLocaleDateString('pt-BR')}
            </Text>
          </View>
          <View>
            <Link href={'/groups/newGroup'}>
              <PencilBlack width={22} height={22} />
            </Link>
          </View>
        </View>

        <View style={styles.item}>
          <View>
            <Text style={styles.titleItem}>Condição de divisão</Text>
            <Text style={styles.textItem}>
              {
                validOptions[
                (groupData.tipoDivisao as keyof typeof validOptions) ?? 0
                ]
              }
            </Text>
          </View>
          <View>
            <Link href={'/groups/newGroup/conditionPage'}>
              <PencilBlack width={22} height={22} />
            </Link>
          </View>
        </View>
      </View>

      <View>
        <View style={styles.item}>
          <Text style={styles.titleItem}>Participantes</Text>
          <Link href={'/groups/newGroup/addParticipants'}>
            <PencilBlack width={22} height={22} />
          </Link>
        </View>

        <View style={{ maxHeight: 200 }}>
          <ScrollView nestedScrollEnabled={true}>
            {groupData.nomeParticipantes?.map((item, index) => {
              return (
                <View key={index} style={styles.participantsItem}>
                  <Text style={styles.textItem}>{index + 1}</Text>
                  <UserImage width={32} height={32} />
                  <Text style={styles.textItem}>{item}</Text>
                </View>
              )
            })}
          </ScrollView>
        </View>
      </View>

      {/* Botão */}
      <View
        style={{
          marginTop: 50,
          paddingBottom: 50,
          flexDirection: 'row',
          gap: 16,
        }}
      >
        <ButtonCustomizer.Root
          type="tertiaryHalfWidth"
          onPress={() => {
            removeGroupData()
            router.replace('/groups')
          }}
        >
          <ButtonCustomizer.Title
            title="Cancelar"
            customStyles={globalStyles.secondaryButtonText}
          />
        </ButtonCustomizer.Root>

        <ButtonCustomizer.Root
          type="primaryHalfWidth"
          onPress={() => handleSubmit()}
        >
          <ButtonCustomizer.Title
            title="Criar"
            customStyles={globalStyles.primaryButtonText}
          />
        </ButtonCustomizer.Root>
      </View>
    </ScrollView>
  )
}

export default Resume
