import React, { useEffect, useState } from 'react'
import { View, Text, TextInput, KeyboardAvoidingView, TouchableOpacity, ImageBackground, Keyboard, Dimensions, Platform, ActivityIndicator, Alert } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import Pattern from '../assets/images/Pattern1.png'
import BackIcon from '../assets/icons/back.svg'
import { API_URL } from '@env'
export default function ResetPassword({ navigation, route }) {
    const { sendTo, method } = route.params
    const [showNewPassword, setShowNewPassword] = useState(true)
    const [showConfirmPassword, setShowConfirmPassword] = useState(true)
    const [textNewPassword, setTextNewPassword] = useState('')
    const [textConfirmPassword, setTextConfirmPassword] = useState('')
    const [isNewPassword, setIsNewPassword] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const onResetPassword = async () => {
        try {
            setIsLoading(true)
            const res = await fetch(API_URL + 'auth/reset-password', {
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json",
                },
                body: method === 'email-code' ? JSON.stringify({ email: sendTo, phoneNumber: '', newPassword: textNewPassword }) : JSON.stringify({ email: '', phoneNumber: sendTo, newPassword: textNewPassword })
            })
            const text = await res.json()
            if (!res.ok) {
                setIsLoading(false)
                return Alert.alert('Notification', text.message)
            }
            setIsLoading(false)
            navigation.navigate('ResetPasswordSuccess')
        } catch (error) {
            console.log('ResetPassword', error);
            setIsLoading(false)
        }
    }
    const checkNewPassword = (text) => {
        const regexPassword = /^(?=.*[A-Z])(?=.*[a-zA-Z0-9]).{6,20}$/
        return regexPassword.test(text)
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
                        <Text className='font-[BentonSans-Bold] text-2xl'>Reset your password here</Text>
                        <Text className='font-[BentonSans-Book] text-xs mt-5'>Select which contact details should we use to reset your password</Text>
                    </View>
                    {/* Content */}
                    <View className='mx-5 mt-5'>
                        {/* New password */}
                        <View className='relative flex-row items-center rounded-2xl h-[60]' style={
                            {
                                borderWidth: 1,
                                borderColor: Platform.OS === 'ios' ?
                                    isNewPassword ? '#f4f4f4' :
                                        textNewPassword ? 'red' : '#f4f4f4'
                                    :
                                    isNewPassword ? 'transparent' :
                                        textNewPassword ? 'red' : 'transparent',
                                backgroundColor: '#ffffff',
                                shadowColor: '#5a6cea80',
                                elevation: 20,
                            }}>
                            <TextInput className='text-sm font-[BentonSans-Regular] w-full h-full pl-5'
                                placeholder='New Password'
                                maxLength={20}
                                secureTextEntry={showNewPassword}
                                value={textNewPassword}
                                onChangeText={(text) => {
                                    setTextNewPassword(text)
                                    checkNewPassword(text) ? setIsNewPassword(true) : setIsNewPassword(false)
                                }}
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
                                borderColor: Platform.OS === 'ios' ?
                                    textConfirmPassword === textNewPassword ? '#f4f4f4' :
                                        textConfirmPassword ? 'red' : '#f4f4f4'
                                    :
                                    textConfirmPassword === textNewPassword ? 'transparent' :
                                        textConfirmPassword ? 'red' : 'transparent',
                                backgroundColor: '#ffffff',
                                shadowColor: '#5a6cea80',
                                elevation: 20,
                            }}>
                            <TextInput className='text-sm font-[BentonSans-Regular] w-full h-full pl-5'
                                placeholder='Confirm Password'
                                maxLength={20}
                                secureTextEntry={showConfirmPassword}
                                value={textConfirmPassword}
                                onChangeText={(text) => setTextConfirmPassword(text)}
                            />
                            <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                                className='absolute right-5'>
                                <Text className='font-[BentonSans-Regular] text-xs text-gray-500 underline'>{showConfirmPassword ? 'show' : 'hidden'}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                {/* Next Button */}
                <View className='flex-1 items-center justify-center'>
                    {
                        isLoading ? <ActivityIndicator color={'#24C87C'} /> :
                            <TouchableOpacity onPress={onResetPassword} disabled={!(isNewPassword && textConfirmPassword === textNewPassword)} style={{ opacity: isNewPassword && textConfirmPassword === textNewPassword ? 1 : 0.7 }}
                                className='bg-bgrButton  w-[160] h-[50px] rounded-[15px] justify-center items-center'>
                                <Text className='text-white text-xl font-[BentonSans-Bold] '>Next</Text>
                            </TouchableOpacity>
                    }
                </View>
            </ImageBackground>
        </SafeAreaView>
    )
}