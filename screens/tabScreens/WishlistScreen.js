import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const WishlistScreen = () => {
  return (
    <View style={styles.screen}>
      <Text style={{ color: 'black' }}>Wishlist Screen</Text>
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

export default WishlistScreen;
