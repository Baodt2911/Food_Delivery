import React, { useContext, useState } from 'react'
import { View, Text, TouchableOpacity, TextInput, ImageBackground, Dimensions, Platform, ActivityIndicator } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import Pattern from '../assets/images/Pattern1.png'
import Pattern2 from '../assets/images/Pattern2.png'
import BackIcon from '../assets/icons/back.svg'
import LocationIcon from '../assets/icons/location.svg'
import PAYPAL_ICON from '../assets/icons/paypal.svg'
import { AuthContext } from '../context/AuthProvider'
import Paypal from '../components/Paypal'
import { createOrder } from '../components/Paypal/paypalApi'
const Payment = ({ route, navigation }) => {
    const { subTotal, cart } = route.params
    const DELIVERY_CHARGE = 0
    const DISCOUNT = 0
    const total = subTotal + DELIVERY_CHARGE + DISCOUNT
    const { userInfor, updateUserInfor } = useContext(AuthContext)
    const { width: widthScreen } = Dimensions.get('window')
    const [url, setUrl] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [textAddress, setTextAddress] = useState('')
    const [isAddress, setIsAddress] = useState(false)
    const onClearUrl = () => {
        setUrl(null)
    }
    const onPayment = async () => {
        setIsLoading(true)
        const listItems = cart.map(item => ({
            "name": item.product.name,
            "restaurant": item.product.restaurant.name,
            "quantity": item.quantity,
            "unit_amount": {
                "currency_code": "USD",
                "value": item.product.price
            }
        }))
        try {
            const res = await createOrder({ total, listItems })
            if (res?.links) {
                const findURL = res.links.find(item => item.rel === 'approve')
                setUrl(findURL.href)
                setIsLoading(false)
            }
        } catch (error) {
            console.log('Create order:' + error);
            setIsLoading(false)
        }
    }
    const handleUpdateAddress = async () => {
        if (textAddress) {
            const data = { address: textAddress }
            await updateUserInfor({ data, id: userInfor._id })
        }
        setIsAddress(!isAddress)
    }
    return (
        <SafeAreaView className='flex-1 bg-white'>
            <ImageBackground className='flex-1 ' source={Pattern} resizeMode='cover'>
                <TouchableOpacity onPress={() => navigation.goBack()}
                    className='w-11 h-11 rounded-2xl bg-[#FFF6EF] items-center justify-center mt-10 ml-6' style={{
                        shadowColor: '#333',
                        shadowOffset: { width: 0, height: 0 },
                        shadowOpacity: 0.3,
                        shadowRadius: 1,
                        elevation: 1
                    }}>
                    <BackIcon />
                </TouchableOpacity>
                {/* Title  */}
                <Text className='pl-[25]  mt-5 font-[BentonSans-Bold] text-2xl'>Confirm Order</Text>
                {/* Content */}
                <View className='mx-5 mt-5' style={{ flex: 3, rowGap: 20 }}>
                    <View className='w-full h-[120] rounded-3xl p-5' style={{
                        backgroundColor: '#fff',
                        shadowColor: '#5a6ceacc',
                        shadowOffset: { width: 0, height: 0 },
                        shadowOpacity: 0.3,
                        shadowRadius: 5,
                        elevation: 10,
                    }}>
                        <View className='flex-row items-center justify-between'>
                            <Text className='font-[BentonSans-Regular] text-[#3B3B3B] opacity-30'>Deliver To</Text>
                            <TouchableOpacity onPress={() => {
                                if (isAddress) {
                                    handleUpdateAddress()
                                } else {
                                    setIsAddress(!isAddress)
                                }
                            }}>
                                <Text className='text-bgrButton font-[BentonSans-Regular]'>{isAddress ? 'Save' : 'Edit'}</Text>
                            </TouchableOpacity>
                        </View>
                        {/* Address */}
                        <View className='flex-row mt-2 w-full' style={{ columnGap: 10 }}>
                            <LocationIcon />
                            {
                                isAddress ?
                                    <TextInput
                                        placeholder={'Enter address'}
                                        value={textAddress}
                                        onChangeText={(text) => setTextAddress(text)}
                                        className='font-[BentonSans-Medium] text-sm'
                                        style={{ width: widthScreen * 0.6 }}
                                    /> :
                                    <Text className='font-[BentonSans-Medium] text-sm' style={{ width: widthScreen * 0.65 }}>{userInfor?.address}</Text>
                            }
                        </View>
                    </View>
                    {/* Payment method */}
                    <View className='w-full  rounded-3xl p-5' style={{
                        backgroundColor: '#fff',
                        shadowColor: '#5a6ceacc',
                        shadowOffset: { width: 0, height: 0 },
                        shadowOpacity: 0.3,
                        shadowRadius: 5,
                        elevation: 10,
                    }}>
                        <View className='flex-row items-center justify-between '>
                            <Text className='font-[BentonSans-Regular] text-[#3B3B3B] opacity-30'>Payment Method</Text>
                            <TouchableOpacity disabled={true} style={{ opacity: 0.5 }}>
                                <Text className='text-bgrButton font-[BentonSans-Regular]'>Edit</Text>
                            </TouchableOpacity>
                        </View>
                        {/* Method */}
                        <View className='flex-row mt-4 w-full justify-center'>
                            <PAYPAL_ICON />
                        </View>
                    </View>
                </View>
                {/* Card Order */}
                <View className=' w-full h-[200] px-5  pb-8' style={{ flex: 2, display: isAddress ? 'none' : 'flex' }}>
                    <ImageBackground className='flex-1 bg-bgrButton rounded-3xl px-5 py-3' source={Pattern2} resizeMode='cover'>
                        <View>
                            {/* Sub-total */}
                            <View className='flex-row px-5 w-full items-center justify-between mt-2'>
                                <Text className='font-[BentonSans-Medium] text-white'>Sub-Total</Text>
                                <Text className='font-[BentonSans-Medium] text-white'>{total} $</Text>
                            </View>
                            {/* Delivery Charge */}
                            <View className='flex-row px-5 w-full items-center justify-between mt-2'>
                                <Text className='font-[BentonSans-Medium] text-white'>Delivery Charge</Text>
                                <Text className='font-[BentonSans-Medium] text-white'>{DELIVERY_CHARGE} $</Text>
                            </View>
                            {/* Discount */}
                            <View className='flex-row px-5 w-full items-center justify-between mt-2'>
                                <Text className='font-[BentonSans-Medium] text-white'>Discount</Text>
                                <Text className='font-[BentonSans-Medium] text-white'>{DISCOUNT} $</Text>
                            </View>
                            {/* Total */}
                            <View className='flex-row px-5 w-full items-center justify-between my-3'>
                                <Text className='font-[BentonSans-Medium] text-white text-[18px]'>Total</Text>
                                <Text className='font-[BentonSans-Medium] text-white text-[18px]'>{total} $</Text>
                            </View>
                        </View>
                        {/*Button Order */}
                        {
                            isLoading ? <ActivityIndicator color={'#fff'} className='mt-5' /> :
                                <TouchableOpacity onPress={onPayment}
                                    className='w-full h-[60] rounded-2xl bg-white justify-center items-center'>
                                    <Text className='font-[BentonSans-Bold] text-bgrButton'>Place My Order</Text>
                                </TouchableOpacity>
                        }
                    </ImageBackground>
                </View>
                {/* PopupWebView */}
                {
                    url ? <Paypal url={url} onClearUrl={() => onClearUrl()} /> : <></>
                }
            </ImageBackground>
        </SafeAreaView>
    )
}

export default Payment