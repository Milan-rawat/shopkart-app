import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Wihslist from '../wishlistScreens/Wishlist';
import ProductDetails from '../commonScreens/ProductDetails';
import Colors from '../../constants/Colors';

const Stack = createNativeStackNavigator();

const headerOption = data => {
  return {
    headerShown: true,
    title: data.title,
    headerStyle: {
      backgroundColor: Colors.accentColor,
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontSize: 22,
      fontWeight: 'bold',
    },
  };
};

const WishlistScreen = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Wishlist"
        component={Wihslist}
        options={headerOption({ title: 'My Wishlist' })}
      />
      <Stack.Screen
        name="ProductDetails"
        component={ProductDetails}
        options={headerOption({ title: 'Details' })}
      />
    </Stack.Navigator>
  );
};

export default WishlistScreen;
