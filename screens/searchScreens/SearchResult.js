import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Colors from '../../constants/Colors';

import ProductTile from '../../components/ProductTile';

const SearchResult = ({ route, navigation }) => {
  const [textInput, setTextInput] = React.useState('');
  const { searchKeyword } = route.params;
  return (
    <View style={styles.screen}>
      <View style={styles.searchBar}>
        <Ionicons
          onPress={() => navigation.goBack()}
          name="arrow-back"
          size={24}
          color="white"
        />
        <TouchableOpacity
          activeOpacity={1}
          style={styles.keywordContainer}
          onPress={() => navigation.goBack()}>
          <Text style={styles.keyword}>{searchKeyword}</Text>
          <Ionicons
            onPress={() => navigation.goBack()}
            name="search"
            size={22}
            color="white"
          />
        </TouchableOpacity>
        <Ionicons
          onPress={() => console.log(searchKeyword)}
          name="cart"
          size={24}
          color="white"
        />
      </View>
      <ScrollView>
        <ProductTile {...navigation} />
        <ProductTile {...navigation} />
        <ProductTile {...navigation} />
        <ProductTile {...navigation} />
        <ProductTile {...navigation} />
        <ProductTile {...navigation} />
        <ProductTile {...navigation} />
        <ProductTile {...navigation} />
        <ProductTile {...navigation} />
        <ProductTile {...navigation} />
        <ProductTile {...navigation} />
        <ProductTile {...navigation} />
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
