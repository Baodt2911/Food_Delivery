import React, { useEffect, useState, useRef } from 'react'
import { View, Text, KeyboardAvoidingView, ImageBackground, TouchableOpacity, Platform, TextInput, Alert, ActivityIndicator } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import Pattern from '../assets/images/Pattern1.png'
import BackIcon from '../assets/icons/back.svg'
import { API_URL } from '@env'
const ExpiresTime = ({ sendTo, method }) => {
    const [expiredCode, setExpiredCode] = useState(60)
    useEffect(() => {
        const expiredTime = setInterval(() => {
            setExpiredCode(prev => prev - 1)
        }, 1000)
        if (expiredCode === 0) {
            clearInterval(expiredTime);
        }
        return () => {
            clearInterval(expiredTime);
        };
    }, [expiredCode])
    const onSendToOTP = async () => {
        try {
            const res = await fetch(API_URL + `verification/${method}`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                body: method === 'email-code' ? JSON.stringify({ email: sendTo }) : JSON.stringify({ phoneNumber: sendTo })
            })
            const text = await res.json()
            if (!res.ok) {
                return Alert.alert('Notification', text.message)
            }
            setExpiredCode(60)
        } catch (error) {
            console.log('Send OTP', error);
        }
    }
    return (
        <View>
            <Text className='font-[BentonSans-Book] text-xs mt-5'>Code send to <Text className='font-[BentonSans-Medium]'>{sendTo}</Text> . This code will expired in <Text className='font-[BentonSans-Medium]'>{expiredCode}s</Text></Text>
            <TouchableOpacity onPress={onSendToOTP} disabled={!(expiredCode === 0)} style={{ opacity: expiredCode === 0 ? 1 : 0.7 }} className='mt-2'>
                <Text className='font-[BentonSans-Bold] underline text-xs'>Send to OTP</Text>
            </TouchableOpacity>
        </View>
    )
}
const VerificationCode = ({ route, navigation }) => {
    const { sendTo, method } = route.params
    const [isLoading, setIsLoading] = useState(false)
    const [otp, setOtp] = useState({ 1: '', 2: '', 3: '', 4: '' })
    const firstInput = useRef()
    const secondInput = useRef()
    const thirdInput = useRef()
    const fourthInput = useRef()
    const OTPValue = Object.values(otp).join('')
    const onVerificationCode = async () => {
        try {
            setIsLoading(true)
            const res = await fetch(API_URL + 'verification/otp', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                body: method === 'email-code' ? JSON.stringify({ email: sendTo, phone: '', otp: OTPValue }) : JSON.stringify({ email: '', phone: sendTo, otp: OTPValue })
            })
            const text = await res.json()
            if (!res.ok) {
                setIsLoading(false)
                Alert.alert('Notification', text.message)
                return
            }
            navigation.navigate('ResetPassword', { sendTo, method })
        } catch (error) {
            Alert.alert('Notification', error.message)
            setIsLoading(false)
        }
    }
    useEffect(() => {
        if (OTPValue?.length === 4) {
            onVerificationCode()
        }
    }, [otp])
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
                    <View className='pl-[30px] mr-[86px]  mt-5'>
                        <Text className='font-[BentonSans-Bold] text-2xl'>Enter 4-digit {'\n'}
                            Verification code</Text>
                        <ExpiresTime sendTo={sendTo} method={method} />
                    </View>
                    {/* Input Code */}
                    <View className=' mt-5 mx-5  rounded-2xl h-24 py-5 px-10 ' style={
                        {
                            borderWidth: 1,
                            borderColor: Platform.OS === 'ios' ? '#f4f4f4' : 'transparent',
                            backgroundColor: '#ffffff',
                            shadowColor: '#5a6ceacc',
                            elevation: 30,
                        }}>
                        <View className='flex-row items-center gap-x-5 h-full'>
                            <TextInput className='text-4xl font-[BentonSans-Medium] h-full text-center ' style={{
                                flex: 1,
                                borderBottomWidth: 2,
                                borderColor: otp[1] ? 'transparent' : '#dadada'
                            }}
                                maxLength={1} keyboardType='number-pad'
                                ref={firstInput}
                                onChangeText={text => {
                                    setOtp({ ...otp, 1: text })
                                    text && secondInput.current.focus()
                                }}
                            />
                            <TextInput className='text-4xl font-[BentonSans-Medium] h-full text-center '
                                style={{
                                    flex: 1,
                                    borderBottomWidth: 2,
                                    borderColor: otp[2] ? 'transparent' : '#dadada'
                                }}
                                maxLength={1} keyboardType='number-pad'
                                ref={secondInput}
                                onChangeText={text => {
                                    setOtp({ ...otp, 2: text })
                                    text ? thirdInput.current.focus() : firstInput.current.focus()
                                }}
                            />
                            <TextInput className='text-4xl font-[BentonSans-Medium] h-full text-center '
                                style={{
                                    flex: 1,
                                    borderBottomWidth: 2,
                                    borderColor: otp[3] ? 'transparent' : '#dadada'
                                }}
                                maxLength={1} keyboardType='number-pad'
                                ref={thirdInput}
                                onChangeText={text => {
                                    setOtp({ ...otp, 3: text })
                                    text ? fourthInput.current.focus() : secondInput.current.focus()
                                }}
                            />
                            <TextInput className='text-4xl font-[BentonSans-Medium] h-full text-center '
                                style={{
                                    flex: 1,
                                    borderBottomWidth: 2,
                                    borderColor: otp[4] ? 'transparent' : '#dadada'
                                }}
                                maxLength={1} keyboardType='number-pad'
                                ref={fourthInput}
                                onChangeText={text => {
                                    setOtp({ ...otp, 4: text })
                                    !text && thirdInput.current.focus()
                                }}
                            />
                        </View>
                    </View>
                </View>
                {/* Next Button */}
                <View className='flex-1 items-center justify-center'>
                    {
                        isLoading ? <ActivityIndicator color={'#24C87C'} /> :
                            <TouchableOpacity disabled={!(OTPValue?.length === 4)}
                                style={{ opacity: OTPValue?.length === 4 ? 1 : 0.7 }}
                                onPress={onVerificationCode}
                                className='bg-bgrButton  w-[160] h-[50px] rounded-[15px] justify-center items-center'>
                                <Text className='text-white text-xl font-[BentonSans-Bold] '>Next</Text>
                            </TouchableOpacity>
                    }
                </View>
            </ImageBackground>
        </SafeAreaView>
    )
}

export default VerificationCode