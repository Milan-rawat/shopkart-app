import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';

const ProductCard = ({ navigation, product }) => {
  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate("ProductDetails", {
          product: product
        })
      }>
      <View style={styles.prdCard}>
        <Image style={styles.prdImage} source={{ uri: product.images[0] }} />
        <View style={styles.infoContainer}>
          <Text style={styles.name} numberOfLines={2}>{product.productTitle}</Text>
          <Text style={styles.price}>{product.price} ₹</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  prdCard: {
    width: 150,
    height: 200,
    margin: 5,
    padding: 5,
    borderRadius: 5,
    backgroundColor: 'white',
  },
  prdImage: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: 130,
    width: 140,
    resizeMode: 'contain',
  },
  infoContainer: {
    padding: 10,
    alignItems: 'center',
  },
  name: {
    fontSize: 16,
    color: 'black',
  },
  price: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    color: 'green',
  },
});

export default ProductCard;
