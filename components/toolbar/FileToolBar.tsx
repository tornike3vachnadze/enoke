import { View, Image } from 'react-native';
import React from 'react';
import Button from '../Button';

export default function FileToolBar() {
  return (
    <>
      <View>
        <Button.Square title="Copy">
          <Image source={require('../../assets/icons/copy.png')} />
        </Button.Square>
      </View>
    </>
  );
}
