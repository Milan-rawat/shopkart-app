import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TouchableNativeFeedback,
  Image,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Colors from '../../constants/Colors';

const AccountScreen = ({ navigation }) => {
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
              source={{ uri: 'https://i.stack.imgur.com/l60Hf.png' }}
            />
          </View>
          <Text style={styles.name}>Milan Rawat</Text>
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
          <Text style={styles.option}>
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
  name: {
    textAlign: 'center',
    paddingVertical: 10,
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

export default AccountScreen;
