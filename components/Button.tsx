import {
  Pressable,
  Text,
  View,
  GestureResponderEvent,
  TouchableOpacity,
  TextStyle,
} from "react-native";

type ButtonProps = {
  onPress?: (e: GestureResponderEvent) => void;
  title?: string;
  className?: string;
  children: React.ReactNode;
  active?: boolean;
  titleStyle?: TextStyle;
};

function ButtonRound({
  onPress,
  title,
  className,
  children,
  titleStyle,
}: ButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      className={`flex flex-col justify-center items-center ${className}`}
    >
      <View className="bg-white w-10 h-10 flex justify-center items-center rounded-full">
        {children}
      </View>
      {title && (
        <Text
          style={[
            {
              fontSize: 12,
            },
            titleStyle,
          ]}
          className="mt-1 text-design-secondary font-light font-satoshi-light"
        >
          {title}
        </Text>
      )}
    </Pressable>
  );
}

function ButtonSquare({
  onPress,
  title,
  className,
  active = false,
  children,
  titleStyle,
}: ButtonProps) {
  return (
    <View className={className}>
      <Pressable
        onPress={onPress}
        className={`self-center relative bg-white w-10 h-10 flex justify-center items-center rounded-lg shadow ${
          active ? "border-2 border-design-primary" : ""
        }`}
      >
        {children}
      </Pressable>
      {title && (
        <Text
          style={[
            {
              fontSize: 12,
            },
            titleStyle,
          ]}
          className="mt-1 text-design-secondary font-light font-satoshi-light self-center"
        >
          {title}
        </Text>
      )}
    </View>
  );
}

function ButtonTransparent({
  onPress,
  title,
  className,
  active = false,
  children,
  titleStyle,
}: ButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      className={`flex flex-col justify-center items-center ${className}`}
    >
      <View
        className={`bg-tr w-10 h-10 flex justify-center items-center rounded-lg shadow ${
          active ? "border-2 border-design-primary" : ""
        }`}
      >
        {children}
      </View>
      {title && (
        <Text
          style={[
            {
              fontSize: 12,
            },
            titleStyle,
          ]}
          className="mt-1 text-design-secondary font-light font-satoshi-light"
        >
          {title}
        </Text>
      )}
    </Pressable>
  );
}

const Button = {
  Round: ButtonRound,
  Square: ButtonSquare,
  Transparent: ButtonTransparent,
};

export default Button;
