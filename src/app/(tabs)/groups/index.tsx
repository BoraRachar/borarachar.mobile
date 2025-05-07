import { useCallback, useState } from 'react'
import { Button, FlatList, Text, TouchableOpacity, View } from 'react-native'
import { Image } from 'expo-image'
import { Link, router } from 'expo-router'

import { useAuthStore } from '@/src/store/useAuthStore'
import { axiosPrivateClient } from '@/src/utils/axios'

import ActivityIndicatorComponent from '@/src/components/ActivityIndicatorComponent'

import Plus from '@/src/assets/images/plus.svg'
import GroupIcon from '@/src/assets/images/group.svg'
import ArrowRight from '@/src/assets/images/chevron-arrow-right.svg'

import { styles } from './styles'
import { useFocusEffect } from '@react-navigation/native'

type Group = {
  groupId: string
  descricao: string
  img: string
  participantes: number
}

export default function Groups() {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [groupData, setGroupData] = useState<Group[]>([])

  const { userCod } = useAuthStore()

  const fetchGroups = async () => {
    try {
      setIsLoading(true)
      const { data } = await axiosPrivateClient.get('/grupos/lista-grupos', {
        params: {
          userCod,
          'metaData.pageNumber': 1,
          'metaData.pageSize': 200,
        },
      })

      setGroupData(data)
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }

  useFocusEffect(
    useCallback(() => {
      fetchGroups()
    }, []),
  )

  const GroupItem = (item) => {
    console.log(item)
    return (
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 16 }}>
          <View style={styles.containerImage}>
            <GroupIcon width={22} height={22} />
            {/* <Image
                  source={{ uri: `data:image/jpeg;base64,${groupImage}` }}
                  style={{ width: '100%', height: '100%' }}
                  alt="imagem do grupo"
                /> */}
          </View>

          <View>
            <Text style={styles.text}>Nome do Grupo</Text>
            <Text style={[styles.text, styles.textLight]}>
              10 participantes
            </Text>
          </View>
        </View>

        <View>
          <Link href="/(tabs)/home">
            <ArrowRight width={24} height={24} />
          </Link>
        </View>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Meus Grupos</Text>

      <View style={styles.containerButton}>
        <Text style={styles.text}>Criar novo grupo</Text>

        <TouchableOpacity onPress={() => router.push('/groups/newGroup')}>
          <View style={styles.addButton}>
            <Plus />
          </View>
        </TouchableOpacity>
      </View>

      <View>
        {isLoading ? (
          <ActivityIndicatorComponent />
        ) : (
          <View>
            <FlatList
              data={groupData}
              renderItem={GroupItem}
              keyExtractor={(item: Group) => item.grupoId}
              extraData={groupData}
              showsVerticalScrollIndicator={false}
            />
          </View>
        )}
      </View>
    </View>
  )
}
