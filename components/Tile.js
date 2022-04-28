import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';

const Tile = ({ navigation }) => {
  return (
    <TouchableOpacity onPress={() => navigation.navigate('ProductDetails')}>
      <View style={styles.tile}>
        <Text style={{ color: 'black' }}>Hello World!</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  tile: {
    width: Dimensions.get('window').width,
    height: 180,
    borderWidth: 1,
    borderColor: 'lightgrey',
    backgroundColor: 'white',
    marginTop: 15
  },
});

export default Tile;
