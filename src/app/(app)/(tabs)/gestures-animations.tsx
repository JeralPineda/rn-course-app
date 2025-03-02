import { Carrousel } from "@/components/Carrousel";
import { Checkbox } from "@/components/Checkbox";
import { ListDropdown } from "@/components/ListDropdown";
import { ThemedText } from "@/components/ThemedText";
import {
  appleBlue,
  appleGreen,
  appleRed,
  zincColors,
} from "@/constants/Colors";
import { useState } from "react";
import {
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
  ViewStyle,
} from "react-native";
import {
  Directions,
  Gesture,
  GestureDetector,
} from "react-native-gesture-handler";
import Animated, {
  SharedValue,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import ReanimatedSwipeable from "react-native-gesture-handler/ReanimatedSwipeable";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { useColorScheme } from "@/hooks/useColorScheme";

const Box = ({
  style,
  children,
}: {
  style?: ViewStyle;
  children?: React.ReactNode;
}) => {
  return (
    <Animated.View
      style={
        StyleSheet.compose(
          {
            width: 200,
            height: 200,
            backgroundColor: appleBlue,
            borderRadius: 16,
          },
          style,
        ) as ViewStyle
      }
    >
      {children}
    </Animated.View>
  );
};

// Pan gesture
const PanGestureExample = () => {
  const offset = useSharedValue({ x: 0, y: 0 });
  const start = useSharedValue({ x: 0, y: 0 });

  // const panGesture = Gesture.Pan()
  //   .onUpdate((e) => {
  //     offset.value = {
  //       x: e.translationX + start.value.x,
  //       y: e.translationY + start.value.y,
  //     };
  //   })
  //   .onEnd((e) => {
  //     start.value = {
  //       x: offset.value.x,
  //       y: offset.value.y,
  //     };
  //   });
  //
  // const animatedStyle = useAnimatedStyle(() => ({
  //   transform: [
  //     {
  //       translateX: offset.value.x,
  //     },
  //     {
  //       translateY: offset.value.y,
  //     },
  //   ],
  // }));

  // Tamaño del contenedor y del Box, para aplicar límites
  const containerWidth = 350;
  const containerHeight = 400;
  const boxSize = 200; // Mismo width y height del Box

  const panGesture = Gesture.Pan()
    .onUpdate((e) => {
      const newX = e.translationX + start.value.x;
      const newY = e.translationY + start.value.y;

      // Aplicar límites
      offset.value = {
        x: Math.max(
          -containerWidth / 2 + boxSize / 2,
          Math.min(containerWidth / 2 - boxSize / 2, newX),
        ),
        y: Math.max(
          -containerHeight / 2 + boxSize / 2,
          Math.min(containerHeight / 2 - boxSize / 2, newY),
        ),
      };
    })
    .onEnd(() => {
      start.value = { x: offset.value.x, y: offset.value.y };
    });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: offset.value.x }, { translateY: offset.value.y }],
  }));

  return (
    <View
      style={{ height: 400, justifyContent: "center", alignItems: "center" }}
    >
      <GestureDetector gesture={panGesture}>
        <Box style={animatedStyle} />
      </GestureDetector>
    </View>
  );
};

// Tap gesture
const TapGestureExample = () => {
  const scale = useSharedValue(1);

  const tapGesture = Gesture.Tap()
    .maxDuration(250)
    .onBegin(() => {
      scale.value = withSpring(1.2);
    })
    .onFinalize(() => {
      scale.value = withSpring(1);
    });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      {
        scale: scale.value,
      },
    ],
  }));

  return (
    <View
      style={{
        height: 400,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <GestureDetector gesture={tapGesture}>
        <Box style={animatedStyle} />
      </GestureDetector>
    </View>
  );
};

// Long press gesture
const LongPressGestureExample = () => {
  const scale = useSharedValue(1);
  const opacity = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      {
        scale: scale.value,
      },
    ],
    opacity: opacity.value,
  }));

  const longPressGesture = Gesture.Tap()
    .maxDuration(250)
    .onBegin(() => {
      scale.value = withSpring(1.3);
      opacity.value = withTiming(0.5);
    })
    .onFinalize(() => {
      scale.value = withSpring(1);
      opacity.value = withTiming(1);
    });

  return (
    <View
      style={{
        height: 400,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <GestureDetector gesture={longPressGesture}>
        <Box style={animatedStyle} />
      </GestureDetector>
    </View>
  );
};

// Rotation gesture
const RotationGestureExample = () => {
  const rotation = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      {
        rotateZ: `${rotation.value}rad`,
      },
    ],
  }));

  const rotationGesture = Gesture.Rotation().onUpdate((e) => {
    rotation.value = e.rotation;
  });

  return (
    <View
      style={{
        height: 400,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <GestureDetector gesture={rotationGesture}>
        <Box style={animatedStyle} />
      </GestureDetector>
    </View>
  );
};
// Pinch Gesture Example
const PinchGestureExample = () => {
  const scale = useSharedValue(1);
  const savedScale = useSharedValue(1);

  const animatedStyles = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const pinchGesture = Gesture.Pinch()
    .onUpdate((e) => {
      scale.value = savedScale.value * e.scale;
    })
    .onEnd(() => {
      savedScale.value = scale.value;
    });

  return (
    <View
      style={{
        height: 400,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <GestureDetector gesture={pinchGesture}>
        <Box style={animatedStyles} />
      </GestureDetector>
    </View>
  );
};

// Fling Gesture Example
const FlingGestureExample = () => {
  const position = useSharedValue(0);
  const flingGesture = Gesture.Simultaneous(
    Gesture.Fling()
      .direction(Directions.RIGHT)
      .onStart((e) => {
        position.value = withTiming(position.value + 10, { duration: 100 });
      }),
    Gesture.Fling()
      .direction(Directions.LEFT)
      .onStart((e) => {
        position.value = withTiming(position.value - 10, { duration: 100 });
      }),
  );

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: position.value }],
  }));

  return (
    <View
      style={{ height: 400, alignItems: "center", justifyContent: "center" }}
    >
      <GestureDetector gesture={flingGesture}>
        <Box style={animatedStyle} />
      </GestureDetector>
    </View>
  );
};

// Composed Gestures Example
const ComposedGesturesExample = () => {
  const scale = useSharedValue(1);
  const savedScale = useSharedValue(1);
  const rotation = useSharedValue(0);
  const savedRotation = useSharedValue(0);
  const offset = useSharedValue({ x: 0, y: 0 });
  const start = useSharedValue({ x: 0, y: 0 });

  const animatedStyles = useAnimatedStyle(() => ({
    transform: [
      { scale: scale.value },
      { rotateZ: `${rotation.value}rad` },
      {
        translateX: offset.value.x,
      },
      {
        translateY: offset.value.y,
      },
    ],
  }));
  const panGesture = Gesture.Pan()
    .onUpdate((e) => {
      offset.value = {
        x: e.translationX + start.value.x,
        y: e.translationY + start.value.y,
      };
    })
    .onEnd((e) => {
      start.value = {
        x: offset.value.x,
        y: offset.value.y,
      };
    });

  const pinchGesture = Gesture.Pinch()
    .onUpdate((e) => {
      scale.value = savedScale.value * e.scale;
    })
    .onEnd(() => {
      savedScale.value = scale.value;
    });

  const rotationGesture = Gesture.Rotation()
    .onUpdate((e) => {
      rotation.value = savedRotation.value + e.rotation;
    })
    .onEnd(() => {
      savedRotation.value = rotation.value;
    });

  const composed = Gesture.Simultaneous(
    pinchGesture,
    Gesture.Simultaneous(rotationGesture, panGesture),
  );

  return (
    <View
      style={{
        height: 400,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <GestureDetector gesture={composed}>
        <Box style={animatedStyles} />
      </GestureDetector>
    </View>
  );
};

// Race Gestures Example
const RaceGesturesExample = () => {
  const scale = useSharedValue(1);
  const savedScale = useSharedValue(1);
  const rotation = useSharedValue(0);
  const savedRotation = useSharedValue(0);

  const animatedStyles = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }, { rotateZ: `${rotation.value}rad` }],
  }));

  const pinchGesture = Gesture.Pinch()
    .onUpdate((e) => {
      scale.value = savedScale.value * e.scale;
    })
    .onEnd(() => {
      savedScale.value = scale.value;
    });

  const rotationGesture = Gesture.Rotation()
    .onUpdate((e) => {
      rotation.value = savedRotation.value + e.rotation;
    })
    .onEnd(() => {
      savedRotation.value = rotation.value;
    });

  const composed = Gesture.Race(pinchGesture, rotationGesture);

  return (
    <View
      style={{
        height: 400,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <GestureDetector gesture={composed}>
        <Box style={animatedStyles} />
      </GestureDetector>
    </View>
  );
};

const SwipeableComponent = () => {
  const theme = useColorScheme();

  const RightAction = (
    prog: SharedValue<number>,
    drag: SharedValue<number>,
  ) => {
    const styleAnimation = useAnimatedStyle(() => ({
      transform: [{ translateX: drag.value + 50 }],
    }));

    return (
      <Pressable onPress={() => alert("You have pressed right action!")}>
        <Animated.View
          style={[
            styleAnimation,
            {
              alignItems: "center",
              justifyContent: "center",
              height: 50,
              width: 50,
              borderWidth: 1,
              backgroundColor:
                theme === "dark" ? zincColors["950"] : zincColors["100"],
              borderColor:
                theme === "dark" ? zincColors["800"] : zincColors["300"],
            },
          ]}
        >
          <IconSymbol name="trash" color={appleRed} />
        </Animated.View>
      </Pressable>
    );
  };

  const LeftAction = (prog: SharedValue<number>, drag: SharedValue<number>) => {
    const styleAnimation = useAnimatedStyle(() => ({
      transform: [{ translateX: drag.value - 50 }],
    }));

    return (
      <Pressable onPress={() => alert("You have pressed left action!")}>
        <Animated.View
          style={[
            styleAnimation,
            {
              alignItems: "center",
              justifyContent: "center",
              height: 50,
              width: 50,
              borderWidth: 1,
              backgroundColor:
                theme === "dark" ? zincColors["950"] : zincColors["100"],
              borderColor:
                theme === "dark" ? zincColors["800"] : zincColors["300"],
            },
          ]}
        >
          <IconSymbol name="checkmark" color={appleGreen} />
        </Animated.View>
      </Pressable>
    );
  };

  return (
    <View style={{ width: "100%" }}>
      <ScrollView contentContainerStyle={{ rowGap: 12, marginTop: 16 }}>
        {["😅 item 1", "🚀 item 2", "📢 new course!"].map((item) => (
          <ReanimatedSwipeable
            key={item}
            renderRightActions={RightAction}
            renderLeftActions={LeftAction}
            friction={2}
            rightThreshold={40}
            enableTrackpadTwoFingerGesture
          >
            <View
              style={{
                width: "100%",
                height: 50,
                borderWidth: 1,
                backgroundColor:
                  theme === "dark" ? zincColors["900"] : zincColors["50"],
                alignItems: "center",
                justifyContent: "center",
                borderColor:
                  theme === "dark" ? zincColors["800"] : zincColors["200"],
              }}
            >
              <ThemedText>{item}</ThemedText>
            </View>
          </ReanimatedSwipeable>
        ))}
      </ScrollView>
    </View>
  );
};

const data = [
  {
    id: "pan",
    title: "Pan Gesture",
    subtitle: "Drag the box around",
    content: <PanGestureExample />,
  },
  {
    id: "tap",
    title: "Tap Gesture",
    subtitle: "Tap the box around",
    content: <TapGestureExample />,
  },
  {
    id: "longPress",
    title: "Long Press Gesture",
    subtitle: "Long press the box around",
    content: <LongPressGestureExample />,
  },
  {
    id: "rotation",
    title: "Rotation Gesture",
    subtitle: "Rotate the box around",
    content: <RotationGestureExample />,
  },
  {
    id: "pinch",
    title: "Pinch Gesture",
    subtitle: "Pinch the box around",
    content: <PinchGestureExample />,
  },
  {
    id: "fling",
    title: "Fling Gesture",
    subtitle: "Quickly swipe left or right to fling the box.",
    content: <FlingGestureExample />,
  },
  {
    id: "composed",
    title: "Composed Gesture",
    subtitle: "Pinch and rotate the box simultaneously",
    content: <ComposedGesturesExample />,
  },
  {
    id: "race",
    title: "Race Gesture",
    subtitle: "Race between pinch and rotate",
    content: <RaceGesturesExample />,
  },
  {
    id: "swipeable",
    title: "Swipeable Component",
    subtitle: "Swipe left and right to delete and add items",
    content: <SwipeableComponent />,
  },
];

export default function GesturesAndAnimations() {
  const [checked, setChecked] = useState(true);
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, padding: 16 }}>
        <ThemedText type="title" style={{ marginBottom: 20 }}>
          Gestures and Animations
        </ThemedText>
        <Checkbox
          value={checked}
          onValueChange={() => setChecked(!checked)}
          label="Carraousel / Dropdown"
        />

        {checked ? (
          <Carrousel data={data} defaultIndex="pan" />
        ) : (
          <ListDropdown data={data} containerStyle={{ marginTop: 20 }} />
        )}
      </View>
    </SafeAreaView>
  );
}
