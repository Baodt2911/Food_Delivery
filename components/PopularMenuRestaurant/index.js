import { View, Text, TouchableOpacity, ScrollView } from 'react-native'
import React from 'react'
import CardPopularMenuRestaurant from '../CardPopularMenuRestaurant'
import { useNavigation } from '@react-navigation/native'
const PopularMenuRestaurant = ({ menu, id }) => {
    const navigation = useNavigation()
    const optionsMenu = {
        title: 'Popular Menu',
        url: `dishes/by-restaurant/${id}`,
        style: {
            width: '100%',
            height: 80,
        },
        contentContainerStyle: {
            rowGap: 20
        }
    }
    return (
        <View className='flex-1'>
            <View className='flex-row items-center justify-between mx-[30] mt-5 mb-[20]'>
                <Text className=' font-[BentonSans-Bold] text-base'>Popular Menu</Text>
                <TouchableOpacity onPress={() =>
                    navigation.navigate('ViewMore', optionsMenu)
                }>
                    <Text className='text-xs font-[BentonSans-Book] text-[#FF7C32]'>View All</Text>
                </TouchableOpacity>
            </View>
            <View className='w-full h-[190] pl-[20] '>
                <ScrollView
                    horizontal={true}
                    pagingEnabled={true}
                    decelerationRate='fast'
                    snapToAlignment='start'
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{ columnGap: 20, paddingRight: 30, paddingLeft: 10, paddingVertical: 10 }}
                >
                    {
                        menu.map(data =>
                            <CardPopularMenuRestaurant id={data._id} name={data.name} price={data.price} photoURL={data.photoURL} key={data._id} />
                        )
                    }
                </ScrollView>
            </View>
        </View>
    )
}

export default PopularMenuRestaurant