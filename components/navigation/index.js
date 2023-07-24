import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../../screens/Home';
import Profile from '../../screens/Profile';
import Cart from '../../screens/Cart';
import Chat from '../../screens/Chat';
import Button from '../Button';
import HomeIcon from '../../assets/icons/Home.svg'
import ProfileIcon from '../../assets/icons/Profile.svg'
import CartIcon from '../../assets/icons/Cart.svg'
import ChatIcon from '../../assets/icons/Chat.svg'
import { Platform } from 'react-native';
import ViewMore from '../../screens/ViewMore';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthProvider';
import RegisterProcess from '../../screens/RegisterProcess';
const Tab = createBottomTabNavigator()
const Main = () => {
    const { userInfor: { isNewUser }, disableBottomTab } = useContext(AuthContext)
    return (
        <>
            {
                isNewUser ? <RegisterProcess /> :
                    <Tab.Navigator initialRouteName="Home"
                        screenOptions={{
                            headerShown: false,
                            title: '',
                            tabBarStyle: {
                                display: Platform.OS === 'ios' ? 'flex' : disableBottomTab,
                                position: 'absolute',
                                bottom: Platform.OS === 'ios' ? 30 : 20,
                                left: 10,
                                right: 10,
                                backgroundColor: '#fff',
                                borderRadius: 22,
                                height: 70,
                                paddingVertical: Platform.OS === 'ios' ? 35 : 10,
                                borderColor: 'transparent',
                                paddingHorizontal: 15,
                                shadowColor: '#5a6cea66',
                                shadowOffset: { width: 0, height: -2 },
                                shadowOpacity: 0.3,
                                shadowRadius: 10,
                                elevation: 10,
                            },
                        }} >
                        <Tab.Screen name="Home" component={Home} options={{
                            tabBarIcon: ({ focused }) => <Button focused={focused} icon={<HomeIcon />} title={'Home'} />,
                        }} />
                        <Tab.Screen name="Profile" component={Profile} options={{
                            tabBarIcon: ({ focused }) => <Button focused={focused} icon={<ProfileIcon />} title={'Profile'} />,
                        }}
                        />
                        <Tab.Screen name="Cart" component={Cart} options={{
                            tabBarIcon: ({ focused }) => <Button focused={focused} icon={<CartIcon />} title={'Cart'} />,
                        }} />
                        <Tab.Screen name="Chat" component={Chat} options={{
                            tabBarIcon: ({ focused }) => <Button focused={focused} icon={<ChatIcon />} title={'Chat'} />,
                        }} />
                        <Tab.Screen name='ViewMore' component={ViewMore} options={{ tabBarButton: () => null }} />
                    </Tab.Navigator>
            }
        </>
    )
}
export default Main