import { zincColors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme.web";
import { StyleSheet, View, ViewStyle } from "react-native";

interface SeparatorProps {
  style?: ViewStyle;
  orientation?: "horizontal" | "vertical";
  variant?: "accent" | "outline" | "light";
}

export function Separator({
  style,
  orientation,
  variant = "light",
}: SeparatorProps) {
  const theme = useColorScheme();
  const isDarkMode = theme === "dark";

  function getBackgroundColor(): string {
    switch (variant) {
      case "accent":
        return isDarkMode ? zincColors["800"] : zincColors["300"];
      case "outline":
        return isDarkMode ? zincColors["700"] : zincColors["400"];
      default:
        return isDarkMode ? zincColors["800"] : zincColors["200"];
    }
  }

  return (
    <View
      style={[
        style,
        styles[orientation ?? "horizontal"],
        { backgroundColor: getBackgroundColor() },
      ]}
    />
  );
}

const styles = StyleSheet.create({
  separator: {},
  horizontal: {
    height: 1,
    width: "100%",
  },
  vertical: {
    width: 1,
    height: "100%",
  },
});
