import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Provider as PaperProvider} from 'react-native-paper';
import { useSelector } from 'react-redux';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import AuthStack from './AuthStack';
import TabNavigator from './TabNavigator';

const Stack = createNativeStackNavigator();

export const RootNavigator = () => {
  const isLoggedIn = useSelector(state => state.isLoggedIn);

  return (
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName={isLoggedIn ? 'HomeScreen' : 'Auth'}
          screenOptions={{
            headerShown: false,
          }}>
          <Stack.Screen name="Auth" component={AuthStack} />
          <Stack.Screen name="HomeScreen" component={TabNavigator} />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
};
