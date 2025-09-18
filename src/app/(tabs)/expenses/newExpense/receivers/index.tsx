import {
  FlatList,
  KeyboardAvoidingView,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import { router } from "expo-router";
import { useState, useEffect } from "react";
import { axiosPrivateClient } from "@/src/utils/axios";
import { useExpenseStore } from "@/src/store/useExpenseStore";
import { useAuthStore } from "@/src/store/useAuthStore";

import ProgressBarComponent from "@/src/components/ProgressBarComponent";
import Checkbox from "expo-checkbox";
import { ButtonCustomizer } from "@/src/components/ButtonCustomizer";
import UserIcon from "@/src/assets/images/user.svg";

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

export default function Receivers() {
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
              grupoId: expenseData.idGrupo,
            },
          }
        );
        setParticipants(data.data);
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
  };

  function handleNext() {
    if (selectedParticipants.length === 0) {
      return;
    }
    setExpenseData({
      ...expenseData,
      pagadores: selectedParticipants,
    });
    router.push("/expenses/newExpense/resume");
  }

  return (
    <KeyboardAvoidingView style={styles.container}>
      <ProgressBarComponent totalSteps={100} currentStep={80} />

      <View style={styles.containerDescription}>
        <Text style={styles.title}>Quem vai rachar?</Text>
        <Text style={styles.text}>
          Selecione os amigos que dividirão essa despesa.
        </Text>
      </View>

      <View style={styles.containerList}>
        <FlatList
          data={participants ?? []}
          keyExtractor={(item) => item.participanteId}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => {
            const isPayer = (expenseData.recebedores ?? []).includes(
              item.participanteId
            );

            return (
              <TouchableOpacity style={styles.containerItem}>
                <View style={styles.itemContent}>
                  <View style={styles.containerUser}>
                    <View style={styles.userIcon}>
                      <UserIcon width={26} height={26} />
                    </View>

                    <View style={styles.payerContainer}>
                      <Text style={styles.checkboxText}>{item.nome}</Text>

                      {isPayer && (
                        <Text style={styles.payerText}>
                          Essa é a pessoa que quitou a despesa.
                        </Text>
                      )}
                    </View>
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
            );
          }}
        />
      </View>

      <View style={styles.containerButton}>
        <ButtonCustomizer.Root
          type="secondary"
          onPress={() => router.back()}
          customStyles={styles.backButton}
        >
          <ButtonCustomizer.Title
            title="Voltar"
            customStyles={styles.backButtonText}
          />
        </ButtonCustomizer.Root>

        <ButtonCustomizer.Root
          type="primary"
          onPress={handleNext}
          disabled={selectedParticipants.length === 0}
          customStyles={
            selectedParticipants.length === 0
              ? styles.disabledButton
              : styles.nextButton
          }
        >
          <ButtonCustomizer.Title
            title="Continuar"
            customStyles={styles.nextButtonText}
          />
        </ButtonCustomizer.Root>
      </View>
    </KeyboardAvoidingView>
  );
}
