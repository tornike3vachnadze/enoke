import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import { BoardData } from '../../../types';

export default function BoardContent({
  index,
  setBoardData,
  data,
}: {
  index: number;
  setBoardData: React.Dispatch<React.SetStateAction<BoardData>>;
  data: any;
}) {
  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text numberOfLines={1}>This is my board</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 260,
    height: 200,
    borderRadius: 20,
    backgroundColor: 'black',
  },
  titleContainer: {
    position: 'absolute',
    bottom: 30,
    left: 30,
    minWidth: 10,
    maxWidth: 120,
    height: 34,
    backgroundColor: 'brown',
    justifyContent: 'center',
    padding: 5,
    borderRadius: 17,
  },
});
