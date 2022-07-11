import React from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Button,
  Dimensions,
} from 'react-native';
import EncryptedStorage from 'react-native-encrypted-storage';
import Ionicons from 'react-native-vector-icons/Ionicons';
import OtpInputs, { OtpInputsRef } from 'react-native-otp-inputs';
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

const Otp = ({ navigation, route }) => {
  const [error, setError] = React.useState({ isError: false, message: '' });
  const [isLoading, setIsLoading] = React.useState(false);
  const [otp, setOtp] = React.useState('');
  const otpRef = React.useRef(OtpInputsRef);
  const refRBSheet = React.useRef();
  let userEmail = route.params.email;

  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      if (otpRef.current) {
        otpRef.current.focus();
      }
    });
    return unsubscribe;
  }, [navigation]);

  React.useEffect(() => {
    refRBSheet.current.open();
  }, []);

  const onSubmit = async () => {
    setIsLoading(true);
    if (!otp || otp.length !== 6) {
      setError({ isError: true, message: 'Required 6 digits Code.' });
      setIsLoading(false);
      return null;
    }
    try {
      const res = await fetch(`${API.URL}/user/codeVerification`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: userEmail,
          verificationCode: otp,
        }),
      });
      const response = JSON.parse(await res.text());
      if (!response.status) {
        setIsLoading(false);
        if (response.message) {
          setError({
            isError: true,
            message: 'Code is Invalid or has expired!',
          });
        } else Alert.alert('Something went wrong, please try again later');
      } else {
        setIsLoading(false);
        navigation.navigate('HomeScreen');
      }
    } catch (err) {
      setIsLoading(false);
      console.log(err);
    }
  };

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
            backgroundColor: Colors.primaryColor,
          },
        }}
        onClose={() => navigation.goBack()}>
        <View style={styles.container}>
          <Text
            style={{
              color: 'black',
              width: 300,
              fontSize: 15,
              marginBottom: 50,
            }}>
            Please enter the verification code we've sent you on
            {userEmail}
          </Text>
          <Text style={{ color: 'red', fontSize: 16 }}>{error.message}</Text>
          <View
            style={{
              width: 300,
              marginVertical: 10,
              height: 60,
              alignItems: 'center',
            }}>
            <OtpInputs
              ref={otpRef}
              handleChange={code => {
                setError({ isError: false, message: '' });
                setOtp(code);
              }}
              numberOfInputs={6}
              inputContainerStyles={{
                borderWidth: 2,
                borderColor: error.isError ? 'red' : 'grey',
                margin: 4,
                borderRadius: 5,
                justifyContent: 'center',
                alignItems: 'center',
              }}
              inputStyles={{
                color: 'black',
                fontSize: 20,
                paddingLeft: 14,
              }}
              autofillFromClipboard={false}
              secureTextEntry={true}
              focusStyles={{
                borderColor: error.isError ? 'red' : Colors.primaryColor,
              }}
            />
          </View>
          <TouchableOpacity style={styles.button} onPress={() => onSubmit()}>
            <Text style={styles.buttonText}>
              {isLoading ? 'Verifying...' : 'Verify'}
            </Text>
          </TouchableOpacity>
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
    backgroundColor: Colors.primaryColor,
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
    paddingTop: 20,
    alignItems: 'center',
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  button: {
    width: 300,
    backgroundColor: 'white',
    borderWidth: 2,
    borderColor: Colors.primaryColor,
    borderRadius: 5,
    marginVertical: 10,
    paddingVertical: 12,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: '500',
    color: Colors.primaryColor,
    textAlign: 'center',
    fontWeight: '900',
  },
  other: {
    width: 300,
    marginVertical: 10,
    alignItems: 'flex-end',
  },
});

export default Otp;
