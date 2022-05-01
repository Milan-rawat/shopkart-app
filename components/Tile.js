import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Image,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Tile = props => {
  const [quantity, setQuantity] = React.useState(1);
  return (
    <TouchableOpacity
      onPress={() =>
        props.navigation.navigate('ProductDetails', { product: props.product })
      }>
      <View style={styles.tile}>
        <Image
          style={styles.prdImage}
          source={{ uri: props.product.images[0] }}
        />
        <View style={styles.infoContainer}>
          <Text style={styles.name} numberOfLines={2}>
            {props.product.productTitle}
          </Text>
          <Text style={styles.price}>{props.product.price} ₹</Text>
          <View style={styles.bySeller}>
            <Text style={{ color: 'grey', marginHorizontal: 5 }}>
              By :-{' '}
              {props.product.seller.fullName
                ? props.product.seller.fullName
                : 'Seller'}
            </Text>
            <Ionicons
              style={styles.isVerified}
              name={
                props.product.seller.emailVerified
                  ? 'checkmark-circle-outline'
                  : 'close-circle-outline'
              }
              size={18}
              color={props.product.seller.emailVerified ? '#5DE23C' : '#F72F35'}
            />
          </View>
          <View style={styles.quantityBox}>
            <Ionicons
              // fontWeight={900}
              // onPress={() => navigation.goBack()}
              name="remove-outline"
              size={20}
              color="black"
            />
            <Text style={{ color: 'black' }}>{quantity}</Text>
            <Ionicons
              // onPress={() => navigation.goBack()}
              name="add-outline"
              size={20}
              color="black"
            />
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  tile: {
    width: Dimensions.get('window').width,
    height: 180,
    borderWidth: 1,
    borderColor: 'lightgrey',
    backgroundColor: 'white',
    marginTop: 15,
    flexDirection: 'row',
    alignItems: 'center',
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
  },
  name: {
    width: 160,
    fontSize: 18,
    marginVertical: 5,
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
  },
  quantityBox: {
    borderWidth: 1,
    borderColor: '#A0A0A0',
    borderRadius: 4,
    flexDirection: 'row',
    padding: 5,
    height: 30,
    backgroundColor: 'white',
  },
});

export default Tile;
