import { Button, StyleSheet, View } from "react-native";

import { ThemedText } from "@/components/ThemedText";
import { useAuth } from "@/context/auth";
import { supabase } from "@/utils/supabase";

export default function HomeScreen() {
  const { user, setUser } = useAuth();

  async function fetchTodos() {
    const { data } = (await supabase.from("todos").select("*")) as {
      data: { text: string; id: number; is_completed: boolean }[];
    };
    console.log("🚀 index.tsx -> #14 -> data ~", JSON.stringify(data, null, 2));
  }

  async function createTodo() {
    const { status } = await supabase.from("todos").insert([
      {
        text: `${Math.random()} New Todo from client`,
      },
    ]);
    console.log("🚀 index.tsx -> #23 -> status ~", status);
  }

  return (
    <View style={styles.container}>
      <ThemedText type="title" testID="home">
        Supabase Todos
      </ThemedText>
      <Button title="Fetch todos" color="blue" onPress={fetchTodos} />
      <Button title="Create Todo" onPress={createTodo} />
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
