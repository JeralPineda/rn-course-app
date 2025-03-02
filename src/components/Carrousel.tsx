import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { ThemedText } from "./ThemedText";
import { DropdownItem } from "./ListDropdownItem";
import { useState } from "react";
import { useColorScheme } from "@/hooks/useColorScheme.web";
import { Colors, zincColors } from "@/constants/Colors";

interface CarrouselProps {
  data: DropdownItem[];
  defaultIndex?: number | string;
}

export function Carrousel({ data, defaultIndex }: CarrouselProps) {
  const [selectedOption, setSelectedOption] = useState(defaultIndex);
  const theme = useColorScheme();
  const isDarkMode = theme === "dark";

  const getBackgroundColor = (id: number | string) => {
    switch (selectedOption === id) {
      case true:
        return {
          backgroundColor: isDarkMode ? zincColors["50"] : zincColors["900"],
        };
      default:
        return { backgroundColor: "transparent" };
    }
  };

  const getColor = (id: number | string) => {
    if (id === selectedOption) {
      return isDarkMode ? Colors.light.text : Colors.dark.text;
    }

    return isDarkMode ? zincColors["50"] : zincColors["950"];
  };

  const getBorderColor = (id: number | string) => {
    if (id === selectedOption) {
      return {
        borderColor: isDarkMode ? zincColors["50"] : zincColors["900"],
      };
    }

    return {
      borderColor: isDarkMode ? zincColors["700"] : zincColors["300"],
    };
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={{ marginTop: 20 }}>
      <ScrollView
        horizontal
        style={{ maxHeight: 50 }}
        contentContainerStyle={{ gap: 8 }}
        showsHorizontalScrollIndicator={false}
      >
        {data.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={[
              {
                flex: 1,
                borderWidth: 1,
                justifyContent: "center",
                alignItems: "center",
                paddingVertical: 10,
                paddingHorizontal: 12,
                borderRadius: 10,
              },
              getBackgroundColor(item.id),
              getBorderColor(item.id),
            ]}
            onPress={() => setSelectedOption(item.id)}
          >
            <Text style={{ color: getColor(item.id) }}>{item.id}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <View style={{ marginTop: 16 }}>
        <ThemedText type="subtitle">
          {data.find((item) => item.id === selectedOption)?.title}
        </ThemedText>

        <ThemedText>
          {data.find((item) => item.id === selectedOption)?.subtitle}
        </ThemedText>

        {data.find((item) => item.id === selectedOption)?.content}
      </View>
    </ScrollView>
  );
}
