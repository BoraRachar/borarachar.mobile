import { useEffect, useState } from 'react'
import { FlatList, Text, TouchableOpacity, View } from 'react-native'
import { router } from 'expo-router'

import { useAuthStore } from '@/src/store/useAuthStore'
import { axiosPrivateClient } from '@/src/utils/axios'

import Plus from '@/src/assets/images/plus.svg'
import GroupIcon from '@/src/assets/images/group.svg'
import ArrowRight from '@/src/assets/images/chevron-arrow-right.svg'

import { styles } from './styles'
import { Image } from 'expo-image'
import ActivityIndicatorComponent from '@/src/components/ActivityIndicatorComponent'

interface Group {
  groupId: string
  descricao: string
  img: string
  participantes: number
}

export default function Groups() {
  const [dataGroups, setDataGroups] = useState<Group[]>([])
  const [loading, setLoading] = useState<boolean>(false)

  const { userCod } = useAuthStore()

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        setLoading(true)
        const { data } = await axiosPrivateClient.get('grupos/lista-grupos', {
          params: {
            userCod,
            'metaData.pageNumber': 1,
            'metaData.pageSize': 10,
          },
        })

        setDataGroups(data.data)
      } catch (error) {
        console.log('Houve um erro ao buscar os grupos', error)
      } finally {
        setLoading(false)
      }
    }
    fetchGroups()
  }, [userCod])

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
        {loading ? (
          <ActivityIndicatorComponent />
        ) : (
          <FlatList
            data={dataGroups ?? []}
            keyExtractor={(item) => item.groupId}
            extraData={dataGroups}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={
              <Text style={[styles.emptyGroup, styles.text, styles.textLight]}>
                Voce ainda não faz parte de grupos
              </Text>
            }
            renderItem={({ item }) => {
              return (
                <TouchableOpacity
                  onPress={() =>
                    router.push({
                      pathname: '/(tabs)/groups/groupDetails',
                      params: { data: item.groupId },
                    })
                  }
                  style={styles.containerGroup}
                >
                  <View style={{ flexDirection: 'row', gap: 16 }}>
                    <View style={styles.containerImage}>
                      {item.img ? (
                        <Image
                          source={{ uri: `data:image/jpeg;base64,${item.img}` }}
                          style={{ width: '100%', height: '100%' }}
                          alt="imagem do grupo"
                        />
                      ) : (
                        <GroupIcon />
                      )}
                    </View>

                    <View>
                      <Text style={styles.text}>{item.descricao}</Text>
                      <Text style={[styles.text, styles.textLight]}>
                        {`${item.participantes} participantes`}
                      </Text>
                    </View>
                  </View>

                  <ArrowRight />
                </TouchableOpacity>
              )
            }}
          />
        )}
      </View>
    </View>
  )
}
