import { StyleSheet, Text, View } from "react-native";
import React from "react";

const TextPlaceholder = ({ text }: { text: string }) => {
  return (
    <Text
      className={`font-bold font-satoshi-bold text-lg text-design-primary/20`}
    >
      {text}
    </Text>
  );
};

export default TextPlaceholder;

const styles = StyleSheet.create({});
