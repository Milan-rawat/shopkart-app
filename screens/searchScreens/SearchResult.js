import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Colors from '../../constants/Colors';
import API from '../../constants/Env';

import ProductTile from '../../components/ProductTile';

const SearchResult = props => {
  const { searchKeyword } = props.route.params;
  const [keyword, setKeyword] = React.useState(
    props.route.params.searchKeyword,
  );
  const [limit, setLimit] = React.useState(10);
  const [page, setPage] = React.useState(1);
  const [products, setProducts] = React.useState([]);
  const [isLoaded, setIsLoaded] = React.useState(false);

  const getData = async keyword => {
    try {
      const res = await fetch(
        `${API.URL}/product/searchProducts?limit=${limit}&page=${page}&search=${keyword}`,
        {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        },
      );
      const response = JSON.parse(await res.text());
      setProducts(response.allProducts);
      setIsLoaded(true);
    } catch (err) {
      console.log(err);
    }
  };

  React.useEffect(() => {
    getData(keyword);
  }, []);

  return (
    <View style={styles.screen}>
      <View style={styles.searchBar}>
        <Ionicons
          onPress={() => props.navigation.goBack()}
          name="arrow-back"
          size={24}
          color="white"
        />
        <TouchableOpacity
          activeOpacity={1}
          style={styles.keywordContainer}
          onPress={() => props.navigation.goBack()}>
          <Text style={styles.keyword}>{keyword}</Text>
          <Ionicons
            onPress={() => props.navigation.goBack()}
            name="search"
            size={22}
            color="white"
          />
        </TouchableOpacity>
        <Ionicons
          onPress={() => props.navigation.navigate('CartScreen')}
          name="cart"
          size={24}
          color="white"
        />
      </View>
      <ScrollView>
        {(!products || products.length === 0) && isLoaded && (
          <View
            style={{
              flex: 1,
              height: Dimensions.get('window').height - 250,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={{ color: 'black', fontSize: 18 }}>
              No Products available!
            </Text>
          </View>
        )}
        {!isLoaded && (
          <View
            style={{
              flex: 1,
              height: Dimensions.get('window').height - 250,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={{ color: 'black', fontSize: 18 }}>Loading...</Text>
          </View>
        )}
        {isLoaded &&
          products &&
          products.length > 0 &&
          products.map((product, index) => (
            <ProductTile key={index} {...props} product={product} />
          ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  searchBar: {
    width: '100%',
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    top: 0,
    backgroundColor: Colors.primaryColor,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: 'lightgrey',
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
});

export default SearchResult;
