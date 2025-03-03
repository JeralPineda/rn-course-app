import { icons } from "lucide-react-native";
import { Text, View } from "react-native";

type IconNames = keyof typeof icons;

type TabItem = {
  icon: IconNames;
  title: string;
};

type TabsProps = {
  data: TabItem[];
  selectedIndex: number;
  onTabPress: (index: number) => void;
  activeColor?: string;
  inactiveColor?: string;
  activeBackgroundColor?: string;
  inactiveBackgroundColor?: string;
};

export function Tabs({
  data,
  selectedIndex,
  onTabPress,
  activeColor,
  inactiveColor,
  activeBackgroundColor,
  inactiveBackgroundColor,
}: TabsProps) {
  return (
    <View>
      <Text>Tabs</Text>
    </View>
  );
}
