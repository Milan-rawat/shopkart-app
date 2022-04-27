import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';

import Card from '../../components/Card';

const Wihslist = props => {
  return (
    <ScrollView style={styles.screen}>
      <View style={styles.screenView}>
        <Card {...props} />
        <Card {...props} />
        <Card {...props} />
        <Card {...props} />
        <Card {...props} />
        <Card {...props} />
        <Card {...props} />
        <Card {...props} />
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
