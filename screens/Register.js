import React, { useState } from 'react'
import { View, Text, TextInput, KeyboardAvoidingView, TouchableOpacity, ImageBackground } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import Logo from '../assets/icons/logo.svg'
import Pattern from '../assets/images/Pattern.png'
import UserIcon from '../assets/icons/Profile.svg'
import MessageIcon from '../assets/icons/Message.svg'
import LockIcon from '../assets/icons/Lock.svg'
const Register = ({ navigation }) => {
    const [textEmail, setTextEmail] = useState('')
    const [textPassword, setTextPassword] = useState('')
    const [textUsername, setTextUsername] = useState('')
    const [focusEmail, setFocusEmail] = useState(false)
    const [focusPassword, setFocusPassword] = useState(false)
    const [focusUsername, setFocusUsername] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    const [isKeepSignIn, setIsKeepSignIn] = useState(false)
    const [isEmailAbout, setIsEmailAbout] = useState(false)
    const handleFocusUsername = () => {
        setFocusUsername(true)
    }
    const handleBlurUsername = () => {
        setFocusUsername(false)
    }
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
    const handleShowPassword = () => {
        setShowPassword(!showPassword)
    }
    const handleCreateAccount = () => {
        navigation.navigate('RegisterProcess')
    }
    return (
        <SafeAreaView className='flex-1 bg-[#ffffff]' >
            <KeyboardAvoidingView
                className='flex-1'
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
                <ImageBackground className='flex-1' source={Pattern} resizeMode='cover'>
                    {/* Logo */}
                    <View style={{ flex: 2, alignItems: 'center' }}>
                        <Logo />
                        {/* Name_Logo */}
                        <Text className=' text-[44px] font-bold  text-[#24C87C]'>FoodNinja</Text>
                        {/* description_logo */}
                        <Text className='text-[16px] font-semibold'>Deliever Favorite Food</Text>
                    </View>
                    {/* Form_Register*/}
                    <View style={{ flex: 4, backgroundColor: '#ffffff' }}>
                        <Text className='font-[BentonSans-Bold] text-2xl text-center mb-[40px] '>Sign Up For Free </Text>
                        {/* Form_Input */}
                        <View className=' px-7  gap-3 '>
                            {/* Username */}
                            <View className='flex-row items-center  w-full h-12 gap-x-3 pr-16 font-[BentonSans-Regular]  rounded-[15px]'
                                style={{
                                    borderColor: focusUsername ? '#24C87C' : '#f4f4f4', borderWidth: 1,
                                    backgroundColor: '#fff',
                                    shadowColor: '#5a6cea66',
                                    elevation: 10,
                                }}>
                                <UserIcon width={25} height={25} />
                                <TextInput className='w-[80%] h-full'
                                    placeholder='Anamwp . . |'
                                    onChangeText={text => setTextUsername(text)}
                                    value={textUsername}
                                    onFocus={handleFocusUsername}
                                    onBlur={handleBlurUsername}
                                />
                            </View>
                            {/* Email */}
                            <View className='flex-row items-center  w-full h-12 gap-x-3 pr-16 font-[BentonSans-Regular]  rounded-[15px]'
                                style={{
                                    borderColor: focusEmail ? '#24C87C' : '#f4f4f4', borderWidth: 1, backgroundColor: '#fff',
                                    shadowColor: '#5a6cea66',
                                    elevation: 10,
                                }}>
                                <MessageIcon width={25} height={25} />
                                <TextInput className='w-[80%] h-full'
                                    placeholder='Email'
                                    onChangeText={(text) => setTextEmail(text)}
                                    value={textEmail}
                                    onFocus={handleFocusEmail}
                                    onBlur={handleBlurEmail}
                                />
                            </View>
                            {/* Password */}
                            <View className='relative flex-row items-center  w-full h-12 gap-x-3 pr-16 font-[BentonSans-Regular]  rounded-[15px]'
                                style={{
                                    borderColor: focusPassword ? '#24C87C' : '#f4f4f4', borderWidth: 1, backgroundColor: '#fff',
                                    shadowColor: '#5a6cea66',
                                    elevation: 10,
                                }}>
                                <LockIcon width={25} height={25} />
                                <TextInput className='w-[80%] h-full'
                                    placeholder='Password'
                                    onChangeText={(text) => setTextPassword(text)}
                                    value={textPassword}
                                    onFocus={handleFocusPassword}
                                    onBlur={handleBlurPassword}
                                    secureTextEntry={showPassword}
                                />
                                <TouchableOpacity className='absolute right-3  -translate-x-1/2' onPress={handleShowPassword}>
                                    <Text className='font-[BentonSans-Regular] underline'>{showPassword ? 'show' : 'hidden'}</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View className='items-center mt-5'>
                            {/* Checked */}
                            <View className='px-7 w-full items-start gap-y-2'>
                                <TouchableOpacity className='flex-row items-center' onPress={() => setIsKeepSignIn(!isKeepSignIn)}>
                                    {/* Checkbox */}
                                    <View className='w-5 h-5 border border-[#dadada80] rounded-full justify-center items-center' style={{ backgroundColor: isKeepSignIn ? '#24C87C' : 'transparent' }}>
                                        {isKeepSignIn ?
                                            <Text className='text-white  font-extrabold'>✓</Text> : <></>}
                                    </View>
                                    <Text className='text-bgrButton ml-1 text-xs font-[BentonSans-Book]'>Keep Me Signed In</Text>
                                </TouchableOpacity>
                                <TouchableOpacity className='flex-row items-center' onPress={() => setIsEmailAbout(!isEmailAbout)}>
                                    {/* Checkbox */}
                                    <View className='w-5 h-5 border border-[#dadada80] rounded-full justify-center items-center' style={{ backgroundColor: isEmailAbout ? '#24C87C' : 'transparent' }}>
                                        {isEmailAbout ?
                                            <Text className='text-white  font-extrabold'>✓</Text> : <></>}
                                    </View>
                                    <Text className='text-bgrButton ml-1 text-xs font-[BentonSans-Book]'>Email Me About Special Pricing</Text>
                                </TouchableOpacity>
                            </View>
                            {/* ButtonRegister */}
                            <TouchableOpacity onPress={handleCreateAccount}
                                className='bg-bgrButton mt-11 w-[160px] h-[50px] rounded-[15px] justify-center items-center '
                                style={{ shadowColor: '#24C87C', elevation: 10 }}
                            >
                                <Text className='text-white text-[16px] font-[BentonSans-Bold]'>Create Account</Text>
                            </TouchableOpacity>
                            {/* already account? */}
                            <TouchableOpacity className='mt-3' onPress={() => navigation.navigate('Login')}>
                                <Text className='text-bgrButton underline text-center text-xs font-[BentonSans-Medium]'>already have an account?</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ImageBackground>
            </KeyboardAvoidingView>
        </SafeAreaView >
    )
}

export default Register