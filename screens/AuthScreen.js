import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import EncryptedStorage from 'react-native-encrypted-storage';

import Login from './authScreens/Login';
import Signup from './authScreens/Signup';
import Colors from '../constants/Colors';
import GlobalContext from '../context/GlobalContext';
import Otp from './authScreens/Otp';

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

const retrieveUserSession = async () => {
  try {
    const authData = JSON.parse(await EncryptedStorage.getItem('authData'));
    if (authData && authData.isLoggedIn) return true;

    return false;
  } catch (error) {
    alert('Something Went Wrong!');
    console.log(error);
    return false;
  }
};

const AuthScreen = () => {
  const [isLoggedIn, setIsLoggedIn] = React.useContext(GlobalContext);

  React.useEffect(() => {
    const getData = async () => {
      const isIn = await retrieveUserSession();
      setIsLoggedIn(isIn);
    };
    getData();
  }, []);
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Login"
        component={Login}
        options={headerOption({ headerShown: false })}
      />
      <Stack.Screen
        name="Signup"
        component={Signup}
        options={headerOption({ headerShown: false })}
      />
      <Stack.Screen
        name="Otp"
        component={Otp}
        options={headerOption({ headerShown: false })}
      />
    </Stack.Navigator>
  );
};

export default AuthScreen;
