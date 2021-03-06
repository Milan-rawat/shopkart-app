import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Dimensions,
  ScrollView,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { SliderBox } from 'react-native-image-slider-box';
import Ionicons from 'react-native-vector-icons/Ionicons';
import EncryptedStorage from 'react-native-encrypted-storage';
import AwesomeAlert from 'react-native-awesome-alerts';
import Colors from '../../constants/Colors';
import API from '../../constants/Env';
import GlobalContext from '../../context/GlobalContext';

const ProductDetails = props => {
  let prd = props.route.params.product;
  const [product, setProduct] = React.useState(prd);
  const [width, setWidth] = React.useState();
  const [wishlisted, setWishlisted] = React.useState(false);
  const [userToken, setUserToken] = React.useState('');
  const [isLoaded, setIsLoaded] = React.useState(false);
  const [isLoading, setisLoading] = React.useState(false);
  const [isLoggedIn, setIsLoggedIn] = React.useContext(GlobalContext);
  const { navigation } = props;

  const onLayout = e => {
    setWidth(e.nativeEvent.layout.width);
  };

  const retrieveUserSession = async () => {
    try {
      const authData = JSON.parse(await EncryptedStorage.getItem('authData'));
      if (authData && authData.isLoggedIn) {
        setIsLoggedIn(true);
        setUserToken(authData.token);
        return authData;
      }

      return false;
    } catch (error) {
      Alert.alert('Something Went Wrong!');
      console.log(error);
      return false;
    }
  };

  const fetchData = async () => {
    const authData = JSON.parse(await EncryptedStorage.getItem('authData'));
    try {
      const res = await fetch(`${API.URL}/wishlist/getMyWishlist`, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + authData.token,
        },
      });
      const response = JSON.parse(await res.text());
      isInWishlist(response.wishlist);
      setIsLoaded(true);
    } catch (err) {
      console.log(err);
    }
  };

  const addToWishlist = async () => {
    setWishlisted(!wishlisted);
    let wishOrNot = 'addToWishlist';
    if (wishlisted) wishOrNot = 'removeFromWishlist';
    try {
      const res = await fetch(`${API.URL}/wishlist/${wishOrNot}`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + userToken,
        },
        body: JSON.stringify({
          productId: product._id,
        }),
      });
      const response = JSON.parse(await res.text());
      if (!response.status) {
        setWishlisted(!wishlisted);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const isInWishlist = list => {
    let isInList = list.find(
      wish => wish._id.toString() === product._id.toString(),
    );
    if (isInList) setWishlisted(true);
    else setWishlisted(false);
  };

  const addToCart = async () => {
    setisLoading(true);
    try {
      const res = await fetch(`${API.URL}/cart/addToCart`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + userToken,
        },
        body: JSON.stringify({
          productId: product._id,
        }),
      });
      const response = JSON.parse(await res.text());
      setisLoading(false);
      Alert.alert('Added To Cart!');
    } catch (err) {
      console.log(err);
    }
  };

  React.useEffect(() => {
    const unmount = navigation.addListener('focus', () => {
      setIsLoaded(false);
      if (isLoggedIn) {
        const getData = async () => {
          const authData = await retrieveUserSession();
          if (authData && authData.token) fetchData(authData.token);
        };
        getData();
      } else {
        setWishlisted(false);
        setIsLoaded(true);
      }
    });
    return unmount;
  }, [isLoggedIn, navigation]);

  return (
    <>
      <AwesomeAlert
        show={true}
        showProgress={false}
        closeOnTouchOutside={false}
        closeOnHardwareBackPress={false}
        // showCancelButton={true}
        // showConfirmButton={true}
        // cancelText="Cancel"
        // confirmText="Logout"
        confirmButtonColor={Colors.primaryColor}
        // onDismiss={() => setShowAlert(false)}
        // onCancelPressed={() => setShowAlert(false)}
        // onConfirmPressed={() => onLogout()}
        customView={
          <View>
            <Text
              style={{
                color: 'black',
                borderWidth: 1,
                width: 90,
                textAlign: 'center',
              }}>
              Added to Cart!
            </Text>
          </View>
        }
        contentContainerStyle={{
          position: 'absolute',
          bottom: 70,
          width: 'auto',
          height: 80,
          padding: 0,
        }}
      />
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
        <ScrollView style={styles.screen}>
          <View style={styles.imagesContainer} onLayout={onLayout}>
            <SliderBox
              images={product.images}
              sliderBoxHeight={200}
              parentWidth={width}
              paginationBoxVerticalPadding={20}
              circleLoop
              resizeMethod={'resize'}
              resizeMode={'cover'}
              paginationBoxStyle={{
                position: 'absolute',
                bottom: 0,
                padding: 0,
                alignItems: 'center',
                alignSelf: 'center',
                justifyContent: 'center',
                paddingVertical: 10,
              }}
            />
          </View>
          <View style={styles.wishBtn}>
            <Ionicons
              style={styles.wishlist}
              onPress={() =>
                isLoggedIn
                  ? addToWishlist()
                  : props.navigation.navigate('AuthScreen')
              }
              name="heart"
              size={24}
              color={wishlisted ? Colors.accentColor : '#B0B0B0'}
            />
          </View>
          <View style={styles.infoContainer}>
            <Text style={styles.name}>{product.productTitle}</Text>
            <Text style={styles.price}>??? {product.price}</Text>
            <Text style={styles.description}>{product.productDescription}</Text>
            {product.productPoints ? (
              <View style={{ marginVertical: 15 }}>
                <Text
                  style={{ color: 'black', fontSize: 22, marginVertical: 10 }}>
                  About this product
                </Text>
                {product.productPoints.map((point, index) => (
                  <Text
                    key={index}
                    style={{ color: 'grey', marginVertical: 3 }}>
                    {index + 1}. {point}
                  </Text>
                ))}
              </View>
            ) : null}
          </View>
          <View style={styles.btnContainer}>
            <TouchableOpacity
              onPress={() =>
                isLoggedIn ? {} : props.navigation.navigate('AuthScreen')
              }
              style={{
                ...styles.button,
                backgroundColor: Colors.primaryColor,
              }}>
              <Text style={{ ...styles.buttonText, color: 'white' }}>
                Buy now
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() =>
                isLoggedIn
                  ? addToCart()
                  : props.navigation.navigate('AuthScreen')
              }
              style={styles.button}>
              <Text style={styles.buttonText}>
                {isLoading ? 'Adding...' : 'Add To Cart'}
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  screen: {
    padding: 10,
  },
  imagesContainer: {},
  wishBtn: {
    padding: 10,
    alignItems: 'flex-end',
  },
  wishlist: {
    padding: 8,
    borderRadius: 32,
    backgroundColor: 'white',
    elevation: 4,
  },
  infoContainer: {
    paddingVertical: 20,
  },
  name: {
    color: 'black',
    fontSize: 20,
    marginVertical: 5,
  },
  price: {
    color: 'green',
    fontSize: 24,
    fontStyle: 'italic',
  },
  description: {
    color: 'black',
    fontSize: 16,
    marginTop: 50,
  },
  btnContainer: {
    alignItems: 'center',
    marginBottom: 50,
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
});

export default ProductDetails;
