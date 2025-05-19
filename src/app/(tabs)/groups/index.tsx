import { useEffect, useState } from 'react'
import { FlatList, Text, TouchableOpacity, View } from 'react-native'
import { router } from 'expo-router'

import ActivityIndicatorComponent from '@/src/components/ActivityIndicatorComponent'

import { useGroupStore } from '@/src/store/useGroupStore'
import { useAuthStore } from '@/src/store/useAuthStore'
import { axiosPrivateClient } from '@/src/utils/axios'

import Plus from '@/src/assets/images/plus.svg'
import GroupIcon from '@/src/assets/images/group.svg'
import ArrowRight from '@/src/assets/images/chevron-arrow-right.svg'

import { styles } from './styles'
import { Image } from 'expo-image'

interface Group {
  nome: string
  groupId: string
  descricao: string
  imgGrupo: string
  totalParticipantes: number
}

export default function Groups() {
  const [groupDataList, setGroupDataList] = useState<Group[]>([])
  const [loading, setLoading] = useState<boolean>(false)

  const { userCod } = useAuthStore()
  const { setGroupData } = useGroupStore()

  const handleGroupPress = async (group: Group) => {
    await setGroupData(group)
    router.push('/(tabs)/groups/details')
  }

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

        setGroupDataList(data.data)
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
            data={groupDataList ?? []}
            keyExtractor={(_, index) => index.toString()}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={
              <Text style={[styles.emptyGroup, styles.text, styles.textLight]}>
                Voce ainda não faz parte de grupos
              </Text>
            }
            renderItem={({ item }) => {
              return (
                <TouchableOpacity
                  onPress={() => handleGroupPress(item)}
                  style={styles.containerGroup}
                >
                  <View style={{ flexDirection: 'row', gap: 16 }}>
                    <View style={styles.containerImage}>
                      {item.imgGrupo ? (
                        <Image
                          source={{
                            uri: `data:image/jpeg;base64,${item.imgGrupo}`,
                          }}
                          style={{ width: '100%', height: '100%' }}
                          alt="imagem do grupo"
                        />
                      ) : (
                        <GroupIcon />
                      )}
                    </View>

                    <View>
                      <Text style={styles.text}>{item.nome}</Text>
                      <Text style={[styles.text, styles.textLight]}>
                        {`${item.totalParticipantes} participantes`}
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
