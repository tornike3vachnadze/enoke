import {
  Slot,
  Stack,
  usePathname,
  useRootNavigation,
  useRootNavigationState,
  useRouter,
} from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { ActivityIndicator, Pressable, Text, View } from "react-native";
import { useFonts } from "expo-font";
import { useAuth } from "../hooks";
import { useCallback, useEffect } from "react";
import * as SplashScreen from "expo-splash-screen";
import Nav from "../components/Nav";
import { useGlobalStore, useProfileStore } from "../store";
import { useUserServer } from "../hooks/server/useUserServer";
import { loadSelfProfileData, pingServer } from "../utils";

SplashScreen.preventAutoHideAsync();

export default function Layout() {
  const router = useRouter();
  const pathname = usePathname();

  const [fontsLoaded] = useFonts({
    "Satoshi-Light": require("../assets/fonts/Satoshi-Light.otf"),
    "Satoshi-Regular": require("../assets/fonts/Satoshi-Regular.otf"),
    "Satoshi-Medium": require("../assets/fonts/Satoshi-Medium.otf"),
    "Satoshi-Bold": require("../assets/fonts/Satoshi-Bold.otf"),
    "Satoshi-Black": require("../assets/fonts/Satoshi-Black.otf"),
    "Satoshi-LightItalic": require("../assets/fonts/Satoshi-Light.otf"),
    "Satoshi-Italic": require("../assets/fonts/Satoshi-Italic.otf"),
    "Satoshi-MediumItalic": require("../assets/fonts/Satoshi-MediumItalic.otf"),
    "Satoshi-BoldItalic": require("../assets/fonts/Satoshi-BoldItalic.otf"),
    "Satoshi-BlackItalic": require("../assets/fonts/Satoshi-BlackItalic.otf"),
  });

  const { user, localUser, authLoading, verify } = useAuth();

  const {
    isLoading,
    isConnected,
    connectionInProgess,
    setIsConnected,
    setConnectionInProgess,
  } = useGlobalStore();

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  const navigationState = useRootNavigationState();

  useEffect(() => {
    if (!navigationState?.key) return;
    if (!authLoading && fontsLoaded) {
      if (!user && !pathname.includes("/auth")) {
        router.push("/auth");
      }
      if (user && localUser && pathname.includes("/auth")) {
        router.push("/");
      }
      if (user && localUser && pathname.includes("/onboarding")) {
        router.push("/");
      }
      if (!localUser && pathname === "/") {
        router.push("/onboarding");
      }
    }
  }, [
    navigationState?.key,
    authLoading,
    fontsLoaded,
    user,
    localUser,
    pathname,
  ]);

  console.log("Pathname", pathname);

  useEffect(() => {
    if (user) {
      try {
        verify();
      } catch (e) {
        console.log(e);
      }
    }
  }, [pathname]);

  useEffect(() => {
    if (user) {
      loadSelfProfileData();
    }
  }, [user]);

  useEffect(() => {
    let interval: any;
    (async () => {
      const isConnected = await pingServer();
      setIsConnected(isConnected);
      setConnectionInProgess(false);
      interval = setInterval(async () => {
        const isConnected = await pingServer();
        setIsConnected(isConnected);
        setConnectionInProgess(false);
      }, 30000);
    })();
    return () => {
      clearInterval(interval);
    };
  }, []);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View className="flex-1" onLayout={onLayoutRootView}>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      />
      {pathname.includes("/auth") ||
      pathname.includes("chat/room") ||
      pathname.includes("/onboarding") ||
      pathname.includes("/settings") ? null : (
        <>{user && localUser && <Nav.Bottom />}</>
      )}
      {(isLoading || connectionInProgess) && (
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
      {!connectionInProgess && !isConnected && (
        <View
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            zIndex: 100,
            height: "100%",
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <LinearGradient
            colors={["#F8F9FB", "#DAD9E9"]}
            locations={[0.32, 1]}
            className="flex-1 w-full"
          >
            <View className="flex justify-center items-center w-full h-full p-6">
              <Text className="text-4xl">☹️</Text>
              <Text className="text-lg font-bold font-satoshi-bold text-center text-gray-800 mt-2">
                Couldn't connect to Enok servers
              </Text>
              <Text className="text-sm font-normal font-satoshi-regular text-center text-gray-800 mt-2">
                Please check your internet connection and try again
              </Text>
              <Pressable
                onPress={async () => {
                  setConnectionInProgess(true);
                  const isConnected = await pingServer();
                  setIsConnected(isConnected);
                  setConnectionInProgess(false);
                }}
                className="bg-gray-800 px-4 py-2 rounded-lg mt-4"
              >
                <Text className="text-white font-satoshi-regular">Retry</Text>
              </Pressable>
            </View>
          </LinearGradient>
        </View>
      )}
    </View>
  );
}
