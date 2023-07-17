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
    const CheckIsNewDevice = async () => {
        try {
            // await AsyncStorage.clear()
            const isNewDevice = await AsyncStorage.getItem('isNewDevice')
            if (isNewDevice === null) {
                await AsyncStorage.setItem('isNewDevice', 'true')
            } else {
                navigation.reset({
                    index: 0,
                    routes: [{ name: 'Login' }]
                })
            }
        } catch (error) {
            console.log(error);
        }
    }
    const CheckIsloggedIn = async () => {
        try {
            let user = await AsyncStorage.getItem('userInfor')
            if (user !== null) {
                user = JSON.parse(user)
                setUserInfor(user)
                navigation.reset({
                    index: 0,
                    routes: [{ name: 'Main' }]
                })
            }

        } catch (error) {
            console.log(`isLoggedIn ${error}`);
        }
    }
    useEffect(() => {
        CheckIsNewDevice()
        CheckIsloggedIn()
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
            Alert.alert('Notification', `${existingUser.message}`, [
                {
                    text: 'OK',
                    onPress: () => { }
                }
            ])
            if (existingUser.message === "Register successfully") {
                navigation.reset({
                    index: 0,
                    routes: [{ name: 'Login' }]
                })
            }
        } catch (error) {
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
            const existingUser = await fetch(API_URL + 'auth/login', optionsLogin).then(res => res.json())
            console.log({ existingUser });
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
                CheckIsloggedIn()
            }
        } catch (error) {
            console.log(`Login ${error}`);
        }
    }
    const logout = async () => {
        try {
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
    const refreshToken = async (token) => {
        try {
            const optionsRefresh = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }
            const existingToken = await fetch(API_URL + 'auth/refresh', optionsRefresh).then(res => res.json())
            const { accessToken, refreshToken } = existingToken
            // Save new accessToken & refreshToken
            await AsyncStorage.setItem('accessToken', accessToken)
            await AsyncStorage.setItem('refreshToken', refreshToken)
            return accessToken
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
    const updateUserInfor = async ({ phoneNumber, displayName, photoURL, address, _id, token }) => {
        try {
            const optionsUpdateUserInfor = {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({ phoneNumber, displayName, photoURL, address, isNewUser: false })
            }
            const existingUser = await fetch(API_URL + `auth/update-profile/${_id}`, optionsUpdateUserInfor).then(res => res.json())
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
        checkTokenExpiration,
        updateUserInfor,
        refreshToken
    }}>
        {children}
    </AuthContext.Provider>
}