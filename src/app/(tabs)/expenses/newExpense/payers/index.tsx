import {
  FlatList,
  KeyboardAvoidingView,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import { useState, useEffect } from "react";
import { axiosPrivateClient } from "@/src/utils/axios";
import { useExpenseStore } from "@/src/store/useExpenseStore";
import { useAuthStore } from "@/src/store/useAuthStore";

import ProgressBarComponent from "@/src/components/ProgressBarComponent";
import Checkbox from "expo-checkbox";
import { ButtonCustomizer } from "@/src/components/ButtonCustomizer";
import UserIcon from "@/src/assets/images/user.svg";
import { Ionicons } from "@expo/vector-icons";

import { styles } from "./styles";
import { theme } from "@/src/theme";

interface ParticipantType {
  participanteId: string;
  nome: string;
  email: string;
  apelido: string;
  isAdm: boolean;
  hasPendent: boolean;
}

export default function Payers() {
  const { expenseData, setExpenseData } = useExpenseStore();
  const { userCod } = useAuthStore();

  const [participants, setParticipants] = useState<ParticipantType[]>([]);
  const [selectedParticipants, setSelectedParticipants] = useState<string[]>(
    []
  );

  
  useEffect(() => {
      const fetchParticipants = async () => {
          try {
              const { data } = await axiosPrivateClient.get(
                  "participantes/lista-participantes",
                  {
                      params: {
                          grupoId: expenseData.grupoId,
                        },
                    }
                );
                
                setParticipants(data.data);
                console.log(participants);
            } catch (error) {
                console.log("Error: ", error);
            }
        };
        fetchParticipants();
    }, [userCod]);

    const toggleSelection = (participantId: string) => {
      setSelectedParticipants((prev) =>
        prev.includes(participantId)
          ? prev.filter((item) => item !== participantId)
          : [...prev, participantId]
      );
      console.log(selectedParticipants);
    };

    function handleNext(){
        if(selectedParticipants.length === 0){
            return
        }
        setExpenseData({
            ...expenseData,
             pagadores: selectedParticipants
            })
        console.log("Expense Data Updated: ", {...expenseData, pagadores: selectedParticipants})
    }
    
  return (
    <KeyboardAvoidingView style={styles.container}>
      <ProgressBarComponent totalSteps={100} currentStep={80} />

      <View style={styles.containerDescription}>
        <Text style={styles.title}>
          Selecione a pessoa que irá pagar pela despesa.
        </Text>
        <Text style={styles.text}>
          Selecione quem irá <Text style={styles.textBold}>dividir</Text> o
          valor desta despesa
        </Text>
      </View>

      <View style={styles.containerList}>
        <FlatList
          data={participants ?? []}
          keyExtractor={(item) => item.participanteId}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.containerItem}>
              <View style={styles.itemContent}>
                <View style={styles.containerUser}>
                  <View style={styles.userIcon}>
                    <UserIcon width={26} height={26} />
                  </View>

                  <Text style={styles.checkboxText}>{item.nome}</Text>
                </View>
                <Checkbox
                  style={styles.checkbox}
                  value={selectedParticipants.includes(item.participanteId)}
                  onValueChange={() => toggleSelection(item.participanteId)}
                  color={
                    selectedParticipants.includes(item.participanteId)
                      ? theme.colors.primaryColor
                      : undefined
                  }
                />
              </View>
            </TouchableOpacity>
          )}
        />
      </View>

                <View style={styles.containerButton}>
                  <ButtonCustomizer.Root
                    type="primary"
                    onPress={handleNext}
                    disabled={selectedParticipants.length === 0}
                    customStyles={selectedParticipants.length === 0 ? styles.disabledButton : styles.nextButton}
                  >
                    <ButtonCustomizer.Title
                      title="Credor"
                      customStyles={styles.nextButtonText}
                    />
                    <Ionicons name="arrow-forward" size={20} color={theme.colors.white} style={{ marginLeft: 8 }} />
                  </ButtonCustomizer.Root>
                </View>

    </KeyboardAvoidingView>
  );
}
