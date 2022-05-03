import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  ActivityIndicator,
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
  const [isLoadingMore, setIsLoadingMore] = React.useState(false);
  const [totalData, setTotalData] = React.useState(0);

  const getData = async isAtBottom => {
    try {
      let prdPage = page;
      if (isAtBottom) {
        setIsLoadingMore(true);
        prdPage = page + 1;
      }
      const res = await fetch(
        `${API.URL}/product/searchProducts?limit=${limit}&page=${prdPage}&search=${keyword}`,
        {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        },
      );
      const response = JSON.parse(await res.text());
      if (isAtBottom) {
        setPage(prdPage);
        setProducts(oldprds => [...oldprds, ...response.allProducts]);
      } else {
        setProducts(response.allProducts);
        setPage(1);
        setIsLoaded(true);
        setTotalData(response.totalData);
      }

      setIsLoadingMore(false);
    } catch (err) {
      console.log(err);
    }
  };

  React.useEffect(() => {
    getData();
  }, []);

  const isCloseToBottom = ({
    layoutMeasurement,
    contentOffset,
    contentSize,
  }) => {
    const paddingToBottom = 20;
    return (
      layoutMeasurement.height + contentOffset.y >=
      contentSize.height - paddingToBottom
    );
  };

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
          <ActivityIndicator size="large" color={Colors.primaryColor} />
        </View>
      )}
      {isLoaded && products && products.length > 0 && (
        <ScrollView
          onScroll={({ nativeEvent }) => {
            if (isCloseToBottom(nativeEvent)) {
              if (products.length < totalData) {
                if (!isLoadingMore) {
                  getData(true);
                }
              }
            }
          }}>
          {products.map((product, index) => (
            <ProductTile key={index} {...props} product={product} />
          ))}
          {isLoadingMore && (
            <ActivityIndicator size="large" color={Colors.primaryColor} />
          )}
        </ScrollView>
      )}
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
