import React, { Fragment, useContext } from "react";
import ContentLoader, { Rect } from "react-content-loader/native";
import { View } from "react-native";
import tw from "twrnc";

// Define a generic Loader component
const Loader = ({ width = "100%", height = 160 }) => (
  <ContentLoader
    speed={2}
    width={width}
    height={height}
    backgroundColor={"#FCFCFC"}
    foregroundColor={"#ecebeb"}
  >
    <Rect x="0" y="0" rx="5" ry="5" width="100%" height="20" />
    <Rect x="0" y="30" rx="5" ry="5" width="100%" height="20" />
    <Rect x="0" y="60" rx="5" ry="5" width="100%" height="20" />
  </ContentLoader>
);

const SkeletonLoader = () => {
  return (
    <Fragment>
      {new Array(6).fill([]).map((item, index) => (
        <View style={tw`mx-3 h-23`} key={index}>
          <Loader />
        </View>
      ))}
    </Fragment>
  );
};

export const TextLoader = () => {
  return (
    <Fragment>
      {new Array(6).fill([]).map((item, index) => (
        <View style={tw`mx-3 h-23`} key={index}>
          <Loader />
        </View>
      ))}
    </Fragment>
  );
};

export const DocumentLoader = () => {
  return (
    <Fragment>
      {new Array(6).fill([]).map((item, index) => (
        <View style={tw`mx-3 h-23`} key={index}>
          <Loader />
        </View>
      ))}
    </Fragment>
  );
};

export default SkeletonLoader;
