import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import AccountSetting from '../../components/settings/AccountSetting';

const HelpCenterSetting = () => {
  return (
    <AccountSetting settingName="Help Center">
      <View style={styles.container}>
        <Text style={styles.title}>Help Center</Text>
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

export default HelpCenterSetting;
