import React from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Dimensions,
} from 'react-native';
import EncryptedStorage from 'react-native-encrypted-storage';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Colors from '../../constants/Colors';
import API from '../../constants/Env';
import GlobalContext from '../../context/GlobalContext';
import RBSheet from 'react-native-raw-bottom-sheet';

const storeUserSession = async token => {
  try {
    await EncryptedStorage.setItem(
      'authData',
      JSON.stringify({ isLoggedIn: true, token: token }),
    );
  } catch (error) {
    Alert.alert('something went wrong!');
  }
};

const Login = ({ navigation }) => {
  const [isLoggedIn, setIsLoggedIn] = React.useContext(GlobalContext);
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);
  const refRBSheet = React.useRef();

  const onSubmit = async () => {
    setIsLoading(true);
    let emailData = email;
    let passwordData = password;
    try {
      const res = await fetch(`${API.URL}/user/login`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: emailData,
          password: passwordData,
          isSeller: false,
        }),
      });
      const response = JSON.parse(await res.text());
      if (!response.status) {
        setIsLoading(false);
        if (response.errors) Alert.alert(response.errors[0].msg);
        else if (response.message) {
          Alert.alert(response.message);
        } else Alert.alert('Something went wrong, please try again later');
      } else {
        setIsLoading(false);
        await storeUserSession(response.token);
        setIsLoggedIn(true);
        navigation.navigate('HomeScreen');
      }
    } catch (err) {
      console.log(err);
    }
  };

  React.useEffect(() => {
    refRBSheet.current.open();
  }, []);

  return (
    <View style={styles.screen}>
      <View style={styles.header}>
        <Ionicons
          onPress={() => navigation.goBack()}
          name="close"
          size={22}
          color="white"
        />
        <Text style={{ color: 'white', fontSize: 22 }}>Shopkart</Text>
        <Text> </Text>
      </View>
      <RBSheet
        ref={refRBSheet}
        closeOnDragDown={true}
        closeOnPressMask={true}
        height={Dimensions.get('window').height - 50}
        customStyles={{
          wrapper: {
            backgroundColor: 'transparent',
          },
          container: {
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
          },
          draggableIcon: {
            backgroundColor: Colors.tertiaryColor,
          },
        }}
        onClose={() => navigation.goBack()}>
        <View style={styles.container}>
          <Text style={{ color: 'black', fontSize: 24, marginBottom: 20 }}>
            Login
          </Text>
          <TextInput
            style={styles.inputBox}
            onChangeText={setEmail}
            underlineColorAndroid="rgba(0,0,0,0)"
            placeholder="Email"
            placeholderTextColor="#002f6c"
            keyboardType="email-address"
            value={email}
            //   onSubmitEditing={() => this.password.focus()}
          />
          <TextInput
            style={styles.inputBox}
            onChangeText={setPassword}
            underlineColorAndroid="rgba(0,0,0,0)"
            placeholder="Password"
            secureTextEntry={true}
            value={password}
            placeholderTextColor="#002f6c"
            // ref={input => (this.password = input)}
          />
          <TouchableOpacity style={styles.button} onPress={onSubmit}>
            <Text style={styles.buttonText}>
              {isLoading ? 'Loading...' : 'Login'}
            </Text>
          </TouchableOpacity>
          <View style={styles.other}>
            <Text style={{ color: 'black' }}>
              Don't have an account?
              <Text
                onPress={() => navigation.replace('Signup')}
                style={{ color: Colors.tertiaryColor, fontWeight: '900' }}>
                Signup
              </Text>
            </Text>
          </View>
          <Text
            style={{
              color: 'grey',
              width: 300,
              fontSize: 12,
              marginVertical: 10,
            }}>
            By Continuing, you agree to Shopkart's Terms of Use and Privacy
            Policy.
          </Text>
        </View>
      </RBSheet>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.tertiaryColor,
    justifyContent: 'flex-start',
  },
  header: {
    flex: 0.07,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  container: {
    flex: 0.93,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  inputBox: {
    width: 300,
    backgroundColor: '#eeeeee',
    borderRadius: 5,
    paddingHorizontal: 16,
    fontSize: 16,
    color: '#002f6c',
    marginVertical: 10,
    elevation: 2,
  },
  button: {
    width: 300,
    backgroundColor: 'white',
    borderWidth: 2,
    borderColor: Colors.tertiaryColor,
    borderRadius: 5,
    marginVertical: 10,
    paddingVertical: 12,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: '500',
    color: Colors.tertiaryColor,
    textAlign: 'center',
    fontWeight: '900',
  },
  other: {
    width: 300,
    marginVertical: 10,
    alignItems: 'flex-end',
  },
});

export default Login;
