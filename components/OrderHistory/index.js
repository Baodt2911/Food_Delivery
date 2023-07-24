import { View, Text, ScrollView, RefreshControl, TouchableOpacity } from 'react-native'
import React, { useContext, useState, useEffect } from 'react'
import CardOrderHistory from '../CardOrderHistory'
import Skeleton from '../Skeleton'
import { AuthContext } from '../../context/AuthProvider'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { API_URL } from "@env"
import { useNavigation } from '@react-navigation/native'
const OrderHistory = () => {
    const navigation = useNavigation()
    const { userInfor: { _id: userId }, checkTokenExpiration, refreshToken } = useContext(AuthContext)
    const [resultsOrder, setResultsOrder] = useState(null)
    const [isRefresh, setIsRefresh] = useState(false)
    const fetchData = async () => {
        let accessToken = await AsyncStorage.getItem('accessToken')
        if (!checkTokenExpiration(accessToken)) {
            accessToken = await refreshToken()
        }
        setResultsOrder(null)
        const dataCart = await fetch(API_URL + `data-user/userId/${userId}?type=history`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${accessToken}`
                }
            }
        ).then(res => res.json())
        setResultsOrder(dataCart.orderHistory)
    }
    useEffect(() => {
        fetchData()
    }, [])
    return (
        <ScrollView className='flex-1'
            showsVerticalScrollIndicator={false}
            refreshControl={
                <RefreshControl refreshing={isRefresh} onRefresh={async () => {
                    setIsRefresh(true)
                    await fetchData()
                    setIsRefresh(false)
                }} />
            }
            contentContainerStyle={{ rowGap: 20, paddingBottom: 120, paddingHorizontal: 5, paddingTop: 5 }}>

            {
                !resultsOrder ? <View style={{ rowGap: 20 }}>
                    <Skeleton width={'100%'} height={100} style={{ borderRadius: 24 }} />
                    <Skeleton width={'100%'} height={100} style={{ borderRadius: 24 }} />
                    <Skeleton width={'100%'} height={100} style={{ borderRadius: 24 }} />
                </View> :
                    resultsOrder.length === 0 ? <View className='flex-row justify-center'>
                        <Text className='text-[#3B3B3B] font-[BentonSans-Regular] text-xs'>You have not purchased any orders yet.</Text>
                        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                            <Text className='font-[BentonSans-Medium]  underline text-bgrButton'>Buy now</Text>
                        </TouchableOpacity>
                    </View> :
                        resultsOrder.map(data =>
                            <CardOrderHistory id={data._id} name={data.name} photoURL={data.photoURL} price={data.price} restaurant={data.restaurant.name} key={data._id} />
                        )
            }

        </ScrollView>
    )
}

export default OrderHistory