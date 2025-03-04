import { ThemedText } from "@/components/ThemedText";
import { View } from "react-native";

export default function Variables() {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <ThemedText type="title">{process.env.EXPO_PUBLIC_MY_VARIABLE}</ThemedText>
      <ThemedText type="subtitle">{process.env.MY_VARIABLE}</ThemedText>
    </View>
  );
}
