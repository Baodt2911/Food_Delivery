import React, { useContext, useState } from 'react'
import { View, Text, TouchableOpacity, Image, Platform, Dimensions, } from 'react-native'
import { URL_IMAGE } from '@env'
import { AuthContext } from '../../context/AuthProvider'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { API_URL } from '@env'
import AlertCustom from '../AlertCustom'
const CardOrderHistory = ({ photoURL, name, price, restaurant, id }) => {
    const widthScreen = Dimensions.get('window').width
    const { userInfor, refreshToken, checkTokenExpiration } = useContext(AuthContext)
    const [isModalVisible, setIsModalVisible] = useState(false)
    const handleBuyAgain = async () => {
        try {
            let accessToken = await AsyncStorage.getItem('accessToken')
            if (!checkTokenExpiration(accessToken)) {
                accessToken = await refreshToken()
            }
            await fetch(API_URL + `data-user/add-cart/${userInfor._id}`, {
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${accessToken}`
                },
                body: JSON.stringify({
                    cart: {
                        product: id
                    }
                })
            })
            handleShowAlert()
        } catch (error) {
            console.log('Add to cart', error);
        }
    }
    const handleShowAlert = () => {
        setIsModalVisible(true)
    }
    const handleCloseAlert = () => {
        setIsModalVisible(false)
    }
    return (
        <View className=' w-full h-[100]  flex-row items-center rounded-3xl bg-white px-3' style={{
            backgroundColor: "#fff",
            shadowColor: '#5a6cea66',
            shadowOffset: { width: 0, height: 0 },
            shadowOpacity: 0.3,
            shadowRadius: 5,
            elevation: 10,
        }}>
            {/* Alert */}
            <AlertCustom
                title={'Notification'}
                message={'Added to cart'}
                visible={isModalVisible}
                onClose={handleCloseAlert}
            />
            <View className='flex-row items-center flex-grow gap-x-2'>
                <Image source={{ uri: URL_IMAGE + photoURL + '?alt=media' }} resizeMode='cover' className='w-16 h-16 rounded-2xl' />
                <View style={{ width: widthScreen * 0.3 }}>
                    {/* Dishes name */}
                    <Text className='font-[BentonSans-Medium]  text-ellipsis' numberOfLines={1}>{name}</Text>
                    {/* Restaurant name */}
                    <Text className='font-[BentonSans-Regular] text-[#3B3B3B] opacity-30 ' numberOfLines={1}>{restaurant}</Text>
                    {/* Price */}
                    <Text className='text-bgrButton text-xl font-[BentonSans-Bold]'>$ {price}</Text>
                </View>
            </View>
            {/* Button Buy Again */}
            <TouchableOpacity onPress={handleBuyAgain}
                className='w-[85] h-[30] rounded-2xl bg-bgrButton justify-center items-center'>
                <Text className='text-xs text-white font-[BentonSans-Medium]'>Buy Again</Text>
            </TouchableOpacity>
        </View>
    )
}

export default CardOrderHistory