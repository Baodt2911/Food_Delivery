import React, { useEffect, useState } from 'react'
import { View, Text, TextInput, ImageBackground, TouchableOpacity, KeyboardAvoidingView, Platform, Keyboard, Dimensions } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import Pattern from '../assets/images/Pattern1.png'
import BackIcon from '../assets/icons/back.svg'
import LocationIcon from '../assets/icons/location.svg'
const SetLocation = ({ navigation, route }) => {
    const {  phoneNumber, displayName, photoURL } = route.params
    const [textAddress, setTextAddress] = useState('')
    const [keyboardHeight, setKeyboardHeight] = useState(0);
    const windowHeight = Dimensions.get('window').height
    const ratioScreen = (keyboardHeight / windowHeight) * 100
    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', (event) => {
            setKeyboardHeight(event.endCoordinates.height)
        });
        const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
            setKeyboardHeight(0)
        });
        return () => {
            keyboardDidShowListener.remove();
            keyboardDidHideListener.remove();
        };
    }, []);
    return (
        <SafeAreaView className='flex-1'>
            <KeyboardAvoidingView className='flex-1' behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
                <ImageBackground className='flex-1 bg-white' source={Pattern} resizeMode='cover'>
                    <TouchableOpacity onPress={() => navigation.goBack()}
                        className='w-11 h-11 rounded-2xl bg-[#FFF6EF] items-center justify-center mt-10 ml-6' style={{ elevation: 1 }}>
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
                        <View className='flex-row items-center gap-x-4'>
                            <LocationIcon />
                            <TextInput className='w-full font-[BentonSans-Bold] text-base'
                                placeholder='Your Location'
                                onChangeText={(text) => setTextAddress(text)}
                            />
                        </View>
                        <TouchableOpacity className=' w-full h-[60] bg-white rounded-2xl justify-center items-center'>
                            <Text className='font-[BentonSans-Bold]  text-base'>Set Location</Text>
                        </TouchableOpacity>
                    </View>
                    {/* Next Button */}
                    < View className=' w-full  items-center absolute bottom-[60] left-0 right-0' style={{
                        bottom: keyboardHeight > 260 ? 20 : 60,
                        display: ratioScreen > 40 ? 'none' : 'flex'
                    }}>
                        <TouchableOpacity disabled={textAddress ? false : true} style={{ opacity: textAddress ? 1 : 0.7 }}
                            onPress={() => {
                                navigation.navigate('Success', {
                                     phoneNumber, displayName, photoURL,
                                    address: textAddress
                                })
                            }}
                            className='bg-bgrButton  w-[160] h-[50px] rounded-[15px] justify-center items-center'>
                            <Text className='text-white text-xl font-[BentonSans-Bold] '>Next</Text>
                        </TouchableOpacity>
                    </View>
                </ImageBackground>
            </KeyboardAvoidingView>
        </SafeAreaView >
    )
}

export default SetLocation