import { useAuth } from "@/context/auth";
import { Redirect, Stack } from "expo-router";
import { ActivityIndicator, View } from "react-native";

export const unstable_settings = {
  initialRouteName: "(tabs)",
};

export default function AppLayout() {
  const { user, isLoading } = useAuth();

  if (isLoading)
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <ActivityIndicator size={"large"} />
      </View>
    );

  if (!user) {
    return <Redirect href="/(auth)" />;
  }

  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    </Stack>
  );
}
