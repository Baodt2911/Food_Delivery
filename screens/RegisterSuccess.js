import React, { useContext, useState } from 'react'
import { View, Text, ImageBackground, TouchableOpacity, ActivityIndicator, LogBox } from 'react-native'
import Pattern from '../assets/images/Pattern.png'
import Illustration from '../assets/images/Illustration_3.svg'
import { AuthContext } from '../context/AuthProvider'
const RegisterSuccess = ({ navigation, route }) => {
    const { updateUserInfor, userInfor } = useContext(AuthContext)
    const { phoneNumber, displayName, photoURL, address, onUploadPhoto } = route.params
    LogBox.ignoreLogs([
        'Non-serializable values were found in the navigation state',
    ]);
    const [isLoading, setIsLoading] = useState(false)
    const handleUpdateUserInfor = async () => {
        setIsLoading(true)
        await onUploadPhoto()
        const data = { phoneNumber, displayName, photoURL, address, isNewUser: false }
        await updateUserInfor({ data, id: userInfor._id })
        setIsLoading(false)
        navigation.navigate('Main')
    }
    return (
        <ImageBackground source={Pattern} resizeMode='cover' className='flex-1 bg-[#ffffff] justify-center items-center'>
            <View className='justify-center items-center'>
                <Illustration />
                <Text className='font-[BentonSans-Bold] text-3xl text-bgrButton mt-8'>Congrats!</Text>
                <Text className='font-[BentonSans-Bold] text-2xl mt-3'>Your Profile Is Ready To Use</Text>
            </View>
            <View className=' w-full  items-center absolute bottom-[60] left-0 right-0'>
                {
                    isLoading ? <ActivityIndicator color={"#24C87C"} /> :
                        <TouchableOpacity onPress={() => handleUpdateUserInfor()}
                            className='bg-bgrButton  w-[160] h-[50px] rounded-[15px] justify-center items-center'>
                            <Text className='text-white text-xl font-[BentonSans-Bold] '>Try Order</Text>
                        </TouchableOpacity>
                }
            </View>
        </ImageBackground>
    )
}

export default RegisterSuccess