import { View, Text, Dimensions, TouchableOpacity } from "react-native";
import { useContext } from "react";
import tw from "twrnc";
import MenuBar from "./MenuBar";
import { useNavigation } from "@react-navigation/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const Header = ({ route, title }) => {
  const navigation = useNavigation();
  const { width } = Dimensions.get("window");

  const toggler = () => {
    navigation.toggleDrawer();
  };

  if (route == "home")
    return (
      <View
        style={[
          tw`p-3`,
          {
            top: 0,
            backgroundColor: "black",
            alignItems: "center",
            flexDirection: "row",
            justifyContent: "space-between",
          },
        ]}
      >
        <MenuBar toggler={toggler} />
        <Text
          style={{
            color: "white",
          }}
        >
          <Text
            style={
              width < 370
                ? [
                    tw`text-sm`,
                    {
                      fontFamily: "Raleway_700Bold",
                    },
                  ]
                : [
                    tw`text-xl`,
                    {
                      fontFamily: "Raleway_700Bold",
                    },
                  ]
            }
            adjustsFontSizeToFit
            numberOfLines={1}
          >
            Spotlight{" "}
            <Text
              style={
                width < 370
                  ? [
                      tw`text-sm`,
                      {
                        fontFamily: "Raleway_400Regular",
                      },
                    ]
                  : [
                      tw`text-xl`,
                      {
                        fontFamily: "Raleway_400Regular",
                      },
                    ]
              }
              adjustsFontSizeToFit
              numberOfLines={1}
            >
              App
            </Text>
          </Text>
        </Text>
        <TouchableOpacity
          onPress={() => {
            console.log("PRESSED!");
          }}
        >
          <MaterialCommunityIcons name="bell-badge" size={26} color="white" />
        </TouchableOpacity>
      </View>
    );

  if (route == "tyre inspections")
    return (
      <View
        style={[
          tw`p-3`,
          {
            top: 0,
            backgroundColor: "black",
            alignItems: "center",
            flexDirection: "row",
          },
        ]}
      >
        <MenuBar toggler={toggler} />
        <View style={tw`ml-2`}>
          <Text
            style={{
              color: "white",
            }}
          >
            <Text
              style={
                width < 370
                  ? [
                      tw`text-sm`,
                      {
                        fontFamily: "Raleway_700Bold",
                      },
                    ]
                  : [
                      tw`text-xl`,
                      {
                        fontFamily: "Raleway_700Bold",
                      },
                    ]
              }
              adjustsFontSizeToFit
              numberOfLines={1}
            >
              {title}
            </Text>
          </Text>
        </View>
      </View>
    );

  if (route == "tyre in-store")
    return (
      <View
        style={[
          tw`p-3`,
          {
            top: 0,
            backgroundColor: "black",
            alignItems: "center",
            flexDirection: "row",
          },
        ]}
      >
        <MenuBar toggler={toggler} />
        <View style={tw`ml-2`}>
          <Text
            style={{
              color: "white",
            }}
          >
            <Text
              style={
                width < 370
                  ? [
                      tw`text-sm`,
                      {
                        fontFamily: "Raleway_700Bold",
                      },
                    ]
                  : [
                      tw`text-xl`,
                      {
                        fontFamily: "Raleway_700Bold",
                      },
                    ]
              }
              adjustsFontSizeToFit
              numberOfLines={1}
            >
              {title}
            </Text>
          </Text>
        </View>
      </View>
    );
};

export default Header;
