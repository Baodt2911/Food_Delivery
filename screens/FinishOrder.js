import React, { useState } from 'react'
import { View, Text, ImageBackground, Image, TouchableOpacity, TextInput } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Pattern from '../assets/images/Pattern.png'
import STAR_ICON from '../assets/icons/star.png'
import EDIT_ICON from '../assets/icons/edit.svg'
const FinishOrder = ({ route, navigation }) => {
    const { listIDproducts } = route.params
    const [rate, setRate] = useState(0)
    const [feedback, setFeedback] = useState('')
    return (
        <SafeAreaView className='flex-1 bg-white'>
            <KeyboardAwareScrollView className='flex-1' showsVerticalScrollIndicator={false}>
                <ImageBackground source={Pattern} className='flex-1 px-5 items-center' resizeMode='cover'>
                    <View className='w-[135] h-[135] mt-24 rounded-full border-4 border-bgrButton mb-14'>
                        <Image source={{ uri: 'https://thegioimay.org/wp-content/uploads/2020/11/57358127_1290006087821185_714335095200153600_n.jpg' }} className='w-full h-full rounded-full' />
                    </View>
                    {/* Title */}
                    <Text className='text-center font-[BentonSans-Bold] text-2xl'>Thank You!{'\n'}Order Completed</Text>
                    {/* Sub title */}
                    <Text className='font-[BentonSans-Regular] text-[#3b3b3b] opacity-30 mt-5'>Please rate your last Driver</Text>
                    {/* Rate */}
                    <View className='flex-row mt-10' style={{ columnGap: 10 }}>
                        <TouchableOpacity style={{
                            opacity: rate === 1 || rate === 2 || rate === 3 || rate === 4 || rate === 5
                                ? 1 : 0.3
                        }} onPress={() => setRate(1)}>
                            <Image source={STAR_ICON} className='w-[30] h-[30]' />
                        </TouchableOpacity>

                        <TouchableOpacity style={{
                            opacity: rate === 2 || rate === 3 || rate === 4 || rate === 5
                                ? 1 : 0.3
                        }} onPress={() => setRate(2)}>
                            <Image source={STAR_ICON} className='w-[30] h-[30]' />
                        </TouchableOpacity>

                        <TouchableOpacity style={{
                            opacity: rate === 3 || rate === 4 || rate === 5
                                ? 1 : 0.3
                        }} onPress={() => setRate(3)}>
                            <Image source={STAR_ICON} className='w-[30] h-[30]' />
                        </TouchableOpacity>

                        <TouchableOpacity style={{ opacity: rate === 4 || rate === 5 ? 1 : 0.3 }} onPress={() => setRate(4)}>
                            <Image source={STAR_ICON} className='w-[30] h-[30]' />
                        </TouchableOpacity>

                        <TouchableOpacity style={{ opacity: rate === 5 ? 1 : 0.3 }} onPress={() => setRate(5)}>
                            <Image source={STAR_ICON} className='w-[30] h-[30]' />
                        </TouchableOpacity>
                    </View>
                    {/* Feedback */}
                    <View className='mt-[77] px-5 w-full h-[55] flex-row items-center rounded-2xl border border-[#e8e8e8]'>
                        <EDIT_ICON />
                        <TextInput placeholder='Leave feedback' className='ml-3 w-[80%] h-full font-[BentonSans-Regular]'
                            value={feedback}
                            onChangeText={(text) => setFeedback(text)}
                        />
                    </View>
                    {/* Button */}
                    <View className='flex-row w-full items-center mt-5 mb-8 justify-between' >
                        {/* Button Submit */}
                        <TouchableOpacity onPress={() => navigation.reset({
                            index: 0,
                            routes: [{ name: 'RateFood', params: { listIDproducts } }]
                        })}
                            className='w-[230] h-[60] bg-bgrButton rounded-2xl justify-center items-center'>
                            <Text className='text-center font-[BentonSans-Bold] text-white'>Submit</Text>
                        </TouchableOpacity>
                        {/* Button Skip */}
                        <TouchableOpacity onPress={() => navigation.reset({
                            index: 0,
                            routes: [{ name: 'RateFood', params: { listIDproducts } }]
                        })}
                            style={{
                                width: 82,
                                height: 60,
                                borderRadius: 16,
                                backgroundColor: "#fff",
                                shadowColor: '#5a6cea66',
                                shadowOffset: { width: 3, height: 3 },
                                shadowOpacity: 0.2,
                                shadowRadius: 6,
                                elevation: 5,
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}>
                            <Text className='text-bgrButton font-[BentonSans-Bold]'>Skip</Text>
                        </TouchableOpacity>
                    </View>
                </ImageBackground>
            </KeyboardAwareScrollView>
        </SafeAreaView>
    )
}

export default FinishOrder