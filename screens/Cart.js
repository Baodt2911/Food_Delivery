import React, { useContext, useEffect, useState } from 'react'
import { View, Text, ImageBackground, ScrollView, TouchableOpacity, Image, RefreshControl } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import Pattern from '../assets/images/Pattern1.png'
import Swipeable from '../components/Swipeable'
import Skeleton from '../components/Skeleton'
import { AuthContext } from '../context/AuthProvider'
import { API_URL } from '@env'
import AsyncStorage from '@react-native-async-storage/async-storage'
const Cart = ({ navigation }) => {
    const { userInfor: { _id: userId }, refreshToken, checkTokenExpiration } = useContext(AuthContext)
    const [resultsCart, setResultsCart] = useState(null)
    const [isRefresh, setIsRefresh] = useState(false)
    const fetchData = async () => {
        try {
            let accessToken = await AsyncStorage.getItem('accessToken')
            if (!checkTokenExpiration(accessToken)) {
                accessToken = await refreshToken()
            }
            const dataCart = await fetch(API_URL + `data-user/userId/${userId}?type=cart`,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${accessToken}`
                    }
                }
            ).then(res => res.json())
            setResultsCart(dataCart.cart)
        } catch (error) {
            console.log('Cart', error);
        }

    }
    useEffect(() => {
        fetchData()
    }, [])
    const SubTotal = () => {
        const resultsTotal = resultsCart?.reduce((accumulator, currentValue) =>
            accumulator += currentValue.product.price * currentValue.quantity
            , 0)
        return resultsTotal
    }
    return (
        <SafeAreaView className='flex-1'>
            <ImageBackground source={Pattern} resizeMode='cover' className='flex-1'>
                <View className='mx-[25] mt-5 flex-row justify-between items-center'>
                    <Text className='font-[BentonSans-Bold] text-2xl '>Order Detail</Text>
                    {/* Button Order */}
                    <TouchableOpacity disabled={resultsCart?.length === 0 || !resultsCart}
                        onPress={() => navigation.navigate('Payment', { subTotal: SubTotal(), cart: resultsCart })}
                        style={{ columnGap: 10 }}
                        className='flex-row items-center bg-bgrButton h-10 rounded-xl px-3'>
                        <Text className='font-[BentonSans-Medium] text-white underline '>Order Now</Text>
                        {/* Total */}
                        <Text className='font-[BentonSans-Bold] text-white text-base'>{SubTotal()} $</Text>
                    </TouchableOpacity>
                </View>
                <ScrollView className='flex-1 mt-5' refreshControl={
                    <RefreshControl refreshing={isRefresh} onRefresh={async () => {
                        setIsRefresh(true)
                        await fetchData()
                        setIsRefresh(false)
                    }} />
                }
                    contentContainerStyle={{ paddingHorizontal: 15, rowGap: 30, paddingBottom: 120 }}>
                    {
                        !resultsCart ? <View style={{ rowGap: 30 }}>
                            <Skeleton width={'100%'} height={100} style={{ borderRadius: 24 }} />
                            <Skeleton width={'100%'} height={100} style={{ borderRadius: 24 }} />
                            <Skeleton width={'100%'} height={100} style={{ borderRadius: 24 }} />
                            <Skeleton width={'100%'} height={100} style={{ borderRadius: 24 }} />
                            <Skeleton width={'100%'} height={100} style={{ borderRadius: 24 }} />
                        </View> :
                            resultsCart.length === 0 ? <Text className='font-[BentonSans-Medium]  text-center mt-5 text-[#3B3B3B] opacity-30'>No products!</Text> :
                                resultsCart.map(data =>
                                    <Swipeable fetchData={() => fetchData()} id={data.product._id} name={data.product.name} photoURL={data.product.photoURL} restaurant={data.product.restaurant.name} price={data.product.price} quantity={data.quantity} key={data._id} />
                                )
                    }
                </ScrollView>
            </ImageBackground>
        </SafeAreaView>
    )
}

export default Cart