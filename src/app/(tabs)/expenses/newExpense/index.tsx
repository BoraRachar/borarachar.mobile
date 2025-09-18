import { useState } from "react";
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useForm, Controller, useWatch } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { router } from "expo-router";

import { ButtonCustomizer } from "@/src/components/ButtonCustomizer";
import { CalendarComponent } from "@/src/components/CalendarComponent";
import { useExpenseStore } from "@/src/store/useExpenseStore";
import { theme } from "@/src/theme";
import { styles } from "./styles";
import ProgressBarComponent from "@/src/components/ProgressBarComponent";

interface FormData {
  expenseName: string;
  description?: string;
}

const schema = yup.object().shape({
  expenseName: yup.string().required("Nome da despesa é obrigatório"),
  description: yup.string().optional(),
});

export default function NewExpense() {
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const { expenseData, setExpenseData } = useExpenseStore();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      expenseName: expenseData.nome || "",
      description: expenseData.descricao || "",
    },
  });

  const expenseName = useWatch({
    control,
    name: "expenseName",
    defaultValue: "",
  });

  const formatDate = (date: Date | null) => {
    if (!date || !(date instanceof Date) || isNaN(date.getTime())) {
      return "DD / MM / YYYY";
    }

    return date.toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  const canProceed = expenseName.trim().length >= 1 && selectedDate !== null;

  const openCalendar = () => {
    setShowCalendar(true);
  };

  const closeCalendar = () => {
    setShowCalendar(false);
  };

  const handleNext = (data: FormData) => {
    const expenseDataToStore = {
      nome: data.expenseName,
      descricao: data.description,
      dataRealizacao: selectedDate,
    };

    setExpenseData(expenseDataToStore);
    router.push("/expenses/newExpense/value");
  };

  return (
    <KeyboardAvoidingView style={styles.modalContainer}>
      <ProgressBarComponent totalSteps={100} currentStep={20} />
      <View style={styles.formContainer}>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>
            Como você deseja chamar essa despesa?
          </Text>
          <Controller
            control={control}
            name="expenseName"
            render={({ field: { onChange, value } }) => (
              <TextInput
                style={[
                  styles.textInput,
                  errors.expenseName ? styles.inputError : undefined,
                ].filter(Boolean)}
                value={value}
                onChangeText={onChange}
                placeholder="Ex: Pagamento da cerveja"
                placeholderTextColor={theme.colors.fourth}
              />
            )}
          />
          {errors.expenseName ? (
            <Text style={styles.errorText}>{errors.expenseName.message}</Text>
          ) : !expenseName.trim() ? (
            <Text style={styles.helperText}>
              Preencha este campo apenas com letras.
            </Text>
          ) : null}
        </View>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>
            Deseja adicionar uma descrição? (opcional)
          </Text>
          <Controller
            control={control}
            name="description"
            render={({ field: { onChange, value } }) => (
              <TextInput
                style={styles.textArea}
                value={value}
                onChangeText={onChange}
                placeholder="Insira uma breve descrição"
                placeholderTextColor={theme.colors.fourth}
                multiline
                numberOfLines={3}
                textAlignVertical="top"
              />
            )}
          />
        </View>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Em que data foi realizada?</Text>
          <TouchableOpacity style={styles.dateInput} onPress={openCalendar}>
            {selectedDate ? (
              <Text style={styles.dateText}>{formatDate(selectedDate)}</Text>
            ) : (
              <Text style={styles.helperDateText}>{"DD / MM / YYYY"}</Text>
            )}
            <Ionicons name="calendar" size={24} color={theme.colors.fourth} />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <ButtonCustomizer.Root
          type="secondary"
          onPress={() => router.back()}
          customStyles={styles.backButton}
        >
          <ButtonCustomizer.Title
            title="Cancelar"
            customStyles={styles.backButtonText}
          />
        </ButtonCustomizer.Root>

        <ButtonCustomizer.Root
          type="primary"
          onPress={handleSubmit(handleNext)}
          disabled={!canProceed}
          customStyles={
            !canProceed
              ? [styles.nextButton, styles.disabledButton]
              : styles.nextButton
          }
        >
          <ButtonCustomizer.Title
            title="Continuar"
            customStyles={styles.nextButtonText}
          />
          <Ionicons
            name="arrow-forward"
            size={20}
            color={theme.colors.white}
            style={{ marginLeft: 8 }}
          />
        </ButtonCustomizer.Root>
      </View>
      <CalendarComponent
        visible={showCalendar}
        onClose={closeCalendar}
        onConfirm={(d) => {
          setSelectedDate(d);
        }}
        defaultValue={selectedDate ?? null}
        autoSelectIfEmpty
        disableFuture
        weekStartsOn={1}
        title="Selecionar data"
      />
    </KeyboardAvoidingView>
  );
}
