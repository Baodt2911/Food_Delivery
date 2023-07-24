import { View, Text, Image, TouchableOpacity, Alert, Dimensions } from 'react-native'
import React, { useContext, useState } from 'react'
import BottomSheet from '../components/BottomSheet'
import { AuthContext } from '../context/AuthProvider'
import { URL_IMAGE } from '@env'
import OrderHistory from '../components/OrderHistory'
import AlertCustom from '../components/AlertCustom'
const Profile = () => {
    const { userInfor, logout } = useContext(AuthContext)
    const widthScreen = Dimensions.get('window').width
    const [isModalVisible, setIsModalVisible] = useState(false)
    const handleShowAlert = () => {
        setIsModalVisible(true)
    }
    const handleCloseAlert = () => {
        setIsModalVisible(false)
    }
    return (
        <View className='flex-1'>
            <Image style={{ width: '100%', height: '60%' }}
                source={{ uri: URL_IMAGE + userInfor.photoURL + '?alt=media' }} />
            <BottomSheet>
                {/* Content */}
                <View className='flex-1 px-5'>
                    {/* type member */}
                    <View className='w-[120] h-[34] bg-bgrSearch items-center justify-center rounded-2xl'>
                        <Text className='text-sm font-[BentonSans-Medium] text-[#FEAD1D]'>Member Gold</Text>
                    </View>
                    {/* infor */}
                    <View className='mt-5 flex-row items-center justify-between'>
                        <View style={{ width: widthScreen * 0.65 }}>
                            {/* Name user */}
                            <Text className='font-[BentonSans-Bold] text-[27px] leading-8'>{userInfor.displayName}</Text>
                            {/* Email */}
                            <Text className='font-[BentonSans-Medium] opacity-30 text-[#3B3B3B] mt-1'>{userInfor.email}</Text>
                        </View>
                        {/* Alert */}
                        <AlertCustom
                            title={'Notification'}
                            message={'Are you sure you want to sign out?'}
                            visible={isModalVisible}
                            onClose={handleCloseAlert}
                            callbackOrButton={[
                                {
                                    text: 'Cancel',
                                    onPress: () => { },
                                },
                                {
                                    text: 'Yes',
                                    onPress: () => logout()
                                }
                            ]}
                        />
                        <TouchableOpacity onPress={handleShowAlert}
                            className='bg-bgrButton w-[80] h-8 items-center justify-center rounded-xl'>
                            <Text className='text-sm font-[BentonSans-Medium] text-white'>Logout</Text>
                        </TouchableOpacity>
                    </View>
                    {/* OrderHistory */}
                    <Text className='font-[BentonSans-Bold] text-xl my-5'>Order History</Text>
                    <OrderHistory />
                </View>
            </BottomSheet>
        </View>
    )
}

export default Profile