const environment = process.env.NODE_ENV;

const myUrl = environment === "development" ? "http://localhost:8081" : "https://jeralpineda.dev";

export default {
  name: "rn-course-app",
  slug: "rn-course-app",
  version: "1.0.0",
  orientation: "portrait",
  icon: "./src/assets/images/icon.png",
  scheme: "rncourseapp.jeralpineda",
  userInterfaceStyle: "automatic",
  newArchEnabled: true,
  ios: {
    supportsTablet: true,
    bundleIdentifier: "com.jeral495.rn-course-app",
  },
  android: {
    adaptiveIcon: {
      foregroundImage: "./src/assets/images/adaptive-icon.png",
      backgroundColor: "#ffffff",
    },
  },
  web: {
    bundler: "metro",
    output: "server",
    favicon: "./src/assets/images/favicon.png",
  },
  plugins: [
    [
      "expo-router",
      {
        origin: myUrl,
      },
    ],
    [
      "expo-splash-screen",
      {
        image: "./src/assets/images/splash-icon.png",
        imageWidth: 200,
        resizeMode: "contain",
        backgroundColor: "#ffffff",
      },
    ],
  ],
  experiments: {
    typedRoutes: true,
  },
};
