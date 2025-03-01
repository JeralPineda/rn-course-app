import { ThemedText } from "@/components/ThemedText";
import { useAuth } from "@/context/auth";
import { View, StyleSheet, Button } from "react-native";

export default function Auth() {
  const { login } = useAuth();

  return (
    <View style={styles.container}>
      <ThemedText type="title">Sign in</ThemedText>
      <Button title="Sign in" onPress={login} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
