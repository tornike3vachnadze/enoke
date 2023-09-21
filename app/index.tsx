import { LinearGradient } from "expo-linear-gradient";
import Home from "../components/Home";
import { useAuth } from "../hooks";
import { ActivityIndicator, View } from "react-native";
import { PortalProvider } from "@gorhom/portal";
global.Buffer = require("buffer").Buffer;

export default function Initial() {
  const { user, localUser } = useAuth();

  return (
    <LinearGradient
      colors={["#F8F9FB", "#DAD9E9"]}
      locations={[0.32, 1]}
      className="flex-1"
    >
      <PortalProvider>
        <Home />
      </PortalProvider>
      {!user && !localUser && (
        <View className="absolute top-0 left-0 w-full h-full bg-white z-50">
          <LinearGradient
            colors={["#F8F9FB", "#DAD9E9"]}
            locations={[0.32, 1]}
            className="flex-1 flex flex-col justify-center items-center"
          >
            <ActivityIndicator color="#6C68A8" />
          </LinearGradient>
        </View>
      )}
    </LinearGradient>
  );
}
