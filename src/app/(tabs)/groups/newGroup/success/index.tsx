import { Text, View } from "react-native";

import TeamSpiritImage from '@/src/assets/images/teamSpirit.svg'
import { horizontalScale, verticalScale } from "@/src/utils/responsiveUtils";
import { ButtonCustomizer } from "@/src/components/ButtonCustomizer";

import { styles as globalStyles } from "@/src/app/styles";
import { styles } from "../styles";
import { router, useLocalSearchParams } from "expo-router";

export default function Success() {
  const { nome } = useLocalSearchParams()
  return (
    <View
      style={[styles.container, { alignItems: 'center', justifyContent: 'space-around' }]}
    >
      <TeamSpiritImage width={horizontalScale(296)} height={verticalScale(296)} />

      <View style={{ gap: 8 }}>
        <Text style={styles.title}>{`Grupo “${nome}” criado com sucesso!`}</Text>
        <Text style={styles.description}>Enviaremos uma notificação por e-mail aos participantes adicionados.</Text>
      </View>

      <View style={{ width: '100%' }}>
        <ButtonCustomizer.Root
          type="primary"
          customStyles={globalStyles.primaryButton}
          onPress={() => router.replace('/groups')}
        >
          <ButtonCustomizer.Title title="Nova despesa" customStyles={globalStyles.primaryButtonText} />
        </ButtonCustomizer.Root>
      </View>
    </View>
  )
}
