import { Button, StyleSheet, View } from "react-native";

import { ThemedText } from "@/components/ThemedText";
import { useAuth } from "@/context/auth";

export default function HomeScreen() {
  const { user, setUser } = useAuth();

  return (
    <View style={styles.container}>
      <ThemedText type="title">Home Screen</ThemedText>

      <ThemedText>{JSON.stringify(user, null, 2)}</ThemedText>
      <Button title="Sign out" color="red" onPress={() => setUser(undefined)} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
});
