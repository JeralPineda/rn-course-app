import { useAuth } from "@/context/auth";
import { Redirect, Stack } from "expo-router";
import { ActivityIndicator, View } from "react-native";

export default function AuthLayout() {
  const { user, isLoading } = useAuth();

  if (isLoading)
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <ActivityIndicator size={"large"} />
      </View>
    );

  if (user) {
    return <Redirect href={"/(app)/(tabs)"} />;
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
    </Stack>
  );
}
