import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const ProductCard = ({ navigation }) => {
  return (
    <TouchableOpacity onPress={() => navigation.navigate('ProductDetails')}>
      <View style={styles.prdCard}>
        <Text style={{ color: 'black' }}>Hello World!</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  prdCard: {
    width: 150,
    height: 200,
    margin: 5,
    borderRadius: 5,
    backgroundColor: 'white',
  },
});

export default ProductCard;
