import { Link } from "expo-router";
import { Text, View, KeyboardAvoidingView } from "react-native";
import InputComponent from "@/src/components/InputComponent";

export default function Activity() {
  return (
    <KeyboardAvoidingView>
      <View>
        <Text>Minhas atividades</Text>
        <InputComponent placeholder="Nome, grupo, data..." />
      </View>
    </KeyboardAvoidingView>
  );
}
