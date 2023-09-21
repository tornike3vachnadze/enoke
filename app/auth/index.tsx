import { Link } from "expo-router";
import { Image, Text, View } from "react-native";
import Logo from "../../assets/images/enok-logo.svg";
import { LinearGradient } from "expo-linear-gradient";

export default function Auth() {
  return (
    <LinearGradient
      colors={["#F8F9FB", "#DAD9E9"]}
      locations={[0.32, 1]}
      className="flex-1"
    >
      <View className="flex-1 py-12 px-4">
        <View className="flex-1 justify-center items-center transform scale-110">
          <Logo width={200} />
          <Text className="font-light mt-4 text-xl font-satoshi-light">
            space to create
          </Text>
        </View>
        <View className="flex gap-4">
          <Link href="/auth/sign-up">
            <View className="flex-row justify-center items-center py-4 bg-design-dark rounded-full">
              <Text className="w-full text-center text-white text-lg font-bold font-satoshi-bold">
                Create Account
              </Text>
            </View>
          </Link>
          <Link href="/auth/sign-in">
            <View className="flex-row justify-center items-center py-4 bg-white rounded-full shadow-sm">
              <Text className="w-full text-center text-design-text text-lg font-bold font-satoshi-bold">
                Login
              </Text>
            </View>
          </Link>
          <Text className="text-center font-light text-sm text-design-gray px-4 font-satoshi-light">
            By continuing, you agree to Enok's{" "}
            <Text className="font-bold font-satoshi-bold">
              Terms & Conditions
            </Text>{" "}
            and acknowledge you've read our{" "}
            <Text className="font-bold font-satoshi-bold">Privacy Policy</Text>.
          </Text>
        </View>
      </View>
    </LinearGradient>
  );
}
