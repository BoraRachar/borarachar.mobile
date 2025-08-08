import { useEffect, useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Image } from 'expo-image'

import { axiosPrivateClient } from '@/src/utils/axios'
import { useAuthStore } from '@/src/store/useAuthStore'
import { useGroupStore } from '@/src/store/useGroupStore'

import ActivityIndicatorComponent from '@/src/components/ActivityIndicatorComponent'

import PhotographIcon from '@/src/assets/images/photograph.svg'
import PencilBlackIcon from '@/src/assets/images/pencil-black.svg'
import MoneyIcon from '@/src/assets/images/money.svg'
import AddFriendIcon from '@/src/assets/images/addFriendIcon.svg'
import GroupIcon from '@/src/assets/images/group.svg'

import { theme } from '@/src/theme'
import {
  horizontalScale,
  rem,
  verticalScale,
} from '@/src/utils/responsiveUtils'
import { router } from 'expo-router'

const Details = () => {
  const [isLoading, setIsLoading] = useState(false)
  const { userCod } = useAuthStore()
  const { groupData, setGroupData } = useGroupStore()

  useEffect(() => {
    const fetchDetailsGroup = async () => {
      setIsLoading(true)
      try {
        const { data } = await axiosPrivateClient.get('grupos/detalhes-grupo', {
          params: {
            userCod,
            grupoId: groupData?.grupoId,
          },
        })

        setGroupData(data.data)
      } catch (error) {
        console.log('Houve um erro ao buscar os grupos', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchDetailsGroup()
  }, [groupData?.grupoId, setGroupData, userCod])

  if (isLoading) {
    return <ActivityIndicatorComponent />
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.imageContainer}>
          {groupData.imgGrupo ? (
            <Image
              source={{
                uri: `data:image/jpeg;base64,${groupData.imgGrupo}`,
              }}
              style={{ width: '100%', height: '100%' }}
              alt="imagem do grupo"
            />
          ) : (
            <PhotographIcon width={32} height={32} />
          )}
        </View>

        <View style={{ gap: 8 }}>
          <Text style={[styles.text, { fontFamily: theme.fontFamily.bold }]}>
            {groupData.nome}
          </Text>
          <Text style={[styles.text, { fontFamily: theme.fontFamily.regular }]}>
            {groupData.categoria}
          </Text>
          <Text style={[styles.text, { fontFamily: theme.fontFamily.regular }]}>
            {groupData.descricao}
          </Text>
        </View>
      </View>

      <View style={styles.buttonContainer}>
        {groupData?.isAdm ? (
          <>
            <TouchableOpacity
              style={styles.button}
              onPress={() => router.push('/(tabs)/groups/editGroup')}
            >
              <View style={styles.iconContainer}>
                <PencilBlackIcon width={22} height={22} />
              </View>
              <Text style={styles.label}>Editar{'\n'}grupo</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button}>
              <View style={styles.iconContainer}>
                <MoneyIcon width={22} height={22} />
              </View>
              <Text style={styles.label}>Nova{'\n'}despesa</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.button}
              onPress={() =>
                router.push('/(tabs)/groups/participantsManagement')
              }
            >
              <View style={styles.iconContainer}>
                <AddFriendIcon width={22} height={22} />
              </View>
              <Text style={styles.label}>Gerenciar{'\n'}participantes</Text>
            </TouchableOpacity>
          </>
        ) : (
          <>
            <TouchableOpacity style={styles.button}>
              <View style={styles.iconContainer}>
                <MoneyIcon width={22} height={22} />
              </View>
              <Text style={styles.label}>Nova{'\n'}despesa</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.button}
              onPress={() => router.push('/(tabs)/groups/participantsList')}
            >
              <View style={styles.iconContainer}>
                <GroupIcon width={22} height={22} />
              </View>
              <Text style={styles.label}>Ver{'\n'}participantes</Text>
            </TouchableOpacity>
          </>
        )}
      </View>

      <View>
        <Text style={styles.title}>Movimentações</Text>
        <View style={{ marginTop: verticalScale(24), gap: rem(8) }}>
          <Text
            style={[
              styles.text,
              { fontFamily: theme.fontFamily.bold, textAlign: 'center' },
            ]}
          >
            Ainda não existem despesas para este grupo
          </Text>
          <Text style={[styles.text, { textAlign: 'center' }]}>
            Adicione a primeira despesa do grupo
          </Text>
        </View>
      </View>
    </View>
  )
}

export const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.white,
    flex: 1,
    padding: horizontalScale(24),
    gap: rem(24),
  },
  header: {
    flexDirection: 'row',
    gap: rem(16),
    maxHeight: verticalScale(100),
  },
  imageContainer: {
    width: horizontalScale(80),
    height: '100%',
    borderWidth: 3,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: theme.colors.primaryColor,
    backgroundColor: theme.colors.third,
  },
  title: {
    color: theme.colors.primaryColor,
    fontFamily: theme.fontFamily.bold,
    fontSize: rem(24),
    lineHeight: verticalScale(30),
  },
  text: {
    fontSize: rem(16),
    lineHeight: verticalScale(24),
    color: theme.colors.primaryColor,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  button: {
    alignItems: 'center',
    width: horizontalScale(100),
  },
  iconContainer: {
    backgroundColor: theme.colors.third,
    borderRadius: 12,
    padding: horizontalScale(16),
  },
  label: {
    fontFamily: theme.fontFamily.regular,
    fontSize: rem(14),
    color: theme.colors.primaryColor,
    textAlign: 'center',
  },
})

export default Details
