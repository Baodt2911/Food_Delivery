import React, { useState } from 'react'
import { View, Text, KeyboardAvoidingView, ImageBackground, TouchableOpacity, Platform, TextInput, ActivityIndicator, Alert } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import Pattern from '../assets/images/Pattern1.png'
import BackIcon from '../assets/icons/back.svg'
import { API_URL } from '@env'
const ForgotPassword = ({ route, navigation }) => {
    const { method } = route.params
    const [textInput, setTextInput] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const onSendOTP = async () => {
        try {
            setIsLoading(true)
            const res = await fetch(API_URL + `verification/${method}`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                body: method === 'email-code' ? JSON.stringify({ email: textInput }) : JSON.stringify({ phoneNumber: textInput })
            })
            const text = await res.json()
            if (!res.ok) {
                setIsLoading(false)
                return Alert.alert('Notification', text.message)
            }
            setIsLoading(false)
            navigation.navigate('Verification', { sendTo: textInput, method })
        } catch (error) {
            console.log('Send OTP', error);
            setIsLoading(false)
        }
    }
    return (
        <SafeAreaView className='flex-1'>
            <KeyboardAvoidingView className='flex-1' behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
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
                            <Text className='font-[BentonSans-Bold] text-2xl'>Forgot password?</Text>
                            <Text className='font-[BentonSans-Book] text-xs mt-5'>Enter your information in the box to retrieve your password</Text>
                        </View>
                        {/* Content */}
                        <View className='mx-4 rounded-3xl mt-5' style={{
                            borderWidth: 1,
                            borderColor: Platform.OS === 'ios' ? '#f4f4f4' : 'transparent',
                            backgroundColor: '#fff',
                            shadowColor: '#5a6cea66',
                            elevation: 30,
                        }}>
                            <TextInput className='pl-5  h-[60px] font-[BentonSans-Regular]'
                                placeholder={method === 'sms-code' ? ' Enter your phone number' : 'Enter your email'}
                                keyboardType={method === 'sms-code' ? 'number-pad' : 'email-address'}
                                value={textInput}
                                onChangeText={(text) => setTextInput(text)}
                            />
                        </View>
                    </View>
                    {/* Next Button */}
                    < View className='flex-1 items-center justify-center' >
                        {isLoading ? <ActivityIndicator color={'#24C87C'} /> :
                            <TouchableOpacity disabled={!textInput} style={{ opacity: !!textInput ? 1 : 0.7 }}
                                onPress={onSendOTP}
                                className='bg-bgrButton  w-[160] h-[50px] rounded-[15px] justify-center items-center'>
                                <Text className='text-white text-xl font-[BentonSans-Bold] '>Next</Text>
                            </TouchableOpacity>}
                    </View>
                </ImageBackground>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

export default ForgotPassword