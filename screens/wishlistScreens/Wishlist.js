import React from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions } from 'react-native';

import Card from '../../components/Card';

const Wihslist = props => {
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
