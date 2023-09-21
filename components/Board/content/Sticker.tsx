import { View, Text, Image } from "react-native";
import React from "react";
import { BoardData } from "../../../types";

export default function StickerContent({
  index,
  setBoardData,
  uri,
}: {
  index: number;
  setBoardData: React.Dispatch<React.SetStateAction<BoardData>>;
  uri: any;
}) {
  return (
    <View>
      <Image source={uri}></Image>
    </View>
  );
}
