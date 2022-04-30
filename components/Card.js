import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Image,
} from 'react-native';

const Card = ({ navigation, product }) => {
  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate('ProductDetails', {
          product: product,
        })
      }>
      <View style={styles.card}>
        <Image style={styles.prdImage} source={{ uri: product.images[0] }} />
        <View style={styles.infoContainer}>
          <Text style={styles.name} numberOfLines={2}>
            {product.productTitle}
          </Text>
          <Text style={styles.price}>{product.price} ₹</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    width: Dimensions.get('window').width / 2,
    height: 250,
    borderWidth: 1,
    padding: 5,
    borderColor: 'lightgrey',
    backgroundColor: 'white',
  },
  prdImage: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: Dimensions.get('window').width / 2 - 10,
    width: Dimensions.get('window').width / 2 - 10,
    borderColor: 'black',
    resizeMode: 'contain',
  },
  infoContainer: {
    padding: 10,
    alignItems: 'center',
  },
  name: {
    fontSize: 16,
    color: 'black',
    marginVertical: 5,
  },
  price: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    color: 'green',
  },
});

export default Card;
