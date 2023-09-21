import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";

const CameraPlaceholder = () => {
  return (
    <View className="w-40 h-40 border-2 border-design-primary rounded-lg flex justify-center items-center z-0">
      <Image source={require("../../../assets/icons/camera.png")} />
    </View>
  );
};

export default CameraPlaceholder;

const styles = StyleSheet.create({});
