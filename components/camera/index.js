import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity, Image } from 'react-native';
import { Camera, CameraType } from 'expo-camera';
import FlipIcon from '../../assets/icons/flip.svg'
import FlashIcon from '../../assets/icons/flash.svg'
import RepeatIcon from '../../assets/icons/repeat.svg'
import CheckIcon from '../../assets/icons/check.svg'
export default function CameraPhoto({ navigation }) {
    const [type, setType] = useState(CameraType.back)
    const [flash, setFlash] = useState(Camera.Constants.FlashMode.off)
    const [hasPermission, setHasPermission] = useState(null);
    const [cameraRef, setCameraRef] = useState(null);
    const [image, setImage] = useState(null)
    useEffect(() => {
        (async () => {
            const { status } = await Camera.requestCameraPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
    }, []);

    const takePicture = async () => {
        if (cameraRef) {
            const photo = await cameraRef.takePictureAsync();
            setImage(photo.uri) // Handle the captured photo data here
        }
    };

    if (hasPermission === null) {
        return <View />;
    }

    if (hasPermission === false) {
        return (
            <View className='flex-1 bg-white justify-center items-center'>
                <Text className='font-[BentonSans-Bold] text-base'>No access to camera</Text>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Text className='font-[BentonSans-Book] mt-3 text-blue-600 underline'>Cancel</Text>
                </TouchableOpacity>
            </View>
        )
    }

    return (
        <View className='flex-1 bg-black'>
            {
                !image ?
                    <Camera
                        className='flex-1'
                        type={type}
                        flashMode={flash}
                        ref={(ref) => setCameraRef(ref)}
                    /> :
                    <Image source={{ uri: image }} resizeMode='contain' className='flex-1' />
            }
            {/* Controller */}
            <View
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: image ? 'space-between' : 'center',
                    paddingHorizontal: image ? 60 : 24,
                    paddingBottom: 56,
                    paddingTop: 20
                }}>
                {
                    image ?
                        <TouchableOpacity onPress={() => setImage(null)}>
                            <RepeatIcon width={20} height={20} fill={'#fff'} />
                        </TouchableOpacity> :
                        /* Flash Camera */
                        <TouchableOpacity onPress={() => setFlash(flash => flash === Camera.Constants.FlashMode.off ? Camera.Constants.FlashMode.on : Camera.Constants.FlashMode.off)}
                            className='border border-white rounded-full p-1'
                            style={{ backgroundColor: flash === Camera.Constants.FlashMode.off ? 'transparent' : '#fff' }}>
                            <FlashIcon width={20} height={20} fill={flash === Camera.Constants.FlashMode.off ? '#fff' : '#000'} />
                        </TouchableOpacity>
                }
                {
                    image ? <></> :
                        /* Take Photo */
                        <TouchableOpacity className='border-2 border-white w-20 h-20 mx-auto rounded-full justify-center items-center'
                            onPress={takePicture}>
                            <View className='bg-white w-[70] h-[70] rounded-full'></View>
                        </TouchableOpacity>
                }
                {
                    image ?
                        /* Continue */
                        <TouchableOpacity onPress={() => { navigation.navigate('UploadPhoto', { image: image }) }}>
                            <CheckIcon width={25} height={25} fill={'#fff'} />
                        </TouchableOpacity> :
                        /* Flip Camera */
                        <TouchableOpacity
                            onPress={() => setType(type => type === CameraType.back ? CameraType.front : CameraType.back)}>
                            <FlipIcon width={30} height={30} fill={'#fff'} />
                        </TouchableOpacity>
                }
            </View>
        </View>
    );
}
