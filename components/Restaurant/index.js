import { useEffect, useState } from "react"
import { ScrollView } from "react-native"
import Skeleton from "../Skeleton"
import { API_URL } from '@env'
import CardRestaurant from "../CardRestaurant"
const Restaurant = ({ isRefresh }) => {
    const [resultsRestaurants, setResultsRestaurants] = useState(null)
    useEffect(() => {
        setResultsRestaurants(null)
        const fetchData = async () => {
            const restaurantsData = await fetch(API_URL + 'restaurants/popular').then(response => response.json());
            setResultsRestaurants(restaurantsData);
        }
        fetchData()
    }, [isRefresh])
    return (
        <ScrollView style={{ flex: 1, marginTop: 20 }}
            horizontal={true}
            pagingEnabled={true}
            decelerationRate='fast'
            snapToAlignment="start"
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ columnGap: 20 }}
        >
            {
                !resultsRestaurants ?
                    <>
                        <Skeleton width={150} height={180} style={{ borderRadius: 16 }} />
                        <Skeleton width={150} height={180} style={{ borderRadius: 16 }} />
                    </> :
                    resultsRestaurants.data.map((data) =>
                        <CardRestaurant id={data._id} imageURL={data.imageURL} logo={data.logo} name={data.name} rate={data.rate} key={data._id} />
                    )
            }
        </ScrollView>
    )
}
export default Restaurant