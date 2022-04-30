import React from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions } from 'react-native';
import EncryptedStorage from 'react-native-encrypted-storage';

import Card from '../../components/Card';
import API from '../../constants/Env';

const Wihslist = props => {
  const [products, setProducts] = React.useState([]);
  const [isLoaded, setIsLoaded] = React.useState(false);

  const getData = async () => {
    let token = JSON.parse(await EncryptedStorage.getItem('authData'));
    try {
      const res = await fetch(`${API.URL}/product/getMyWishlist`, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token,
        },
      });
      const response = JSON.parse(await res.text());
      setProducts(response.allProducts);
      setIsLoaded(true);
    } catch (err) {
      console.log(err);
    }
  };

  React.useEffect(() => {
    getData();
  }, []);
  return (
    <ScrollView style={styles.screen}>
      <View style={styles.screenView}>
        <View
          style={{
            flex: 1,
            height: Dimensions.get('window').height - 250,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={{ color: 'black', fontSize: 18 }}>Empty Wishlist!</Text>
        </View>
        {/* <Card {...props} />
        <Card {...props} />
        <Card {...props} />
        <Card {...props} />
        <Card {...props} />
        <Card {...props} />
        <Card {...props} />
        <Card {...props} /> */}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screenView: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    flexWrap: 'wrap',
    backgroundColor: '#f0f0f0',
  },
});

export default Wihslist;
