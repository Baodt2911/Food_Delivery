import React, { useState, useEffect, useContext } from 'react'
import { View, Text, TextInput, KeyboardAvoidingView, TouchableOpacity, ImageBackground, Keyboard } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import Logo from '../assets/icons/logo.svg'
import Pattern from '../assets/images/Pattern.png'
import MessageIcon from '../assets/icons/Message.svg'
import LockIcon from '../assets/icons/Lock.svg'
import { AuthContext } from '../context/AuthProvider'
const Register = ({ navigation }) => {
    const { register } = useContext(AuthContext)
    const [textEmail, setTextEmail] = useState('')
    const [textPassword, setTextPassword] = useState('')
    const [textConfirmPassword, setTextConfirmPassword] = useState('')
    const [showPassword, setShowPassword] = useState(true)
    const [showConfirmPassword, setShowConfirmPassword] = useState(true)
    const [isKeepSignIn, setIsKeepSignIn] = useState(false)
    const [isEmailAbout, setIsEmailAbout] = useState(false)
    const [isKeyboard, setIsKeyboard] = useState(false)
    const [isEmail, setIsEmail] = useState(false)
    const [isPassword, setIsPassword] = useState(false)
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
    const checkEmail = (text) => {
        const regexEmail = /^[A-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[A-z0-9!#$%&'*+/=?^_`{|}~-]+)*@gmail\.com$/;
        return regexEmail.test(text)
    }
    const checkPassword = (text) => {
        const regexPassword = /^(?=.*[A-Z])(?=.*[a-zA-Z0-9]).{6,20}$/
        return regexPassword.test(text)
    }
    const handleShowPassword = () => {
        setShowPassword(!showPassword)
    }
    const handleShowConfirmPassword = () => {
        setShowConfirmPassword(!showConfirmPassword)
    }
    const handleCreateAccount = () => {
        register({ email: textEmail.toLowerCase(), password: textPassword })
    }
    return (
        <SafeAreaView className='flex-1 bg-[#ffffff]' >
            <KeyboardAvoidingView
                className='flex-1'
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
                <ImageBackground className='flex-1' source={Pattern} resizeMode='cover'>
                    {/* Logo */}
                    <View style={{ flex: 2, alignItems: 'center' }}>
                        {
                            isKeyboard ? <></> :
                                <>
                                    <Logo />
                                    <View>
                                        {/* Name_Logo */}
                                        <Text className='text-center text-[44px] font-bold  text-[#24C87C]'>FoodNinja</Text>
                                        {/* description_logo */}
                                        <Text className='text-[16px] font-semibold text-center'>Deliever Favorite Food</Text>
                                    </View>
                                </>
                        }
                    </View>
                    {/* Form_Register*/}
                    <View style={{ flex: 4, backgroundColor: '#ffffff' }}>
                        <Text className='font-[BentonSans-Bold] text-2xl text-center mb-[40px] '>Sign Up For Free </Text>
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
                                    elevation: 10,
                                }}>
                                <LockIcon width={25} height={25} />
                                <TextInput className='w-[80%] h-full'
                                    placeholder='Password'
                                    onChangeText={(text) => {
                                        setTextPassword(text)
                                        checkPassword(text) ? setIsPassword(true) : setIsPassword(false)
                                    }}
                                    value={textPassword}
                                    secureTextEntry={showPassword}
                                />
                                <TouchableOpacity className='absolute right-3  -translate-x-1/2' onPress={handleShowPassword}>
                                    <Text className='font-[BentonSans-Regular] underline text-xs text-gray-500'>{showPassword ? 'show' : 'hidden'}</Text>
                                </TouchableOpacity>
                            </View>
                            {/*Confirm Password */}
                            <View className='relative flex-row items-center  w-full h-12 gap-x-3 pr-16 font-[BentonSans-Regular]  rounded-[15px]'
                                style={{
                                    borderColor: textPassword === textConfirmPassword ? '#f4f4f4' : textConfirmPassword ? 'red' : '#f4f4f4',
                                    borderWidth: 1,
                                    backgroundColor: '#fff',
                                    shadowColor: '#5a6cea66',
                                    elevation: 10,
                                }}>
                                <LockIcon width={25} height={25} />
                                <TextInput className='w-[80%] h-full'
                                    placeholder='Confirm Password'
                                    onChangeText={(text) => {
                                        setTextConfirmPassword(text)
                                    }}
                                    value={textConfirmPassword}
                                    secureTextEntry={showConfirmPassword}
                                />
                                <TouchableOpacity className='absolute right-3  -translate-x-1/2' onPress={handleShowConfirmPassword}>
                                    <Text className='font-[BentonSans-Regular] underline text-xs text-gray-500'>{showConfirmPassword ? 'show' : 'hidden'}</Text>
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
                            <TouchableOpacity onPress={handleCreateAccount} disabled={!(isEmail && textPassword === textConfirmPassword && isPassword)}
                                className='bg-bgrButton mt-11 w-[160px] h-[50px] rounded-[15px] justify-center items-center '
                                style={{
                                    shadowColor: '#24C87C',
                                    elevation: 10,
                                    opacity: !(isEmail && textPassword === textConfirmPassword && isPassword) ? 0.7 : 1
                                }}
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