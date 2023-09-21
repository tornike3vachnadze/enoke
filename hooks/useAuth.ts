import { useAuthStore } from "../store";
import { auth } from "../firebase";
import { useEffect } from "react";
import {
  signInWithPhoneNumber,
  GoogleAuthProvider,
  signOut,
  signInWithCredential,
} from "firebase/auth";
import {
  GoogleSignin,
  statusCodes,
} from "@react-native-google-signin/google-signin";
import { BACKEND_URL } from "../config";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";

export const useAuth = () => {
  const {
    user,
    localUser,
    authLoading,
    confirmationResult,
    setUser,
    setLocalUser,
    setAuthLoading,
    setConfirmationResult,
  } = useAuthStore();

  const router = useRouter();

  useEffect(() => {
    // AsyncStorage.getAllKeys().then((keys) => {
    //   keys.forEach((key) => {
    //     if (key.includes("firebase")) {
    //       AsyncStorage.removeItem(key);
    //     }
    //   });
    // });

    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      setAuthLoading(true);
      try {
        if (user) {
          const token = await user.getIdToken();
          setUser({ token, user });
          if (!localUser) {
            const l: any = await login({
              email: user.email || "",
              phone: user.phoneNumber || "",
            });

            if (l.message === "User logged in successfully") {
              router.push("/");
            }
          }
        } else {
          setUser(null);
        }
      } catch (error) {
        console.log(error);
        if (error === "User not found") {
          router.push("/onboarding");
        }
      }
      setAuthLoading(false);
    });
    return () => unsubscribe();
  }, [setUser, setAuthLoading]);

  const login = ({ email, phone }: { email?: string; phone?: string }) => {
    return new Promise(async (resolve, reject) => {
      setAuthLoading(true);
      try {
        const res = await fetch(`${BACKEND_URL}/users/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-firebase-token": await auth.currentUser?.getIdToken(),
          } as any,
          body: JSON.stringify({
            email,
            phone,
          }),
        });
        const data = await res.json();
        if (!data.success) {
          reject(data?.message || "Something went wrong");
          setAuthLoading(false);
          return;
        }
        setLocalUser({
          ...data.data.user,
          token: data.data.token,
        });
        resolve(data);
      } catch (error: any) {
        reject(error?.message || error);
      }
      setAuthLoading(false);
    });
  };

  const register = (username: string) => {
    return new Promise(async (resolve, reject) => {
      setAuthLoading(true);
      try {
        const res = await fetch(`${BACKEND_URL}/users/register`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-firebase-token": await auth.currentUser?.getIdToken(),
          } as any,
          body: JSON.stringify({
            email: user?.user?.email || undefined,
            phone: user?.user?.phoneNumber || undefined,
            username,
          }),
        });
        const data = await res.json();
        if (!data.success) {
          reject(data?.message || "Something went wrong");
          setAuthLoading(false);
          return;
        }
        setLocalUser({
          ...data.data.user,
          token: data.data.token,
        });
        resolve(data);
      } catch (error: any) {
        reject(error?.message || error);
      }
      setAuthLoading(false);
    });
  };

  const loginWithPhone = async (
    phoneNumber: string,
    recaptchaVerifier: React.MutableRefObject<any>
  ) => {
    return new Promise(async (resolve, reject) => {
      try {
        const confirmationResult = await signInWithPhoneNumber(
          auth,
          phoneNumber,
          recaptchaVerifier.current
        );
        setConfirmationResult(confirmationResult);
        resolve(confirmationResult);
      } catch (error) {
        reject(error);
      }
    });
  };

  const confirmCode = async (code: string) => {
    return new Promise(async (resolve, reject) => {
      try {
        const result = await confirmationResult.confirm(code);
        resolve(result);
      } catch (error) {
        reject(error);
      }
    });
  };

  const loginWithGoogle = async () => {
    return new Promise(async (resolve, reject) => {
      try {
        await GoogleSignin.hasPlayServices({
          showPlayServicesUpdateDialog: true,
        });
        const { idToken } = await GoogleSignin.signIn();
        const googleCredential = GoogleAuthProvider.credential(idToken);
        const result = signInWithCredential(auth, googleCredential);
        resolve(result);
      } catch (error: any) {
        if (error.code === statusCodes.SIGN_IN_CANCELLED) {
          reject("SIGN IN CANCELLED");
        } else if (error.code === statusCodes.IN_PROGRESS) {
          reject("IN PROGRESS");
        } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
          reject("PLAY SERVICES NOT AVAILABLE");
        } else {
          reject(error);
        }
      }
    });
  };

  const logout = async () => {
    return new Promise(async (resolve, reject) => {
      try {
        await signOut(auth);
        AsyncStorage.getAllKeys().then((keys) => {
          keys.forEach((key) => {
            if (key.includes("firebase")) {
              AsyncStorage.removeItem(key);
            }
          });
        });
        setLocalUser(null);
        resolve("Successfully logged out!");
      } catch (error) {
        reject(error);
      }
    });
  };

  const verify = () => {
    return new Promise(async (resolve, reject) => {
      setAuthLoading(true);
      try {
        if (!localUser?.token) {
          reject("No token found");
          setAuthLoading(false);
          return;
        }
        const res = await fetch(`${BACKEND_URL}/users/verify`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localUser?.token}`,
            "x-firebase-token": user?.token || "",
          },
        });
        const data = await res.json();
        if (!data.success) {
          await logout();
          Alert.alert("Session expired", "Please login again");
          setAuthLoading(false);
          reject(data?.message || "Something went wrong");
          return;
        }
        setLocalUser({
          ...data.data.user,
          token: localUser?.token,
        });
        resolve(data);
      } catch (error: any) {
        // AsyncStorage.getAllKeys().then((keys) => {
        //   keys.forEach((key) => {
        //     if (key.includes("firebase")) {
        //       AsyncStorage.removeItem(key);
        //     }
        //   });
        // });
        reject(error.message || error);
      }
      setAuthLoading(false);
    });
  };

  return {
    auth,
    user,
    localUser,
    authLoading,
    confirmationResult,
    login,
    register,
    loginWithPhone,
    confirmCode,
    loginWithGoogle,
    logout,
    verify,
  };
};
