import React, { useEffect, useState } from 'react'
import { View, Text, TextInput, KeyboardAvoidingView, TouchableOpacity, ImageBackground, Keyboard, Dimensions } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import Pattern from '../assets/images/Pattern1.png'
import BackIcon from '../assets/icons/back.svg'
export default function ResetPassword({ navigation }) {
    const [showNewPassword, setShowNewPassword] = useState(true)
    const [showConfirmPassword, setShowConfirmPassword] = useState(true)
    const [keyboardHeight, setKeyboardHeight] = useState(0);
    const windowHeight = Dimensions.get('window').height
    const ratioScreen = (keyboardHeight / windowHeight) * 100
    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', (event) => {
            const { height } = event.endCoordinates;
            setKeyboardHeight(height)
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
                        <Text className='font-[BentonSans-Bold] text-2xl'>Reset your password here</Text>
                        <Text className='font-[BentonSans-Book] text-xs mt-5'>Select which contact details should we use to reset your password</Text>
                    </View>
                    {/* Content */}
                    <View className='mx-5 mt-5'>
                        {/* New password */}
                        <View className='relative flex-row items-center rounded-2xl h-[60]' style={
                            {
                                borderWidth: 1,
                                borderColor: Platform.OS === 'ios' ? '#f4f4f4' : 'transparent',
                                backgroundColor: '#ffffff',
                                shadowColor: '#5a6cea80',
                                elevation: 20,
                            }}>
                            <TextInput className='text-sm font-[BentonSans-Regular] w-full h-full pl-5'
                                placeholder='New Password'
                                maxLength={20}
                                secureTextEntry={showNewPassword}
                            />
                            <TouchableOpacity onPress={() => setShowNewPassword(!showNewPassword)}
                                className='absolute right-5'>
                                <Text className='font-[BentonSans-Regular] text-xs text-gray-500 underline'>{showNewPassword ? 'show' : 'hidden'}</Text>
                            </TouchableOpacity>
                        </View>
                        {/* Confirm Password */}
                        <View className='relative flex-row items-center rounded-2xl h-[60] mt-5' style={
                            {
                                borderWidth: 1,
                                borderColor: Platform.OS === 'ios' ? '#f4f4f4' : 'transparent',
                                backgroundColor: '#ffffff',
                                shadowColor: '#5a6cea80',
                                elevation: 20,
                            }}>
                            <TextInput className='text-sm font-[BentonSans-Regular] w-full h-full pl-5'
                                placeholder='Confirm Password'
                                maxLength={20}
                                secureTextEntry={showConfirmPassword}
                            />
                            <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                                className='absolute right-5'>
                                <Text className='font-[BentonSans-Regular] text-xs text-gray-500 underline'>{showConfirmPassword ? 'show' : 'hidden'}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    {/* Next Button */}
                    <View className=' w-full  items-center absolute  left-0 right-0' style={{
                        bottom: keyboardHeight > 260 ? 15 : 60,
                        display: ratioScreen > 40 ? 'none' : 'flex'
                    }}>
                        <TouchableOpacity onPress={() => { navigation.navigate('ResetPasswordSuccess') }}
                            className='bg-bgrButton  w-[160] h-[50px] rounded-[15px] justify-center items-center'>
                            <Text className='text-white text-xl font-[BentonSans-Bold] '>Next</Text>
                        </TouchableOpacity>
                    </View>
                </ImageBackground>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}