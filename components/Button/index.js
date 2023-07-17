import { View, Text } from 'react-native'
const Button = ({ focused, icon, title }) => {
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
            {icon}
            {
                focused ? <Text style={{ fontFamily: 'BentonSans-Medium' }}>{title}</Text> : <></>
            }
        </View >
    )
}

export default Button