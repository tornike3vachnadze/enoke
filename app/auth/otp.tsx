import { FirebaseRecaptchaVerifierModal } from "expo-firebase-recaptcha";
import { Link, useRouter } from "expo-router";
import { useRef, useState } from "react";
import { Alert, Image, Pressable, Text, TextInput, View } from "react-native";
import { firebaseConfig } from "../../config";
import { useAuth } from "../../hooks";
import ArrowL from "../../assets/icons/arrow-l.svg";
import { LinearGradient } from "expo-linear-gradient";

export default function Otp() {
  const router = useRouter();

  const recaptchaVerifier = useRef(null);

  const { confirmCode } = useAuth();

  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const confirm = async () => {
    setIsLoading(true);
    try {
      await confirmCode(otp);
    } catch (error: any) {
      console.log(error);
      Alert.alert("Error", error.message || "An error occured");
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
              router.push("/auth/phone");
            }}
          >
            <ArrowL />
          </Pressable>
          <Pressable
            className="px-4 py-2 transform translate-x-2"
            onPress={() => {
              confirm();
            }}
          >
            <Text className="text-design-text text-lg font-bold font-satoshi-bold">
              Next
            </Text>
          </Pressable>
        </View>
        <View className="w-full justify-center px-1">
          <Text className="font-medium text-2xl font-satoshi-medium">
            Enter verification code
          </Text>
          <Text className="font-light font-satoshi-light text-base text-design-text mt-2">
            We sent you a 6 digit verification to your phone number.
          </Text>
        </View>
        <View className="mt-4 w-full space-y-4">
          <TextInput
            className="px-6 py-4 bg-transparent rounded-full border font-medium font-satoshi-medium"
            placeholder="Enter 6 digit verification code "
            placeholderTextColor={"#989898"}
            inputMode="numeric"
            keyboardType="numeric"
            style={{ fontSize: 18, borderColor: "#989898", color: "#3f3f3f" }}
            value={otp}
            onChangeText={(otp) => setOtp(otp)}
          />
        </View>
        <FirebaseRecaptchaVerifierModal
          ref={recaptchaVerifier}
          firebaseConfig={firebaseConfig}
          // attemptInvisibleVerification
        />
      </View>
    </LinearGradient>
  );
}
