import { View, Text } from 'react-native'
import CartIcon from '../../icons/Cart.svg'
const ButtonCart = ({ focused }) => {
    return (
        <View style={{
            paddingHorizontal: 10,
            height: 40,
            backgroundColor: focused ? '#E9F9F2' : 'transparent',
            borderRadius: 10,
            flexDirection: 'row',
            alignItems: 'center',
            gap: 10
        }}>
            <CartIcon />
            {
                focused ? <Text>Cart</Text> : <></>
            }
        </View >
    )
}

export default ButtonCart