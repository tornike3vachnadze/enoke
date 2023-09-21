import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";

const ListPlaceholder = () => {
  return (
    <View
      style={styles.container}
      className="border-2 border-design-primary rounded-lg flex justify-center items-center z-0"
    >
      <Image source={require("../../../assets/icons/list.png")} />
    </View>
  );
};

export default ListPlaceholder;

const styles = StyleSheet.create({
  container: {
    padding: 10,
    width: 247,
    minHeight: 60,
  },
});
