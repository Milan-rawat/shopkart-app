import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Dimensions,
  ScrollView,
} from 'react-native';
import { SliderBox } from 'react-native-image-slider-box';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Colors from '../../constants/Colors';

const ProductDetails = props => {
  let prd = props.route.params.product;
  const [product, setProduct] = React.useState(prd);
  const [width, setWidth] = React.useState();

  const onLayout = e => {
    setWidth(e.nativeEvent.layout.width);
  };

  return (
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
          // onPress={() => navigation.goBack()}
          name="heart"
          size={24}
          color="#B0B0B0"
        />
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.name}>{product.productTitle}</Text>
        <Text style={styles.price}>₹ {product.price}</Text>
        <Text style={styles.description}>{product.productDescription}</Text>
        {product.productPoints ? (
          <View style={{ marginVertical: 15 }}>
            <Text style={{ color: 'black', fontSize: 22, marginVertical: 10 }}>
              About this product
            </Text>
            {product.productPoints.map((point, index) => (
              <Text style={{ color: 'grey', marginVertical: 3 }}>
                {index + 1}. {point}
              </Text>
            ))}
          </View>
        ) : null}
      </View>
      <View style={styles.btnContainer}>
        <TouchableOpacity
          onPress={() => {}}
          style={{ ...styles.button, backgroundColor: Colors.primaryColor }}>
          <Text style={{ ...styles.buttonText, color: 'white' }}>Buy now</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {}} style={styles.button}>
          <Text style={styles.buttonText}>Add To Cart</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
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
