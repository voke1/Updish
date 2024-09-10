// Dependencies
import React, { useCallback, useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import * as SplashScreen from "expo-splash-screen";
import { SafeAreaProvider } from "react-native-safe-area-context";
import {
  useFonts,
  Raleway_400Regular,
  Raleway_200ExtraLight,
  Raleway_700Bold,
  Raleway_300Light,
  Raleway_100Thin,
} from "@expo-google-fonts/raleway";

// Navigation
import GeneralStackNavigation from "./src/navigator.js";

// State
import { FoodState } from "./src/context/state";

const App = () => {
  const [fontsLoaded] = useFonts({
    Raleway_400Regular,
    Raleway_200ExtraLight,
    Raleway_700Bold,
    Raleway_300Light,
    Raleway_100Thin,
  });

  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    const prepare = async () => {
      // Keep the splash screen visible while we fetch resources
      await SplashScreen.preventAutoHideAsync();

      try {
        // Simulate a delay of 2 seconds to keep the splash screen visible
        await new Promise((resolve) => setTimeout(resolve, 2000));
      } catch (e) {
        console.warn(e);
      } finally {
        // After the delay, set app as ready
        setAppIsReady(true);
      }
    };

    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady && fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady, fontsLoaded]);

  if (!fontsLoaded || !appIsReady) {
    return null;
  }

  return (
    <SafeAreaProvider style={{ flex: 1 }} onLayout={onLayoutRootView}>
      <FoodState>
        <NavigationContainer>
          <GeneralStackNavigation />
        </NavigationContainer>
      </FoodState>
    </SafeAreaProvider>
  );
};

export default App;
