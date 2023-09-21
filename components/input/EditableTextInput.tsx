import React, { useState } from 'react';
import { TextInput, Pressable, TextStyle, StyleProp } from 'react-native';

type TextType = 'title' | 'smallText';

interface EditableTextInputProps {
  initialValue: string;
  textType: TextType;
  isDone?: boolean;
  placeHolder?: string;
}

//TODO: add a callback to modify the text in the DATA

const EditableTextInput: React.FC<EditableTextInputProps> = ({
  initialValue,
  textType,
  isDone,
  placeHolder,
}) => {
  const [text, setText] = useState(initialValue);
  const textStyle: StyleProp<TextStyle> = {
    paddingTop: 0,
    fontFamily: 'Satoshi-Regular',
    fontWeight: 'bold',
    fontSize: textType === 'smallText' ? 14 : 16,
    color: isDone ? '#888888' : '#000000',
    textDecorationLine: isDone ? 'line-through' : 'none',
  };

  return (
    <TextInput
      placeholder={placeHolder}
      value={text}
      onChangeText={setText}
      autoFocus
      multiline
      style={textStyle}
    />
  );
};

export default EditableTextInput;
