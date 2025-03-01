import { ThemedText } from "@/components/ThemedText";
import { View } from "react-native";

export default function Guest() {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <ThemedText type="title">Guest Role</ThemedText>
    </View>
  );
}
