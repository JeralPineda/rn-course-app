const environment = process.env.NODE_ENV;
const IS_DEV = process.env.APP_VARIANT === "development";
const IS_QA = process.env.APP_VARIANT === "preview";

interface EnvironmentValues {
  name: string;
  bundleIdentifier: string;
  package: string;
}

function getEnvironmetValues(): EnvironmentValues {
  if (IS_DEV) {
    return {
      name: "Course App (DEV)",
      bundleIdentifier: "com.jeral495.rncourseapp.dev",
      package: "com.jeral495.rncourseapp.dev",
    };
  }

  if (IS_QA) {
    return {
      name: "Course App (QA)",
      bundleIdentifier: "com.jeral495.rncourseapp.qa",
      package: "com.jeral495.rncourseapp.qa",
    };
  }

  return {
    name: "Course App JP",
    bundleIdentifier: "com.jeral495.rncourseapp",
    package: "com.jeral495.rncourseapp",
  };
}

const myUrl = environment === "development" ? "http://localhost:8081" : "https://jeralpineda.dev";

export default {
  name: getEnvironmetValues().name,
  slug: "rn-course-app",
  owner: "jeral495",
  version: "1.0.0",
  orientation: "portrait",
  icon: "./src/assets/images/icon.png",
  scheme: "rncourseapp.jeralpineda",
  userInterfaceStyle: "automatic",
  newArchEnabled: true,
  ios: {
    supportsTablet: true,
    bundleIdentifier: getEnvironmetValues().bundleIdentifier,
    infoPlist: {
      ITSAppUsesNonExemptEncryption: false,
    },
  },
  android: {
    package: getEnvironmetValues().package,
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
  extra: {
    eas: {
      projectId: "cfd43cbc-a273-4e15-9aad-38693193bace",
    },
  },
  updates: {
    url: "https://u.expo.dev/cfd43cbc-a273-4e15-9aad-38693193bace",
  },
  runtimeVersion: {
    policy: "appVersion",
  },
};
