import React, { useContext, useState } from 'react'
import { View, Text, ImageBackground, Image, TouchableOpacity, TextInput, ActivityIndicator } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Pattern from '../assets/images/Pattern.png'
import STAR_ICON from '../assets/icons/star.png'
import EDIT_ICON from '../assets/icons/edit.svg'
import { API_URL, URL_IMAGE } from '@env'
import { AuthContext } from '../context/AuthProvider'
import AsyncStorage from '@react-native-async-storage/async-storage'
const RateFood = ({ route, navigation }) => {
    const { listIDproducts } = route.params
    const { userInfor, checkTokenExpiration, refreshToken } = useContext(AuthContext)
    const [rate, setRate] = useState(0)
    const [feedback, setFeedback] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const onSubmit = async () => {
        try {
            setIsLoading(true)
            let accessToken = await AsyncStorage.getItem('accessToken')
            if (!checkTokenExpiration(accessToken)) {
                accessToken = await refreshToken()
            }
            await listIDproducts.forEach(async (id) => {
                await fetch(API_URL + `evaluate/add-food/${id}`, {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${accessToken}`
                    },
                    body: JSON.stringify({
                        userId: userInfor._id,
                        rate,
                        text: feedback
                    })
                })
            })
            navigation.reset({
                index: 0,
                routes: [{ name: 'RateRestaurant', params: { listIDproducts } }]
            })
            setIsLoading(false)
        } catch (error) {
            console.log('Rate Food ', error);
            setIsLoading(false)
        }
    }
    return (
        <SafeAreaView className='flex-1 bg-white'>
            <KeyboardAwareScrollView className='flex-1' showsVerticalScrollIndicator={false}>
                <ImageBackground source={Pattern} className='flex-1 px-5 items-center' resizeMode='cover'>
                    <View className='w-[135] h-[135] mt-24 rounded-full border-4 border-bgrButton mb-14'>
                        <Image source={{ uri: 'https://img.freepik.com/premium-vector/good-food-logo-design_79169-10.jpg?w=2000' }} className='w-full h-full rounded-full' resizeMode='cover' />
                    </View>
                    {/* Title */}
                    <Text className='text-center font-[BentonSans-Bold] text-2xl'>Thank You!{'\n'}
                        Enjoy Your Meal</Text>
                    {/* Sub title */}
                    <Text className='font-[BentonSans-Regular] text-[#3b3b3b] opacity-30 mt-5'>Please rate your Food</Text>
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
                        {
                            isLoading ?
                                <View className='w-[230] h-[60] bg-bgrButton rounded-2xl justify-center items-center'>
                                    <ActivityIndicator color={'#fff'} />
                                </View> :
                                <TouchableOpacity onPress={onSubmit} disabled={!rate || !feedback}
                                    style={{ opacity: !rate || !feedback ? 0.7 : 1 }}
                                    className='w-[230] h-[60] bg-bgrButton rounded-2xl justify-center items-center'>
                                    <Text className='text-center font-[BentonSans-Bold] text-white'>Submit</Text>
                                </TouchableOpacity>
                        }
                        {/* Button Skip */}
                        <TouchableOpacity disabled={isLoading} onPress={() => navigation.reset({
                            index: 0,
                            routes: [{ name: 'RateRestaurant', params: { listIDproducts } }]
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

export default RateFood