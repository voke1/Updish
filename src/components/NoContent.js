import { View, Text } from "react-native";
import React, { useContext } from "react";
import tw from "twrnc";

const NoContent = ({ msg, icon }) => {
  return (
    <View
      style={[
        tw`mx-5`,
        {
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
        },
      ]}
    >
      {icon}
      <Text
        style={[
          tw`my-3 capitalize text-center`,
          {
            fontFamily: "Raleway_400Regular",
            fontSize: 18,
            color: "#ffffff",
          },
        ]}
      >
        {msg}
      </Text>
    </View>
  );
};

export default NoContent;
