import React from 'react';
// import { alert } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import EncryptedStorage from 'react-native-encrypted-storage';

import HomeScreen from './tabScreens/HomeScreen';
import CartScreen from './tabScreens/CartScreen';
import AccountScreen from './tabScreens/AccountScreen';
import WishlistScreen from './tabScreens/WishlistScreen';
import SearchScreen from './tabScreens/SearchScreen';
import Colors from '../constants/Colors';
import GlobalContext from '../context/GlobalContext';

const Tab = createBottomTabNavigator();

const Dashboard = props => {
  const [isLoggedIn, setIsLoggedIn] = React.useContext(GlobalContext);

  return (
    <>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName, iconSize;
            if (route.name === 'HomeScreen') {
              iconName = focused ? 'home' : 'home';
              iconSize = focused ? 28 : 22;
            }
            if (route.name === 'SearchScreen') {
              iconName = focused ? 'search' : 'search';
              iconSize = focused ? 28 : 22;
            }
            if (route.name === 'WishlistScreen') {
              iconName = focused ? 'heart' : 'heart';
              iconSize = focused ? 28 : 22;
            }
            if (route.name === 'CartScreen') {
              iconName = focused ? 'cart' : 'cart';
              iconSize = focused ? 28 : 22;
            }
            if (route.name === 'AccountScreen') {
              iconName = focused ? 'person' : 'person';
              iconSize = focused ? 28 : 22;
            }
            return <Ionicons name={iconName} size={iconSize} color={color} />;
          },
          tabBarActiveTintColor: Colors.primaryColor,
          tabBarInactiveTintColor: 'grey',
        })}>
        <Tab.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={{ headerShown: false, tabBarLabel: 'Shop' }}
        />
        <Tab.Screen
          name="SearchScreen"
          component={SearchScreen}
          options={{
            headerShown: false,
            tabBarLabel: 'Search',
            tabBarHideOnKeyboard: true,
          }}
        />
        <Tab.Screen
          name="WishlistScreen"
          component={WishlistScreen}
          options={{
            headerShown: false,
            tabBarLabel: 'Wishlist',
            tabBarActiveTintColor: Colors.accentColor,
          }}
          listeners={() => ({
            tabPress: event => {
              if (!isLoggedIn) {
                event.preventDefault();
                props.navigation.navigate('AuthScreen');
              }
            },
          })}
        />
        <Tab.Screen
          name="CartScreen"
          component={CartScreen}
          options={{
            headerShown: false,
            tabBarLabel: 'Cart',
          }}
          listeners={() => ({
            tabPress: event => {
              if (!isLoggedIn) {
                event.preventDefault();
                props.navigation.navigate('AuthScreen');
              }
            },
          })}
        />
        <Tab.Screen
          name="AccountScreen"
          component={AccountScreen}
          options={{
            headerShown: false,
            tabBarLabel: 'Account',
            tabBarActiveTintColor: Colors.primaryColor,
            tabBarHideOnKeyboard: true,
          }}
          listeners={() => ({
            tabPress: event => {
              if (!isLoggedIn) {
                event.preventDefault();
                props.navigation.navigate('AuthScreen');
              }
            },
          })}
        />
      </Tab.Navigator>
    </>
  );
};

export default Dashboard;
