import { FirebaseRecaptchaVerifierModal } from "expo-firebase-recaptcha";
import { Link, useRouter } from "expo-router";
import { useRef, useState } from "react";
import { Alert, Image, Pressable, Text, TextInput, View } from "react-native";
import { firebaseConfig } from "../../config";
import { useAuth } from "../../hooks";
import ArrowL from "../../assets/icons/arrow-l.svg";
import { LinearGradient } from "expo-linear-gradient";

export default function Phone() {
  const router = useRouter();

  const recaptchaVerifier = useRef(null);

  const { loginWithPhone } = useAuth();

  const [phoneNumber, setPhoneNumber] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const login = async () => {
    setIsLoading(true);
    try {
      await loginWithPhone(phoneNumber, recaptchaVerifier);
      router.push("/auth/otp");
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
              router.push("/auth");
            }}
          >
            <ArrowL />
          </Pressable>
          <Pressable
            className="px-4 py-2 transform translate-x-2"
            onPress={() => {
              login();
            }}
          >
            <Text className="text-design-text text-lg font-bold font-satoshi-bold">
              Next
            </Text>
          </Pressable>
        </View>
        <View className="w-full justify-center px-1">
          <Text className="w-full font-medium text-2xl font-satoshi-medium">
            Enter your phone number
          </Text>
        </View>
        <View className="mt-6 w-full space-y-4">
          <TextInput
            className="px-6 py-4 bg-transparent rounded-full border font-medium font-satoshi-medium"
            placeholder="Your Phone no. (include country code)"
            placeholderTextColor={"#989898"}
            inputMode="tel"
            keyboardType="phone-pad"
            textContentType="telephoneNumber"
            returnKeyType="done"
            id="phone-number-input"
            style={{ fontSize: 18, borderColor: "#989898", color: "#3f3f3f" }}
            value={phoneNumber}
            onChangeText={(phoneNumber) => setPhoneNumber(phoneNumber)}
          />
          <Text className="font-light font-satoshi-light text-base text-design-gray mt-6 px-2">
            Your phone number is kept private and used for verification &
            optional SMS notifications. See Terms.
          </Text>
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
