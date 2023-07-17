import React, { useContext } from 'react'
import { View, Text, Image, ScrollView, TouchableOpacity, Platform } from 'react-native'
import BottomSheet from '../components/BottomSheet'
import ICON_LOCATION from '../assets/icons/icon-location.svg'
import ICON_HEART from '../assets/icons/heart.png'
import Evaluate from '../components/Evaluate'
import CardDetail from '../components/CardDetail'
import { URL_IMAGE, API_URL } from '@env'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { AuthContext } from '../context/AuthProvider'
const Detail = ({ route, navigation }) => {
    const { id, type, photoURL } = route.params
    const { userInfor } = useContext(AuthContext)
    const handleAddCart = async () => {
        const accessToken = await AsyncStorage.getItem('accessToken')
        const dataCart = await fetch(API_URL + `data-user/add-cart/${userInfor._id}`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${accessToken}`
            },
            body: JSON.stringify({
                cart: {
                    product: id
                }
            })
        }).then(res => res.json())
        alert(dataCart)
    }
    return (
        <View className='flex-1'>
            <Image style={{ width: '100%', height: '60%' }}
                source={{ uri: URL_IMAGE + photoURL + '?alt=media' }} />
            <BottomSheet>
                <ScrollView className='flex-1' contentContainerStyle={{ paddingBottom: 100 }}>
                    {/* Title */}
                    <View className='flex-row justify-between items-center mx-[30] mt-5'>
                        <View className='w-[80] h-[34] rounded-2xl bg-[#EDFDF2] justify-center items-center'>
                            <Text className='font-[BentonSans-Medium]  text-bgrButton text-xs'>Popular</Text>
                        </View>
                        <View className='flex-row gap-x-5'>
                            {/* Location button */}
                            <TouchableOpacity>
                                <ICON_LOCATION />
                            </TouchableOpacity>
                            {/* Favorite button */}
                            <TouchableOpacity className='rounded-full w-[34] h-[34] bg-[#FEE8E9] justify-center items-center'>
                                <Image source={ICON_HEART} resizeMode='contain' className='w-4 h-4' />
                            </TouchableOpacity>
                        </View>
                    </View>
                    {/* CardDetail */}
                    <CardDetail id={id} type={type} />
                    {/*List Evaluate */}
                    <Evaluate dishes={id} />
                </ScrollView>
            </BottomSheet>
            {/* Add to Chart */}
            {
                type === 'restaurants' ? <></> :
                    <View className='absolute  bottom-4 w-full px-[30]'>
                        <TouchableOpacity onPress={() => handleAddCart()}
                            className=' w-full h-[60] bg-bgrButton rounded-2xl justify-center items-center'>
                            <Text className='text-white font-[BentonSans-Bold] text-base'>Add To Cart</Text>
                        </TouchableOpacity>
                    </View>
            }
        </View>
    )
}

export default Detail