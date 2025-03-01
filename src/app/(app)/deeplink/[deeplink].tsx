import { ThemedText } from "@/components/ThemedText";
import { useLocalSearchParams } from "expo-router";
import { View } from "react-native";

export default function DeepLink() {
  const { deeplink } = useLocalSearchParams();
  console.log("🚀 [deeplink].tsx -> #7 ~ deeplink:", deeplink);

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <ThemedText type="title">Deep Link</ThemedText>
      <ThemedText type="subtitle">{deeplink}</ThemedText>
    </View>
  );
}
