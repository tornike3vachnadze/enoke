import { LinearGradient } from "expo-linear-gradient";
import { Slot, usePathname, useRouter } from "expo-router";
import {
  Alert,
  Pressable,
  SafeAreaView,
  ScrollView,
  Text,
  View,
} from "react-native";
import { useUserServer } from "../../hooks/server/useUserServer";
import { useGlobalStore, useProfileStore } from "../../store";

export default function SettingsLayout() {
  const router = useRouter();
  const pathname = usePathname();

  const { base, profile } = useProfileStore();
  const { setIsLoading } = useGlobalStore();

  const { updateBaseData, updateProfileData, updateSettingsData } =
    useUserServer();

  const syncData = async () => {
    setIsLoading(true);
    try {
      const baseData = await updateBaseData(base);
      const profileData = await updateProfileData(profile);
      if (baseData.success && profileData.success) {
        router.push("/profile");
      } else {
        Alert.alert("Error", "Something went wrong while updating settings");
      }
    } catch (error) {
      console.log(error);
      // Alert.alert("Error", "Something went wrong while updating settings");
    }
    setIsLoading(false);
  };

  return (
    <LinearGradient
      colors={["#F8F9FB", "#DAD9E9"]}
      locations={[0.32, 1]}
      className="flex-1"
    >
      <SafeAreaView className="flex-1">
        <View className="flex flex-row justify-between items-center w-full px-4 border-b border-design-gray-3 pb-3 pt-2">
          <Pressable className="flex-1" onPress={() => router.push("/profile")}>
            <Text className="text-left font-bold font-satoshi-bold text-sm text-design-primary">
              Cancel
            </Text>
          </Pressable>
          <Text className="flex-1 text-center font-bold font-satoshi-bold text-2xl">
            Settings
          </Text>
          <Pressable
            className="flex-1"
            onPress={() => {
              syncData();
            }}
          >
            <Text className="text-right font-bold font-satoshi-bold text-sm text-design-primary">
              Done
            </Text>
          </Pressable>
        </View>
        <View className="flex flex-row justify-between items-center w-full px-4 border-b border-design-gray-3 pb-3 pt-2.5">
          <View className="flex-1 flex flex-row justify-start items-center">
            <Pressable
              className={`border-b self-start px-3 pb-1 ${
                pathname.includes("/profile")
                  ? "border-b-design-secondary"
                  : "border-b-transparent"
              }`}
              onPress={() => router.push("/settings/profile")}
            >
              <Text className="text-left font-bold font-satoshi-bold text-base">
                Profile
              </Text>
            </Pressable>
          </View>
          <View className="flex-1 flex flex-row justify-center items-center">
            <Pressable
              className={`border-b self-start px-3 pb-1 ${
                pathname.includes("/account")
                  ? "border-b-design-secondary"
                  : "border-b-transparent"
              }`}
              onPress={() => router.push("/settings/account")}
            >
              <Text className="text-center font-bold font-satoshi-bold text-base">
                Account
              </Text>
            </Pressable>
          </View>
          <View className="flex-1  flex flex-row justify-end items-center">
            <Pressable
              className={`border-b self-start px-3 pb-1 ${
                pathname.includes("/preferences")
                  ? "border-b-design-secondary"
                  : "border-b-transparent"
              }`}
              onPress={() => router.push("/settings/preferences")}
            >
              <Text className="text-right font-bold font-satoshi-bold text-base">
                Preferences
              </Text>
            </Pressable>
          </View>
        </View>
        <ScrollView className="flex-1" keyboardShouldPersistTaps="handled">
          <Slot />
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
}
