import { ThemedText } from "@/components/ThemedText";
import { useAuth, User, UserRole } from "@/context/auth";
import { Button, View } from "react-native";

export default function Admin() {
  const { user, setUser } = useAuth();

  if (user?.role !== UserRole.Admin) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <ThemedText>You don't have access</ThemedText>
        <Button
          title="Become an Admin"
          onPress={() => setUser((prev) => ({ ...prev, role: UserRole.Admin } as User))}
        />
      </View>
    );
  }

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <ThemedText type="title">Hello {user?.name}</ThemedText>
    </View>
  );
}
