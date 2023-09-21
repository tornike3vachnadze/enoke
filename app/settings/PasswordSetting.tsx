import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import AccountSetting from '../../components/settings/AccountSetting';

interface Message {
  type: string;
  content: string;
}

const PasswordSetting = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState<Message>();

  const handleChangePassword = () => {
    if (newPassword === confirmPassword) {
      setMessage({ type: 'success', content: 'Password has been changed.' });
    } else {
      setMessage({
        type: 'error',
        content: 'New password does not match with confirm password.',
      });
    }
  };

  return (
    <AccountSetting settingName="Password">
      <View style={styles.container}>
        <Text style={styles.title}>Change Password</Text>
        {message && (
          <Text
            style={[
              styles.message,
              message.type === 'error'
                ? styles.errorMessage
                : styles.successMessage,
            ]}
          >
            {message.content}
          </Text>
        )}
        <TextInput
          style={styles.input}
          placeholder="Current Password"
          secureTextEntry
          value={currentPassword}
          onChangeText={setCurrentPassword}
        />
        <TextInput
          style={styles.input}
          placeholder="New Password"
          secureTextEntry
          value={newPassword}
          onChangeText={setNewPassword}
        />
        <TextInput
          style={styles.input}
          placeholder="Confirm New Password"
          secureTextEntry
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />
        <Button title="Change Password" onPress={handleChangePassword} />
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
    marginBottom: 20,
    fontFamily: 'Satoshi-Medium',
  },
  input: {
    width: '100%',
    padding: 10,
    marginBottom: 20,
    borderWidth: 1,
    borderRadius: 5,
  },
  message: {
    marginBottom: 20,
    textAlign: 'center',
    padding: 10,
    borderRadius: 5,
  },
  successMessage: {
    backgroundColor: '#d4edda',
    color: '#155724',
  },
  errorMessage: {
    backgroundColor: '#f8d7da',
    color: '#721c24',
  },
});

export default PasswordSetting;
