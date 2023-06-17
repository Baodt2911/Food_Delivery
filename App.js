import { StatusBar } from 'expo-status-bar';
import { Text, View, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Onboarding2 from './screens/Onboarding2';
import Onboarding1 from './screens/Onboarding1';
import Main from './components/navigation';
import { useFonts } from 'expo-font';
import Login from './screens/Login';
import Register from './screens/Register';
const Stack = createNativeStackNavigator()

export default function App() {
  const [fontsLoaded] = useFonts({
    'BentonSans-Book': require('./assets/fonts/BentonSans-Book.otf'),
    'BentonSans-Bold': require('./assets/fonts/BentonSans-Bold.otf'),
    'BentonSans-Medium': require('./assets/fonts/BentonSans-Medium.otf'),
    'BentonSans-Regular': require('./assets/fonts/BentonSans-Regular.otf'),
    'Roboto-Medium': require('./assets/fonts/Roboto-Medium.ttf'),
    'Roboto-Regular': require('./assets/fonts/Roboto-Regular.ttf'),
  })
  if (!fontsLoaded) {
    return null;
  }
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Onboarding1' screenOptions={{ headerShown: false }}>
        <Stack.Screen name='Onboarding1' component={Onboarding1} />
        <Stack.Screen name='Onboarding2' component={Onboarding2} />
        <Stack.Screen name='Login' component={Login} />
        <Stack.Screen name='Register' component={Register} />
        <Stack.Screen name='Main' component={Main} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

