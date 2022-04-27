import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const ProductDetails = ({ navigation }) => {
  return (
    <View style={styles.screen}>
      <Text style={{ color: 'black' }}>Product details</Text>
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

export default ProductDetails;
