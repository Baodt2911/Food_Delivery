import React from 'react'
import { View, Text, Image } from 'react-native'
import ICON_STAR_EVALUATE from '../../assets/icons/star-evaluate.svg'
import { URL_IMAGE } from "@env"
const CardEvaluate = ({ photoURL, rate, displayName, time, text }) => {
    return (
        <View className='w-full max-h-[130] bg-white rounded-3xl flex-row items-start pt-[10] pb-5 pl-[10] pr-5' style={{
            shadowColor: '#5a6cea66',
            shadowOffset: { width: 0, height: 0 },
            shadowOpacity: 0.5,
            shadowRadius: 5,
            elevation: 10,
        }}>
            {/* Image User */}
            <Image source={{ uri: URL_IMAGE + photoURL + '?alt=media' }}
                className='w-16 h-16 rounded-xl ' resizeMode='cover' />
            <View className='ml-3 flex-grow'>
                <View className='flex-row  items-center justify-between'>
                    <View className='w-[140]'>
                        {/* Name User */}
                        <Text className='font-[BentonSans-Medium] text-base' numberOfLines={1}>{displayName}</Text>
                        {/* Time evaluate */}
                        <Text className='font-[BentonSans-Book] opacity-30 text-sm'>{new Date(time).toLocaleDateString('en-GB')}</Text>
                    </View>
                    {/* Rating  */}
                    <View className='w-[55] h-[33] bg-[#EDFDF2] rounded-xl flex-row items-center justify-center' style={{ columnGap: 5 }}>
                        <ICON_STAR_EVALUATE width={15} height={15} />
                        <Text className='text-sm font-[BentonSans-Bold] text-bgrButton'>{rate}</Text>
                    </View>
                </View>
                {/* Text Evaluate */}
                <Text className='font-[BentonSans-Book] text-xs max-w-[77%] mt-2 text-ellipsis' numberOfLines={3}>{text}</Text>
            </View>
        </View>
    )
}

export default CardEvaluate