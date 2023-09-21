import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Pressable,
  ActivityIndicator,
} from "react-native";
import { UserProfileServerType, UserServerType } from "server/routes/users";
import { useFollowServer } from "../../hooks/server/useFollowServer";
import { useRouter } from "expo-router";
import { useChatServer } from "../../hooks/server/useChatServer";
import { useAuth } from "../../hooks";

const FriendSearchScreen = () => {
  const { getFollowing, unfollowUser } = useFollowServer();

  const [searchQuery, setSearchQuery] = useState("");
  const [data, setData] = useState<(UserServerType & UserProfileServerType)[]>(
    []
  );
  const [isLoading, setIsLoading] = useState(false);
  const [isBusy, setIsBusy] = useState(false);

  const router = useRouter();

  const { checkIfAlreadyInConversation, createChat } = useChatServer();
  const { localUser } = useAuth();

  const filteredFriends = data.filter(
    (friend) =>
      friend.username &&
      friend.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const alphabetSections: {
    [key: string]: (UserServerType & UserProfileServerType)[];
  } = {};

  filteredFriends.forEach((friend) => {
    const firstLetter = friend.username!.charAt(0).toUpperCase();
    if (!alphabetSections[firstLetter]) {
      alphabetSections[firstLetter] = [];
    }
    alphabetSections[firstLetter].push(
      friend as UserServerType & UserProfileServerType
    );
  });

  const alphabetKeys = Object.keys(alphabetSections).sort();

  const loadFollowing = async () => {
    setIsLoading(true);
    const following = await getFollowing();

    setData(following.data?.following || ([] as any));
    setIsLoading(false);
  };

  useEffect(() => {
    loadFollowing();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      {isBusy && (
        <View
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 100,
            backgroundColor: "rgba(255,255,255,0.5)",
            height: "100%",
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <ActivityIndicator color="#6C68A8" />
        </View>
      )}
      <View style={styles.header}>
        <View style={{ flex: 1, alignItems: "flex-start" }}>
          <Pressable
            onPress={() => {
              router.back();
            }}
          >
            <Text className="self-start tw-inline font-satoshi-medium text-lg text-design-dark">
              Cancel
            </Text>
          </Pressable>
        </View>
        <View style={{ flex: 1, alignItems: "center" }}>
          <Text className="self-start tw-inline font-satoshi-medium text-lg text-design-dark">
            New Message
          </Text>
        </View>
        <View style={styles.emptyView} />
      </View>

      <View style={styles.searchBarContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>
      {alphabetKeys.length > 0 ? (
        <FlatList
          data={alphabetKeys}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <View>
              <Text style={styles.sectionHeader}>{item}</Text>
              <FlatList
                data={alphabetSections[item]}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={styles.friendItem}
                    onPress={async () => {
                      setIsBusy(true);

                      const check = await checkIfAlreadyInConversation(
                        localUser?.username!,
                        item.username!
                      );
                      console.log("CHECK", check);

                      const exists = check.message !== "No chat found";

                      if (!exists) {
                        const newChat = await createChat({
                          chat_members: [localUser?.username!, item.username!],
                          chat_name: "",
                          chat_type: "private",
                        });

                        if (newChat.success) {
                          router.push(
                            `/chat/room/${newChat.data?.chat.chat_id}`
                          );
                        }
                      } else {
                        router.push(`/chat/room/${check.data?.chat.chat_id}`);
                      }

                      setIsBusy(false);
                    }}
                  >
                    {/* <Image style={styles.friendImage} source={{ uri: friend.imageURL }} /> */}
                    <View className="w-10 h-10 bg-design-primary rounded-full"></View>
                    <Text>{item.username?.toUpperCase() || ""}</Text>
                  </TouchableOpacity>
                )}
              />
            </View>
          )}
        />
      ) : (
        <View style={{ flex: 1, justifyContent: "center" }}>
          {isLoading ? (
            <ActivityIndicator color="#6C68A8" />
          ) : (
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text className="font-light font-satoshi-light text-design-text">
                No friends found
              </Text>
            </View>
          )}
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  searchBarContainer: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginVertical: 10,
  },
  searchInput: {
    height: 40,
    borderRadius: 20,
    paddingHorizontal: 16,
    backgroundColor: "#F0F0F2",
  },
  sectionHeader: {
    backgroundColor: "#F0F0F2",
    paddingHorizontal: 34,
    paddingVertical: 8,
    fontWeight: "bold",
  },
  friendItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 20,
    gap: 16,
  },
  friendImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 20,
  },
  emptyView: {
    flex: 1,
  },
});

export default FriendSearchScreen;
