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

//Navigation
import GeneralStackNavigation from "./src/navigator.js";

// State
// import { VehicleState } from "./src/context/state";

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
      // keep the splash screen visible while we fetch resources
      await SplashScreen.preventAutoHideAsync();
      try {
      } catch (e) {
        return;
      } finally {
        // tell the application to render
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

  if (!fontsLoaded) {
    return;
  }

  if (!appIsReady) {
    return;
  }

  return (
    <SafeAreaProvider
      style={{ flex: 1, backgroundColor: "#E4B511" }}
      onLayout={onLayoutRootView}
    >
      {/* <VehicleState> */}
        <NavigationContainer>
          <GeneralStackNavigation />
        </NavigationContainer>
      {/* </VehicleState> */}
    </SafeAreaProvider>
  );
};

export default App;
