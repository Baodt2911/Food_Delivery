import React, { useState, useEffect, useContext } from 'react'
import { View, Text, Image, TextInput, TouchableOpacity, ImageBackground, Keyboard, Dimensions, ActivityIndicator } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { SafeAreaView } from 'react-native-safe-area-context'
import Logo from '../assets/icons/logo.svg'
import Pattern from '../assets/images/Pattern.png'
import MessageIcon from '../assets/icons/Message.svg'
import LockIcon from '../assets/icons/Lock.svg'
import { AuthContext } from '../context/AuthProvider'
const Login = ({ navigation }) => {
    const { login } = useContext(AuthContext)
    const [textEmail, setTextEmail] = useState('')
    const [textPassword, setTextPassword] = useState('')
    const [isEmail, setIsEmail] = useState(false)
    const [isPassword, setIsPassword] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const onLogin = async () => {
        setIsLoading(true)
        await login({ email: textEmail.toLowerCase(), password: textPassword })
        setIsLoading(false)
    }
    const checkEmail = (text) => {
        const regexEmail = /^[A-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[A-z0-9!#$%&'*+/=?^_`{|}~-]+)*@gmail\.com$/;
        return regexEmail.test(text)
    }
    const checkPassword = (text) => {
        const regexPassword = /^(?=.*[A-Z])(?=.*[a-zA-Z0-9]).{6,20}$/
        return regexPassword.test(text)
    }
    return (
        <SafeAreaView className='flex-1 bg-[#ffffff]' >
            <KeyboardAwareScrollView className='flex-1' showsVerticalScrollIndicator={false}>
                <ImageBackground className='flex-1' source={Pattern} resizeMode='cover'>
                    {/* Logo */}
                    <View className=' items-center ' style={{ flex: 2 }}>
                        <Logo />
                        <View>
                            {/* Name_Logo */}
                            <Text className='text-center text-[44px] font-bold  text-[#24C87C]'>FoodNinja</Text>
                            {/* description_logo */}
                            <Text className='text-[16px] font-semibold text-center'>Deliever Favorite Food</Text>
                        </View>
                    </View>
                    {/* Form_Login */}
                    <View style={{ flex: 4, backgroundColor: '#ffffff' }}>
                        <Text className='font-[BentonSans-Bold] text-2xl text-center mb-[40px] mt-5'>Login To Your Account</Text>
                        {/* Form_Input */}
                        <View className=' px-7  gap-3 '>
                            {/* Email */}
                            <View className='flex-row items-center  w-full h-12 gap-x-3 pr-16 font-[BentonSans-Regular]  rounded-[15px]'
                                style={{
                                    borderColor: isEmail ? '#f4f4f4' : textEmail ? 'red' : '#f4f4f4',
                                    borderWidth: 1,
                                    backgroundColor: '#fff',
                                    shadowColor: '#5a6cea66',
                                    elevation: 10,
                                }}>
                                <MessageIcon width={25} height={25} />
                                <TextInput className='w-[80%] h-full'
                                    placeholder='Email'
                                    onChangeText={(text) => {
                                        setTextEmail(text)
                                        checkEmail(text) ? setIsEmail(true) : setIsEmail(false)
                                    }}
                                    value={textEmail}
                                />
                            </View>
                            {/* Password */}
                            <View className='relative flex-row items-center  w-full h-12 gap-x-3 pr-16 font-[BentonSans-Regular]  rounded-[15px]'
                                style={{
                                    borderColor: isPassword ? '#f4f4f4' : textPassword ? 'red' : '#f4f4f4',
                                    borderWidth: 1,
                                    backgroundColor: '#fff',
                                    shadowColor: '#5a6cea66',
                                    elevation: 20,
                                }}>
                                <LockIcon width={25} height={25} />
                                <TextInput className='w-[80%] h-full'
                                    placeholder='Password'
                                    onChangeText={(text) => {
                                        setTextPassword(text)
                                        checkPassword(text) ? setIsPassword(true) : setIsPassword(false)
                                    }}
                                    value={textPassword}
                                    secureTextEntry={true}
                                />
                            </View>
                        </View>
                        <Text className='font-[BentonSans-Bold] text-sm text-center mt-5 mb-7'>Or Continue With</Text>
                        {/* OR_Login */}
                        <View className='items-center'>
                            <View className='flex-row w-full justify-evenly'>
                                {/* BtnFacebook */}
                                <TouchableOpacity className='w-[40%] h-[50px] flex-row justify-center items-center  bg-white border border-[#f4f4f4] rounded-[15px]' style={{
                                    backgroundColor: '#fff',
                                    shadowColor: '#5a6cea66',
                                    elevation: 20,
                                }}>
                                    <Image
                                        className='w-6 h-6'
                                        source={require('../assets/icons/facebook.png')}
                                        resizeMode='contain'
                                    />
                                    <Text className='font-[BentonSans-Medium] text-base ml-2'>Facebook</Text>
                                </TouchableOpacity>
                                {/* BntGoogle */}
                                <TouchableOpacity className='w-[40%] h-[50px] flex-row justify-center items-center  bg-white border border-[#f4f4f4] rounded-[15px]' style={{
                                    backgroundColor: '#fff',
                                    shadowColor: '#5a6cea66',
                                    elevation: 20,
                                }}>
                                    <Image
                                        className='w-6 h-6'
                                        source={require('../assets/icons/google.png')}
                                        resizeMode='contain'
                                    />
                                    <Text className='font-[BentonSans-Medium] text-base ml-2'>Google</Text>
                                </TouchableOpacity>
                            </View>
                            {/* Forgot_Password */}
                            <TouchableOpacity onPress={() => navigation.navigate('ViaMethodForgotPassword')}
                                className='mt-5 mb-6'>
                                <Text className='font-[BentonSans-Medium] text-xs text-[#24C87C] underline'>Forgot Your Password?</Text>
                            </TouchableOpacity>
                            {/* ButtonLogin */}
                            {
                                isLoading ? <ActivityIndicator color={"#24C87C"} /> :
                                    <TouchableOpacity onPress={() => onLogin()} disabled={!(isEmail && isPassword)}
                                        className='bg-bgrButton w-[160px] h-[50px] rounded-[15px] justify-center items-center '
                                        style={{
                                            shadowColor: '#24C87C',
                                            elevation: 10,
                                            opacity: (isEmail && isPassword) ? 1 : 0.7
                                        }}
                                    >
                                        <Text className='text-white text-[16px] font-[BentonSans-Bold]'>Login</Text>
                                    </TouchableOpacity>
                            }
                            {/* create account */}
                            <View className='flex-row items-center mt-3'>
                                <Text className='font-[BentonSans-Medium] text-xs opacity-30'> You aren't have account?</Text>
                                <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                                    <Text className='text-xs underline text-[#24C87C] ml-1 '>Register</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </ImageBackground>
            </KeyboardAwareScrollView>
        </SafeAreaView>
    )
}

export default Login