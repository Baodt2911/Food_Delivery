import React from 'react'
import { View, Text, Image, ImageBackground, TouchableOpacity } from 'react-native'
import Mask from '../../assets/images/Mask.png'
import Default_LOGO from '../../assets/icons/dish.png'
import { URL_IMAGE } from '@env'

const CardVoucher = ({ _id, url }) => {
    return (
        <ImageBackground source={Mask} resizeMode='cover' className='w-[325] h-full bg-bgrButton rounded-xl flex-row'>
            {/* Image Dishes */}
            <View className='flex-1 justify-center items-center '>
                <Image className='w-[100] h-[100] rounded-full'
                    source={url ? { uri: URL_IMAGE + url + '?alt=media' } : Default_LOGO} resizeMode='cover' />
            </View>
            {/* Title Dishes */}
            <View className='flex-1  pr-2 justify-center items-start gap-y-3'>
                <Text className='text-lg font-[BentonSans-Bold] text-white'>Special Deal For October</Text>
                <TouchableOpacity className='bg-white rounded-lg w-[80] h-[32] items-center justify-center'>
                    <Text className='text-xs font-[BentonSans-Bold] text-bgrButton'>Buy Now</Text>
                </TouchableOpacity>
            </View>
        </ImageBackground>
    )
}

export default CardVoucher