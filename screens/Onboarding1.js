import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import Illustration_1 from '../assets/images/Illustration_1.svg'
const Onboarding1 = ({ navigation }) => {
    return (
        <SafeAreaView className='flex-1 items-center '>
            <Illustration_1 />
            <View className='gap-[20] w-[65%]'>
                <Text className='font-[BentonSans-Bold] text-[24px]  text-center leading-8'>Find your  Comfort Food here</Text>
                <Text className='font-[BentonSans-Book] text-[12px]  text-center leading-5'>Here You Can find a chef or dish for every taste and color. Enjoy!</Text>
            </View>
            <TouchableOpacity onPress={() => navigation.navigate('Onboarding2')}
                className='bg-bgrButton w-[160px] h-[50px] rounded-[15px] justify-center items-center mt-[40px]'>
                <Text className='text-white text-xl font-[BentonSans-Bold] '>Next</Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
}

export default Onboarding1