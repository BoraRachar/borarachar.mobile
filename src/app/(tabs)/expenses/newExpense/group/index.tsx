import { View, Text, KeyboardAvoidingView, TouchableOpacity, FlatList } from 'react-native';
import { useState, useEffect } from 'react';
import { router } from 'expo-router';
import { useGroupStore } from '@/src/store/useGroupStore';
import { axiosPrivateClient } from '@/src/utils/axios';
import { useAuthStore } from '@/src/store/useAuthStore';
import { useExpenseStore } from '@/src/store/useExpenseStore';


import ProgressBarComponent from '@/src/components/ProgressBarComponent';
import Plus from '@/src/assets/images/plus.svg';
import { ButtonCustomizer } from '@/src/components/ButtonCustomizer';

import { styles } from './styles';
import { Image } from 'expo-image';
import GroupIcon from '@/src/assets/images/group.svg';
import { RadioButton } from 'react-native-paper';
import { theme } from '@/src/theme';
import { Ionicons } from '@expo/vector-icons';


interface Group {
    name: string;
    nome: string;
    grupoId: string;
    descricao: string;
    imgGrupo: string;
    totalParticipantes: number;
}

export default function SelectGroup() {
    
    const { userCod } = useAuthStore();
    const { removeGroupData } = useGroupStore();
    const {expenseData, setExpenseData} = useExpenseStore()


    const [groups, setGroups] = useState<Group[]>([]);
    const [selectedGroup, setSelectedGroup] = useState< string >('');

    useEffect(() => {
        const fetchGroups = async () => {
          try {
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
          }
        };
        
        fetchGroups();
      }, [userCod])

      const handleSelectGroup = (grupoId: string) => {
          if(!selectedGroup) {
            return theme.colors.primaryColor;
          }
  
          return grupoId === selectedGroup
            ? theme.colors.primaryColor
            : theme.colors.secondaryColor;
      }


      function handleNext(){
        if(!selectedGroup){
          return
        }

       setExpenseData({ 
        ...expenseData,
        grupoId: selectedGroup,
        userCod
      })

      console.log("Update expenseData: ", { ...expenseData });

      router.push('/expenses/newExpense/payers')
      }


  return (
    <KeyboardAvoidingView style={styles.container}>
      <ProgressBarComponent totalSteps={100} currentStep={60} />
      <Text style={styles.title}>Em qual grupo foi realizada?</Text>

      <View style={styles.containerButton}>
        <Text style={styles.text}>Criar novo grupo</Text>

        <TouchableOpacity
          onPress={() => {
            removeGroupData();
            router.push('/groups/newGroup')
          }}
        >
          <View style={styles.addButton}>
            <Plus />
          </View>
        </TouchableOpacity>
      </View>

      <View style={styles.containerList}>
        <FlatList
          data={groups ?? []}
          keyExtractor={(item) => item.grupoId}
          showsVerticalScrollIndicator={false}
          renderItem={
            ({ item }) => {

              // const isSelected = item.grupoId === selectedGroup;
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
                        <GroupIcon 
                        stroke={handleSelectGroup(item.grupoId)} />
                      )}
                    </View>

                    <View style={styles.containerDescription}>
                      <Text style={[
                          styles.text,
                          {color:handleSelectGroup(item.grupoId)}
                        ]}>
                          {item.nome}
                      </Text>
                      <Text style={[
                        styles.text, 
                        styles.textLight,
                        {color:handleSelectGroup(item.grupoId)}
                        ]}>
                        {`${item.totalParticipantes} participantes`}
                      </Text>
                    </View>
                  </View>

                  <RadioButton 
                    value={item.grupoId}
                    status={ selectedGroup === item.grupoId  ? 'checked' : 'unchecked'}
                    onPress={() => setSelectedGroup(item.grupoId)}
                    color={handleSelectGroup(item.grupoId)}
                    uncheckedColor={handleSelectGroup(item.grupoId)}
                  />
                </TouchableOpacity>
              )
          }
          }
        />
      </View>

      <View style={styles.containerButton}>
        <ButtonCustomizer.Root
          type="primary"
          onPress={handleNext}
          disabled={!selectedGroup}
          customStyles={!selectedGroup ? styles.disabledButton : styles.nextButton}
        >
          <ButtonCustomizer.Title
            title="Devedor"
            customStyles={styles.nextButtonText}
          />
          <Ionicons name="arrow-forward" size={20} color={theme.colors.white} style={{ marginLeft: 8 }} />
        </ButtonCustomizer.Root>
      </View>

    </KeyboardAvoidingView>
  );
}
