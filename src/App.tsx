import { useCameraRoll } from '@react-native-camera-roll/camera-roll';
import React, { useEffect, useRef, useState } from 'react';
import { Dimensions, FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { fetchImagesFromPexels, hasAndroidPermission } from './services/image-service';

const { width, height } = Dimensions.get('screen');

const App = () => {
    const [images, setImages] = useState(null);
    const [activeIndex, setActiveIndex] = useState(0);
    const [photos, getPhotos] = useCameraRoll();
    const topRef = useRef();
    const thumbRef = useRef();

    const IMAGE_SIZE = 80;
    const SPACING = 12;

    const scrollActiveIndex = index => {
        setActiveIndex(index);
        topRef?.current?.scrollToOffset({
            offset: index * width,
            animated: true,
        });

        if (index * (80 + 12) - 80 / 2 > width / 2) {
            thumbRef?.current?.scrollToOffset({
                offset: index * (IMAGE_SIZE + SPACING) - width / 2 + IMAGE_SIZE / 2,
                animated: true,
            });
        } else {
            thumbRef?.current?.scrollToOffset({
                offset: 0,
                animated: true,
            });
        }
    };
    useEffect(() => {
        const fetchImages = async () => {
            const fetchedImages = await fetchImagesFromPexels();
            setImages(fetchedImages);
        };

        fetchImages();
    }, []);

    useEffect(() => {
        hasAndroidPermission();
        getPhotos({ first: 20, assetType: 'Photos' });
    }, []);

    if (!images) {
        return <Text>Loading...</Text>;
    }

    return (
        <View style={{ flex: 1, backgroundColor: '#000' }}>
            <FlatList
                ref={topRef}
                data={photos.edges}
                keyExtractor={item => item.node.id}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                onMomentumScrollEnd={ev => {
                    scrollActiveIndex(Math.floor(ev.nativeEvent.contentOffset.x / width));
                }}
                renderItem={({ item }) => {
                    return (
                        <View style={{ width, height }}>
                            <Image source={{ uri: item.node.image.uri }} style={[StyleSheet.absoluteFillObject]} />
                        </View>
                    );
                }}
            />
            <FlatList
                ref={thumbRef}
                data={photos.edges}
                keyExtractor={item => item.node.id}
                horizontal
                showsHorizontalScrollIndicator={false}
                style={{ position: 'absolute', bottom: 80 }}
                contentContainerStyle={{ paddingHorizontal: 10 }}
                renderItem={({ item, index }) => {
                    return (
                        <TouchableOpacity onPress={() => scrollActiveIndex(index)}>
                            <Image
                                source={{ uri: item.node.image.uri }}
                                style={{
                                    width: IMAGE_SIZE,
                                    height: IMAGE_SIZE,
                                    borderRadius: SPACING,
                                    marginRight: 10,
                                    borderWidth: 2,
                                    borderColor: activeIndex === index ? '#fff' : '#000',
                                }}
                            />
                        </TouchableOpacity>
                    );
                }}
            />
        </View>
    );
};

export default App;
