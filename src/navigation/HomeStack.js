import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AppointmentList from '../screens/AppointmentList';
import AddDoctor from '../screens/AddDoctor';
import AppointmentScreen from '../screens/AppointmentScreen';
import HomeScreen from '../screens/HomeScreen';
import MapScreen from '../screens/MapScreen';

const Stack = createNativeStackNavigator();

export const HomeStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="Home1"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Home1" component={HomeScreen} />
      <Stack.Screen name="Appointment" component={AppointmentScreen} />
      <Stack.Screen name="AddDoctor" component={AddDoctor} />
      <Stack.Screen name="AppointmentList" component={AppointmentList} />
    </Stack.Navigator>
  );
};
