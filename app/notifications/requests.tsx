import { useRouter } from "expo-router";
import { useState } from "react";
import { ScrollView, Text, View } from "react-native";
import { Swipeable } from "react-native-gesture-handler";

const LeftAction = () => (
  <View
    style={{
      backgroundColor: "#c85950",
    }}
    className="flex-1 w-full px-6 justify-center items-start"
  >
    <Text className="font-bold font-satoshi-bold text-white text-base">
      Reject
    </Text>
  </View>
);

const RightAction = () => (
  <View className="flex-1 w-full px-6 justify-center items-end bg-design-primary">
    <Text className="font-bold font-satoshi-bold text-white text-base">
      Accept
    </Text>
  </View>
);

export default function Requests() {
  const router = useRouter();

  const [data, setData] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9]);

  const removeItem = (d: number) => {
    const newData = data.filter((item) => item !== d);
    setData(newData);
  };

  return (
    <View className="flex-1">
      <ScrollView showsVerticalScrollIndicator={false}>
        {data.map((d) => (
          <Swipeable
            renderLeftActions={LeftAction}
            renderRightActions={RightAction}
            onSwipeableOpen={(e) => {
              removeItem(d);
            }}
            key={d}
          >
            <View className="bg-white flex flex-row justify-start items-center space-x-4 border-b border-b-design-gray-3 px-6 py-3">
              <View className="w-14 h-14 rounded-full bg-design-primary"></View>
              <View className="flex flex-col justify-between items-start space-y-1">
                <Text className="text-design-text font-medium font-satoshi-medium text-base">
                  Request {d}
                </Text>
                <Text className="text-design-gray-8 font-medium font-satoshi-medium text-xs">
                  Time
                </Text>
              </View>
            </View>
          </Swipeable>
        ))}
      </ScrollView>
    </View>
  );
}
