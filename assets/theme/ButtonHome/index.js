import { View, Text } from 'react-native'
import HomeIcon from '../../icons/Home.svg'
const ButtonHome = ({ focused }) => {
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
            <HomeIcon />
            {
                focused ? <Text>Home</Text> : <></>
            }
        </View >
    )
}

export default ButtonHome