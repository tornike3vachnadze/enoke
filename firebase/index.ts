import { initializeApp } from "firebase/app";
import { initializeAuth } from "firebase/auth";
import { firebaseConfig } from "../config";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { getReactNativePersistence } from "firebase/auth/react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const firebaseApp = initializeApp(firebaseConfig);
const auth = initializeAuth(firebaseApp, {
  persistence: getReactNativePersistence(AsyncStorage),
});
auth.useDeviceLanguage();
auth.settings.appVerificationDisabledForTesting = true;

GoogleSignin.configure({
  webClientId:
    "109600107400-2lv8i2ogs1m4a9ai100eioiichoija5q.apps.googleusercontent.com",
});

export { auth };
