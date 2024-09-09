//Dependecies
import React, { useContext } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";


//Navigators
import ProductScreen from "./screens/products";

const Stack = createNativeStackNavigator();

const GeneralStackNavigation = () => {

  return (
    <>
      <StatusBar />
      <Stack.Navigator>
        <Stack.Screen
          name="products"
          component={ProductScreen}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </>
  );
};

export default GeneralStackNavigation;
