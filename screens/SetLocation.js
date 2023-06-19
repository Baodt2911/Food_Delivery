import React from 'react'
import { View, Text, TextInput, ImageBackground, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import Pattern from '../assets/images/Pattern1.png'
import BackIcon from '../assets/icons/back.svg'
const SetLocation = ({ navigation }) => {
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
                        <Text className='font-[BentonSans-Bold] text-2xl'>Fill in your bio to get started</Text>
                        <Text className='font-[BentonSans-Book] text-xs mt-5'>This data will be displayed in your account profile for security</Text>
                    </View>
                    {/* Form */}
                    <View className='gap-y-5 mt-5'>
                        {/* First Name */}
                        <View className='mx-4 rounded-3xl' style={{
                            borderWidth: 1,
                            borderColor: Platform.OS === 'ios' ? '#f4f4f4' : 'transparent',
                            backgroundColor: '#fff',
                            shadowColor: '#5a6cea66',
                            elevation: 30,
                        }}>
                            <TextInput className='pl-5  h-[60px] font-[BentonSans-Regular]'
                                placeholder='First Name' />
                        </View>
                        {/* Last Name */}
                        <View className='mx-4 rounded-3xl' style={{
                            borderWidth: 1,
                            borderColor: Platform.OS === 'ios' ? '#f4f4f4' : 'transparent',
                            backgroundColor: '#fff',
                            shadowColor: '#5a6cea66',
                            elevation: 30,
                        }}>
                            <TextInput className='pl-5  h-[60px] font-[BentonSans-Regular]'
                                placeholder='Last Name' />
                        </View>
                        {/* Phone Number */}
                        <View className='mx-4 rounded-3xl' style={{
                            borderWidth: 1,
                            borderColor: Platform.OS === 'ios' ? '#f4f4f4' : 'transparent',
                            backgroundColor: '#fff',
                            shadowColor: '#5a6cea66',
                            elevation: 30,
                        }}>
                            <TextInput className='pl-5  h-[60px] font-[BentonSans-Regular]'
                                placeholder='Moblie Number' keyboardType='numeric' />
                        </View>
                    </View>
                    {/* Next Button */}
                    <View className=' w-full  items-center absolute bottom-[60] left-0 right-0'>
                        <TouchableOpacity onPress={() => navigation.navigate('UploadPhoto')}
                            className='bg-bgrButton  w-[160] h-[50px] rounded-[15px] justify-center items-center'>
                            <Text className='text-white text-xl font-[BentonSans-Bold] '>Next</Text>
                        </TouchableOpacity>
                    </View>
                </ImageBackground>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

export default SetLocation