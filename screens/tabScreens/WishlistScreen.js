import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import EncryptedStorage from 'react-native-encrypted-storage';

import Wishlist from '../wishlistScreens/Wishlist';
import ProductDetails from '../commonScreens/ProductDetails';
import Colors from '../../constants/Colors';
// import GlobalContext from '../../context/GlobalContext';

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

const WishlistScreen = ({ navigation }) => {
  const [isLoggedIn, setIsLoggedIn] = React.useContext(GlobalContext);

  React.useEffect(() => {
    const unmount = navigation.addListener('focus', () => {
      if (!isLoggedIn) {
        setTimeout(() => {
          navigation.navigate('AccountScreen');
        }, 100);
      }
    });
    return unmount;
  }, [isLoggedIn, navigation]);

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Wishlist"
        component={Wishlist}
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
