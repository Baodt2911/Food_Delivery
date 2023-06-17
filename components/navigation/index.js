import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../../screens/Home';
import Profile from '../../screens/Profile';
import Cart from '../../screens/Cart';
import Chat from '../../screens/Chat';
import ButtonHome from '../../assets/theme/ButtonHome';
import ButtonProfile from '../../assets/theme/ButtonProfile';
import ButtonCart from '../../assets/theme/ButtonCart';
import ButtonChat from '../../assets/theme/ButtonChat';
const Tab = createBottomTabNavigator()
const Main = () => {
    return (
        <Tab.Navigator initialRouteName="Home"
            screenOptions={{
                headerShown: false,
                title: '',
                tabBarStyle: {
                    position: 'absolute',
                    bottom: 20,
                    left: 10,
                    right: 10,
                    backgroundColor: '#fff',
                    borderRadius: 22,
                    height: 60,
                    shadowColor: '#f5f5f5',
                    elevation: 5,
                    borderColor: 'transparent',
                    paddingVertical: 10,
                    paddingHorizontal: 15
                },
            }} >
            <Tab.Screen name="Home" component={Home} options={{
                tabBarIcon: ({ focused }) => <ButtonHome focused={focused} />,
            }} />
            <Tab.Screen name="Profile" component={Profile} options={{
                tabBarIcon: ({ focused }) => <ButtonProfile focused={focused} />,
            }}
            />
            <Tab.Screen name="Cart" component={Cart} options={{
                tabBarIcon: ({ focused }) => <ButtonCart focused={focused} />,
            }} />
            <Tab.Screen name="Chat" component={Chat} options={{
                tabBarIcon: ({ focused }) => <ButtonChat focused={focused} />,
            }} />
        </Tab.Navigator>
    )
}
export default Main