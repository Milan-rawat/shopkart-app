import React from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Colors from '../../constants/Colors';

const Search = ({ navigation }) => {
  const [textInput, setTextInput] = React.useState('');
  const textInputRef = React.useRef(null);

  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      if (textInputRef.current) {
        textInputRef.current.focus();
      }
    });
    return unsubscribe;
  }, [navigation]);

  return (
    <View style={styles.screen}>
      <View style={styles.searchBar}>
        {/* ------------first icon-------------- */}
        <Ionicons
          onPress={() => {
            //   setTextInput('');
            navigation.goBack();
          }}
          name={textInput.trim().length > 0 ? 'arrow-back' : 'search'}
          size={22}
          color="grey"
        />
        <TextInput
          ref={textInputRef}
          style={styles.input}
          onChangeText={setTextInput}
          value={textInput}
          placeholder="Search Product on ShopKart..."
          placeholderTextColor="#999"
          returnKeyType="search"
          onSubmitEditing={
            textInput.trim().length > 0
              ? () =>
                  navigation.navigate('SearchResult', {
                    searchKeyword: textInput,
                  })
              : null
          }
        />
        {/* ------------last icon-------------- */}
        {textInput.trim().length > 0 ? (
          <Ionicons
            onPress={() => setTextInput('')}
            name="close-circle"
            size={22}
            color="grey"
          />
        ) : (
          <Ionicons onPress={() => {}} name="mic" size={22} color="grey" />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  searchBar: {
    width: '100%',
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    top: 0,
    backgroundColor: 'white',
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: 'lightgrey',
    elevation: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: 'black',
    marginHorizontal: 10,
  },
});

export default Search;
