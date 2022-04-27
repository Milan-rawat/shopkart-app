import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';

import ProductCard from '../../components/ProductCard';

const Home = props => {
  return (
    <ScrollView style={styles.screen}>
      <View style={styles.screenView}>
        <ProductCard {...props} />
        <ProductCard {...props} />
        <ProductCard {...props} />
        <ProductCard {...props} />
        <ProductCard {...props} />
        <ProductCard {...props} />
        <ProductCard {...props} />
        <ProductCard {...props} />
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
