import React from 'react'
import { View, Text, KeyboardAvoidingView, ImageBackground, TouchableOpacity, Platform } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import Pattern from '../assets/images/Pattern1.png'
import BackIcon from '../assets/icons/back.svg'
import SMSIcon from '../assets/icons/SMS.svg'
import EmailIcon from '../assets/icons/Email.svg'
const ViaMethodForgotPassword = ({ navigation }) => {
    const formatPhoneNumber = (phoneNumber) => {
        const lastFourDigits = phoneNumber.slice(-4);
        const maskedDigits = '*'.repeat(3);
        const formattedNumber = maskedDigits + '  ' + maskedDigits + '  ' + lastFourDigits;
        return formattedNumber
    }
    const formatEmail = (email) => {
        const lastStr = email.split("@")[1]
        return lastStr
    }
    return (
        <SafeAreaView className='flex-1'>
            <KeyboardAvoidingView className='flex-1' behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
                <ImageBackground className='flex-1 bg-white' source={Pattern} resizeMode='cover'>
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
                        <Text className='font-[BentonSans-Book] text-xs mt-5'>Select which contact details should we use to reset your password</Text>
                    </View>
                    {/* Content */}
                    <View className='mx-5'>
                        {/* Verifi SMS */}
                        <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword', { method: 'sms-code' })}
                            className='mt-5 flex-row items-center rounded-2xl h-24 pl-5 gap-x-3' style={
                                {
                                    borderWidth: 1,
                                    borderColor: Platform.OS === 'ios' ? '#f4f4f4' : 'transparent',
                                    backgroundColor: '#ffffff',
                                    shadowColor: '#5a6ceacc',
                                    elevation: 30,
                                }}>
                            <SMSIcon />
                            <View className='gap-y-3'>
                                <Text className='text-[#828282] font-[BentonSans-Regular] text-[16px]'>Via SMS:</Text>
                                <View>
                                    <Text className='font-[BentonSans-Medium] tracking-[6] text-[16px]'>{formatPhoneNumber('0987654321')}</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                        {/* Verifi Email */}
                        <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword', { method: 'email-code' })}
                            className=' mt-5 flex-row items-center rounded-2xl h-20 pl-5 gap-x-3' style={
                                {
                                    borderWidth: 1,
                                    borderColor: Platform.OS === 'ios' ? '#f4f4f4' : 'transparent',
                                    backgroundColor: '#ffffff',
                                    shadowColor: '#5a6ceacc',
                                    elevation: 30,
                                }}>
                            <EmailIcon />
                            <View className='gap-y-3 '>
                                <Text className='text-[#828282] font-[BentonSans-Regular] text-[16px]'>Via Email:</Text>
                                <View className='flex-row items-center gap-x-5 '>
                                    <Text className='tracking-[6] font-[BentonSans-Medium] text-[16px]'>****</Text>
                                    <Text className='font-[BentonSans-Regular] text-[16px]'>{formatEmail("Baodt2911@gmail.com")}</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    </View>
                </ImageBackground>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

export default ViaMethodForgotPassword