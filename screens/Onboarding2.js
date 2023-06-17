import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Illustration_2 from '../assets/images/Illustration_2.svg'
const Onboarding2 = ({ navigation }) => {
    return (
        <SafeAreaView className='flex-1 items-center justify-center'>
            <Illustration_2 />
            <View className='gap-[20] w-[85%]'>
                <Text className='font-[BentonSans-Bold] text-[24px]  text-center leading-8'>Food Ninja is Where Your Comfort Food Lives</Text>
                <Text className='font-[BentonSans-Book] text-[12px]  text-center leading-5'>Enjoy a fast and smooth food delivery at your doorstep</Text>
            </View>
            <TouchableOpacity onPress={() => navigation.navigate('Register')}
                className='bg-bgrButton w-[160px] h-[50px] rounded-[15px] justify-center items-center mt-[40px]'>
                <Text className='text-white text-xl font-[BentonSans-Bold] '>Next</Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
}

export default Onboarding2