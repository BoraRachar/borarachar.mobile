import {
  Text,
  View,
  KeyboardAvoidingView,
  SectionList,
  TouchableOpacity,
} from "react-native";
import { useState, useEffect } from "react";

import Search from "@/src/assets/images/search.svg";
import InputComponent from "@/src/components/InputComponent";
import TransferIcon from "@expo/vector-icons/FontAwesome6";

import { styles } from "./styles";
import { theme } from "@/src/theme";
import { router } from "expo-router";

const DATA = [
  {
    data: "2025-02-04T14:00:00Z",
    atividade: {
      idDespesa: "abc123",
      descDespesa: "Pagamento da Cerveja",
      descGrupo: "Churras do Bora",
      valor: 191.0,
    },
  },
  {
    data: "2025-10-30T14:00:00Z",
    atividade: {
      idDespesa: "abc133",
      descDespesa: "Pagamento da Cerveja",
      descGrupo: "Churras do Bora",
      valor: 191.0,
    },
  },
  {
    data: "2025-10-30T14:00:00Z",
    atividade: {
      idDespesa: "abc134",
      descDespesa: "Pagamento da Cerveja",
      descGrupo: "Churras do Bora",
      valor: 191.0,
    },
  },
  {
    data: "2025-02-04T09:30:00Z",
    atividade: {
      idDespesa: "abc124",
      descDespesa: "Mensalidade",
      descGrupo: "Fut de Sábado",
      valor: 70.0,
    },
  },
  {
    data: "2025-02-03T20:00:00Z",
    atividade: {
      idDespesa: "abc125",
      descDespesa: "Mensalidade",
      descGrupo: "Fut de Sábado",
      valor: 70.0,
    },
  },
  {
    data: "2025-02-03T11:15:00Z",
    atividade: {
      idDespesa: "abc126",
      descDespesa: "Compra de Carne",
      descGrupo: "Churras do Bora",
      valor: 250.0,
    },
  },
  {
    data: "2025-02-02T18:45:00Z",
    atividade: {
      idDespesa: "abc127",
      descDespesa: "Aluguel da Quadra",
      descGrupo: "Fut de Sábado",
      valor: 120.0,
    },
  },
  {
    data: "2025-02-02T09:00:00Z",
    atividade: {
      idDespesa: "abc128",
      descDespesa: "Pix Recebido",
      descGrupo: "Fut de Sábado",
      valor: 60.0,
    },
  },
  {
    data: "2025-02-01T15:30:00Z",
    atividade: {
      idDespesa: "abc129",
      descDespesa: "Compra de Carvão",
      descGrupo: "Churras do Bora",
      valor: 35.0,
    },
  },
  {
    data: "2025-02-01T08:45:00Z",
    atividade: {
      idDespesa: "abc130",
      descDespesa: "Pix Recebido",
      descGrupo: "Churras do Bora",
      valor: 50.0,
    },
  },
  {
    data: "2025-01-31T21:00:00Z",
    atividade: {
      idDespesa: "abc131",
      descDespesa: "Compra de Refrigerante",
      descGrupo: "Aniversário do João",
      valor: 40.0,
    },
  },
  {
    data: "2025-01-31T13:20:00Z",
    atividade: {
      idDespesa: "abc132",
      descDespesa: "Pix Recebido",
      descGrupo: "Aniversário do João",
      valor: 100.0,
    },
  },
];

function filterItems(groupedData) {
  const filteredData = groupedData.filter(() => section.data.length > 0);
}
function formatDate(dataISO) {
  const data = new Date(dataISO);
  const today = new Date();

  const sameDay =
    data.getDate() === today.getDate() &&
    data.getMonth() === today.getMonth() &&
    data.getFullYear() === today.getFullYear();

  if (sameDay) {
    return "Hoje";
  }

  const formated = data.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "long",
  });

  return formated;
}
function agruparPorData(dataArray) {
  const grupos = {};

  dataArray.forEach((item) => {
    const dia = item.data.split("T")[0];

    if (!grupos[dia]) {
      grupos[dia] = [];
    }

    grupos[dia].push(item.atividade);
  });

  const resultado = Object.entries(grupos)
    .sort(([a], [b]) => new Date(b).getTime() - new Date(a).getTime())
    .map(([dataISO, atividades]) => ({
      title: formatDate(dataISO),
      data: atividades,
    }));

  return resultado;
}

const groupedData = agruparPorData(DATA);
console.log(groupedData);

const hasActivity =
  groupedData.length > 0 &&
  groupedData.some((section) => section.data.length > 0);

function handleNext() {
  // aqui falta a lógica para escolher se vai para a tela de usuario ou de amigo
  router.push("/(tabs)/activity/userActivity");
}

export default function Activity() {
  const [search, setSearch] = useState("");
  const [filteredData, setFilteredData] = useState(groupedData);
  const [debounceSearch, setDebounceSearch] = useState(search);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebounceSearch(search);
    }, 500);
    return () => clearTimeout(timer);
  }, [search]);

  useEffect(() => {
    if (debounceSearch.length >= 3) {
      const filtered = groupedData
        .map((section) => ({
          ...section,
          data: section.data.filter(
            (actvity) =>
              actvity.descDespesa
                ?.toLowerCase()
                .includes(debounceSearch.toLowerCase()) ||
              actvity.descGrupo
                ?.toLowerCase()
                .includes(debounceSearch.toLowerCase())
          ),
        }))
        .filter((section) => section.data.length > 0);
      setFilteredData(filtered);
    } else {
      setFilteredData(groupedData);
    }
  }, [debounceSearch]);

  return (
    <KeyboardAvoidingView style={styles.container}>
      <View>
        <Text style={styles.title}>Minhas atividades</Text>
      </View>

      {hasActivity ? (
        <View style={styles.containerActivity}>
          <InputComponent
            placeholder="Nome, grupo, data..."
            icon={Search}
            customStyle={styles.input}
            value={search}
            onChangeText={setSearch}
          />
          <SectionList
            sections={filteredData}
            keyExtractor={(item) => item.idDespesa}
            renderSectionHeader={({ section: { title } }) => (
              <View style={styles.dateContainer}>
                <Text style={styles.dateTitle}>{title}</Text>
              </View>
            )}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.activityItem}
                onPress={handleNext}
              >
                <TransferIcon
                  name="money-bill-transfer"
                  size={24}
                  color={theme.colors.primaryColor}
                />
                <View>
                  <Text style={styles.activityDesc}>{item.descDespesa}</Text>
                  <Text style={styles.activityGroup}>{item.descGrupo}</Text>
                </View>
                <Text style={styles.activityValue}>
                  R$ {item.valor.toFixed(2)}
                </Text>
              </TouchableOpacity>
            )}
            showsVerticalScrollIndicator={false}
          />
        </View>
      ) : (
        <View>
          <Text style={styles.textNoActivity}>
            Você ainda não possui nenhum histórico de atividades.
          </Text>
        </View>
      )}
    </KeyboardAvoidingView>
  );
}
