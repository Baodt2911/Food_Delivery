import { createContext, useEffect, useState } from "react";
import { ActivityIndicator, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import jwt_decode from "jwt-decode";
import { API_URL } from "@env"
export const AuthContext = createContext()
export const AuthProvider = ({ children }) => {
    const navigation = useNavigation()
    const [userInfor, setUserInfor] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [disableBottomTab, setDisableBottomTab] = useState('flex')
    const CheckIsNewDevice = async () => {
        try {
            setIsLoading(true)
            const isNewDevice = await AsyncStorage.getItem('isNewDevice')
            if (isNewDevice === null) {
                setIsLoading(false)
                await AsyncStorage.setItem('isNewDevice', 'true')
            } else {
                setIsLoading(false)
                // CheckIsloggedIn
                let user = await AsyncStorage.getItem('userInfor')
                if (user !== null) {
                    user = JSON.parse(user)
                    setUserInfor(user)
                    navigation.reset({
                        index: 0,
                        routes: [{ name: 'Main' }]
                    })
                } else {
                    navigation.reset({
                        index: 0,
                        routes: [{ name: 'Login' }]
                    })
                }
            }
        } catch (error) {
            console.log(error);
        }
    }
    const CheckIsRefreshToken = async () => {
        try {
            const refreshToken = await AsyncStorage.getItem('refreshToken')
            if (refreshToken) {
                if (!checkTokenExpiration(refreshToken)) {
                    await AsyncStorage.removeItem('refreshToken')
                    await AsyncStorage.removeItem('userInfor')
                    await AsyncStorage.removeItem('accessToken')
                }
            }
        } catch (error) {
            console.log(`IsRefreshToken ${error}`);
        }
    }
    useEffect(() => {
        CheckIsRefreshToken()
        CheckIsNewDevice()
    }, [])
    const register = async ({ email, password }) => {
        try {
            const optionsRegister = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            }
            const existingUser = await fetch(API_URL + 'auth/register', optionsRegister).then(res => res.json())
            Alert.alert('Notification', `${existingUser.message}`)
            navigation.reset({
                index: 0,
                routes: [{ name: 'Login' }]
            })
        } catch (error) {
            Alert.alert('Notification', `${error.message}`)
            console.log(`Register ${error}`);
        }
    }
    const login = async ({ email, password }) => {
        try {
            const optionsLogin = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            }
            const res = await fetch(API_URL + 'auth/login', optionsLogin)
            const existingUser = await res.json()
            if (!res.ok) {
                return Alert.alert('Notification', `${existingUser.message}`)
            }
            const { accessToken, refreshToken, user } = existingUser
            setUserInfor(user)
            await AsyncStorage.setItem('userInfor', JSON.stringify(user))
            await AsyncStorage.setItem('refreshToken', refreshToken)
            await AsyncStorage.setItem('accessToken', accessToken)
            if (user?.isNewUser) {
                navigation.reset({
                    index: 0,
                    routes: [{ name: 'RegisterProcess' }]
                })
            } else {
                navigation.reset({
                    index: 0,
                    routes: [{ name: 'Main' }]
                })
            }
        } catch (error) {
            Alert.alert('Notification', `${error.message}`)
            console.log(`Login ${error}`);
        }
    }
    const logout = async () => {
        try {
            const refreshToken = await AsyncStorage.getItem('refreshToken')
            const optionsLogout = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${refreshToken}`
                }
            }
            await fetch(API_URL + 'auth/logout', optionsLogout)
            await AsyncStorage.removeItem('refreshToken')
            await AsyncStorage.removeItem('accessToken')
            await AsyncStorage.removeItem('userInfor')
            navigation.reset({
                index: 0,
                routes: [{ name: 'Login' }]
            })
        } catch (error) {
            console.log(`Logout ${error}`);
        }
    }
    const refreshToken = async () => {
        try {
            CheckIsRefreshToken()
            const refreshToken = await AsyncStorage.getItem('refreshToken')
            if (!refreshToken) {
                return navigation.reset({
                    index: 0,
                    routes: [{ name: 'Login' }]
                })
            }
            const optionsRefresh = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${refreshToken}`
                }
            }
            const existingToken = await fetch(API_URL + 'auth/refresh', optionsRefresh).then(res => res.json())
            const { accessToken: newAccessToken, refreshToken: newRefreshToken } = existingToken
            // Save new accessToken & refreshToken
            await AsyncStorage.setItem('accessToken', newAccessToken)
            await AsyncStorage.setItem('refreshToken', newRefreshToken)
            return newAccessToken
        } catch (error) {
            console.log(`RefreshToken ${error}`);
        }
    }
    const checkTokenExpiration = (token) => {
        const decode = jwt_decode(token)
        const expirationTime = decode.exp
        const currentTime = new Date().getTime() / 1000 //swap seconds to milliseconds
        if (expirationTime < currentTime) {
            return false
        } else {
            return true
        }
    }
    const updateUserInfor = async ({ data, id }) => {
        try {
            let accessToken = await AsyncStorage.getItem('accessToken')
            if (!checkTokenExpiration(accessToken)) {
                accessToken = await refreshToken()
            }
            const optionsUpdateUserInfor = {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${accessToken}`
                },
                body: JSON.stringify(data)
            }
            const existingUser = await fetch(API_URL + `auth/update-profile/${id}`, optionsUpdateUserInfor).then(res => res.json())
            await AsyncStorage.setItem('userInfor', JSON.stringify(existingUser.data))
            setUserInfor(existingUser.data)
        } catch (error) {
            console.log(`Update-profile ${error}`);
        }
    }

    return <AuthContext.Provider value={{
        login,
        register,
        logout,
        userInfor,
        refreshToken,
        checkTokenExpiration,
        updateUserInfor,
        disableBottomTab,
        setDisableBottomTab
    }}>
        {isLoading ? <ActivityIndicator size={'large'} color={"#24C87C"} style={{ flex: 1 }} /> : children}
    </AuthContext.Provider>
}