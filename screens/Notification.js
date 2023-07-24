import React, { useEffect, useState } from 'react'
import { View, Text, ImageBackground, TouchableOpacity, Platform } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import Pattern from '../assets/images/Pattern1.png'
import BackIcon from '../assets/icons/back.svg'
import CHECKED_ICON from '../assets/icons/checked.svg'
import MONEY_ICON from '../assets/icons/money.svg'
import X_ICON from '../assets/icons/X-button.svg'

const Notification = ({ navigation }) => {
    return (
        <SafeAreaView className='flex-1'>
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
                    <Text className='font-[BentonSans-Bold] text-2xl'>Notification</Text>
                </View>
                {/* Content */}
                <View style={{ marginHorizontal: 24, rowGap: 20, marginTop: 20 }}>
                    <View className='w-full h-[100] rounded-3xl flex-row items-center' style={{
                        borderWidth: 1,
                        borderColor: Platform.OS === 'ios' ? '#f4f4f4' : 'transparent',
                        backgroundColor: '#fff',
                        shadowColor: '#5a6ceacc',
                        elevation: 10,
                        paddingHorizontal: 25,
                        columnGap: 10,
                    }}>
                        <CHECKED_ICON />
                        {/* Title */}
                        <View className='w-[230]'>
                            <Text className='font-[BentonSans-Medium] text-base'>Your order has been taken by the driver</Text>
                            {/* Time */}
                            <Text className='font-[BentonSans-Regular] text-[#3B3B3B] opacity-30 mt-1'>Recently</Text>
                        </View>
                    </View>
                    <View className='w-full h-[100] rounded-3xl flex-row items-center' style={{
                        borderWidth: 1,
                        borderColor: Platform.OS === 'ios' ? '#f4f4f4' : 'transparent',
                        backgroundColor: '#fff',
                        shadowColor: '#5a6ceacc',
                        elevation: 10,
                        paddingHorizontal: 25,
                        columnGap: 10,
                    }}>
                        <MONEY_ICON />
                        {/* Title */}
                        <View className='w-[230]'>
                            <Text className='font-[BentonSans-Medium] text-base'>YTopup for $100 was successful</Text>
                            {/* Time */}
                            <Text className='font-[BentonSans-Regular] text-[#3B3B3B] opacity-30 mt-1'>10.00 Am</Text>
                        </View>
                    </View>
                    <View className='w-full h-[100] rounded-3xl flex-row items-center' style={{
                        borderWidth: 1,
                        borderColor: Platform.OS === 'ios' ? '#f4f4f4' : 'transparent',
                        backgroundColor: '#fff',
                        shadowColor: '#5a6ceacc',
                        elevation: 10,
                        paddingHorizontal: 25,
                        columnGap: 10,
                    }}>
                        <X_ICON />
                        {/* Title */}
                        <View className='w-[230]'>
                            <Text className='font-[BentonSans-Medium] text-base'>Your order has been canceled</Text>
                            {/* Time */}
                            <Text className='font-[BentonSans-Regular] text-[#3B3B3B] opacity-30 mt-1'>22 Juny 2021</Text>
                        </View>
                    </View>
                </View>
            </ImageBackground>
        </SafeAreaView >
    )
}

export default Notification