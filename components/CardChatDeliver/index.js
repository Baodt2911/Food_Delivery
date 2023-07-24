import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'

const CardChatDeliver = () => {
    return (
        <TouchableOpacity className='w-full h-[86]  rounded-3xl px-4 py-3 flex-row items-center' style={{
            backgroundColor: "#fff",
            shadowColor: '#5a6cea66',
            shadowOffset: { width: 0, height: 0 },
            shadowOpacity: 0.5,
            shadowRadius: 5,
            elevation: 10,
        }}>
            <Image source={{ uri: 'https://thegioimay.org/wp-content/uploads/2020/11/57358127_1290006087821185_714335095200153600_n.jpg' }} resizeMode='cover' className='w-16 h-16 rounded-xl' />
            <View className='flex-row w-[70%] ml-3  justify-between'>
                <View className='w-[70%]'>
                    {/* Name */}
                    <Text className='font-[BentonSans-Medium] text-base' numberOfLines={1}>Anamwp</Text>
                    {/* Chat Notification */}
                    <Text className='font-[BentonSans-Regular] text-[#3B3B3B] opacity-30' numberOfLines={1}>Your Order Just Arrived! ưygywgydgywgy</Text>
                </View>
                {/* Time send */}
                <Text className='font-[BentonSans-Regular] text-right text-[#3B3B3B] opacity-30 '>20:00</Text>
            </View>
        </TouchableOpacity>
    )
}

export default CardChatDeliver