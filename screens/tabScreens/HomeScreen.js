import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from '../homeScreens/Home';
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

const HomeScreen = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={Home}
        options={headerOption({ title: 'ShopKart' })}
      />
      <Stack.Screen
        name="ProductDetails"
        component={ProductDetails}
        options={headerOption({ title: 'Details' })}
      />
    </Stack.Navigator>
  );
};

export default HomeScreen;
