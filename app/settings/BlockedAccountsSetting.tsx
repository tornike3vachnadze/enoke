import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, FlatList } from 'react-native';
import { Swipeable } from 'react-native-gesture-handler';
import AccountSetting from '../../components/settings/AccountSetting';

const BlockedAccountItem = ({
  account,
  onUnblock,
}: {
  account: { id: string; name: string };
  onUnblock: () => void;
}) => {
  const renderLeftActions = () => (
    <View style={styles.unblockAction}>
      <Text style={styles.unblockText}>Unblock</Text>
    </View>
  );

  return (
    <Swipeable
      renderLeftActions={renderLeftActions}
      onSwipeableOpen={onUnblock}
    >
      <View style={styles.blockedAccountItem}>
        <Image
          style={styles.friendImage}
          source={{
            uri: `https://randomuser.me/api/portraits/men/${
              (Math.random() * 100) | 0
            }.jpg`,
          }}
        />
        <Text style={styles.itemText}>{account.name}</Text>
      </View>
    </Swipeable>
  );
};

const BlockedAccountsSetting = () => {
  const [blockedAccounts, setBlockedAccounts] = useState([
    { id: '1', name: 'Michael Jordan' },
    { id: '2', name: 'Brian Greene' },
    { id: '3', name: 'Dart Vader' },
  ]);

  const handleUnblock = (id: string) => {
    setBlockedAccounts(blockedAccounts.filter((account) => account.id !== id));
    //TODO: make the removal with server hooks
  };

  return (
    <AccountSetting settingName="Blocked Accounts">
      <View style={styles.container}>
        <FlatList
          data={blockedAccounts}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <BlockedAccountItem
              account={item}
              onUnblock={() => handleUnblock(item.id)}
            />
          )}
        />
      </View>
    </AccountSetting>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontFamily: 'Satoshi-Medium',
    margin: 10,
  },
  blockedAccountItem: {
    padding: 20,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderColor: 'aliceblue',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  unblockAction: {
    flex: 1,
    backgroundColor: '#4CAF50',
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingLeft: 20,
  },
  itemText: {
    fontSize: 16,
    fontFamily: 'Satoshi-Medium',
  },
  unblockText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  friendImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 20,
  },
});

export default BlockedAccountsSetting;
