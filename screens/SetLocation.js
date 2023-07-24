import React, { useEffect, useState } from 'react'
import { View, Text, TextInput, ImageBackground, TouchableOpacity, Platform, Keyboard, Alert, LogBox } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { SafeAreaView } from 'react-native-safe-area-context'
import * as Location from 'expo-location';
import Pattern from '../assets/images/Pattern1.png'
import BackIcon from '../assets/icons/back.svg'
import LocationIcon from '../assets/icons/location.svg'
const SetLocation = ({ navigation, route }) => {
    const { phoneNumber, displayName, photoURL, onUploadPhoto } = route.params
    LogBox.ignoreLogs([
        'Non-serializable values were found in the navigation state',
    ]);
    const [textAddress, setTextAddress] = useState('')
    const [isKeyboard, setIsKeyboard] = useState(false)
    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
            setIsKeyboard(true)
        });
        const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
            setIsKeyboard(false)
        });
        return () => {
            keyboardDidShowListener.remove();
            keyboardDidHideListener.remove();
        };
    }, []);
    const handleGetCurrentLocation = async () => {
        try {
            setTextAddress('')
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                Alert.alert('Permission to access location was denied')
                return;
            }
            let location = await Location.getCurrentPositionAsync({});
            // Get infor by location
            let addressResponse = await Location.reverseGeocodeAsync({
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
            });
            if (addressResponse.length < 0) {
                setTextAddress('')
                return
            }
            let getAddress = `${addressResponse[0].street || ''} ${addressResponse[0].streetNumber || ''}, ${addressResponse[0].district || ''}, ${addressResponse[0].subregion || ''}, ${addressResponse[0].city || ''}, ${addressResponse[0].region || ''}, ${addressResponse[0].country || ''}`
            setTextAddress(getAddress);
        } catch (error) {
            console.error('Error get current address: ', error);
        }
    }
    return (
        <SafeAreaView className='flex-1'>
            <ImageBackground className='flex-1 bg-white' source={Pattern} resizeMode='cover'>
                <View style={{ flex: 4 }}>
                    <TouchableOpacity onPress={() => navigation.goBack()}
                        className='w-11 h-11 rounded-2xl bg-[#FFF6EF] items-center justify-center mt-10 ml-6' style={{
                            shadowColor: '#333',
                            shadowOffset: { width: 0, height: 0 },
                            shadowOpacity: 0.3,
                            shadowRadius: 1,
                            elevation: 1
                        }}>
                        <BackIcon />
                    </TouchableOpacity>
                    {/* Title */}
                    <View className='pl-[25px] mr-[86px]  mt-5'>
                        <Text className='font-[BentonSans-Bold] text-2xl'>Set Your Location </Text>
                        <Text className='font-[BentonSans-Book] text-xs mt-5'>This data will be displayed in your account profile for security</Text>
                    </View>
                    {/* SetLocation  */}
                    <View className='mx-5 mt-5 px-3 pt-5 pb-3 bg-[#f4f4f4] h-40 rounded-3xl justify-between'
                        style={{
                            borderWidth: 1,
                            borderColor: Platform.OS === 'ios' ? '#f4f4f4' : 'transparent',
                            backgroundColor: '#f4f4f4',
                            shadowColor: '#5a6ceacc',
                            elevation: 30,
                        }}>
                        <View className=' flex-row items-center' style={{ columnGap: 10 }}>
                            <LocationIcon />
                            <TextInput className='w-[75%] font-[BentonSans-Bold] text-base'
                                placeholder='Your Location'
                                value={textAddress}
                                onChangeText={(text) => setTextAddress(text)}
                            />
                        </View>
                        <TouchableOpacity onPress={handleGetCurrentLocation}
                            className=' w-full h-[60] bg-white rounded-2xl justify-center items-center'>
                            <Text className='font-[BentonSans-Bold]  text-base'>Set Location</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                {/* Next Button */}
                {
                    isKeyboard ? <></> :
                        <View className='flex-1 justify-center items-center'>
                            <TouchableOpacity disabled={textAddress ? false : true} style={{ opacity: textAddress ? 1 : 0.7 }}
                                onPress={() => {
                                    navigation.navigate('Success', {
                                        phoneNumber, displayName, photoURL,
                                        address: textAddress, onUploadPhoto
                                    })
                                }}
                                className='bg-bgrButton  w-[160] h-[50px] rounded-[15px] justify-center items-center'>
                                <Text className='text-white text-xl font-[BentonSans-Bold] '>Next</Text>
                            </TouchableOpacity>
                        </View>
                }
            </ImageBackground>
        </SafeAreaView >
    )
}

export default SetLocation