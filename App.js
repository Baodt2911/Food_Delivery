import { StatusBar } from 'expo-status-bar';
import { Text, View, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useFonts } from 'expo-font';
import Onboarding2 from './screens/Onboarding2';
import Onboarding1 from './screens/Onboarding1';
import Main from './components/navigation';
import Login from './screens/Login';
import Register from './screens/Register';
import RegisterProcess from './screens/RegisterProcess';
import UploadPhoto from './screens/UploadPhoto';
import CameraPhoto from './components/camera';
import SetLocation from './screens/SetLocation';
import RegisterSuccess from './screens/RegisterSuccess';
import VerificationCode from './screens/VerificationCode';
import ForgotPassword from './screens/ForgotPassword';
import ResetPassword from './screens/ResetPassword';
import ResetPasswordSuccess from './screens/ResetPasswordSuccess';
import Detail from './screens/Detail';
import Notification from './screens/Notification';
import { AuthProvider } from './context/AuthProvider';
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
      <AuthProvider>
        <Stack.Navigator initialRouteName='Onboarding1' screenOptions={{ headerShown: false }}>
          <Stack.Screen name='Onboarding1' component={Onboarding1} />
          <Stack.Screen name='Onboarding2' component={Onboarding2} />
          <Stack.Screen name='Login' component={Login} />
          <Stack.Screen name='Forgot' component={ForgotPassword} />
          <Stack.Screen name='Verification' component={VerificationCode} />
          <Stack.Screen name='ResetPassword' component={ResetPassword} />
          <Stack.Screen name='ResetPasswordSuccess' component={ResetPasswordSuccess} />
          <Stack.Screen name='Register' component={Register} />
          <Stack.Screen name='RegisterProcess' component={RegisterProcess} />
          <Stack.Screen name='UploadPhoto' component={UploadPhoto} />
          <Stack.Screen name='Camera' component={CameraPhoto} />
          <Stack.Screen name='SetLocation' component={SetLocation} />
          <Stack.Screen name='Success' component={RegisterSuccess} />
          <Stack.Screen name='Main' component={Main} />
          <Stack.Screen name='Notification' component={Notification} />
          <Stack.Screen name='Detail' component={Detail} />
        </Stack.Navigator>
      </AuthProvider>
    </NavigationContainer>
  );
}

