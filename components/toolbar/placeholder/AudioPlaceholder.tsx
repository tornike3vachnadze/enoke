import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";

const AudioPlaceholder = () => {
  return (
    <View className=" py-4 px-4 w-72 flex flex-row border-2 border-design-primary rounded-lg justify-center items-center">
      <Image source={require("../../../assets/icons/voice.png")} />
    </View>
  );
};

export default AudioPlaceholder;

const styles = StyleSheet.create({});
