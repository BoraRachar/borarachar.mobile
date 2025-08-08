import { theme } from '@/src/theme'
import {
  horizontalScale,
  rem,
  verticalScale,
} from '@/src/utils/responsiveUtils'
import { router } from 'expo-router'
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native'
import Animated, { FadeIn, SlideInDown } from 'react-native-reanimated'

import { axiosPrivateClient } from '@/src/utils/axios'
import { useGroupStore } from '@/src/store/useGroupStore'
import { useCallback, useEffect, useState } from 'react'
import ActivityIndicatorComponent from '@/src/components/ActivityIndicatorComponent'

import Close from '@/src/assets/images/closeFrame.svg'
import UserIcon from '@/src/assets/images/user-circle.svg'

interface ParticipantType {
  apelido: string
  email: string
  hasPendent: boolean
  isAdm: boolean
  nome: string
  participanteId: string
}

export default function ParticipantsList() {
  const [isLoading, setIsLoading] = useState(true)
  const [participantsList, setParticipantsList] = useState<ParticipantType[]>(
    [],
  )
  const { groupData } = useGroupStore()

  const fetchparticipantsList = useCallback(async () => {
    try {
      const { data } = await axiosPrivateClient.get(
        'participantes/lista-participantes',
        {
          params: {
            grupoId: groupData?.grupoId,
          },
        },
      )

      // Organiza a lista de participantes, colocando o admin como primeiro da Lista
      const organizeDataWithAdminFirst = data.data.sort(
        (a: ParticipantType, b: ParticipantType) => {
          if (a.isAdm && !b.isAdm) return -1
          if (!a.isAdm && b.isAdm) return 1
          return a.nome.localeCompare(b.nome)
        },
      )

      setParticipantsList(organizeDataWithAdminFirst)
    } catch (error) {
      __DEV__ && console.log(error)
    } finally {
      setIsLoading(false)
    }
  }, [groupData])

  useEffect(() => {
    fetchparticipantsList()
  }, [fetchparticipantsList])

  function ParticipanteCard({ item }: { item: ParticipantType }) {
    return (
      <View
        style={{
          width: '100%',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingVertical: verticalScale(8),
        }}
      >
        <View
          style={{ flexDirection: 'row', alignItems: 'center', gap: rem(16) }}
        >
          <UserIcon width={48} height={48} />

          <View>
            <Text style={styles.text}>{item.nome}</Text>
            <Text style={[styles.text, styles.textLight]}>
              {`@${item.apelido}`}
            </Text>
          </View>
        </View>

        {item.isAdm && (
          <Text style={[styles.text, { paddingRight: horizontalScale(18) }]}>
            Admin
          </Text>
        )}
      </View>
    )
  }

  return (
    <Animated.View entering={FadeIn} style={styles.container}>
      <Animated.View entering={SlideInDown} style={styles.modalView}>
        <View style={styles.header}>
          <Text style={styles.title}>Participantes</Text>
          <Pressable onPress={() => router.back()}>
            <Close width={28} height={28} />
          </Pressable>
        </View>

        {isLoading && <ActivityIndicatorComponent />}

        <View style={{ flex: 1, marginTop: verticalScale(16), gap: 16 }}>
          <FlatList
            data={participantsList}
            renderItem={({ item }) => <ParticipanteCard item={item} />}
            keyExtractor={(item) => item.participanteId}
          />
        </View>
      </Animated.View>
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#00000040',
  },
  modalView: {
    width: '95%',
    height: '95%',
    position: 'absolute',
    bottom: 0,
    backgroundColor: 'white',
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  header: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    color: theme.colors.primaryColor,
    fontFamily: theme.fontFamily.bold,
    fontSize: rem(24),
    lineHeight: verticalScale(30),
  },
  text: {
    fontFamily: theme.fontFamily.semiBold,
    fontSize: rem(16),
    lineHeight: verticalScale(24),
    color: theme.colors.primaryColor,
  },
  textLight: {
    fontFamily: theme.fontFamily.regular,
  },
})
