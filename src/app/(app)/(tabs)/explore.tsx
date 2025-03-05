import { StyleSheet, Image, Platform } from "react-native";

import { Collapsible } from "@/components/Collapsible";
import { ExternalLink } from "@/components/ExternalLink";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { usePathname } from "expo-router";
import Button from "@/components/Button";
import { useState } from "react";

export default function TabTwoScreen() {
  const pathname = usePathname();
  const [postResponse, setPostResponse] = useState();
  const [getResponse, setGetResponse] = useState();

  async function handlePostRequest(userId: string) {
    try {
      const response = await fetch("/api/user", {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({
          userId,
        }),
      });

      if (!response.ok) {
        // Handle HTTP errors explicitly
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      setPostResponse(data);
      console.log("🚀 explore.tsx -> #32 -> data ~", data);
    } catch (e) {
      alert("Something went wrong");
    }
  }

  async function handleGetRequest() {
    try {
      const response = await fetch("/api/user", {
        headers: {
          "Content-Type": "application/json",
        },
        method: "GET",
      });

      if (!response.ok) {
        // Handle HTTP errors explicitly
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      setGetResponse(data);
      console.log("🚀 explore.tsx -> #32 -> data ~", data);
    } catch (e) {
      alert("Something went wrong");
    }
  }

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#D0D0D0", dark: "#353636" }}
      headerImage={
        <IconSymbol
          size={310}
          color="#808080"
          name="chevron.left.forwardslash.chevron.right"
          style={styles.headerImage}
        />
      }
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">{pathname === "/explore" && "API Routes"}</ThemedText>
      </ThemedView>
      <Button onPress={() => handlePostRequest("1")}>POST Request</Button>
      <ThemedText>{JSON.stringify(postResponse, null, 2)}</ThemedText>

      <Button onPress={handleGetRequest}>GET Request</Button>
      <ThemedText>{JSON.stringify(getResponse, null, 2)}</ThemedText>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: "#808080",
    bottom: -90,
    left: -35,
    position: "absolute",
  },
  titleContainer: {
    flexDirection: "row",
    gap: 8,
  },
});
