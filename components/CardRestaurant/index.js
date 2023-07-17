import React from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native'
import Default_LOGO from '../../assets/icons/dish.png'
import STAR_ICON from '../../assets/icons/star.png'
import { URL_IMAGE } from '@env'
import { useNavigation } from '@react-navigation/native'
const CardRestaurant = ({ logo, name, rate, id, style, imageURL }) => {
    const navigation = useNavigation()
    return (
        <TouchableOpacity onPress={() => navigation.navigate('Detail', { id, photoURL: imageURL, type: 'restaurants' })}
            className='w-[150] h-[180] bg-white rounded-2xl items-center justify-center' style={style}>
            <Image className='w-20 h-20'
                source={logo ? { uri: URL_IMAGE + logo + '?alt=media' } : Default_LOGO} resizeMode='contain' />
            <View className='mt-4 '>
                <Text className='font-[BentonSans-Bold] leading-4 text-center'>{name}</Text>
                {/* Rate */}
                <View className='flex-row items-center mt-1 gap-x-1 justify-center'>
                    <Image source={STAR_ICON} resizeMode='contain' className='w-4 h-4' />
                    <Image source={STAR_ICON} resizeMode='contain' className='w-4 h-4' />
                    <Image source={STAR_ICON} resizeMode='contain' className='w-4 h-4' />
                    <Image source={STAR_ICON} resizeMode='contain' className='w-4 h-4' />
                    <Image source={STAR_ICON} resizeMode='contain' className='w-4 h-4' />
                </View>
            </View>
        </TouchableOpacity>
    )
}

export default CardRestaurant