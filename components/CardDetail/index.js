import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import ICON_BAG from '../../assets/icons/shopping-bag.svg'
import ICON_STAR from '../../assets/icons/icon-star.svg'
import ICON_STAR_EVALUATE from '../../assets/icons/star-evaluate.svg'
import ICON_LOCATION_SOLID from '../../assets/icons/location-solid.svg'
import { API_URL } from '@env'
import PopularMenuRestaurant from '../PopularMenuRestaurant'
import Skeleton from '../Skeleton'
const CardDetail = ({ id, type }) => {
    const [resultsDetail, setResultsDetail] = useState(null)
    useEffect(() => {
        const fetchData = async () => {
            const detailData = await fetch(API_URL + `${type}/id/${id}`).then(response => response.json());
            setResultsDetail(detailData);
        }
        fetchData()
    }, [id])
    const Loading = () => {
        return (
            <View className='mx-[30] mt-5'>
                <Skeleton width={235} height={35} style={{ borderRadius: 5 }} />
                <View className='flex-row items-center my-5' style={{ columnGap: 20 }}>
                    <Skeleton width={70} height={15} style={{ borderRadius: 5 }} />
                    <Skeleton width={70} height={15} style={{ borderRadius: 5 }} />
                </View>
                <Skeleton width={'100%'} height={100} style={{ borderRadius: 5 }} />
            </View>
        )
    }
    return (
        <View className='flex-1'>
            {
                !resultsDetail ? <Loading /> :
                    <>
                        {/* Menu name */}
                        <Text className='font-[BentonSans-Bold] text-[27px] leading-8 mx-[30] mt-5'>{resultsDetail?.name}</Text>
                        {/* Description */}
                        <View className='mx-[30] mt-5'
                            style={{
                                columnGap: 20,
                                flexDirection: type === 'restaurants' ? 'row-reverse' : 'row',
                                justifyContent: type === 'restaurants' ? 'flex-end' : 'flex-start',
                                alignItems: 'center'
                            }}>
                            {/* Rating */}
                            <View className='flex-row items-center gap-x-1'>
                                {resultsDetail?.rate === 5 ? <ICON_STAR_EVALUATE width={18} height={18} /> : <ICON_STAR />}
                                <Text className='font-[BentonSans-Regular] text-sm opacity-30'>{resultsDetail?.rate} Rating</Text>
                            </View>
                            {
                                type === 'restaurants' ?
                                    <View className='flex-row items-center gap-x-1'>
                                        <ICON_LOCATION_SOLID />
                                        <Text className='font-[BentonSans-Regular] text-sm opacity-30'>19 Km</Text>
                                    </View>
                                    :
                                    /* Order */
                                    <View className='flex-row items-center gap-x-1'>
                                        <ICON_BAG />
                                        <Text className='font-[BentonSans-Regular] text-sm opacity-30'>{resultsDetail?.order}+ Order</Text>
                                    </View>
                            }
                        </View>
                        {/* Description */}
                        <Text className='mx-[30] font-[BentonSans-Book] text-xs leading-5 mt-6'>{resultsDetail?.description}</Text>
                        {/* Popular Menu */}
                        {
                            resultsDetail?.menu ? <PopularMenuRestaurant menu={resultsDetail.menu} id={id} /> : <></>
                        }
                    </>
            }
        </View>
    )
}

export default CardDetail