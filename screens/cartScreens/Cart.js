import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';

import Tile from '../../components/Tile';

const Cart = props => {
  return (
    <ScrollView style={styles.screen}>
      <View style={styles.screenView}>
        <Tile {...props} />
        <Tile {...props} />
        <Tile {...props} />
        <Tile {...props} />
        <Tile {...props} />
        <Tile {...props} />
        <Tile {...props} />
        <Tile {...props} />
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
