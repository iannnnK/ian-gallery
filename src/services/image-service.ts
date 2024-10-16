import { Alert, Linking, PermissionsAndroid } from 'react-native';
import { CameraRoll } from '@react-native-camera-roll/camera-roll';

const API_URL = 'https://api.pexels.com/v1/search?query=nature';

export const requestReadImagePermission = async () => {
    try {
        const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES, {
            title: '내부 갤러리 접근',
            message: '내부 이미지에 접근이 필요합니다.',
            buttonNeutral: '나중에',
            buttonNegative: '취소',
            buttonPositive: '확인',
        });

        console.log('granted ', granted);
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            console.log('이미지 접근 권한이 승인되었습니다.');
        } else {
            Alert.alert('권한 필요', '이미지 접근 권한이 거부되었습니다. 설정에서 권한을 직접 허용해 주세요.', [
                { text: '취소', style: 'cancel' },
                { text: '설정으로 이동', onPress: () => Linking.openSettings() },
            ]);
        }
    } catch (err) {
        console.warn(err);
    }
};

export const fetchImagesFromPexels = async () => {
    const response = await fetch(API_URL, {
        headers: {
            Authorization: 'knUU0k6XlgRkwPSBxI5JMhik215sS6aamXkHmTQARu2yXWzQMAi182GN',
        },
    });

    const data = await response.json();
    return data.photos;
};

export const getImageFromDevice = async () => {
    return null;
};
