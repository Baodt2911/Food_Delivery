import { useEffect, useState } from "react"
import { View, Dimensions } from "react-native"
import Skeleton from "../Skeleton"
import CardMenu from '../CardMenu'
import { API_URL } from '@env'
const Menu = ({ isRefresh }) => {
    const widthDimension = Dimensions.get('window').width
    const [resultsMenu, setResultsMenu] = useState(null)
    useEffect(() => {
        setResultsMenu(null)
        const fetchData = async () => {
            const menuData = await fetch(API_URL + 'dishes/popular').then(response => response.json());
            setResultsMenu(menuData);
        }
        fetchData()
    }, [isRefresh])
    return (
        <View style={{ rowGap: 20, marginTop: 20 }}>
            {
                !resultsMenu ?
                    <View style={{ rowGap: 20 }}>
                        <Skeleton width={widthDimension > 375 ? '100%' : 325} height={80} style={{ borderRadius: 16 }} />
                        <Skeleton width={widthDimension > 375 ? '100%' : 325} height={80} style={{ borderRadius: 16 }} />
                        <Skeleton width={widthDimension > 375 ? '100%' : 325} height={80} style={{ borderRadius: 16 }} />
                        <Skeleton width={widthDimension > 375 ? '100%' : 325} height={80} style={{ borderRadius: 16 }} />
                    </View>
                    :
                    resultsMenu?.data.map((data) =>
                        <CardMenu id={data._id} name={data.name} restaurant={data?.restaurant[0].name} price={data.price} url={data.photoURL} key={data._id} />
                    )
            }
        </View>
    )
}
export default Menu