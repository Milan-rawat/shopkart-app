import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Search from '../searchScreens/Search';
import SearchResult from '../searchScreens/SearchResult';
import ProductDetails from '../commonScreens/ProductDetails';
import Colors from '../../constants/Colors';

const Stack = createNativeStackNavigator();

const headerOption = data => {
  return {
    headerShown: data.headerShown,
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

const SearchScreen = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Search"
        component={Search}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SearchResult"
        component={SearchResult}
        options={headerOption({ headerShown: false })}
      />
      <Stack.Screen
        name="ProductDetails"
        component={ProductDetails}
        options={headerOption({ title: 'Details' })}
      />
    </Stack.Navigator>
  );
};

export default SearchScreen;
