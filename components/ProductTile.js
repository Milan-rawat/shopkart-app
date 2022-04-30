import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const ProductTile = props => {
  return (
    <TouchableOpacity
      onPress={() =>
        props.navigation.navigate('ProductDetails', { product: props.product })
      }>
      <View style={styles.prdTile}>
        <Image
          style={styles.prdImage}
          source={{ uri: props.product.images[0] }}
        />
        <View style={styles.infoContainer}>
          <Text style={styles.name}>{props.product.productTitle}</Text>
          <Text style={styles.price}>{props.product.price} ₹</Text>
          <View style={styles.bySeller}>
            <Text style={{ color: 'grey', marginHorizontal: 5 }}>
              By :- {props.product.seller.fullName}
            </Text>
            <Ionicons
              style={styles.isVerified}
              name={
                props.product.seller.emailVerified
                  ? 'checkmark-circle-outline'
                  : 'close-circle-outline'
              }
              size={18}
              color={props.product.seller.emailVerified ? 'green' : 'red'}
            />
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  prdTile: {
    width: '100%',
    height: 180,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#eee',
    padding: 10,
  },
  prdImage: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: 160,
    width: 160,
    resizeMode: 'contain',
  },
  infoContainer: {
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  name: {
    fontSize: 18,
    color: 'black',
  },
  price: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    color: 'green',
  },
  bySeller: {
    height: 30,
    flexDirection: 'row',
    justifyContent: 'center',
  },
});

export default ProductTile;
