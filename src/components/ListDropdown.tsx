import { useState } from "react";
import { ScrollView, ViewStyle } from "react-native";
import { DropdownItem, ListDropdownItem } from "./ListDropdownItem";
import { ThemedView } from "./ThemedView";

interface ListDropdownItemProps {
  data: DropdownItem[];
  containerStyle?: ViewStyle;
}

export function ListDropdown({ data, containerStyle }: ListDropdownItemProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={containerStyle}
      contentContainerStyle={{ paddingBottom: 40 }}
    >
      <ThemedView
        style={{
          borderRadius: 10,
          padding: 1.5,
        }}
      >
        {data.map((item, index) => {
          const isLast = data.length === index + 1;

          return (
            <ListDropdownItem
              key={index}
              isActive={activeIndex === index}
              onPress={() =>
                setActiveIndex(activeIndex === index ? null : index)
              }
              showBorder={!isLast}
              {...item}
            />
          );
        })}
      </ThemedView>
    </ScrollView>
  );
}
