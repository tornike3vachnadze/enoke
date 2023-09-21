import { useRouter } from 'expo-router';
import React from 'react';
import { View, Text, StyleSheet, Pressable, Image } from 'react-native';

interface Props {
  settingName: string;
  children: React.ReactNode;
  onSave?: (settingName: string) => void;
}

const AccountSetting: React.FC<Props> = ({ settingName, children, onSave }) => {
  const handleSave = () => {
    if (onSave) {
      onSave(settingName);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{settingName}</Text>
      </View>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontFamily: 'Satoshi-Light',
  },
});

export default AccountSetting;
