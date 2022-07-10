import React, { useContext, useState } from 'react';
import { NavigationContainer, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import EncryptedStorage from 'react-native-encrypted-storage';

import SplashScreen from './screens/SplashScreen';
import Dashboard from './screens/Dashboard';
import AuthScreen from './screens/AuthScreen';

import GlobalContext from './context/GlobalContext';

import { View, Text, TouchableOpacity } from 'react-native';

import BottomSheet from 'react-native-simple-bottom-sheet';

const Content = props => {
  const panelRef = React.useRef(null);
  return (
    <View style={{ flex: 1 }}>
      <View>
        <Text style={{ color: 'black' }}>hello React Native!</Text>
      </View>
      <TouchableOpacity onPress={() => panelRef.current.togglePanel()}>
        <Text>Toggle</Text>
      </TouchableOpacity>
      <BottomSheet
        onClose={() => props.navigation.goBack()}
        ref={ref => (panelRef.current = ref)}
        sliderMinHeight={0}>
        <Text style={{ paddingVertical: 20 }}>Some random content</Text>
      </BottomSheet>
    </View>
  );
};

const Stack = createNativeStackNavigator();

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

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  React.useEffect(() => {
    const getData = async () => {
      const isIn = await retrieveUserSession();
      setIsLoggedIn(isIn);
    };
    getData();
  }, []);

  return (
    <GlobalContext.Provider value={[isLoggedIn, setIsLoggedIn]}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="SplashScreen"
            component={SplashScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Dashboard"
            component={Dashboard}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="AuthScreen"
            component={AuthScreen}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </GlobalContext.Provider>
  );
}

export default App;
