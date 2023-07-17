import { useEffect, useState } from "react"
import { ScrollView } from "react-native"
import Skeleton from "../Skeleton"
import CardVoucher from "../CardVoucher"
import { API_URL } from '@env'
const Voucher = ({ isRefresh }) => {
    const [resultsVoucher, setResultsVoucher] = useState(null)
    useEffect(() => {
        setResultsVoucher(null)
        const fetchData = async () => {
            const voucherData = await fetch(API_URL + 'dishes/popular').then(response => response.json());
            setResultsVoucher(voucherData)

        }
        fetchData()
    }, [isRefresh])
    return (
        <ScrollView style={{ flex: 1 }}
            horizontal={true}
            pagingEnabled={true}
            decelerationRate={1}
            snapToAlignment="start"
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ columnGap: 20 }}
        >
            {/* Item Voucher */}
            {
                !resultsVoucher ? <Skeleton width={325} height={'100%'} style={{ borderRadius: 12 }} /> :
                    resultsVoucher.data.map(data =>
                        <CardVoucher url={data.photoURL} key={data._id} />
                    )
            }
        </ScrollView>

    )
}
export default Voucher