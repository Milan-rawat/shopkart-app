import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';

const Card = ({ navigation }) => {
  return (
    <TouchableOpacity onPress={() => navigation.navigate('ProductDetails')}>
      <View style={styles.card}>
        <Text style={{ color: 'black' }}>Hello World!</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 0.5,
    width: Dimensions.get('window').width / 2,
    height: 250,
    borderWidth: 1,
    borderColor: 'lightgrey',
    backgroundColor: 'white',
  },
});

export default Card;
