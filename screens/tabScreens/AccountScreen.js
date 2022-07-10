import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Account from '../accountScreens/Account';
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

const AccountScreen = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Account"
        component={Account}
        options={headerOption({ headerShown: false })}
      />
    </Stack.Navigator>
  );
};

export default AccountScreen;
