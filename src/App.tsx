/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useState} from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';

const images = [
  {id: '1', uri: 'https://via.placeholder.com/600x400?text=Image+1'},
  {id: '2', uri: 'https://via.placeholder.com/600x400?text=Image+2'},
  {id: '3', uri: 'https://via.placeholder.com/600x400?text=Image+3'},
  {id: '4', uri: 'https://via.placeholder.com/600x400?text=Image+4'},
  {id: '5', uri: 'https://via.placeholder.com/600x400?text=Image+5'},
];
const App = () => {
  const [selectedImage, setSelectedImage] = useState(images[0].uri);

  const renderImage = ({item}: {item: {id: string; uri: string}}) => (
    <TouchableOpacity onPress={() => setSelectedImage(item.uri)}>
      <Image source={{uri: item.uri}} style={styles.thumbnail} />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* <View style={styles.fullImageContainer}>
        <Image source={{uri: selectedImage}} style={styles.fullImage} />
      </View> */}
      {/* 작은 사진 슬라이더 */}
      <View style={{height: 120}}>
        <FlatList
          data={images}
          renderItem={renderImage}
          keyExtractor={item => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.thumbnailContainer}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  fullImageContainer: {
    marginTop: 10,
    marginLeft: 100,
    marginRight: 100,
  },
  fullImage: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height * 0.5,
    resizeMode: 'cover',
  },
  thumbnailContainer: {
    marginTop: 10,
    marginBottom: 10,
  },
  thumbnail: {
    width: 100,
    height: 100,
    marginHorizontal: 5,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ccc',
  },
});

export default App;
