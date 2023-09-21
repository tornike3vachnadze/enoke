import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
  KeyboardAvoidingView,
  Platform,
  FlatList,
  Pressable,
  Alert,
  ActivityIndicator,
} from "react-native";
import React, {
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { LinearGradient } from "expo-linear-gradient";
import ArrowL from "../../../assets/icons/arrow-l.svg";
import { useAuth } from "../../../hooks";
import { useGlobalSearchParams, useRouter, useSearchParams } from "expo-router";
import { useChatServer } from "../../../hooks/server/useChatServer";
import { ChatServerType } from "server/routes/chat";
import { useUserServer } from "../../../hooks/server/useUserServer";
import { UserProfileServerType, UserServerType } from "server/routes/users";
import { ChatFragmentType } from "server/controllers/chat";

const ChatRoom = () => {
  const flatListRef = useRef<FlatList>(null);

  const [meta, setMeta] = useState<ChatServerType | null>(null);
  const [data, setData] = useState<
    (ChatFragmentType & {
      synced: boolean;
    })[]
  >([]);
  const [text, setText] = useState("");
  const [users, setUsers] = useState<
    (UserServerType & UserProfileServerType)[]
  >([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingUsers, setIsLoadingUsers] = useState(false);

  const { localUser } = useAuth();
  const router = useRouter();
  const { id } = useGlobalSearchParams();

  const { getChat, sendMessage } = useChatServer();
  const { getUserByUserName } = useUserServer();

  useEffect(() => {
    (async () => {
      setIsLoading(true);

      const chat = await getChat(id as string);

      setMeta(chat.data?.chat as ChatServerType);
      if (chat.success) {
        if (chat.data?.chat.chat_messages) {
          const inverted = chat.data?.chat.chat_messages.reverse();
          setData(
            inverted.map((message: any) => ({
              ...message,
              synced: true,
            })) || []
          );
        }
      }
      setIsLoading(false);
    })();
  }, [id]);

  useEffect(() => {
    const getUsers = async () => {
      setIsLoadingUsers(true);
      const users = await Promise.all(
        meta?.chat_members
          .filter((member) => member !== localUser?.username)
          .map((member) => getUserByUserName(member)) || []
      );
      setUsers(
        users.map(
          (user) => user?.data?.user as UserServerType & UserProfileServerType
        )
      );
      setIsLoadingUsers(false);
    };
    if (meta) {
      getUsers();
    }
  }, [meta]);

  return (
    <KeyboardAvoidingView
      className="flex-1"
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <LinearGradient
        colors={["#F8F9FB", "#DAD9E9"]}
        locations={[0.32, 1]}
        className="flex-1"
      >
        {meta ? (
          <SafeAreaView className="flex-1">
            <View className="flex flex-row justify-between items-center space-x-4 py-3 px-6 border-b border-b-design-gray-3">
              <Pressable onPress={() => router.back()}>
                <ArrowL />
              </Pressable>
              {isLoadingUsers ? (
                <ActivityIndicator color="#6C68A8" />
              ) : (
                <Text className="flex-1 text-center font-bold font-satoshi-bold text-design-text text-lg">
                  {meta?.chat_name ||
                    (users
                      ? users
                          .map((user) => user.username)
                          .join(", ")
                          .slice(0, 20)
                      : "Chat")}
                </Text>
              )}
              <Text className="text-design-text text-lg">🤩</Text>
            </View>
            <View className="flex-1 justify-end px-6 pb-3">
              {data.length > 0 ? (
                <FlatList
                  ref={flatListRef}
                  data={data}
                  keyExtractor={(item: ChatFragmentType) => item.id}
                  renderItem={({
                    item,
                  }: {
                    item: ChatFragmentType & {
                      synced: boolean;
                    };
                  }) => (
                    <View
                      key={item.id}
                      className={`${item.synced ? "" : "opacity-50"}`}
                    >
                      {!(localUser?.username === item.sender) && (
                        <View>
                          {data[data.indexOf(item) + 1] ? (
                            !(
                              data[data.indexOf(item) + 1].sender ===
                              item.sender
                            ) && (
                              <Text className="font-light font-satoshi-light text-base ml-14 mb-1">
                                {item.sender}
                              </Text>
                            )
                          ) : (
                            <Text className="font-light font-satoshi-light text-base ml-14 mb-1">
                              {item.sender}
                            </Text>
                          )}
                        </View>
                      )}
                      <View
                        className={`flex justify-start items-center space-x-4 ${
                          !(localUser?.username === item.sender)
                            ? "flex-row"
                            : "flex-row-reverse"
                        }`}
                      >
                        {!(localUser?.username === item.sender) && (
                          <View
                            className={`w-10 h-10 bg-design-primary rounded-full ${
                              data[data.indexOf(item) + 1] &&
                              data[data.indexOf(item) + 1].sender ===
                                item.sender
                                ? "opacity-0"
                                : ""
                            }`}
                          ></View>
                        )}

                        <View className="px-2.5 py-1.5 rounded-lg bg-white shadow">
                          <Text
                            className="text-design-text text-lg font-normal font-satoshi-regular"
                            style={{
                              maxWidth: 250,
                            }}
                          >
                            {item.message}
                          </Text>
                        </View>
                      </View>
                    </View>
                  )}
                  className="flex-1"
                  contentContainerStyle={{
                    // flex: 1,
                    justifyContent: "flex-end",
                    gap: 12,
                    paddingTop: 20,
                    paddingBottom: 20,
                  }}
                  inverted
                  onLayout={() =>
                    data.length > 0 &&
                    flatListRef.current?.scrollToIndex({
                      index: 0,
                      animated: true,
                      viewOffset: 20,
                    })
                  }
                />
              ) : (
                <View className="flex-1 justify-end pb-8 items-center">
                  {isLoadingUsers ? (
                    <ActivityIndicator color="#6C68A8" />
                  ) : (
                    <Text className="text-base font-light font-satoshi-light text-design-text">
                      Start a conversation with{" "}
                      {users
                        .map((user) => user.name || user.username)
                        .join(", ")}
                    </Text>
                  )}
                </View>
              )}
              <TextInput
                className="rounded-full p-3 px-5 bg-design-gray-5"
                style={{ height: 50, fontSize: 16 }}
                value={text}
                onChangeText={setText}
                placeholder="Message..."
                onSubmitEditing={async () => {
                  if (text) {
                    let randomId = Date.now().toString();
                    setData((prev) => [
                      {
                        id: randomId,
                        sender: localUser?.username as string,
                        message: text,
                        date: Date.now(),
                        reacts: [],
                        type: "text",
                        synced: false,
                      },
                      ...prev,
                    ]);
                    setText("");
                    data.length > 0 &&
                      flatListRef.current?.scrollToIndex({
                        index: 0,
                        animated: true,
                        viewOffset: 20,
                      });
                    const res = await sendMessage({
                      message: text,
                      chat_id: id as string,
                      type: "text",
                    });
                    if (res.success) {
                      setData((prev) =>
                        prev.map((item) =>
                          item.id === randomId
                            ? {
                                ...item,
                                synced: true,
                              }
                            : item
                        )
                      );
                    } else {
                      setData((prev) =>
                        prev.filter((item) => item.id !== randomId)
                      );
                      Alert.alert("Error", "Message could not be sent.");
                    }
                  }
                }}
                blurOnSubmit={false}
              />
            </View>
          </SafeAreaView>
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
                  Error
                </Text>
              </View>
            )}
          </View>
        )}
      </LinearGradient>
    </KeyboardAvoidingView>
  );
};

export default ChatRoom;

const styles = StyleSheet.create({});
