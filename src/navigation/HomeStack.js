import {createNativeStackNavigator} from '@react-navigation/native-stack';
import DoctorList from '../screens/DoctorList';
import AddDoctor from '../screens/AddDoctor';
import DoctorScreen from '../screens/DoctorScreen';
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
      <Stack.Screen name="Doctor" component={DoctorScreen} />
      <Stack.Screen name="AddDoctor" component={AddDoctor} />
      <Stack.Screen name="DoctorList" component={DoctorList} />
    </Stack.Navigator>
  );
};
