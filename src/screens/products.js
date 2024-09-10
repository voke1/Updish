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
import tw from "twrnc";
import { MaterialCommunityIcons, FontAwesome } from "@expo/vector-icons";
import NoContent from "../components/NoContent";
import Header from "../components/Header";
import { CoachingLoader } from "../components/SkeletonLoader";
import { VehicleContext } from "../context/state";
import PaginationIndicator from "../components/PaginationIndicator";
import image from "../constants/image";

const ProductScreen = ({ route, navigation }) => {
  const { star } = image;
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
                      console.log('PRESSED')
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
                        {item.id}. {item.title}
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
                        <Text
                          style={{
                            color: "#939393",
                            fontFamily: "Raleway_400Regular",
                          }}
                        >
                          {item.price}
                        </Text>
                        <View style={tw`mx-2`}>
                          <Image
                            source={star}
                            style={{ width: 10, height: 10 }}
                          />
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
                          {item.review}
                        </Text>
                      </View>
                      <TouchableOpacity
                        style={[
                          tw`p-1 rounded-2xl`,
                          {
                            backgroundColor: "#FF9431",
                            width: 100,
                          },
                        ]}
                      >
                        <Text
                          style={[
                            tw`capitalize`,
                            {
                              fontFamily: "Raleway_700Bold",
                              color: "#ffffff",
                              textAlign: "center",
                            },
                          ]}
                        >
                          Add to Cart
                        </Text>
                      </TouchableOpacity>
                    </View>
                    <View style={{ flex: 0.5, alignItems: "flex-end" }}>
                      <Image
                        source={item.image}
                        resizeMode="contain"
                        style={{
                          width: 150,
                          height: 90,
                          borderRadius: 8,
                        }}
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
            Menu
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
