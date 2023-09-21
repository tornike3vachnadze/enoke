import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Switch,
  Pressable,
} from "react-native";
import { useRouter } from "expo-router";
import { useAuth } from "../../hooks";

const settings = [
  { name: "NotificationSetting", title: "Notifications", type: "screen" },
  { name: "PasswordSetting", title: "Password", type: "screen" },
  { name: "UpdateAppleIDSetting", title: "Update Apple ID", type: "screen" },
  {
    name: "MultiFactorAuthenticationSetting",
    title: "Multi-Factor Authentication",
    type: "switch",
  },
  { name: "BlockedAccountsSetting", title: "Blocked Accounts", type: "screen" },
  { name: "InviteAFriendSetting", title: "Invite A Friend", type: "screen" },
  { name: "PrivateAccountSetting", title: "Private Account", type: "switch" },
  { name: "HelpCenterSetting", title: "Help Center", type: "screen" },
  { name: "TermsOfServiceSetting", title: "Terms of Service", type: "screen" },
  { name: "PrivacyPolicySetting", title: "Privacy Policy", type: "screen" },
  { name: "CookieNoticeSetting", title: "Cookie Notice", type: "screen" },
];

export default function Account() {
  const router = useRouter();
  const { logout } = useAuth();

  const [switchStates, setSwitchStates] = useState<any>({});

  const handleSwitchToggle = (name: string, value: boolean) => {
    // TODO: Handle switch toggle logic here
    setSwitchStates({ ...switchStates, [name]: value });
  };

  return (
    <View style={styles.container}>
      {settings.map((setting) => (
        <View key={setting.name}>
          {setting.type === "switch" ? (
            <View style={styles.item}>
              <Text className="font-satoshi-bold font-bold text-base">
                {setting.title}
              </Text>
              <Switch
                value={switchStates[setting.name] || false}
                onValueChange={(value) =>
                  handleSwitchToggle(setting.name, value)
                }
              />
            </View>
          ) : (
            <TouchableOpacity
              style={styles.item}
              onPress={() => router.push(`/settings/${setting.name}`)}
            >
              <Text className="font-satoshi-bold font-bold text-base">
                {setting.title}
              </Text>
              <Image source={require("../../assets/icons/chevron-r.png")} />
            </TouchableOpacity>
          )}
        </View>
      ))}
      <View className="flex flex-row justify-start items-center space-x-4 py-2.5">
        <Pressable
          className="flex-1"
          onPress={() => {
            logout();
          }}
        >
          <Text className="font-satoshi-bold font-bold text-base text-red-600">
            Logout
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 30,
  },
  item: {
    flex: 1,
    paddingVertical: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  text: {
    fontSize: 18,
    fontFamily: "Satoshi-Medium",
  },
});
