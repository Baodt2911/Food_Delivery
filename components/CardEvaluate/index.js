import React from 'react'
import { View, Text } from 'react-native'
import ICON_STAR_EVALUATE from '../../assets/icons/star-evaluate.svg'

const CardEvaluate = ({ photoURL, rate, displayName, time, text }) => {
    return (
        <View className='w-full max-h-[130] bg-white rounded-3xl flex-row items-start pt-[10] pb-5 pl-[10] pr-6 border border-[#f3f3f3]'>
            {/* Image User */}
            <Image source={{ uri: photoURL }}
                className='w-16 h-16 rounded-xl ' resizeMode='cover' />
            <View className='ml-3 flex-grow'>
                <View className='flex-row items-center justify-between'>
                    <View className=''>
                        {/* Name User */}
                        <Text className='font-[BentonSans-Medium] text-base '>{displayName}</Text>
                        {/* Time evaluate */}
                        <Text className='font-[BentonSans-Book] opacity-30 text-sm'>{time}</Text>
                    </View>
                    {/* Rating  */}
                    <View className='w-[53] h-[33] bg-[#EDFDF2] rounded-2xl flex-row items-center justify-center' style={{ columnGap: 5 }}>
                        <ICON_STAR_EVALUATE width={15} height={15} />
                        <Text className='text-base font-[BentonSans-Bold] text-bgrButton'>{rate}</Text>
                    </View>
                </View>
                {/* Text Evaluate */}
                <Text className='font-[BentonSans-Book] text-xs max-w-[77%] mt-2 text-ellipsis' numberOfLines={3}>
                    {text}
                </Text>
            </View>
        </View>
    )
}

export default CardEvaluate