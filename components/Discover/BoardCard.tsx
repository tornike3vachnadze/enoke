import { Image, Text, View } from "react-native";

function Large({
  image,
  reactions,
  locked,
}: {
  image: any;
  reactions: {
    emoji: string;
    count: number;
  }[];
  locked?: boolean;
}) {
  const formatter = new Intl.NumberFormat("en-US", {
    notation: "compact",
  });

  return (
    <View className="w-full aspect-video rounded-xl shadow-xl">
      <Image
        source={image}
        className="w-full aspect-video rounded-xl absolute top-0 left-0"
      />
      <View className="flex-1 justify-between flex-row items-end p-4">
        <View className="flex-row justify-start items-center space-x-4">
          {reactions.map((reaction) => (
            <View className="shadow bg-design-gray-7-50 rounded-md p-2 flex flex-row justify-center items-center space-x-2">
              <Text className="text-sm">{reaction.emoji}</Text>
              <Text className="text-xs font-satoshi-medium font-medium">
                {formatter.format(reaction.count)}
              </Text>
            </View>
          ))}
        </View>
        {locked && (
          <View className="shadow bg-design-gray-7-50 rounded-md p-2.5 flex flex-row justify-center items-center space-x-2">
            <Image source={require("../../assets/icons/lock.png")} />
          </View>
        )}
      </View>
    </View>
  );
}

function Small({
  image,
  reactions,
  locked,
  title,
  user,
  userImage,
}: {
  image: any;
  reactions: {
    emoji: string;
    count: number;
  }[];
  locked?: boolean;
  title: string;
  user: string;
  userImage?: any;
}) {
  const formatter = new Intl.NumberFormat("en-US", {
    notation: "compact",
  });

  return (
    <View className="w-80">
      <View className="aspect-video w-full rounded-xl shadow">
        <Image
          source={image}
          className="w-full h-full rounded-xl absolute top-0 left-0"
        />
        <View className="w-full flex-1 justify-between flex-row items-end p-3">
          <View className="flex-row justify-start items-center space-x-2">
            {reactions.map((reaction) => (
              <View className="shadow bg-design-gray-7-50 rounded-md px-1 py-2 flex flex-row justify-center items-center space-x-2">
                <Text className="text-[10px]">{reaction.emoji}</Text>
                <Text className="text-[10px] font-satoshi-medium font-medium">
                  {formatter.format(reaction.count)}
                </Text>
              </View>
            ))}
          </View>
          {locked && (
            <View className="shadow bg-design-gray-7-50 rounded-md p-2 flex flex-row justify-center items-center space-x-2">
              <Image source={require("../../assets/icons/lock.png")} />
            </View>
          )}
        </View>
      </View>
      <View className="w-full mt-3 flex flex-row justify-start items-center space-x-3">
        {userImage ? (
          <View></View>
        ) : (
          <View className="h-12 w-12 bg-design-primary rounded-full"></View>
        )}
        <View>
          <Text className="font-medium font-satoshi-medium text-lg">
            {title}
          </Text>
          <Text className="font-normal font-satoshi-regular text-md">
            Created by {user}
          </Text>
        </View>
      </View>
    </View>
  );
}

function Small2({
  image,
  reactions,
  locked,
  title,
  user,
  userImage,
}: {
  image: any;
  reactions: {
    emoji: string;
    count: number;
  }[];
  locked?: boolean;
  title: string;
  user: string;
  userImage?: any;
}) {
  const formatter = new Intl.NumberFormat("en-US", {
    notation: "compact",
  });

  return (
    <View className="w-full">
      <View className="h-40 w-full rounded-xl shadow">
        <Image
          source={image}
          className="w-full h-full rounded-xl absolute top-0 left-0"
        />
        <View className="w-full flex-1 justify-between flex-row items-end p-3">
          <View className="flex-row justify-start items-center space-x-2"></View>
          {locked && (
            <View className="shadow bg-design-gray-7-50 rounded-md p-2 flex flex-row justify-center items-center space-x-2">
              <Image source={require("../../assets/icons/lock.png")} />
            </View>
          )}
        </View>
      </View>
      <View className="w-full mt-3 flex flex-row justify-start items-center space-x-3">
        {userImage ? (
          <View></View>
        ) : (
          <View className="h-10 w-10 bg-design-primary rounded-full"></View>
        )}
        <View>
          <Text className="font-medium font-satoshi-medium text-md">
            {title}
          </Text>
        </View>
      </View>
    </View>
  );
}

const BoardCard = {
  Large,
  Small,
  Small2,
};

export default BoardCard;
