import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const AccountScreen = () => {
  return (
    <View style={styles.screen}>
      <Text style={{ color: 'black' }}>My Account</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default AccountScreen;
