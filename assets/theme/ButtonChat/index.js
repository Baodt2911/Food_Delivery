import { View, Text } from 'react-native'
import ChatIcon from '../../icons/Chat.svg'
const ButtonChat = ({ focused }) => {
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
            <ChatIcon />
            {
                focused ? <Text>Chat</Text> : <></>
            }
        </View >
    )
}

export default ButtonChat