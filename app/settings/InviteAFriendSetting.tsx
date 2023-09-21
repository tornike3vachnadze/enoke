import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Pressable } from 'react-native';
import AccountSetting from '../../components/settings/AccountSetting';

const InviteAFriendSetting = () => {
  const [friendHandle, setFriendHandle] = useState('');
  const [message, setMessage] = useState('');

  const handleInvite = () => {
    if (!friendHandle.trim()) {
      setMessage('Please enter a friend handle.');
      return;
    }

    //TODO: handle the invite by server and make sure to handle message by creating a component for it
    setMessage('Invitation sent to ' + friendHandle);
  };

  return (
    <AccountSetting settingName="Invite a Friend">
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder="Friend's handle"
          value={friendHandle}
          onChangeText={setFriendHandle}
        />
        <Pressable style={styles.button} onPress={handleInvite}>
          <Text style={styles.buttonText}>Invite</Text>
        </Pressable>
        {message ? <Text style={styles.message}>{message}</Text> : null}
      </View>
    </AccountSetting>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontFamily: 'Satoshi-Medium',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 10,
    marginBottom: 20,
    borderRadius: 5,
  },
  button: {
    backgroundColor: '#6C68A8',
    padding: 10,
    width: '100%',
    alignItems: 'center',
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontFamily: 'Satoshi-Regular',
  },
  message: {
    marginTop: 20,
    fontSize: 16,
  },
});

export default InviteAFriendSetting;
