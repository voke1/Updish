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

export const CoachingLoader = () => {
  return (
    <Fragment>
      {new Array(4).fill([]).map((item, index) => (
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

export const NoButtonLoader = () => {
  return (
    <Fragment>
      {new Array(6).fill([]).map((item, index) => (
        <View style={tw`mx-3 h-23 ${index === 0 ? "mt-3" : ""}`} key={index}>
          <Loader />
        </View>
      ))}
    </Fragment>
  );
};

export const LastInspectionLoader = () => {
  return (
    <View style={tw`mx-3`}>
      <Loader />
    </View>
  );
};

export const CurrentLoadSkeletonLoader = () => {
  return (
    <View style={tw`mx-3`}>
      <Loader />
    </View>
  );
};

export const TyreSummarySkeletonLoader = () => {
  return (
    <View style={tw`mx-3 px-3 py-5 h-25`}>
      <Loader />
    </View>
  );
};

export const HistorySkeletonLoader = () => {
  return (
    <View style={tw`mx-3`}>
      <Loader />
    </View>
  );
};

export const TyreInspectionSkeletonLoader = () => {
  return (
    <Fragment>
      {new Array(10).fill([]).map((item, index) => (
        <View style={tw`mx-3 h-15`} key={index}>
          <Loader />
        </View>
      ))}
    </Fragment>
  );
};

export const ArticleLoader = () => {
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

export const VideoLoader = () => {
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

export const DueForChangeLoader = () => {
  return (
    <Fragment>
      {new Array(10).fill([]).map((item, index) => (
        <View style={tw`mx-3 my-1`} key={index}>
          <Loader />
        </View>
      ))}
    </Fragment>
  );
};

export default SkeletonLoader;
