import React, { useEffect, useState } from 'react'
import { View, Text } from 'react-native'
import { API_URL } from '@env'
import Skeleton from '../Skeleton'
import CardEvaluate from '../CardEvaluate'
const Evaluate = ({ id, type }) => {
    const [resultsEvaluate, setResultsEvaluate] = useState(null)
    useEffect(() => {
        const fetchData = async () => {
            const evaluateData = await fetch(API_URL + `evaluate/${id}?type=${type}`).then(res => res.json())
            setResultsEvaluate(evaluateData)
        }
        fetchData()
    }, [id])
    return (
        <>
            {
                resultsEvaluate?.data?.length === 0 ? <></> :
                    <View>
                        <Text className='ml-[30] mt-5 mb-[30] font-[BentonSans-Bold] text-base'>Testimonials</Text>
                        <View style={{ rowGap: 20, marginHorizontal: 30 }}>
                            {
                                !resultsEvaluate ?
                                    <>
                                        <Skeleton width={'100%'} height={100} style={{ borderRadius: 24 }} />
                                        <Skeleton width={'100%'} height={100} style={{ borderRadius: 24 }} />
                                    </>
                                    :
                                    resultsEvaluate?.data?.map(data =>
                                        <CardEvaluate photoURL={data.userId.photoURL} rate={data.rate} displayName={data.userId.displayName} time={data.createdAt} text={data.text} key={data._id} />
                                    )
                            }
                        </View>
                    </View>
            }
        </>)
}

export default Evaluate