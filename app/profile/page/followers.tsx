import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Image,
  Pressable,
  Switch,
  Text,
  TextInput,
  View,
} from "react-native";
import Smile from "../../../assets/icons/smile.svg";
import { UserProfileServerType, UserServerType } from "server/routes/users";
import { useFollowServer } from "../../../hooks/server/useFollowServer";

export default function Followers() {
  const [data, setData] = useState<(UserServerType & UserProfileServerType)[]>(
    []
  );
  const [visibleData, setVisibleData] = useState([...data]);
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { getFollowers } = useFollowServer();

  const loadFollower = async () => {
    setIsLoading(true);
    const follower = await getFollowers();
    setData(follower.data?.followers || []);
    setVisibleData(follower.data?.followers || []);
    setIsLoading(false);
  };

  useEffect(() => {
    if (search.length > 0) {
      setVisibleData(
        data.filter((item) =>
          item.username!.toLowerCase().includes(search.toLowerCase())
        )
      );
    } else {
      setVisibleData([...data]);
    }
  }, [search]);

  useEffect(() => {
    loadFollower();
  }, []);

  return (
    <View className="py-6 ">
      <View className="px-6">
        <View className="flex flex-row justify-between items-center space-x-4 pb-6">
          <TextInput
            className="flex-1 px-6 py-3 pl-12 rounded-full border border-design-gray-3 font-light font-satoshi-light"
            placeholder="Search"
            placeholderTextColor={"#6D6D70"}
            inputMode="text"
            keyboardType="default"
            style={{ fontSize: 18, borderColor: "#EDEEF0", color: "#3f3f3f" }}
            value={search}
            onChangeText={(search) => setSearch(search)}
          />
        </View>
        <Image
          source={require("../../../assets/icons/search.png")}
          className="absolute top-3.5 left-10"
          style={{
            transform: [{ translateY: 1 }],
          }}
        />
      </View>
      <Text className="font-bold font-satoshi-bold px-6">Followers</Text>
      <View className="mt-2">
        {visibleData.length > 0 ? (
          <FlatList
            data={visibleData}
            renderItem={({ item }) => (
              <View
                className="flex flex-row justify-start items-center space-x-4 py-2.5 px-6 border-b border-b-design-gray-3"
                key={item.username}
              >
                <View className="flex-1 flex flex-row justify-start items-center space-x-2">
                  <View className="w-10 h-10 bg-design-primary rounded-full"></View>
                  <View>
                    <Text className="font-satoshi-regular font-normal text-base text-design-text">
                      {item.name || "User"}
                    </Text>
                    <Text className="font-satoshi-regular font-normal text-design-gray-6">
                      {item.username || "@deleted"}
                    </Text>
                  </View>
                </View>
                {item.emoji ? (
                  <Text className="text-xl">{item.emoji}</Text>
                ) : (
                  <Smile />
                )}
              </View>
            )}
          />
        ) : (
          <View>
            {!isLoading ? (
              <View className="flex flex-row justify-center items-center mt-6">
                <Text className="font-satoshi-regular font-normal text-base text-design-gray-6">
                  Nothing to show
                </Text>
              </View>
            ) : (
              <View className="flex flex-row justify-center items-center mt-6">
                <ActivityIndicator color="#6C68A8" />
              </View>
            )}
          </View>
        )}
      </View>
    </View>
  );
}
