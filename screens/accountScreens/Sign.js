import React from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  alert,
} from 'react-native';
import EncryptedStorage from 'react-native-encrypted-storage';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Colors from '../../constants/Colors';
import API from '../../constants/Env';

const storeUserSession = async () => {
  try {
    await EncryptedStorage.setItem(
      'authData',
      JSON.stringify({ isLoggedIn: true }),
    );
  } catch (error) {
    alert('something went wrong!');
  }
};

const Signup = ({ navigation }) => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const onSubmit = async () => {
    let emailData = email;
    let passwordData = password;
    await storeUserSession();
    navigation.navigate('HomeScreen');
    // try {
    //   const res = await fetch(`${API.URL}/user/register`, {
    //     method: 'POST',
    //     headers: {
    //       Accept: 'application/json',
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify({
    //       email: emailData,
    //       password: passwordData,
    //     }),
    //   });
    //   const response = JSON.parse(await res.text());
    //   console.log('response', response);
    // } catch (err) {
    //   console.log(err);
    // }
  };
  return (
    <View style={styles.screen}>
      <View style={styles.header}>
        <Ionicons onPress={() => {}} name="close" size={22} color="white" />
        <Text style={{ color: 'white', fontSize: 22 }}>Shopkart</Text>
        <Text> </Text>
      </View>
      <View style={styles.container}>
        <TextInput
          style={styles.inputBox}
          onChangeText={setEmail}
          underlineColorAndroid="rgba(0,0,0,0)"
          placeholder="Email"
          placeholderTextColor="#002f6c"
          selectionColor="#fff"
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
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText} onPress={onSubmit}>
            Sign up
          </Text>
        </TouchableOpacity>
        <View style={styles.other}>
          <Text style={{ color: 'black' }}>
            Already have an account? Signin
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
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.tertiaryColor,
    justifyContent: 'flex-end',
  },
  header: {
    flex: 0.07,
    borderWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  container: {
    flex: 0.93,
    justifyContent: 'flex-start',
    paddingTop: 50,
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

export default Signup;
