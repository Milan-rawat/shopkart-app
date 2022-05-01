import React from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions } from 'react-native';
import EncryptedStorage from 'react-native-encrypted-storage';

import Card from '../../components/Card';
import API from '../../constants/Env';

const Wihslist = props => {
  const [products, setProducts] = React.useState([]);
  const [isLoaded, setIsLoaded] = React.useState(false);
  const { navigation } = props;

  const getData = async () => {
    let authData = JSON.parse(await EncryptedStorage.getItem('authData'));
    try {
      const res = await fetch(`${API.URL}/wishlist/getMyWishlist`, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + authData.token,
        },
      });
      const response = JSON.parse(await res.text());
      setProducts(response.wishlist);
      setIsLoaded(true);
    } catch (err) {
      console.log(err);
    }
  };

  React.useEffect(() => {
    getData();
  }, []);

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
        {(!products || products.length === 0) && isLoaded && (
          <View
            style={{
              flex: 1,
              height: Dimensions.get('window').height - 250,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={{ color: 'black', fontSize: 18 }}>
              Empty Wishlist!
            </Text>
          </View>
        )}
        {!isLoaded && (
          <View
            style={{
              flex: 1,
              height: Dimensions.get('window').height - 250,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={{ color: 'black', fontSize: 18 }}>Loading...</Text>
          </View>
        )}
        {isLoaded &&
          products &&
          products.length > 0 &&
          products.map((product, index) => (
            <Card key={index} {...props} product={product} />
          ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screenView: {
    flex: 1,
    flexDirection: 'row',
    // justifyContent: 'space-evenly',
    flexWrap: 'wrap',
    backgroundColor: '#f0f0f0',
  },
});

export default Wihslist;
