import {
  View,
  Text,
  Pressable,
  Image,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  RefreshControl,
} from "react-native";
import { useContext, useState, useEffect, Fragment } from "react";
// import { UtilsContext } from "../../../../general/contexts/utils/state";
import tw from "twrnc";
import { MaterialCommunityIcons, FontAwesome } from "@expo/vector-icons";
import NoContent from "../components/NoContent";
import Header from "../components/Header";
import { CoachingLoader } from "../components/SkeletonLoader";
import { VehicleContext } from "../context/state";
import PaginationIndicator from "../components/PaginationIndicator";
import image from "../constants/image";

const ProductScreen = ({ route, navigation }) => {
  //   const { colorScheme } = useContext(UtilsContext);
  //   const { noImage } = images;
  //   const { textFormater, getTimeAgo } = Formater();
  //   const { coachingID } = route.params;
  const { food1 } = image;
  const {
    vehicles,
    vehiclePagination,
    vehicleLoading,
    isFetchMore,
    fetchVehiclesErrMsg,
    fetchVehicles,
    fetchMoreVehicles,
  } = useContext(VehicleContext);

  useEffect(() => {
    fetchVehicles();
  }, []);

  const showActivities = () => {
    return (
      <>
        {vehicleLoading ? (
          <CoachingLoader />
        ) : fetchVehiclesErrMsg ? (
          <NoContent
            msg={"An error occured!"}
            icon={
              <MaterialCommunityIcons
                name="collage"
                size={40}
                style={tw`text-red-500`}
              />
            }
          />
        ) : !(vehicles.length > 0) ? (
          <NoContent
            msg={"No Vehicles Found"}
            icon={
              <MaterialCommunityIcons
                name="collage"
                size={40}
                color="#E5B611"
              />
            }
          />
        ) : (
          <Fragment>
            {
              <FlatList
                data={vehicles}
                renderItem={({ item }) => (
                  <Pressable
                    style={[
                      tw`mb-7`,
                      {
                        flexDirection: "row",
                      },
                    ]}
                    onPress={() => {
                      navigation.navigate("event", {
                        eventId: item.id,
                      });
                    }}
                  >
                    <View style={{ flex: 1 }}>
                      <Text
                        style={[
                          tw`capitalize`,
                          {
                            color: "#000000",
                            fontFamily: "Raleway_700Bold",
                          },
                        ]}
                      >
                        "ITEM NAME" {item.id}
                      </Text>
                      <View
                        style={[
                          tw`my-2`,
                          {
                            flexDirection: "row",
                            alignItems: "center",
                          },
                        ]}
                      >
                        <View
                          style={[
                            tw`px-3 py-1 rounded-2xl`,
                            {
                              backgroundColor:
                                item.severity === "high"
                                  ? "#FF0000"
                                  : item.severity === "medium"
                                  ? "#FF8A00"
                                  : "#FFE600",
                            },
                          ]}
                        >
                          <Text
                            style={[
                              tw`capitalize`,
                              {
                                fontFamily: "Raleway_700Bold",
                                color:
                                  item.severity === "low"
                                    ? "#000000"
                                    : "#ffffff",
                              },
                            ]}
                          >
                            SEVERITY
                          </Text>
                        </View>
                        <View style={tw`mx-2`}>
                          <Text
                            style={{
                              fontSize: 20,
                              color: "#939393",
                            }}
                          >
                            •
                          </Text>
                        </View>
                        <Text
                          style={[
                            tw`capitalize`,
                            {
                              color: "#939393",
                              fontFamily: "Raleway_400Regular",
                            },
                          ]}
                        >
                          Uncoached
                        </Text>
                      </View>
                      <Text
                        style={{
                          color: "#939393",
                          fontFamily: "Raleway_400Regular",
                        }}
                      >
                        3 hours
                      </Text>
                    </View>
                    <View style={{ flex: 0.5, alignItems: "flex-end" }}>
                      <Image
                      src={require("../../src/assets/great_food.png")}
                      resizeMode='contain'
                        style={{
                          width: 150,
                          height: 90,
                          borderRadius: 8,
                        //   backgroundColor: 'black'
                        }}
                        // tintColor='white'
                      />
                    </View>
                  </Pressable>
                )}
                keyExtractor={(item, index) => index}
                showsVerticalScrollIndicator={false}
                onEndReached={() => {
                  fetchMoreVehicles(vehiclePagination);
                }}
                ListFooterComponent={() => (
                  <PaginationIndicator
                    data={vehicles}
                    loader={isFetchMore}
                    pagination={vehiclePagination}
                  />
                )}
                refreshControl={
                  <RefreshControl
                    onRefresh={() => {
                      fetchVehicles();
                    }}
                    refreshing={vehicleLoading}
                    tintColor={"gray"}
                    colors={["gray"]}
                  />
                }
              />
            }
          </Fragment>
        )}
      </>
    );
  };

  return (
    <SafeAreaView
      style={{
        backgroundColor: "#000000",
        flex: 1,
      }}
      edges={["top"]}
    >
      <View
        style={{
          flex: 1,
          backgroundColor: "#ffffff",
        }}
      >
        {/* header */}
        <Header title={`Coaching #ID`} showCancel={false} />
        <View
          style={[
            tw`mx-4 mt-4`,
            {
              flexDirection: "row",
              justifyContent: "space-between",
            },
          ]}
        >
          <Text
            style={[
              tw`text-base text-sm`,
              {
                fontFamily: "Raleway_700Bold",
                color: "#000000",
                fontSize: 17,
              },
            ]}
          >
            Event List
          </Text>
        </View>
        <View
          style={[
            tw`mx-4 mt-6`,
            {
              flex: 3,
            },
          ]}
        >
          {showActivities()}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ProductScreen;
