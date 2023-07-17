import React from 'react'
import { View, Text, ImageBackground, TouchableOpacity } from 'react-native'
import Pattern from '../assets/images/Pattern.png'
import Illustration from '../assets/images/Illustration_3.svg'
const ResetPasswordSuccess = ({ navigation }) => {
    return (
        <ImageBackground source={Pattern} resizeMode='cover' className='flex-1 bg-[#ffffff] justify-center items-center'>
            <View className='justify-center items-center'>
                <Illustration />
                <Text className='font-[BentonSans-Bold] text-3xl text-bgrButton mt-8'>Congrats!</Text>
                <Text className='font-[BentonSans-Bold] text-2xl mt-3'>Password reset succesful</Text>
            </View>
            <View className=' w-full  items-center absolute bottom-[60] left-0 right-0'>
                <TouchableOpacity onPress={() => navigation.navigate('Login')}
                    className='bg-bgrButton  w-[160] h-[50px] rounded-[15px] justify-center items-center'>
                    <Text className='text-white text-xl font-[BentonSans-Bold] '>Back</Text>
                </TouchableOpacity>
            </View>
        </ImageBackground>
    )
}

export default ResetPasswordSuccess