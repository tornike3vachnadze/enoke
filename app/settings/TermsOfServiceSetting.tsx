import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import AccountSetting from '../../components/settings/AccountSetting';
const TermsOfServiceSetting = () => {
  return (
    <AccountSetting settingName="Terms Of Service">
      <View style={styles.container}>
        <Text style={styles.title}>Terms Of Service</Text>
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

export default TermsOfServiceSetting;
