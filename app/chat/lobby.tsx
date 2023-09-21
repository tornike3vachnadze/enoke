import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  SafeAreaView,
  TextInput,
  Pressable,
  ActivityIndicator,
} from "react-native";
import { Swipeable } from "react-native-gesture-handler";
import { ChatPreview } from "../../types";
import { friends } from "../../data/placeholder";
import { useRouter } from "expo-router";
import { useChatServer } from "../../hooks/server/useChatServer";
import { useAuth } from "../../hooks";

const ChatPreviewItem = ({
  chat,
  onRemoveChat,
  onPress,
}: {
  chat: ChatPreview;
  onRemoveChat: () => void;
  onPress: () => void;
}) => {
  const renderLeftActions = () => (
    <View style={styles.swipeableLeftAction}>
      <Text style={styles.removeButtonText}>Remove</Text>
    </View>
  );

  return (
    <Swipeable
      renderLeftActions={renderLeftActions}
      onSwipeableOpen={onRemoveChat}
    >
      <Pressable style={styles.chatPreviewItem} onPress={onPress}>
        {/* <Image
          style={styles.friendImage}
          source={{ uri: chat.friend.imageURL }}
        /> */}
        <View className="w-10 h-10 bg-design-primary rounded-full"></View>
        <View style={styles.chatPreviewTextContainer}>
          <View className="flex flex-row justify-between items-center">
            <Text style={styles.friendName}>{chat.friend.name}</Text>
            <Text style={styles.lastMessageTime}>
              {new Date(chat.lastMessageTime).toLocaleTimeString()}
            </Text>
          </View>
          <Text numberOfLines={1} style={styles.lastMessage}>
            {chat.lastMessage}
          </Text>
        </View>
        {chat.unreadCount > 0 && (
          <View style={styles.unreadBadge}>
            <Text style={styles.unreadCount}>{chat.unreadCount}</Text>
          </View>
        )}
      </Pressable>
    </Swipeable>
  );
};

const ChatLobbyScreen = () => {
  const router = useRouter();

  const [chats, setChats] = useState<ChatPreview[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const { getAllChats } = useChatServer();
  const { localUser } = useAuth();

  const [searchQuery, setSearchQuery] = useState("");

  const filteredChats = chats.filter((chat) =>
    chat.friend.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const removeChat = (uid: string) => {
    const updatedChats = chats.filter((chat) => chat.uid !== uid);
    setChats(updatedChats);
  };

  const loadChats = async () => {
    setIsLoading(true);
    const chats = await getAllChats();
    console.log(chats.data?.chats);

    const chatWOCurrentUserAsMemeber = chats.data?.chats.map((chat) => {
      return {
        ...chat,
        chat_members: chat.chat_members.filter(
          (member) => member !== localUser?.username
        ),
      };
    });

    const chatPreviews = chatWOCurrentUserAsMemeber?.map((chat) => {
      return {
        uid: chat.chat_id,
        friend: {
          name: chat.chat_members[0],
          imageURL: "",
        },

        lastMessage: chat.chat_messages[chat.chat_messages.length - 1]
          ? // @ts-ignore
            chat.chat_messages[chat.chat_messages.length - 1].message
          : "Start a conversation",

        lastMessageTime: chat.chat_messages[chat.chat_messages.length - 1]
          ? // @ts-ignore
            chat.chat_messages[chat.chat_messages.length - 1].date
          : "0",
        unreadCount: 0,
      };
    });

    chatPreviews && setChats(chatPreviews);
    setIsLoading(false);
  };

  useEffect(() => {
    let timeOut: NodeJS.Timeout;
    timeOut = setInterval(() => {
      loadChats();
    }, 5000);
    loadChats();
    return () => clearTimeout(timeOut);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={{ flex: 1, alignItems: "flex-start" }}>
          <Pressable>
            <Text className="tw-inline font-satoshi-medium text-lg text-design-dark">
              Edit
            </Text>
          </Pressable>
        </View>
        <View style={{ flex: 1, alignItems: "center" }}>
          <Text className=" tw-inline font-satoshi-medium text-lg text-design-dark">
            Chats
          </Text>
        </View>
        <View style={{ flex: 1, alignItems: "flex-end" }}>
          <Pressable onPress={() => router.push("chat/search")}>
            <Image source={require("../../assets/icons/edit-pen.png")} />
          </Pressable>
        </View>
      </View>

      <View style={styles.searchBarContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      {chats.length > 0 ? (
        <FlatList
          data={filteredChats}
          keyExtractor={(item) => item.uid}
          renderItem={({ item, index }) => (
            <ChatPreviewItem
              chat={item}
              onRemoveChat={() => removeChat(item.uid)}
              onPress={() => {
                router.push(`chat/room/${item.uid}`);
              }}
            />
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
                No conversations found
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
  chatPreviewItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "white",
    borderBottomWidth: 1,
    borderColor: "aliceblue",
    gap: 16,
  },
  friendImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 20,
  },
  chatPreviewTextContainer: {
    flex: 1,
  },
  friendName: {
    fontWeight: "bold",
    marginBottom: 4,
    fontFamily: "Satoshi-Bold",
  },
  lastMessage: {
    color: "#888888",
    fontFamily: "Satoshi-Medium",
    fontSize: 15,
  },
  lastMessageTime: {
    color: "#888888",
    fontSize: 12,
    fontFamily: "Satoshi-Medium",
    marginTop: 4,
  },
  unreadBadge: {
    backgroundColor: "#6C68A8",
    borderRadius: 10,
    paddingVertical: 2,
    paddingHorizontal: 8,
  },
  unreadCount: {
    color: "white",
    fontWeight: "bold",
    fontSize: 12,
    fontFamily: "Satoshi-Medium",
  },
  swipeableLeftAction: {
    backgroundColor: "#c85950",
    justifyContent: "center",
    alignItems: "flex-start",
    paddingLeft: 16,
    flex: 1,
  },
  removeButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  emptyView: {
    flex: 1,
  },
});

export default ChatLobbyScreen;
