import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Cart from '../cartScreens/Cart';
import ProductDetails from '../commonScreens/ProductDetails';
import Colors from '../../constants/Colors';

const Stack = createNativeStackNavigator();

const headerOption = data => {
  return {
    headerShown: true,
    title: data.title,
    headerStyle: {
      backgroundColor: Colors.primaryColor,
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontSize: 22,
      fontWeight: 'bold',
    },
  };
};

const CartScreen = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Cart"
        component={Cart}
        options={headerOption({ title: 'My Cart' })}
      />
      <Stack.Screen
        name="ProductDetails"
        component={ProductDetails}
        options={headerOption({ title: 'Details' })}
      />
    </Stack.Navigator>
  );
};

export default CartScreen;
