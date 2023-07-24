import React, { useContext } from 'react'
import { Modal, TouchableOpacity } from 'react-native'
import WebView from 'react-native-webview'
import { capturePayment } from './paypalApi'
import { AuthContext } from '../../context/AuthProvider'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { API_URL } from "@env"
import { useNavigation } from '@react-navigation/native'
const Paypal = ({ url, onClearUrl }) => {
    const navigation = useNavigation()
    const { userInfor, checkTokenExpiration, refreshToken } = useContext(AuthContext)
    const onAddOrderHistory = async () => {
        try {
            let accessToken = await AsyncStorage.getItem('accessToken')
            if (!checkTokenExpiration(accessToken)) {
                accessToken = await refreshToken()
            }
            await fetch(API_URL + `data-user/add-history/${userInfor._id}`, {
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${accessToken}`
                }
            })
        } catch (error) {
            console.log("Add order history", error);
        }
    }
    const onClearCart = async () => {
        try {
            let accessToken = await AsyncStorage.getItem('accessToken')
            if (!checkTokenExpiration(accessToken)) {
                accessToken = await refreshToken()
            }
            await fetch(API_URL + `data-user/clear-cart/${userInfor._id}`, {
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${accessToken}`
                }
            })
        } catch (error) {
            console.log("Clear cart", error)
        }
    }
    const getIdFood = async () => {
        try {
            let accessToken = await AsyncStorage.getItem('accessToken')
            if (!checkTokenExpiration(accessToken)) {
                accessToken = await refreshToken()
            }
            const dataCart = await fetch(API_URL + `data-user/userId/${userInfor._id}?type=cart`,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${accessToken}`
                    }
                }
            ).then(res => res.json())
            const listIDproducts = []
            dataCart?.cart.forEach(data => {
                listIDproducts.push(data.product._id)
            })
            return listIDproducts
        } catch (error) {
            console.log("Get data cart", error)
        }
    }
    const onIncreamentOrder = async () => {
        try {
            let accessToken = await AsyncStorage.getItem('accessToken')
            if (!checkTokenExpiration(accessToken)) {
                accessToken = await refreshToken()
            }
            const listIDproducts = await getIdFood()
            for (const id of listIDproducts) {
                await fetch(API_URL + `dishes/update-order/${id}`,
                    {
                        method: "PUT",
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${accessToken}`
                        },
                        body: JSON.stringify({ userId: userInfor._id })
                    }
                )
            }
        } catch (error) {
            console.log('onIncreamentOrder', error);
        }
    }
    const paymentSuccess = async (orderID) => {
        try {
            await capturePayment(orderID)
            await onAddOrderHistory()
            await onIncreamentOrder()
            const listIDproducts = await getIdFood()
            onClearUrl()
            navigation.reset({
                index: 0,
                routes: [{ name: 'FinishOrder', params: { listIDproducts } }]
            })
            await onClearCart()
        } catch (error) {
            console.log("error raised in payment capture", error)
        }
    }
    let isOrderId = {}
    const onChangeUrl = async (webviewState) => {
        try {
            if (webviewState.url.includes('https://example.com/cancel')) {
                onClearUrl()
                return;
            }
            if (webviewState.url.includes('https://api-food-baodt2911.onrender.com/payment-success')) {
                const orderID = webviewState.url.substring(webviewState.url.indexOf('=') + 1, webviewState.url.indexOf("&"))
                if (isOrderId["orderID"]) {
                    await paymentSuccess(orderID)
                }
                isOrderId.orderID = orderID
            }
        } catch (error) {
            console.log(error);
        }

    }
    return (
        <Modal
            animationType='slide'
            visible={!!url}
        >
            <WebView
                source={{ uri: url }}
                onNavigationStateChange={onChangeUrl}
                style={{ marginTop: 30 }}
            />
        </Modal>
    )
}

export default Paypal