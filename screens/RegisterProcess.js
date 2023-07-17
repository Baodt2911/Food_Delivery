import React, { useEffect, useState } from 'react'
import { View, Text, TextInput, ImageBackground, TouchableOpacity, KeyboardAvoidingView, Platform, Keyboard, Dimensions, Alert } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import Pattern from '../assets/images/Pattern1.png'
import BackIcon from '../assets/icons/back.svg'
import { useNavigation } from '@react-navigation/native'
const RegisterProcess = () => {
    const navigation = useNavigation()
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [textPhone, setTextPhone] = useState('')
    const [isFirstName, setIsFirstName] = useState(false)
    const [isLastName, setIsLastName] = useState(false)
    const [isPhone, setIsPhone] = useState(false)
    const [isKeyboard, setIsKeyboard] = useState(false)
    const [keyboardHeight, setKeyboardHeight] = useState(0);
    const windowHeight = Dimensions.get('window').height
    const ratioScreen = (keyboardHeight / windowHeight) * 100
    const checkFirstName = (text) => {
        const regexFirstName = /^[A-Za-z]{2,10}$/
        if (regexFirstName.test(text)) {
            return true
        }
        return false
    }
    const checkLastName = (text) => {
        const regexLastName = /^[A-Za-z ]{3,15}$/
        if (regexLastName.test(text)) {
            return true
        }
        return false
    }
    const checkPhone = (text) => {
        const regexPhone = /^0\d{9}$/
        if (regexPhone.test(text)) {
            return true
        }
        return false
    }
    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', (event) => {
            setKeyboardHeight(event.endCoordinates.height)
            setIsKeyboard(true)
        });
        const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
            setKeyboardHeight(0)
            setIsKeyboard(false)
        });
        return () => {
            keyboardDidShowListener.remove();
            keyboardDidHideListener.remove();
        };
    }, []);
    return (
        <SafeAreaView className='flex-1'>
            <KeyboardAvoidingView
                className='flex-1' behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
                <ImageBackground className='flex-1 bg-white' source={Pattern} resizeMode='cover'>
                    <TouchableOpacity onPress={() => Alert.alert('Notification', 'You cannot exit without filling in the information', [
                        { text: 'OK', onPress: () => { } }
                    ])}
                        className='w-11 h-11 rounded-2xl bg-[#FFF6EF] items-center justify-center mt-10 ml-6' style={{ elevation: 1 }}>
                        <BackIcon />
                    </TouchableOpacity>
                    {
                        isKeyboard ? <></> :
                            /* Title */
                            <View className='pl-[25px] mr-[86px]  mt-5'>
                                <Text className='font-[BentonSans-Bold] text-2xl'>Fill in your bio to get started</Text>
                                <Text className='font-[BentonSans-Book] text-xs mt-5'>This data will be displayed in your account profile for security</Text>
                            </View>
                    }
                    {/* Form */}
                    <View className='gap-y-5 mt-5'>
                        {/* First Name */}
                        <View className='mx-4 rounded-3xl' style={{
                            borderWidth: 1,
                            borderColor: Platform.OS === 'ios' ?
                                isFirstName ? '#f4f4f4' :
                                    firstName ? 'red' : '#f4f4f4'
                                :
                                isFirstName ? 'transparent' :
                                    firstName ? 'red' : 'transparent'
                            ,
                            backgroundColor: '#fff',
                            shadowColor: '#5a6cea66',
                            elevation: 30,
                        }}>
                            <TextInput className='pl-5  h-[60px] font-[BentonSans-Regular]'
                                placeholder='First Name'
                                onChangeText={text => {
                                    setFirstName(text)
                                    checkFirstName(text) ? setIsFirstName(true) : setIsFirstName(false)
                                }}
                            />
                        </View>
                        {/* Last Name */}
                        <View className='mx-4 rounded-3xl' style={{
                            borderWidth: 1,
                            borderColor: Platform.OS === 'ios' ?
                                isLastName ? '#f4f4f4' :
                                    lastName ? 'red' : '#f4f4f4'
                                :
                                isLastName ? 'transparent' :
                                    lastName ? 'red' : 'transparent',
                            backgroundColor: '#fff',
                            shadowColor: '#5a6cea66',
                            elevation: 30,
                        }}>
                            <TextInput className='pl-5  h-[60px] font-[BentonSans-Regular]'
                                placeholder='Last Name'
                                onChangeText={text => {
                                    setLastName(text)
                                    checkLastName(text) ? setIsLastName(true) : setIsLastName(false)
                                }}
                            />
                        </View>
                        {/* Phone Number */}
                        <View className='mx-4 rounded-3xl' style={{
                            borderWidth: 1,
                            borderColor: Platform.OS === 'ios' ?
                                isPhone ? '#f4f4f4' :
                                    textPhone ? 'red' : '#f4f4f4'
                                :
                                isPhone ? 'transparent' :
                                    textPhone ? 'red' : 'transparent',
                            backgroundColor: '#fff',
                            shadowColor: '#5a6cea66',
                            elevation: 30,
                        }}>
                            <TextInput className='pl-5  h-[60px] font-[BentonSans-Regular]'
                                placeholder='Moblie Number'
                                keyboardType='numbers-and-punctuation'
                                onChangeText={text => {
                                    setTextPhone(text)
                                    checkPhone(text) ? setIsPhone(true) : setIsPhone(false)
                                }}
                            />
                        </View>
                    </View>
                    {/* Next Button  */}
                    <View className=' w-full  items-center absolute bottom-[60] left-0 right-0'
                        style={{
                            bottom: keyboardHeight > 260 ? 20 : 60,
                            display: ratioScreen > 40 ? 'none' : 'flex'
                        }}>
                        <TouchableOpacity disabled={!(isFirstName && isLastName && isPhone)}
                            style={{ opacity: !(isFirstName && isLastName && isPhone) ? 0.7 : 1 }}
                            onPress={() => navigation.navigate('UploadPhoto', {
                                displayName: firstName + ' ' + lastName,
                                phoneNumber: textPhone
                            })}
                            className='bg-bgrButton  w-[160] h-[50px] rounded-[15px] justify-center items-center'>
                            <Text className='text-white text-xl font-[BentonSans-Bold] '>Next</Text>
                        </TouchableOpacity>
                    </View>
                </ImageBackground>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

export default RegisterProcess