import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TouchableNativeFeedback,
  Image,
  Alert,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import EncryptedStorage from 'react-native-encrypted-storage';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Colors from '../../constants/Colors';
import API from '../../constants/Env';
import GlobalContext from '../../context/GlobalContext';

const Account = ({ navigation }) => {
  const [userData, setUserData] = React.useState({});
  const [isLoggedIn, setIsLoggedIn] = React.useContext(GlobalContext);
  const [isLoaded, setIsLoaded] = React.useState(false);

  const retrieveUserSession = async () => {
    try {
      const authData = JSON.parse(await EncryptedStorage.getItem('authData'));
      if (authData && authData.isLoggedIn) return authData;

      return false;
    } catch (error) {
      Alert.alert('Something Went Wrong!');
      console.log(error);
      return false;
    }
  };
  const fetchData = async token => {
    try {
      const res = await fetch(`${API.URL}/getMe`, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token,
        },
      });
      const response = JSON.parse(await res.text());
      setUserData(response.me);
      setIsLoaded(true);
    } catch (err) {
      console.log(err);
    }
  };
  const onLogout = () => {
    EncryptedStorage.setItem(
      'authData',
      JSON.stringify({ isLoggedIn: false, token: '' }),
    );
    setIsLoggedIn(false);
    navigation.navigate('AccountScreen');
  };

  React.useEffect(() => {
    const getData = async () => {
      const authData = await retrieveUserSession();
      if (authData && authData.token) fetchData(authData.token);
    };
    getData();
  }, []);

  const OptionCard = ({ data }) => {
    return (
      <View style={styles.card}>
        <View style={styles.cardHeadingContainer}>
          <Text style={styles.cardHeading}>{data.title}</Text>
        </View>
        <TouchableNativeFeedback>
          <View style={styles.cardButtonContainer}>
            <Text style={styles.cardButton}>{data.btnName}</Text>
          </View>
        </TouchableNativeFeedback>
      </View>
    );
  };

  return (
    <>
      {!isLoaded && (
        <View
          style={{
            flex: 1,
            height: Dimensions.get('window').height - 250,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <ActivityIndicator size="large" color={Colors.primaryColor} />
        </View>
      )}
      {isLoaded && (
        <View style={styles.screen}>
          <View style={styles.headerBar}>
            <Ionicons
              onPress={() => navigation.goBack()}
              name="arrow-back"
              size={20}
              color="white"
            />
            <TouchableOpacity
              activeOpacity={1}
              style={styles.keywordContainer}
              onPress={() => navigation.goBack()}>
              <Text style={styles.keyword}>My Account</Text>
              <Ionicons
                onPress={() => navigation.navigate('SearchScreen')}
                name="search"
                size={20}
                color="white"
              />
            </TouchableOpacity>
            <Ionicons
              onPress={() => navigation.navigate('CartScreen')}
              name="cart"
              size={20}
              color="white"
            />
          </View>
          <ScrollView>
            <View style={styles.screenHeader}>
              <View style={styles.profileContainer}>
                <Image
                  style={styles.profileImage}
                  source={{
                    uri:
                      userData && userData.profilePicture
                        ? userData.profilePicture
                        : 'https://i.stack.imgur.com/l60Hf.png',
                  }}
                />
              </View>
              <Text style={styles.name}>
                {userData && userData.fullName ? userData.fullName : 'User'}
              </Text>
              <View style={styles.nameContainer}>
                <Text>{userData && userData.email ? userData.email : ''}</Text>
                <Ionicons
                  style={styles.isVerified}
                  name={
                    userData.emailVerified ? 'checkmark-circle' : 'close-circle'
                  }
                  size={20}
                  color={userData.emailVerified ? '#5DE23C' : '#F72F35'}
                />
              </View>
            </View>

            <View style={styles.otherContainer}>
              <OptionCard
                data={{ title: 'Shopkart Plus', btnName: 'Get Shopkart Plus' }}
              />
              <OptionCard
                data={{ title: 'My Orders', btnName: 'View All Orders' }}
              />
              <OptionCard
                data={{ title: 'My Wishlist', btnName: 'View All wishlist' }}
              />
              <OptionCard data={{ title: 'My Cart', btnName: 'View Cart' }} />
              <OptionCard
                data={{ title: 'My Card & wallet', btnName: 'View Details' }}
              />
              <OptionCard
                data={{ title: 'My Reviews', btnName: 'View Your Reviews' }}
              />
            </View>
            <View style={styles.lastOptions}>
              <Text style={styles.option}>
                <Ionicons
                  style={styles.icon}
                  onPress={() => {}}
                  name="notifications"
                  size={20}
                  color="black"
                />
                {'  '}
                Notifications
              </Text>
              <Text style={styles.option}>
                <Ionicons
                  style={styles.icon}
                  onPress={() => {}}
                  name="settings-outline"
                  size={20}
                  color="black"
                />
                {'  '}
                Account Settings
              </Text>
              <Text style={styles.option} onPress={() => onLogout()}>
                <Ionicons
                  style={styles.icon}
                  onPress={() => {}}
                  name="exit-outline"
                  size={20}
                  color="black"
                />
                {'  '}
                Logout of this app
              </Text>
              <Text style={styles.option}>
                <Ionicons
                  style={styles.icon}
                  onPress={() => {}}
                  name="exit-outline"
                  size={20}
                  color="black"
                />
                {'  '}
                Logout of all devices
              </Text>
            </View>
          </ScrollView>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: 'eee',
  },
  headerBar: {
    width: '100%',
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',

    top: 0,
    backgroundColor: Colors.primaryColor,
    paddingHorizontal: 20,
    elevation: 10,
  },
  keywordContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 15,
  },
  keyword: {
    color: 'white',
    fontSize: 22,
  },
  screenHeader: {
    width: '100%',
    height: 200,
    backgroundColor: Colors.primaryColor,
  },
  profileContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    margin: 10,
  },
  nameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  name: {
    textAlign: 'center',
    padding: 10,
    fontSize: 20,
    color: 'white',
  },
  otherContainer: {
    padding: 10,
  },
  card: {
    height: 100,
    marginBottom: 10,
    backgroundColor: 'white',
    elevation: 5,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  cardHeadingContainer: {
    height: '50%',
    color: 'black',
    fontSize: 16,
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'lightgrey',
  },
  cardHeading: {
    color: 'black',
    fontSize: 16,
  },
  cardButtonContainer: {
    height: '50%',
    fontSize: 16,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  cardButton: {
    color: Colors.primaryColor,
    fontSize: 16,
  },
  lastOptions: {
    backgroundColor: 'white',
  },
  icon: {
    color: 'black',
    padding: 10,
  },
  option: {
    height: 40,
    paddingHorizontal: 15,
    textAlignVertical: 'center',
    color: 'black',
    fontSize: 16,
    borderTopWidth: 1,
    borderTopColor: 'lightgrey',
  },
});

export default Account;
