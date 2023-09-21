import { ActivityIndicator, Alert, Pressable, Text, View } from "react-native";
import Image from "react-native-fast-image";
import ProfileCard from "../../components/ProfileCard";
import { useEffect, useState } from "react";
import { useUserServer } from "../../hooks/server/useUserServer";
import { TextInput } from "react-native-gesture-handler";
import { router } from "expo-router";
import { useProfileStore } from "../../store";
import DateTimePicker from "@react-native-community/datetimepicker";

export default function Profile() {
  const [isLoading, setIsLoading] = useState(false);

  const { base, profile, followers, updateBase, updateProfile } =
    useProfileStore();

  return (
    <View className="py-6">
      {isLoading && (
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
      <View className="px-4">
        <ProfileCard username={base.username} />
        <Text
          className="font-medium font-satoshi-medium mt-3"
          style={{
            marginLeft: "20%",
          }}
        >
          Edit
        </Text>
      </View>
      <View className="px-8 py-6 mt-4 border-t border-design-gray-3">
        <View className="flex flex-row justify-between items-center">
          <Text className="font-bold font-satoshi-bold text-base">Profile</Text>
          <Text className="font-light font-satoshi-light text-sm text-design-gray-4">
            This information is for your Profile ID.
          </Text>
        </View>
        <View className="flex flex-row justify-start items-center space-x-4 mt-2 pt-4 pb-3 border-b border-design-gray-3">
          <Text
            className="font-satoshi-regular text-base"
            numberOfLines={1}
            adjustsFontSizeToFit={true}
            style={{
              flex: 1,
            }}
          >
            Username
          </Text>
          <TextInput
            className="font-light font-satoshi-light text-base text-design-text"
            style={{
              flex: 3.5,
            }}
            editable={false}
            value={base.username}
          />
        </View>

        <View className="flex flex-row justify-start items-center space-x-4 py-3 border-b border-design-gray-3">
          <Text
            className="font-satoshi-regular text-base"
            style={{
              flex: 1,
            }}
          >
            Name
          </Text>
          <TextInput
            className="font-light font-satoshi-light text-base text-design-gray-1"
            style={{
              flex: 3.5,
            }}
            placeholder="Name"
            value={base.name}
            onChangeText={(text) => {
              updateBase("name", text);
            }}
          />
        </View>

        <View className="flex flex-row justify-start items-center space-x-4 py-3 border-b border-design-gray-3">
          <Text
            className="font-satoshi-regular text-base"
            style={{
              flex: 1,
            }}
          >
            Bio
          </Text>
          <TextInput
            className="font-light font-satoshi-light text-base text-design-gray-1"
            style={{
              flex: 3.5,
            }}
            multiline
            placeholder="Bio"
            value={profile.bio}
            onChangeText={(text) => {
              updateProfile("bio", text);
            }}
          />
        </View>

        <View className="flex flex-row justify-start items-center space-x-4 py-3 border-b border-design-gray-3">
          <Text
            className="font-satoshi-regular text-base"
            style={{
              flex: 1,
            }}
          >
            URL
          </Text>
          <TextInput
            className="font-light font-satoshi-light text-base text-design-gray-1"
            style={{
              flex: 3.5,
            }}
            placeholder="Link or email"
            keyboardType="url"
            value={profile.url}
            onChangeText={(text) => {
              updateProfile("url", text);
            }}
          />
        </View>

        <View className="mt-4 flex flex-row justify-between items-center">
          <Text className="font-bold font-satoshi-bold text-base">
            Personal
          </Text>
          <Text className="font-light font-satoshi-light text-sm text-design-gray-4">
            This information is not shared on your profile.
          </Text>
        </View>
        <View className="flex flex-row justify-start items-center space-x-4 py-2.5 mt-3.5">
          <Text
            className="font-satoshi-regular text-base"
            style={{
              flex: 1,
            }}
          >
            Phone
          </Text>
          <TextInput
            className="font-light font-satoshi-light text-base text-design-gray-4"
            style={{
              flex: 2.5,
            }}
            placeholder="+11112223333"
            keyboardType="phone-pad"
            value={base.phone}
            onChangeText={(text) => {
              updateBase("phone", text);
            }}
          />
          <Image source={require("../../assets/icons/chevron-r.png")} />
        </View>
        <View className="flex flex-row justify-start items-center space-x-4 py-2.5">
          <Text
            className="font-satoshi-regular text-base"
            style={{
              flex: 1,
            }}
          >
            Email
          </Text>
          <TextInput
            className="font-light font-satoshi-light text-base text-design-gray-4"
            style={{
              flex: 2.5,
            }}
            placeholder="user@enok.com"
            keyboardType="email-address"
            value={base.email}
            onChangeText={(text) => {
              updateBase("email", text);
            }}
          />
          <Image source={require("../../assets/icons/chevron-r.png")} />
        </View>
        <View className="flex flex-row justify-start items-center space-x-4 py-2.5">
          <Text
            className="font-satoshi-regular text-base"
            style={{
              flex: 1,
            }}
          >
            Birthday
          </Text>
          {/* <Text
            className="font-light font-satoshi-light text-base text-design-gray-4"
            style={{
              flex: 2.5,
            }}
          >
            April 20, 1995
          </Text> */}
          <View
            className="font-light font-satoshi-light text-base text-design-gray-4"
            style={{
              flex: 2.5,
              display: "flex",
              flexDirection: "row",
            }}
          >
            <View className="opacity-0">
              <DateTimePicker
                value={new Date(profile.birthday || "1995-04-20T00:00:00")}
                mode="date"
                is24Hour={true}
                onChange={(e, d) => {
                  updateProfile("birthday", d?.toISOString() as string);
                }}
              />
            </View>
            <View
              pointerEvents="none"
              className="font-light font-satoshi-light text-base text-design-gray-4"
              style={{
                position: "absolute",
                left: 0,
                top: "50%",
                transform: [{ translateY: -11 }],
                zIndex: 1,
              }}
            >
              <Text className="font-light font-satoshi-light text-base text-design-gray-4">
                {new Date(
                  profile.birthday || "1995-04-20T00:00:00"
                ).toLocaleDateString()}
              </Text>
            </View>
          </View>
          <Image source={require("../../assets/icons/chevron-r.png")} />
        </View>
        <View className="mt-4 flex flex-row justify-between items-center">
          <Text className="font-bold font-satoshi-bold text-base">About</Text>
          <Text className="font-light font-satoshi-light text-sm text-design-gray-4">
            This information is optional & helps with discovery.
          </Text>
        </View>

        <Pressable className="flex flex-row justify-start items-center space-x-4 py-2.5 mt-3">
          <View className="flex-1 ">
            <Text className="font-satoshi-bold font-bold text-base">
              Interests
            </Text>
            <Text className="font-medium font-satoshi-medium text-xs text-design-gray-4">
              Entrepreneurship, Hiking, Biotechnology, World Peace
            </Text>
          </View>
          <Image source={require("../../assets/icons/chevron-r.png")} />
        </Pressable>

        <Pressable className="flex flex-row justify-start items-center space-x-4 py-2.5">
          <View className="flex-1 ">
            <Text className="font-satoshi-bold font-bold text-base">
              Looking for
            </Text>
            <Text className="font-medium font-satoshi-medium text-xs text-design-gray-4">
              New Friends, Teammates, Roommate, Partnership, Clients, Students,
              Coach, Girlfriend ...
            </Text>
          </View>
          <Image source={require("../../assets/icons/chevron-r.png")} />
        </Pressable>

        <Pressable className="flex flex-row justify-start items-center space-x-4 py-2.5">
          <View className="flex-1 ">
            <Text className="font-satoshi-bold font-bold text-base">
              Location
            </Text>
            <Text className="font-medium font-satoshi-medium text-xs text-design-gray-4">
              Lisbon, Portugal
            </Text>
          </View>
          <Image source={require("../../assets/icons/chevron-r.png")} />
        </Pressable>

        <Pressable className="flex flex-row justify-start items-center space-x-4 py-2.5">
          <View className="flex-1 ">
            <Text className="font-satoshi-bold font-bold text-base">
              Languages
            </Text>
            <Text className="font-medium font-satoshi-medium text-xs text-design-gray-4">
              English, Portuguese, Spanish, Russian, French
            </Text>
          </View>
          <Image source={require("../../assets/icons/chevron-r.png")} />
        </Pressable>

        <Pressable className="flex flex-row justify-start items-center space-x-4 py-2.5">
          <View className="flex-1 ">
            <Text className="font-satoshi-bold font-bold text-base">
              Zodiac
            </Text>
            <Text className="font-medium font-satoshi-medium text-xs text-design-gray-4">
              Leo
            </Text>
          </View>
          <Image source={require("../../assets/icons/chevron-r.png")} />
        </Pressable>

        <Pressable className="flex flex-row justify-start items-center space-x-4 py-2.5">
          <View className="flex-1 ">
            <Text className="font-satoshi-bold font-bold text-base">
              Enneagram
            </Text>
            <Text className="font-medium font-satoshi-medium text-xs text-design-gray-4">
              1
            </Text>
          </View>
          <Image source={require("../../assets/icons/chevron-r.png")} />
        </Pressable>
      </View>
    </View>
  );
}
