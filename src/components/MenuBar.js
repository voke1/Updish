import React from "react";
import { TouchableOpacity } from "react-native";
import { Entypo } from "@expo/vector-icons";

const MenuBar = ({ toggler }) => {
  const toggle = () => {
    toggler();
  };
  return (
    <TouchableOpacity onPress={toggle}>
      <Entypo name="menu" size={30} color="white" />
    </TouchableOpacity>
  );
};

export default MenuBar;
