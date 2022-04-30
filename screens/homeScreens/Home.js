import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

import ProductCard from '../../components/ProductCard';
import API from '../../constants/Env';

const Home = props => {
  const [products, setProducts] = React.useState([]);
  const getData = async () => {
    try {
      const res = await fetch(
        `${API.URL}/product/getRandomProducts?limit=10&page=1`,
        {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        },
      );
      const response = JSON.parse(await res.text());
      setProducts(response.products);
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
        {(!products || products.length === 0) && (
          <Text>No Products available!</Text>
        )}
        {products &&
          products.length > 0 &&
          products.map((product, index) => (
            <ProductCard key={index} {...props} product={product} />
          ))}
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

export default Home;
