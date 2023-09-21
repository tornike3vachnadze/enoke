import { View, StyleSheet, Dimensions } from "react-native";
import React from "react";
import Pdf from "react-native-pdf";

const { width, height } = Dimensions.get("window");

export default function PDFViewer({ uri }: { uri: string }) {
  return (
    <View style={styles.container}>
      <Pdf
        page={0}
        source={{
          uri: uri,
        }}
        style={styles.webview}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: width * 0.95,
    height: height * 0.8,
    backgroundColor: "gray",
    zIndex: 10,
    borderRadius: 10,
    overflow: "hidden",
  },
  webview: {
    flex: 1,
  },
});
