import { FirebaseRecaptchaVerifierModal } from "expo-firebase-recaptcha";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Image, Pressable, Text, TextInput, View } from "react-native";
import { firebaseConfig } from "../../config";
import { useAuth } from "../../hooks";
import ArrowL from "../../assets/icons/arrow-l.svg";
import { LinearGradient } from "expo-linear-gradient";
import { checkIfUsernameExists } from "../../utils";

export default function Onboarding() {
  const router = useRouter();

  const { register } = useAuth();

  const [isLoading, setIsLoading] = useState(false);
  const [username, setUsername] = useState("@");

  const [registered, setRegistered] = useState(false);

  const [available, setAvailable] = useState(false);

  useEffect(() => {
    if (username.length > 1) {
      if (username[0] !== "@") {
        setUsername(`@${username}`);
      }
    }
  }, [username]);

  useEffect(() => {
    const check = async () => {
      const exists = await checkIfUsernameExists(username);
      if (exists) {
        setAvailable(false);
      } else {
        setAvailable(true);
      }
    };
    if (username.length > 1) {
      check();
    }
  }, [username]);

  useEffect(() => {
    if (registered) {
      setUsername((username) => username + "✅");
      setTimeout(() => {
        router.push("/");
      }, 2000);
    }
  }, [registered]);

  const finalize = async () => {
    setIsLoading(true);
    try {
      await register(username);
      setRegistered(true);
    } catch (e) {
      console.log(e);
    }
    setIsLoading(false);
  };

  return (
    <LinearGradient
      colors={["#F8F9FB", "#DAD9E9"]}
      locations={[0.32, 1]}
      className="flex-1"
    >
      <View
        className="flex-1 justify-center items-center py-12 px-4"
        style={{
          opacity: isLoading ? 0.5 : 1,
        }}
        pointerEvents={isLoading ? "none" : "auto"}
      >
        <View className="absolute top-1/4 w-full flex flex-row justify-between items-center px-10">
          <Pressable
            className="px-4 py-2 transform -translate-x-2"
            onPress={() => {
              router.push("/");
            }}
          >
            <ArrowL />
          </Pressable>
          <Pressable
            className="px-4 py-2 transform translate-x-2"
            onPress={() => {
              finalize();
            }}
            style={{
              opacity: username.length > 1 ? 1 : 0.5,
            }}
            disabled={!available}
          >
            <Text className="text-design-text text-lg font-bold font-satoshi-bold">
              Done
            </Text>
          </Pressable>
        </View>
        <View className="w-full justify-center px-1">
          <Text className="text-3xl font-light font-satoshi-light text-center">
            {username.length > 1
              ? available
                ? "Available!"
                : "Oops, that’s taken!"
              : !registered && "Choose your username"}
            {registered && "Welcome!"}
          </Text>
          {!registered && username.length < 2 && (
            <Text className="font-light text-center font-satoshi-light text-sm text-design-text mt-2">
              (You can always change it later)
            </Text>
          )}
        </View>
        <View className="mt-4 w-full space-y-4">
          <TextInput
            className="px-6 py-4 text-center bg-transparent font-medium font-satoshi-medium"
            placeholder="@"
            placeholderTextColor={"#737dbe"}
            inputMode="text"
            keyboardType="default"
            style={{ fontSize: 32, color: "#737dbe" }}
            value={username}
            onChangeText={(text) => {
              setUsername(text);
            }}
          />
        </View>
      </View>
    </LinearGradient>
  );
}
