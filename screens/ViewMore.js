import React, { useCallback, useEffect, useState } from 'react'
import { View, Text, FlatList, ImageBackground, RefreshControl } from 'react-native'
import { API_URL } from '@env'
import Pattern from '../assets/images/Pattern1.png'
import { SafeAreaView } from 'react-native-safe-area-context'
import Search from '../components/Search'
import CardMenu from '../components/CardMenu'
import CardRestaurant from '../components/CardRestaurant'
import Skeleton from '../components/Skeleton'
const ViewMore = ({ route }) => {
    const { contentContainerStyle, style, url, numColumns, title } = route?.params
    const [data, setData] = useState(null)
    const [isRefresh, setIsRefresh] = useState(false)
    const [isSearch, setIsSearch] = useState(false)
    const fetchData = async () => {
        const existingData = await fetch(API_URL + url).then(res => res.json())
        setData(existingData)
        setIsSearch(false)
    }
    useEffect(() => {
        setData(null)
        fetchData()
    }, [url])
    const handleRefresh = async () => {
        setIsRefresh(true)
        await fetchData()
        setIsRefresh(false)
    }
    const handleShowSuggestSearch = (params) => {
        setIsSearch(params)
    }
    const onRender = useCallback(({ item, index }) => {
        if (!item?.restaurant) {
            return (
                <CardRestaurant
                    id={item._id}
                    name={item.name}
                    logo={item.logo}
                    rate={item.rate}
                    style={{
                        marginLeft: index % 2 === 0 ? 0 : 10,
                        marginRight: !(index % 2 === 0) ? 0 : 10
                    }}
                />
            )
        }
        return (
            <CardMenu
                id={item._id}
                name={item.name}
                restaurant={item.restaurant[0]?.name || item.restaurant.name}
                price={item.price}
                url={item.photoURL}
            />
        )
    }, [])
    return (
        <SafeAreaView className='flex-1'>
            <ImageBackground source={Pattern} resizeMode='cover'
                className='flex-1'>
                {/* Header */}
                <View style={{ flex: isSearch ? 1 : 2 }}>
                    <Search handleShowSuggestSearch={(params) => handleShowSuggestSearch(params)} />
                </View>
                {/* Content */}
                <View style={{ flex: 5, display: isSearch ? 'none' : 'flex' }} className='mx-5' >
                    <Text className='font-[BentonSans-Bold] text-base mb-5'>{title}</Text>
                    {
                        !data ?
                            <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', rowGap: 20, columnGap: 20 }}>
                                <Skeleton width={style.width} height={style.height} style={{ borderRadius: 16 }} />
                                <Skeleton width={style.width} height={style.height} style={{ borderRadius: 16 }} />
                                <Skeleton width={style.width} height={style.height} style={{ borderRadius: 16 }} />
                                <Skeleton width={style.width} height={style.height} style={{ borderRadius: 16 }} />
                            </View> :
                            <FlatList
                                showsVerticalScrollIndicator={false}
                                refreshControl={<RefreshControl refreshing={isRefresh}
                                    onRefresh={() => handleRefresh()} />}
                                data={data?.data}
                                renderItem={onRender}
                                keyExtractor={(item) => item._id}
                                numColumns={numColumns}
                                key={numColumns}  // Change the key value to force a re-render
                                contentContainerStyle={[{ paddingBottom: 128 }, contentContainerStyle]}
                            />
                    }
                </View>
            </ImageBackground>
        </SafeAreaView>
    )
}

export default ViewMore