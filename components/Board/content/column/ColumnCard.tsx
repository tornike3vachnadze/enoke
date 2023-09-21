import { View, Text, Pressable, Image, StyleSheet } from "react-native";
import React from "react";
import EditableTextInput from "../../../input/EditableTextInput";

interface ColumnCardProps {
  text: string;
  isDone: boolean;
  toggleCard: () => void;
}

const ColumnCard: React.FC<ColumnCardProps> = ({
  text,
  isDone,
  toggleCard,
}) => {
  const hitSlop = { top: 20, bottom: 20, left: 20, right: 20 };

  return (
    <View style={styles.card}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          minHeight: 30,
          alignItems: "center",
          padding: 10,
        }}
      >
        <Pressable
          hitSlop={hitSlop}
          pointerEvents="box-none"
          style={{
            marginRight: 10,
            alignSelf: "stretch",
          }}
          onPress={toggleCard}
        >
          <Image
            style={styles.toggle}
            source={
              isDone
                ? require("../../../../assets/icons/check-rec.png")
                : require("../../../../assets/icons/check-box.png")
            }
          />
        </Pressable>
        <View
          style={{
            flexDirection: "row",
            alignItems: "flex-start",
            flex: 1,
          }}
        >
          <EditableTextInput
            textType="smallText"
            initialValue={text}
            isDone={isDone}
          ></EditableTextInput>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "white",
    minHeight: 55,
    borderColor: "lightgray",
    borderWidth: 1,
    borderRadius: 5,
    justifyContent: "center",
    marginVertical: 5,
  },
  toggle: { width: 15, height: 15, resizeMode: "stretch" },
});

export default ColumnCard;
