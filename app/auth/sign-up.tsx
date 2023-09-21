import { Link, useRouter } from "expo-router";
import { Image, Pressable, Text, View } from "react-native";
import Logo from "../../assets/images/enok-logo.svg";
import { LinearGradient } from "expo-linear-gradient";
import { useAuth } from "../../hooks";
import { useState } from "react";

export default function SignUp() {
  const router = useRouter();

  const { loginWithGoogle, login } = useAuth();

  const [isLoading, setIsLoading] = useState(false);

  const googleSignIn = async () => {
    setIsLoading(true);
    try {
      await loginWithGoogle();
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };

  return (
    <LinearGradient
      colors={["#F8F9FB", "#DAD9E9"]}
      locations={[0.32, 1]}
      className="flex-1"
    >
      <View className="flex-1 justify-center items-center py-12 px-4">
        <View className="transform scale-110 gap-8">
          <Logo width={200} />
        </View>
        <View className="mt-12 w-full space-y-4">
          <Pressable
            id="sign-in-button"
            className="flex-row space-x-3 justify-center items-center py-4 bg-white rounded-full shadow-sm"
            onPress={() => {
              router.push("/auth/phone");
            }}
          >
            <Image source={require("../../assets/icons/phone.png")} />
            <Text className="text-center text-black opacity-50 text-lg font-medium font-satoshi-medium">
              Continue with Phone
            </Text>
          </Pressable>
          <Pressable
            className="flex-row space-x-3 justify-center items-center py-4 bg-white rounded-full shadow-sm"
            onPress={() => {
              googleSignIn();
            }}
          >
            <Image source={require("../../assets/icons/google.png")} />
            <Text className="text-center text-black opacity-50 text-lg font-medium font-satoshi-medium">
              Continue with Google
            </Text>
          </Pressable>
        </View>
        <View className="absolute bottom-24">
          <Link href="/auth" className="py-3 px-8">
            <Text className="text-center text-design-text text-lg font-bold font-satoshi-bold">
              Back
            </Text>
          </Link>
        </View>
      </View>
    </LinearGradient>
  );
}
