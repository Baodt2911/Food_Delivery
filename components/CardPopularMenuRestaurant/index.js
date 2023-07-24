import React from 'react'
import { View, Text, TouchableOpacity, Image, Platform } from 'react-native'
import { URL_IMAGE } from '@env'
import { useNavigation } from '@react-navigation/native'
const CardPopularMenuRestaurant = ({ id, name, price, photoURL }) => {
    const navigation = useNavigation()
    return (
        <TouchableOpacity onPress={() => navigation.navigate('Detail', { id, photoURL, type: 'dishes' })}
            className='px-2 py-3 w-[150] h-full bg-white  rounded-[22px] justify-center items-center' style={{
                shadowColor: '#5a6cea66',
                shadowOffset: { width: 0, height: 0 },
                shadowOpacity: 0.5,
                shadowRadius: 5,
                elevation: 10,
            }}>
            <Image source={{ uri: URL_IMAGE + photoURL + '?alt=media' }} className='w-[90] h-[90] rounded-2xl' resizeMode='cover' />
            {/* Name */}
            <Text className='font-[BentonSans-Medium] text-ellipsis mt-3' numberOfLines={1}>{name}</Text>
            {/* Price */}
            <Text className='text-sm font-[BentonSans-Book] mt-1 opacity-50'>{price}$</Text>
        </TouchableOpacity>
    )
}

export default CardPopularMenuRestaurant