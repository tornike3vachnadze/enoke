import { Dimensions, FlatList, StyleSheet, Text, View } from "react-native";
import React, { useState, useEffect } from "react";
import EmojiModal from "react-native-emoji-modal";
import Animated, { useAnimatedStyle } from "react-native-reanimated";
const { width, height } = Dimensions.get("screen");
// import EmojiSelector from "react-native-emoji-selector";
// import EmojiPicker, { emojiFromUtf16 } from "rn-emoji-picker";
// import { emojis } from "rn-emoji-picker/dist/data";
import EmojiPicker from "rn-emoji-keyboard";
import { EmojiKeyboard } from "rn-emoji-keyboard";
const BOX_SIZE = {
  width: width * 0.7,
  height: width,
};
const OFFSET = {
  width: 0,
  height: 0,
};
interface MyObject {
  name: string;
  emoji: string;
  number: number;
}

const EmojiSelectorr = ({
  position,
  onPressOutside,
}: {
  position: { x: number; y: number };
  onPressOutside: () => void;
}) => {
  const [recent, setRecent] = useState([]);
  const [trigger, setTrigger] = useState(false);
  const [isOpen, setIsOpen] = React.useState<boolean>(true);
  const [emojiesData, setEmojiesData] = useState<MyObject[]>([]);
  const [em, setEm] = useState({});
  const animatedStyle = useAnimatedStyle(() => {
    return {
      // transform: [
      //   { translateX: position.x - BOX_SIZE.width },
      //   { translateY: position.y },
      // ],
      left: position.x - BOX_SIZE.width - OFFSET.width,
      top: position.y - BOX_SIZE.height - OFFSET.height,
    };
  });

  const onPressEmoji = (e: {
    emoji: any;
    name: string;
    slug?: string;
    unicode_version?: string;
    toneEnabled?: boolean;
    alreadySelected?: boolean | undefined;
  }) => {
    console.log("onPressEmoji", emojiesData, e);
    console.log("eeeee", e);
    setTrigger((p) => !p);
    setEm(e);
  };
  useEffect(() => {
    console.log("emojiesData:", emojiesData);
    setEmojiesData(emojiesData);
  }, [emojiesData]);

  useEffect(() => {
    if (em?.name) {
      const foundIndex = emojiesData.findIndex((item) => item.name === em.name);

      if (foundIndex === -1) {
        console.log("1");

        const newItem: MyObject = {
          name: em.name,
          emoji: em.emoji,
          number: 1,
        };
        setEmojiesData((p) => [...p, newItem]);
      } else {
        console.log("2");
        const updatedArray = [...emojiesData];
        updatedArray[foundIndex].number += 1;
        setEmojiesData(updatedArray);
      }
    }
  }, [trigger, em]);

  return (
    <Animated.View
      style={[
        {
          padding: 5,
          borderRadius: 15,
          position: "absolute",
          width: BOX_SIZE.width,
          height: BOX_SIZE.height,
          backgroundColor: "white",
          shadowColor: "#000",
          shadowOpacity: 0.1,
          shadowRadius: 5,
          shadowOffset: {
            width: 0,
            height: 0,
          },
        },
        animatedStyle,
      ]}
    >
      <FlatList
        horizontal
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        style={{ position: "absolute", top: -40, left: 0, width: "100%" }}
        data={emojiesData}
        renderItem={({ item, index }) => (
          <View
            style={{
              flexDirection: "row",
              marginRight: 15,
              backgroundColor: "#ffffff",
              width: 60,
              height: 30,
              borderRadius: 10,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text style={{ marginRight: 3 }}>{item.emoji}</Text>
            <Text>{item.number}</Text>
          </View>
        )}
      ></FlatList>

      {/* <EmojiPicker
        emojis={emojis} // emojis data source see data/emojis
        recent={recent} // store of recently used emojis
        autoFocus={true} // autofocus search input
        loading={false} // spinner for if your emoji data or recent store is async
        darkMode={true} // to be or not to be, that is the question
        perLine={7} // # of emoji's per line
        onSelect={console.log} // callback when user selects emoji - returns emoji obj
        // onChangeRecent={setRecent} // callback to update recent storage - arr of emoji objs
        // backgroundColor={'#000'} // optional custom bg color
        // enabledCategories={[ // optional list of enabled category keys
        //   'recent',
        //   'emotion',
        //   'emojis',
        //   'activities',
        //   'flags',
        //   'food',
        //   'places',
        //   'nature'
        // ]}
        // defaultCategory={'food'} // optional default category key
      /> */}

      {/* <EmojiSelector
        onEmojiSelected={(emoji) => console.log(emoji)}
        showTabs={false}
        showHistory={false}
        showSearchBar={false}
        columns={7}
        showSectionTitles={false}
      /> */}

      {/* <EmojiPicker
        expandable={false}
        enableCategoryChangeAnimation={true}
        onEmojiSelected={(e) => console.log(e)}
        open={isOpen}
        onClose={() => setIsOpen(false)}
      ></EmojiPicker> */}

      <EmojiKeyboard
        expandable={false}
        enableCategoryChangeAnimation={true}
        onEmojiSelected={(e) => onPressEmoji(e)}
        // open={isOpen}
        // onClose={() => setIsOpen(false)}
      ></EmojiKeyboard>
      {/* <EmojiModal
        activeShortcutColor={"black"}
        onEmojiSelected={(emoji) => {}}
        searchStyle={{}}
        scrollStyle={{ flex: 1 }}
        backgroundStyle={{ backgroundColor: "transparent" }}
        modalStyle={{ backgroundColor: "transparent" }}
        shortcutColor={"red"}
        onPressOutside={onPressOutside}
        columns={6}
        // show={true}
      /> */}
    </Animated.View>
  );
};

export default EmojiSelectorr;

const styles = StyleSheet.create({});
