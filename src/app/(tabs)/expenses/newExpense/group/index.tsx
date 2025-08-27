import { View, Text, KeyboardAvoidingView, TouchableOpacity, FlatList } from 'react-native';
import { useState, useEffect } from 'react';
import { router } from 'expo-router';

import { axiosPrivateClient } from '@/src/utils/axios';
import { useAuthStore } from '@/src/store/useAuthStore';


import ProgressBarComponent from '@/src/components/ProgressBarComponent';
import ActivityIndicatorComponent from '@/src/components/ActivityIndicatorComponent';
import Plus from '@/src/assets/images/plus.svg';

import { styles } from './styles';
import { Image } from 'expo-image';
import GroupIcon from '@/src/assets/images/group.svg';
import { RadioButton } from 'react-native-paper';

interface Group {
    name: string;
    nome: string;
    groupId: string;
    descricao: string;
    imgGrupo: string;
    totalParticipantes: number;
}


export default function SelectGroup() {
    
    const { userCod } = useAuthStore();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [groups, setGroups] = useState<Group[]>([]);
    const [selectedGroup, setSelectedGroup] = useState< string >('');

    useEffect(() => {
        const fetchGroups = async () => {
          try {
            setIsLoading(true);
            const { data } = await axiosPrivateClient.get('grupos/lista-grupos', {
              params: {
                userCod,
                'metaData.pageNumber': 1,
                'metaData.pageSize': 10,
              },
            });
            console.log(data.data);
            setGroups(data.data);
          } catch (error) {
            __DEV__ && console.log('Houve um erro ao buscar os grupos', error);
          } finally {
            setIsLoading(false);
          }
        };
    
        fetchGroups();
    }, [userCod])

  return (
    <KeyboardAvoidingView style={styles.container}>
      <ProgressBarComponent totalSteps={100} currentStep={75} />
      <Text style={styles.title}>Em qual grupo foi realizada?</Text>

      <View style={styles.containerButton}>
        <Text style={styles.text}>Criar novo grupo</Text>

        <TouchableOpacity
          onPress={() => {
            router.push('/groups/newGroup')
          }}
        >
          <View style={styles.addButton}>
            <Plus />
          </View>
        </TouchableOpacity>
      </View>

      <View style={styles.containerList}>
        <RadioButton.Group
            value={selectedGroup}
            onValueChange={setSelectedGroup}
        >
        <FlatList
          data={groups ?? []}
          keyExtractor={(_, index) => index.toString()}
          showsVerticalScrollIndicator={false}
          renderItem={
            ({ item }) => {
              return (
                <TouchableOpacity
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

                    <View style={styles.containerDescription}>
                      <Text style={styles.text}>{item.nome}</Text>
                      <Text style={[styles.text, styles.textLight]}>
                        {`${item.totalParticipantes} participantes`}
                      </Text>
                    </View>
                  </View>

                  <RadioButton 
                  value={item.groupId}
                  />
                </TouchableOpacity>
              )
          }
          }
        />
        </RadioButton.Group>
      </View>

    </KeyboardAvoidingView>
  );
}
