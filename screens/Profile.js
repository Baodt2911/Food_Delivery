import { View, Text, Image, TouchableOpacity, Alert } from 'react-native'
import React, { useContext } from 'react'
import BottomSheet from '../components/BottomSheet'
import { AuthContext } from '../context/AuthProvider'
import { URL_IMAGE } from '@env'
const Profile = () => {
    const { userInfor, logout } = useContext(AuthContext)
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
                        <View>
                            {/* Name user */}
                            <Text className='font-[BentonSans-Bold] text-[27px]'>{userInfor.displayName}</Text>
                            {/* Email */}
                            <Text className='font-[BentonSans-Medium] opacity-30 text-[#3B3B3B] mt-1'>{userInfor.email}</Text>
                        </View>
                        <TouchableOpacity onPress={() => {
                            Alert.alert('Notification', 'Are you sure you want to sign out?', [
                                {
                                    text: 'Cancel',
                                    onPress: () => { },
                                },
                                {
                                    text: 'Yes',
                                    onPress: () => logout()
                                }
                            ])
                        }}
                            className='bg-bgrButton w-[80] h-8 items-center justify-center rounded-xl'>
                            <Text className='text-sm font-[BentonSans-Medium] text-white'>Logout</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </BottomSheet>
        </View>
    )
}

export default Profile