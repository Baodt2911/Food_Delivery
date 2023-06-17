import React, { useState } from 'react'
import { View, Text, Image, TextInput, KeyboardAvoidingView, TouchableOpacity } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import Logo from '../assets/icons/logo.svg'
import Pattern from '../assets/images/Pattern.svg'
const Login = () => {
    const [focusEmail, setFocusEmail] = useState(false)
    const [focusPassword, setFocusPassword] = useState(false)
    const [textEmail, setTextEmail] = useState('')
    const [textPassword, setTextPassword] = useState('')
    const handleFocusEmail = () => {
        setFocusEmail(true)
    }
    const handleBlurEmail = () => {
        setFocusEmail(false)
    }
    const handleFocusPassword = () => {
        setFocusPassword(true)
    }
    const handleBlurPassword = () => {
        setFocusPassword(false)
    }
    return (
        <SafeAreaView className='flex-1 bg-[#ffffff]' >
            <KeyboardAvoidingView
                className='flex-1 '
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
                {/* Logo */}
                <View className='relative'>
                    <Pattern width={'100%'} />
                    <View className='absolute items-center w-full  top-7 '>
                        <Logo />
                        {/* Name_Logo */}
                        <Text className=' text-[44px] font-bold  text-[#24C87C]'>FoodNinja</Text>
                        {/* description_logo */}
                        <Text className='text-[16px] font-semibold'>Deliever Favorite Food</Text>
                    </View>
                </View>
                {/* Form_Login */}
                <View className='-translate-y-12 w-full h-full bg-[#f5f5f54D] '>
                    <Text className='font-[BentonSans-Bold] text-2xl text-center mb-[40px] '>Login To Your Account</Text>
                    {/* Form_Input */}
                    <View className=' px-7  gap-3 '>
                        <TextInput className='w-full  h-12 px-6 font-[BentonSans-Regular]  rounded-[15px]' style={{ borderColor: focusEmail ? '#24C87C' : '#f4f4f4', borderWidth: 1 }}
                            placeholder='Email'
                            onChangeText={(text) => setTextEmail(text)}
                            value={textEmail}
                            onFocus={handleFocusEmail}
                            onBlur={handleBlurEmail}
                        />
                        <TextInput className='w-full h-12 px-6 font-[BentonSans-Regular]  rounded-[15px]'
                            style={{ borderColor: focusPassword ? '#24C87C' : '#f4f4f4', borderWidth: 1 }}
                            placeholder='Password'
                            onChangeText={(text) => setTextPassword(text)}
                            value={textPassword}
                            onFocus={handleFocusPassword}
                            onBlur={handleBlurPassword}
                        />
                    </View>
                    <Text className='font-[BentonSans-Bold] text-sm text-center mt-5 mb-7'>Or Continue With</Text>
                    {/* OR_Login */}
                    <View className='items-center'>
                        <View className='flex-row w-full justify-evenly'>
                            <TouchableOpacity className='w-[40%] h-[50px] flex-row justify-center items-center  bg-white border border-[#f4f4f4] rounded-[15px] '>
                                <Image
                                    className='w-6 h-6'
                                    source={require('../assets/icons/facebook.png')}
                                    resizeMode='contain'
                                />
                                <Text className='font-[BentonSans-Medium] text-base ml-2'>Facebook</Text>
                            </TouchableOpacity>
                            <TouchableOpacity className='w-[40%] h-[50px] flex-row justify-center items-center  bg-white border border-[#f4f4f4] rounded-[15px] '>
                                <Image
                                    className='w-6 h-6'
                                    source={require('../assets/icons/google.png')}
                                    resizeMode='contain'
                                />
                                <Text className='font-[BentonSans-Medium] text-base ml-2'>Google</Text>
                            </TouchableOpacity>
                        </View>
                        {/* Forgot_Password */}
                        <TouchableOpacity className='mt-5 mb-6'>
                            <Text className='font-[BentonSans-Medium] text-xs text-[#24C87C] underline'>Forgot Your Password?</Text>
                        </TouchableOpacity>
                        {/* ButtonLogin */}
                        <TouchableOpacity
                            className='bg-bgrButton w-[160px] h-[50px] rounded-[15px] justify-center items-center '
                            style={{ shadowColor: '#24C87C', elevation: 10 }}
                        >
                            <Text className='text-white text-[16px] font-[BentonSans-Bold]'>Login</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

export default Login