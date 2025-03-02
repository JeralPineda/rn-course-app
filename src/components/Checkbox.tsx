import { appleGreen } from "@/constants/Colors";
import ExpoCheckbox, { CheckboxProps } from "expo-checkbox";
import { View } from "react-native";
import { ThemedText } from "./ThemedText";

interface Props extends CheckboxProps {
  label?: string;
}

export function Checkbox({ value, onValueChange, label }: Props) {
  return (
    <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
      <ExpoCheckbox
        value={value}
        onValueChange={onValueChange}
        color={value ? appleGreen : undefined}
      />

      {label && <ThemedText type="subtitle">{label}</ThemedText>}
    </View>
  );
}
