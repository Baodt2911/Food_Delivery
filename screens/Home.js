import React, { useContext, useEffect, useState } from 'react'
import { View, Text, ImageBackground, TouchableOpacity, ScrollView, RefreshControl, Keyboard } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Pattern from '../assets/images/Pattern1.png'
import Voucher from '../components/Voucher'
import Restaurant from '../components/Restaurant'
import Menu from '../components/Menu'
import Search from '../components/Search'
import { AuthContext } from '../context/AuthProvider'
const Home = ({ navigation }) => {
    const [isRefresh, setIsRefresh] = useState(false)
    const [isSearch, setIsSearch] = useState(false)
    const { setDisableBottomTab } = useContext(AuthContext)
    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
            setDisableBottomTab('none')
        })
        const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
            setDisableBottomTab('flex')
        })
        return () => {
            keyboardDidShowListener.remove()
            keyboardDidHideListener.remove()
        }
    }, [])
    const optionsMenu = {
        title: 'Popular Menu',
        url: 'dishes/popular?limit=30',
        style: {
            width: '100%',
            height: 80,
        },
        contentContainerStyle: {
            rowGap: 20
        }
    }
    const optionsRestaurant = {
        title: 'Popular Restaurant',
        url: 'restaurants/popular?limit=10',
        style: {
            width: 150,
            height: 180,
        },
        contentContainerStyle: {
            rowGap: 20,
            alignItems: 'center'
        },
        numColumns: 2
    }
    const handleShowSuggestSearch = (params) => {
        setIsSearch(params)
    }
    return (
        <SafeAreaView className='flex-1 '>
            <KeyboardAwareScrollView className='flex-1' showsVerticalScrollIndicator={false} refreshControl={
                <RefreshControl refreshing={false} onRefresh={() => setIsRefresh(!isRefresh)} />
            }>
                <ImageBackground source={Pattern} resizeMode='cover'
                    className='flex-1'>
                    {/* Header */}
                    <View style={{ flex: isSearch ? 1 : 2 }}>
                        <Search handleShowSuggestSearch={(params) => handleShowSuggestSearch(params)} />
                    </View>
                    {/* Content */}
                    <View style={{ flex: 5, display: isSearch ? 'none' : 'flex', marginTop: 20 }}>
                        <View className='w-[325] h-[150] mx-auto'>
                            {/*List Voucher */}
                            <Voucher isRefresh={isRefresh} />
                        </View>
                        {/* Restaurants */}
                        <View className='mx-5 mt-5 h-[230]'>
                            <View className='flex-row items-center justify-between'>
                                <Text className='font-[BentonSans-Bold] text-base'>Popular Restaurant</Text>
                                <TouchableOpacity onPress={() =>
                                    navigation.navigate('ViewMore', optionsRestaurant
                                    )}>
                                    <Text className='text-xs font-[BentonSans-Book] text-[#FF7C32]'>View More</Text>
                                </TouchableOpacity>
                            </View>
                            {/*List Restaurant Popular */}
                            <Restaurant isRefresh={isRefresh} />
                        </View>
                        {/* Menu */}
                        <View className='mx-5 mt-5 pb-32'>
                            <View className='flex-row items-center justify-between'>
                                <Text className='font-[BentonSans-Bold] text-base'>Popular Menu</Text>
                                <TouchableOpacity onPress={() =>
                                    navigation.navigate('ViewMore', optionsMenu)
                                }>
                                    <Text className='text-xs font-[BentonSans-Book] text-[#FF7C32]'>View More</Text>
                                </TouchableOpacity>
                            </View>
                            {/*List Menu Popular*/}
                            <Menu isRefresh={isRefresh} />
                        </View>
                    </View>
                </ImageBackground>
            </KeyboardAwareScrollView>
        </SafeAreaView>
    )
}

export default Home