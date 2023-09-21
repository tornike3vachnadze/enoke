import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";

const FilePlaceholder = () => {
  return (
    <View className="w-20 h-20 border-2 border-design-primary rounded-lg flex justify-center items-center z-0">
      <Image source={require("../../../assets/icons/file-upload.png")} />
    </View>
  );
};

export default FilePlaceholder;

const styles = StyleSheet.create({});
