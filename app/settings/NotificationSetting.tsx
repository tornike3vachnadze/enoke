import React from 'react';
import { View, Text, Switch, StyleSheet } from 'react-native';
import AccountSetting from '../../components/settings/AccountSetting';

const NotificationsSetting = () => {
  return (
    <AccountSetting settingName="Notifications">
      <View style={styles.container}>
        <Text style={styles.label}>Enable Notifications:</Text>
        <Switch />
      </View>
    </AccountSetting>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  label: {
    fontSize: 18,
    fontFamily: 'Satoshi-Medium',
  },
});

export default NotificationsSetting;
