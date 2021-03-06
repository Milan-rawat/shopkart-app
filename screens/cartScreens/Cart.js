import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import EncryptedStorage from 'react-native-encrypted-storage';
import AwesomeAlert from 'react-native-awesome-alerts';

import Colors from '../../constants/Colors';
import Tile from '../../components/Tile';
import API from '../../constants/Env';

const Cart = props => {
  const [products, setProducts] = React.useState([]);
  const [isLoaded, setIsLoaded] = React.useState(false);
  const [deleting, setDeleting] = React.useState(false);
  const { navigation } = props;

  const getData = async () => {
    let authData = JSON.parse(await EncryptedStorage.getItem('authData'));
    try {
      const res = await fetch(`${API.URL}/cart/getMyCart`, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + authData.token,
        },
      });
      const response = JSON.parse(await res.text());
      setProducts(response.cart);
      setIsLoaded(true);
    } catch (err) {
      console.log(err);
    }
  };

  const removeMe = async productId => {
    try {
      setDeleting(true);
      let authData = JSON.parse(await EncryptedStorage.getItem('authData'));
      const res = await fetch(`${API.URL}/cart/removeFromCart`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + authData.token,
        },
        body: JSON.stringify({
          productId: productId,
        }),
      });
      const response = JSON.parse(await res.text());
      if (response.status) {
        let filtered = products.filter(prd => {
          return prd.product._id.toString() !== productId.toString();
        });
        setProducts(filtered);
        setDeleting(false);
      }
    } catch (err) {
      console.log(err);
    }
  };

  React.useEffect(() => {
    const unmount = navigation.addListener('focus', () => {
      setIsLoaded(false);
      getData();
    });
    return unmount;
  }, [navigation]);
  return (
    <ScrollView style={styles.screen}>
      <View style={styles.screenView}>
        <AwesomeAlert
          show={deleting}
          showProgress={true}
          message="Deleting..."
          confirmButtonColor={Colors.primaryColor}
        />
        {(!products || products.length === 0) && isLoaded && (
          <View
            style={{
              flex: 1,
              height: Dimensions.get('window').height - 250,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={{ color: 'black', fontSize: 18 }}>Cart Empty!</Text>
          </View>
        )}
        {!isLoaded && (
          <View
            style={{
              flex: 1,
              height: Dimensions.get('window').height,
              backgroundColor: 'white',
              opacity: 1,
            }}>
            <ActivityIndicator
              style={{ height: Dimensions.get('window').height - 250 }}
              size="large"
              color={Colors.primaryColor}
            />
          </View>
        )}
        {isLoaded &&
          products &&
          products.length > 0 &&
          products.map((cart, index) => (
            <Tile
              key={index}
              {...props}
              product={cart.product}
              quantity={cart.quantity}
              removeMe={removeMe}
            />
          ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screenView: {
    flexDirection: 'column',
    backgroundColor: '#f0f0f0',
  },
});

export default Cart;
