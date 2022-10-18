import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AddDoctor from '../screens/AddDoctor';
import DoctorScreen from '../screens/AppointmentScreen';
import MySchedule from '../screens/MySchedule';

const Stack = createNativeStackNavigator();

export const ScheduleStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="MySchedule1"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="MySchedule1" component={MySchedule} />
      <Stack.Screen name="Doctor" component={DoctorScreen} />
      <Stack.Screen name="AddDoctor" component={AddDoctor} />
    </Stack.Navigator>
  );
};
