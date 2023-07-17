import React, { useContext, useRef } from 'react'
import { View, Text, PanResponder, Animated, Image, TouchableOpacity } from 'react-native'
import INCREASE_ICON from '../../assets/icons/increase.svg'
import DECREASE_ICON from '../../assets/icons/decrease.svg'
import TRASH_ICON from '../../assets/icons/trash.svg'
import { URL_IMAGE, API_URL } from '@env'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { AuthContext } from '../../context/AuthProvider'
const MIN_TRANSLATE_X = -60
const MAX_TRANSLATE_X = 0
const DRAG_THRESHOLD = -20
const Swipeable = ({ name, restaurant, photoURL, price, quantity, id, fetchData }) => {
    const { userInfor } = useContext(AuthContext)
    const translateXValue = useRef(new Animated.Value(0)).current
    const lastGestureDx = useRef(0)
    const panResponder = useRef(
        PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onPanResponderGrant: () => {
                translateXValue.setOffset(lastGestureDx.current)
            },
            onPanResponderMove: (e, gesture) => {
                translateXValue.setValue(gesture.dx)
            },
            onPanResponderRelease: (e, gesture) => {
                lastGestureDx.current += gesture.dx
                translateXValue.flattenOffset()
                if (gesture.dx >= 0) {
                    spingAnimation('right')
                } else {
                    if (gesture.dx <= DRAG_THRESHOLD) {
                        spingAnimation('left')
                    } else {
                        spingAnimation('right')
                    }
                }
            }
        })
    ).current
    const spingAnimation = (direction) => {
        lastGestureDx.current = direction === 'left' ? -60 : 0
        Animated.spring(translateXValue, {
            toValue: lastGestureDx.current,
            useNativeDriver: true
        }).start()
    }
    const handleIncrement = async () => {
        const accessToken = await AsyncStorage.getItem('accessToken')
        await fetch(API_URL + `data-user/add-cart/${userInfor._id}`, {
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
        })
        await fetchData()
    }
    const handleDecrement = async () => {
        const accessToken = await AsyncStorage.getItem('accessToken')
        await fetch(API_URL + `data-user/add-cart/${userInfor._id}`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${accessToken}`
            },
            body: JSON.stringify({
                cart: {
                    product: id,
                    quantity: -1
                }
            })
        })
        await fetchData()
    }
    const handleDeleteProduct = async () => {
        const accessToken = await AsyncStorage.getItem('accessToken')
        await fetch(API_URL + `data-user/remove-product/${userInfor._id}`, {
            method: 'DELETE',
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
        await fetchData()
    }
    return (
        <View className='w-full h-[100]  rounded-3xl bg-white'>
            {/* Item on */}
            <Animated.View className='absolute w-full h-[100]  flex-row items-center rounded-3xl bg-white px-5 z-20'
                style={{
                    transform: [{
                        translateX: translateXValue.interpolate({
                            inputRange: [MIN_TRANSLATE_X, MAX_TRANSLATE_X],
                            outputRange: [MIN_TRANSLATE_X, MAX_TRANSLATE_X],
                            extrapolate: 'clamp'
                        })
                    }]
                }}
                {...panResponder.panHandlers}
            >
                <View className='flex-row items-center flex-grow gap-x-2'>
                    <Image source={{ uri: URL_IMAGE + photoURL + '?alt=media' }} resizeMode='cover' className='w-16 h-16 rounded-2xl' />
                    <View className=''>
                        {/* Dishes name */}
                        <Text className='font-[BentonSans-Medium]  text-ellipsis' numberOfLines={2}>{name}</Text>
                        {/* Restaurant name */}
                        <Text className='font-[BentonSans-Regular] text-[#3B3B3B] opacity-30'>{restaurant}</Text>
                        {/* Price */}
                        <Text className='text-bgrButton text-xl font-[BentonSans-Bold]'>$ {price}</Text>
                    </View>
                </View>
                {/* increase & decrease quantity  */}
                <View className='flex-row items-center ' style={{ columnGap: 18 }}>
                    {/* Button-decrease */}
                    <TouchableOpacity onPress={() => handleDecrement()}>
                        <DECREASE_ICON />
                    </TouchableOpacity>
                    <Text className='text-base'>{quantity}</Text>
                    {/* Button-increase */}
                    <TouchableOpacity onPress={() => handleIncrement()}>
                        <INCREASE_ICON />
                    </TouchableOpacity>
                </View>
            </Animated.View>
            {/* Delete product */}
            <TouchableOpacity onPress={() => handleDeleteProduct()}
                className='w-full h-[100] flex-row justify-end items-center rounded-3xl bg-[#FEAD1D] px-5'
            >
                <TRASH_ICON />
            </TouchableOpacity>
        </View>
    )
}

export default Swipeable