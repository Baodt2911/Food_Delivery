import React, { useEffect, useState } from 'react'
import { View, Text, TouchableOpacity, ImageBackground, Image } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import * as ImagePicker from 'expo-image-picker';
import BackIcon from '../assets/icons/back.svg'
import Pattern from '../assets/images/Pattern1.png'
import GalleryIcon from '../assets/icons/Gallery.svg'
import CameraIcon from '../assets/icons/camera.svg'
import CloseIcon from '../assets/icons/close.svg'
const UploadPhoto = ({ route, navigation }) => {
    const [image, setImage] = useState(null)
    if (route?.params?.image) {
        useEffect(() => {
            setImage(route?.params?.image)
        }, [route?.params?.image])
    }
    const pickImageAsync = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            quality: 1,
        });
        setImage(result.assets[0].uri)
    };
    return (
        <SafeAreaView className='flex-1'>
            <ImageBackground className='flex-1 bg-white' source={Pattern} resizeMode='cover'>
                {/* Back */}
                <TouchableOpacity onPress={() => navigation.goBack()}
                    className='w-11 h-11 rounded-2xl bg-[#FFF6EF] items-center justify-center mt-10 ml-6' style={{ elevation: 1 }}>
                    <BackIcon />
                </TouchableOpacity>
                {/* Title */}
                <View className='pl-[25px] mr-[86px]  mt-5'>
                    <Text className='font-[BentonSans-Bold] text-2xl'>Upload Your Photo Profile</Text>
                    <Text className='font-[BentonSans-Book] text-xs mt-5'>This data will be displayed in your account profile for security</Text>
                </View>
                {image ? <View className='relative w-[250] h-[260]  mx-auto mt-12'>
                    <TouchableOpacity className='absolute top-2 right-2 z-10' onPress={() => setImage(null)}>
                        <CloseIcon />
                    </TouchableOpacity>
                    <Image source={{ uri: image }} resizeMode='cover' className='w-full h-full rounded-2xl' />
                </View> :
                    /* Choose Method Upload Photo  */
                    <View className='mx-4 gap-y-5 mt-5'>
                        {/* From Gallery */}
                        <TouchableOpacity onPress={pickImageAsync}
                            className='rounded-3xl h-[130] items-center justify-center' style={{
                                borderWidth: 1,
                                borderColor: Platform.OS === 'ios' ? '#f4f4f4' : 'transparent',
                                backgroundColor: '#fff',
                                shadowColor: '#5a6cea66',
                                elevation: 20,
                            }}>
                            <GalleryIcon />
                            <Text className='font-[BentonSans-Bold] text-base mt-2'>From Gallery</Text>
                        </TouchableOpacity>
                        {/* Take Photo */}
                        <TouchableOpacity onPress={() => navigation.navigate('Camera')}
                            className='rounded-3xl h-[130] items-center justify-center'
                            style={{
                                borderWidth: 1,
                                borderColor: Platform.OS === 'ios' ? '#f4f4f4' : 'transparent',
                                backgroundColor: '#fff',
                                shadowColor: '#5a6cea66',
                                elevation: 20,
                            }}>
                            <CameraIcon />
                            <Text className='font-[BentonSans-Bold] text-base mt-2'>Take Photo</Text>
                        </TouchableOpacity>
                    </View>
                }
                {/* Next Button */}
                <View className=' w-full  items-center absolute bottom-[60] left-0 right-0'>
                    <TouchableOpacity
                        className='bg-bgrButton  w-[160] h-[50px] rounded-[15px] justify-center items-center' disabled={!image} style={{ opacity: image ? 1 : 0.5 }}>
                        <Text className='text-white text-xl font-[BentonSans-Bold] '>Next</Text>
                    </TouchableOpacity>
                </View>
            </ImageBackground>
        </SafeAreaView>
    )
}

export default UploadPhoto