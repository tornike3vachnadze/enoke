import {
  ActivityIndicator,
  FlatList,
  Pressable,
  Text,
  View,
  Alert,
} from "react-native";
import Smile from "../../../assets/icons/smile.svg";
import { useFollowServer } from "../../../hooks/server/useFollowServer";
import { useEffect, useState } from "react";
import { UserProfileServerType, UserServerType } from "server/routes/users";

export default function Suggested() {
  const { getSuggestions, followUser } = useFollowServer();

  const [suggestions, setSuggestions] = useState<
    (UserServerType & UserProfileServerType)[]
  >([]);
  const [isLoading, setIsLoading] = useState(false);

  const loadSuggestions = async () => {
    setIsLoading(true);
    const suggestions = await getSuggestions();
    setSuggestions(suggestions.data?.users || []);
    setIsLoading(false);
  };

  useEffect(() => {
    loadSuggestions();
  }, []);

  return (
    <View className="py-6">
      <Text className="font-bold font-satoshi-bold px-6">
        People You May Know
      </Text>
      <View className="mt-2">
        {suggestions.length > 0 ? (
          <FlatList
            data={suggestions}
            renderItem={({ item }) => (
              <Pressable
                className="flex flex-row justify-start items-center space-x-4 py-2.5 px-6 border-b border-b-design-gray-3"
                key={item.username}
                onPress={async () => {
                  Alert.alert(`Follow ${item.username}?`, ``, [
                    {
                      text: "Cancel",
                      style: "cancel",
                    },
                    {
                      text: "Follow",
                      onPress: async () => {
                        followUser(item.username!);
                        setSuggestions(
                          suggestions.filter(
                            (i) => i.username !== item.username
                          )
                        );
                      },
                      style: "default",
                    },
                  ]);
                }}
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
              </Pressable>
            )}
          />
        ) : (
          <View>
            {!isLoading ? (
              <View className="flex flex-row justify-center items-center mt-6">
                <Text className="font-satoshi-regular font-normal text-base text-design-gray-6">
                  No suggestions
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
