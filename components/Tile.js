import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Image,
  ActivityIndicator,
} from 'react-native';
import EncryptedStorage from 'react-native-encrypted-storage';
import Ionicons from 'react-native-vector-icons/Ionicons';
import API from '../constants/Env';
import Colors from '../constants/Colors';

const Tile = props => {
  const [quantity, setQuantity] = React.useState(props.quantity);
  const [qtyLoading, setQtyLoading] = React.useState(false);

  const changeQuantity = async qtyStatus => {
    setQtyLoading(true);
    let authData = JSON.parse(await EncryptedStorage.getItem('authData'));
    let qtyTo = qtyStatus === '+' ? quantity + 1 : quantity - 1;
    try {
      const res = await fetch(`${API.URL}/cart/changeQuantity`, {
        method: 'PATCH',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + authData.token,
        },
        body: JSON.stringify({
          productId: props.product._id,
          quantity: qtyTo,
        }),
      });
      const response = JSON.parse(await res.text());
      if (response) {
        setQuantity(response.cart.quantity);
        setQtyLoading(false);
      } else setQtyLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <TouchableOpacity
      onPress={() =>
        props.navigation.navigate('ProductDetails', { product: props.product })
      }>
      <View style={styles.tile}>
        <View>
          <Image
            style={styles.prdImage}
            source={{ uri: props.product.images[0] }}
          />
          <Text
            onPress={
              qtyLoading ? null : () => props.removeMe(props.product._id)
            }
            style={{
              height: 30,
              width: 60,
              color: 'black',
              textAlign: 'center',
              textAlignVertical: 'center',
              borderWidth: 1,
              borderColor: 'lightgrey',
              borderRadius: 4,
              fontSize: 16,
            }}>
            Delete
          </Text>
        </View>
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
            {quantity === 1 ? (
              <Ionicons
                onPress={
                  qtyLoading ? null : () => props.removeMe(props.product._id)
                }
                style={{
                  height: 28,
                  width: 50,
                  textAlign: 'center',
                  textAlignVertical: 'center',
                  backgroundColor: '#E0E0E0',
                }}
                name="trash-outline"
                size={20}
                color="black"
              />
            ) : (
              <TouchableOpacity
                onPress={() => (qtyLoading ? null : changeQuantity('-'))}>
                <Text style={{ ...styles.qtyBtn, ...styles.qtyBtn1 }}>-</Text>
              </TouchableOpacity>
            )}
            <TouchableOpacity
              style={{
                width: 60,
                borderLeftWidth: 1,
                borderRightWidth: 1,
                borderColor: '#D0D0D0',
                justifyContent: 'center',
              }}>
              <Text
                style={{
                  color: 'black',
                  textAlign: 'center',
                  fontSize: 16,
                }}>
                {qtyLoading ? (
                  <ActivityIndicator size="small" color={Colors.primaryColor} />
                ) : (
                  quantity
                )}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => (qtyLoading ? null : changeQuantity('+'))}>
              <Text style={{ ...styles.qtyBtn, ...styles.qtyBtn2 }}>+</Text>
            </TouchableOpacity>
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
    height: 120,
    width: 160,
    resizeMode: 'contain',
  },
  infoContainer: {
    height: 150,
    paddingHorizontal: 20,
    justifyContent: 'space-between',
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
    borderColor: '#D0D0D0',
    borderRadius: 4,
    flexDirection: 'row',
    height: 30,
    backgroundColor: 'white',
    elevation: 2,
  },
  qtyBtn: {
    color: 'black',
    height: 28,
    width: 50,
    textAlign: 'center',
    textAlignVertical: 'center',
    fontSize: 24,
    backgroundColor: '#E0E0E0',
  },
  qtyBtn1: {
    borderTopLeftRadius: 3,
    borderBottomLeftRadius: 3,
  },
  qtyBtn2: {
    borderTopRightRadius: 3,
    borderBottomRightRadius: 3,
  },
});

export default Tile;
