import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import AccountSetting from '../../components/settings/AccountSetting';

const CookieNoticeSetting = () => {
  return (
    <AccountSetting settingName="Cookie Notice">
      <View style={styles.container}>
        <Text style={styles.title}>Cookie Notice</Text>
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

export default CookieNoticeSetting;
