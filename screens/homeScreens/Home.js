import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  RefreshControl,
  Alert,
  ActivityIndicator,
} from 'react-native';

import ProductCard from '../../components/ProductCard';
import Colors from '../../constants/Colors';
import API from '../../constants/Env';

const Home = props => {
  const [limit, setLimit] = React.useState(10);
  const [page, setPage] = React.useState(1);
  const [products, setProducts] = React.useState([]);
  const [isLoaded, setIsLoaded] = React.useState(false);
  const [isRefreshing, setIsRefreshing] = React.useState(false);
  const [isLoadingMore, setIsLoadingMore] = React.useState(false);
  const { navigation } = props;

  const getData = async isBottom => {
    try {
      let prdPage = page;
      if (isBottom) {
        setIsLoadingMore(true);
        prdPage = page + 1;
      }
      const res = await fetch(
        `${API.URL}/product/getRandomProducts?limit=${limit}&page=${prdPage}`,
        {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        },
      );
      const response = JSON.parse(await res.text());
      if (isBottom) {
        setPage(prdPage);
        setProducts(oldprds => [...oldprds, ...response.products]);
        setIsLoadingMore(false);
      } else {
        setProducts(response.products);
        setPage(1);
      }

      setIsLoaded(true);
      setIsRefreshing(false);
    } catch (err) {
      console.log(err);
    }
  };

  React.useEffect(() => {
    setIsLoaded(false);
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

  const onRefresh = () => {
    setIsRefreshing(true);
    getData();
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
        <ScrollView
          style={styles.screen}
          refreshControl={
            <RefreshControl
              refreshing={isRefreshing}
              onRefresh={() => onRefresh()}
              tintColor="#ff0000"
              title="Loading..."
              titleColor="#00ff00"
              colors={[
                Colors.primaryColor,
                Colors.accentColor,
                Colors.tertiaryColor,
              ]}
              progressBackgroundColor="#ffffff"
            />
          }
          onScroll={({ nativeEvent }) => {
            if (isCloseToBottom(nativeEvent)) {
              if (!isLoadingMore) getData(true);
            }
          }}
          // scrollEventThrottle={400}
        >
          <View style={styles.screenView}>
            {(!products || products.length === 0) && (
              <Text>No Products available!</Text>
            )}
            {products &&
              products.length > 0 &&
              products.map((product, index) => (
                <ProductCard key={index} {...props} product={product} />
              ))}
          </View>
          {isLoadingMore && (
            <ActivityIndicator
              style={{ marginVertical: 15 }}
              size="large"
              color={Colors.primaryColor}
            />
          )}
        </ScrollView>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  screenView: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    flexWrap: 'wrap',
    backgroundColor: '#f0f0f0',
  },
});

export default Home;
