import { View, Text, ActivityIndicator } from "react-native";
import React, { Fragment } from "react";
import tw from "twrnc";

const PaginationIndicator = ({ data, pagination, loader, margin }) => {
  
  const isObjectEmpty = (objectName) => {
    return JSON.stringify(objectName) === "{}";
  };
  if (!pagination) return;
  if (!data) return;

  if (isObjectEmpty(pagination)) return;

  if (data.length < 1) return;

  return (
    <Fragment>
      <View
        style={[
          tw`${margin ? margin : "mb-5"}`,
          {
            alignSelf: "center",
          },
        ]}
      >
        <Text
          style={[
            tw`text-center`,
            {
              fontFamily: "Raleway_700Bold",
              color: "#98999B",
              fontSize: 16,
            },
          ]}
        >
          {loader ? (
            <ActivityIndicator
              size="small"
              color={"gray"}
            />
          ) : (
            `${data && data.length} of ${pagination && pagination.total}`
          )}
        </Text>
      </View>
    </Fragment>
  );
};

export default PaginationIndicator;
