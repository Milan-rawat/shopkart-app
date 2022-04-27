import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

import Colors from '../constants/Colors';

export default function SplashScreen({ navigation }) {
  setTimeout(() => {
    navigation.replace('Home');
  }, 1500);
  return (
    <View style={styles.splashScreenContainer}>
      <Image style={styles.logo} source={require('../assets/icon.png')} />
      <Text style={styles.appText}>ShopKart</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  splashScreenContainer: {
    flex: 0.8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 150,
    height: 150,
    borderRadius: 25,
    margin: 10,
  },
  appText: {
    color: Colors.primaryColor,
    fontSize: 25,
    fontFamily: 'Roboto',
  },
});
