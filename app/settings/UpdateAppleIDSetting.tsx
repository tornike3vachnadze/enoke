import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import AccountSetting from '../../components/settings/AccountSetting';

const UpdateAppleIDSettingScreen = () => {
  return (
    <AccountSetting settingName="Update Apple ID">
      <View style={styles.container}>
        <Text style={styles.title}>Update Apple ID Information</Text>
      </View>
    </AccountSetting>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontFamily: 'Satoshi-Medium',
  },
});

export default UpdateAppleIDSettingScreen;
