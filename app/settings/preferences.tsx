import { useState } from 'react';
import { Pressable, Text, TextInput, View } from 'react-native';
import { SimpleGrid } from 'react-native-super-grid';

export default function Preferences() {
  const [search, setSearch] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const handleTagSelection = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(
        selectedTags.filter((selectedTag) => selectedTag !== tag)
      );
    } else {
      if (selectedTags.length < 10) {
        setSelectedTags([...selectedTags, tag]);
      }
    }
  };

  const renderTag = ({ item }: { item: string }) => {
    const isSelected = selectedTags.includes(item);
    return (
      <Pressable
        onPress={() => handleTagSelection(item)}
        style={{
          backgroundColor: isSelected ? '#898FD1' : 'white',
          borderRadius: 16,
          paddingVertical: 8,
          paddingHorizontal: 12,
          marginVertical: 8,
        }}
      >
        <Text
          style={{
            fontFamily: 'Satoshi-Bold',
            fontSize: 14,
            textAlign: 'center',
            color: isSelected ? 'white' : '#000000',
          }}
        >
          {item}
        </Text>
      </Pressable>
    );
  };

  const filteredTags: string[] = [
    'Art',
    'Music',
    'Sports',
    'Gaming',
    'Fashion',
    'Food',
    'Travel',
    'Crypto',
    'NFTs',
    'Memes',
    'News',
    'Politics',
    'Science',
    'Technology',
    'Health',
    'Fitness',
    'Beauty',
    'Lifestyle',
  ].filter((tag) => tag.toLowerCase().includes(search.toLowerCase()));

  return (
    <View style={{ paddingTop: 16, paddingBottom: 24, paddingHorizontal: 32 }}>
      <View
        style={{
          marginTop: 16,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Text style={{ fontFamily: 'Satoshi-Bold', fontSize: 18 }}>
          Discover Preferences
        </Text>
        <Text
          style={{
            fontFamily: 'Satoshi-Medium',
            fontSize: 12,
            color: '#6D6D70',
          }}
        >
          Choose up to 10 tags.
        </Text>
      </View>
      <View
        style={{
          marginTop: 16,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <TextInput
          style={{
            flex: 1,
            paddingHorizontal: 16,
            paddingVertical: 12,
            backgroundColor: '#EDEEF0',
            borderRadius: 24,
            borderWidth: 1,
            borderColor: '#EDEEF0',
            fontFamily: 'Satoshi-Medium',
            fontSize: 14,
            color: 'black',
          }}
          placeholder="Start Typing..."
          placeholderTextColor="#6D6D70"
          keyboardType="default"
          value={search}
          onChangeText={(text) => setSearch(text)}
        />
      </View>

      <View className="mt-6 w-full">
        {/* @ts-ignore */}
        <SimpleGrid
          itemDimension={130}
          data={filteredTags}
          renderItem={renderTag}
        />
      </View>
    </View>
  );
}
