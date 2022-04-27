import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const ProductTile = navigation => {
  return (
    <TouchableOpacity onPress={() => navigation.navigate('ProductDetails')}>
      <View style={styles.prdTile}>
        <Text style={{ color: 'black' }}>Hello World!</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  prdTile: {
    width: '100%',
    height: 180,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
});

export default ProductTile;
