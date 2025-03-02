import { Colors, zincColors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme.web";
import { useEffect } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { Separator } from "./Separator";
import { ThemedText } from "./ThemedText";
import { ThemedView } from "./ThemedView";
import { IconSymbol } from "./ui/IconSymbol";

export type DropdownItem = {
  id: string;
  title: string;
  subtitle: string;
  content: React.ReactNode;
};

export type AccordionItemProps = DropdownItem & {
  isActive: boolean;
  onPress: () => void;
  duration?: number;
  showBorder?: boolean;
};

export function ListDropdownItem({
  title,
  subtitle,
  content,
  onPress,
  duration = 500,
  isActive,
  showBorder,
}: AccordionItemProps) {
  const open = useSharedValue(isActive);
  const theme = useColorScheme();

  const height = useSharedValue(0);

  const derivedHeight = useDerivedValue(() =>
    withSpring(height.value * Number(open.value), {
      damping: 50,
      stiffness: 100,
    }),
  );

  const bodyStyle = useAnimatedStyle(() => ({
    height: derivedHeight.value,
  }));

  const rotateIcon = useAnimatedStyle(() => ({
    transform: [
      { rotate: withTiming(open.value ? "180deg" : "0deg", { duration }) },
    ],
  }));

  useEffect(() => {
    open.value = isActive;
  }, [isActive]);

  return (
    <ThemedView
      style={[
        styles.container,
        showBorder && {
          borderBottomWidth: 1,
          borderBottomColor:
            theme === "dark" ? zincColors[800] : zincColors[200],
        },
      ]}
    >
      <TouchableOpacity onPress={onPress} style={styles.buttonContainer}>
        <View style={{ flex: 1 }}>
          <ThemedText type="subtitle">{title}</ThemedText>
          <ThemedText>{subtitle}</ThemedText>
        </View>

        <Animated.View
          style={[
            {
              justifyContent: "center",
              alignItems: "center",
            },
            rotateIcon,
          ]}
        >
          <IconSymbol
            name="chevron.down"
            size={15}
            weight="medium"
            color={theme === "light" ? Colors.light.icon : Colors.dark.icon}
          />
        </Animated.View>
      </TouchableOpacity>

      <View style={styles.content}>
        <Animated.View
          key={`accordionItem_Accordion`}
          style={[styles.animatedView, bodyStyle]}
        >
          <View
            onLayout={(e) => {
              height.value = e.nativeEvent.layout.height;
            }}
            style={styles.wrapper}
          >
            <Separator
              style={{
                position: "absolute",
                left: 16,
                top: 16,
              }}
              orientation="vertical"
            />
            {content}
          </View>
        </Animated.View>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    position: "relative",
  },
  buttonContainer: {
    flex: 1,
    padding: 16,
    display: "flex",
    flexDirection: "row",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  wrapper: {
    width: "100%",
    position: "absolute",
    display: "flex",
    alignItems: "center",
    paddingVertical: 16,
    paddingRight: 16,
    paddingLeft: 32,
  },
  animatedView: {
    width: "100%",
    overflow: "hidden",
  },
});
