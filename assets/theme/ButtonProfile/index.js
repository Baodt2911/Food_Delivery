import { View, Text } from 'react-native'
import UserIcon from '../../icons/Profile.svg'
const ButtonProfile = ({ focused }) => {
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
            <UserIcon />
            {
                focused ? <Text>Profile</Text> : <></>
            }
        </View >
    )
}

export default ButtonProfile