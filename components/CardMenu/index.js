import React from 'react'
import { View, Text, Image, TouchableOpacity, Dimensions } from 'react-native'
import Default_LOGO from '../../assets/icons/dish.png'
import { URL_IMAGE } from '@env'
import { useNavigation } from '@react-navigation/native'
const CardMenu = ({ name, restaurant, price, id, url }) => {
    const navigation = useNavigation()
    return (
        <TouchableOpacity onPress={() => navigation.navigate('Detail', { id, photoURL: url, type: 'dishes' })}
            className='w-full h-[80] pl-[10] pr-5 bg-white rounded-2xl flex-row items-center'>
            {/* Image Dishe */}
            <View className='w-16 h-16 '>
                <Image className='w-full h-full rounded-xl'
                    source={url ? { uri: URL_IMAGE + url + '?alt=media' } : Default_LOGO}
                    resizeMode='cover' />
            </View>
            {/* Title */}
            <View className='ml-3 flex-grow'>
                {/* Menu name */}
                <Text className='text-base font-[BentonSans-Medium] max-w-[150] text-ellipsis overflow-hidden' numberOfLines={1}>{name}</Text>
                {/* Restaurant name */}
                <Text className='text-sm text-[#3B3B3B] font-[BentonSans-Regular]'>{restaurant}</Text>
            </View>
            {/* Price */}
            <View className='items-end'>
                <Text className=' font-[BentonSans-Bold] text-[#FEAD1D] text-2xl '>${price}</Text>
            </View>
        </TouchableOpacity>
    )
}

export default CardMenu