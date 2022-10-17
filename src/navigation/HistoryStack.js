import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AddDoctor from '../screens/AddDoctor';
import DoctorScreen from '../screens/DoctorScreen';
import DoctorHistory from '../screens/DoctorHistory';

const Stack = createNativeStackNavigator();

export const HistoryStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="DoctorHistory1"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="DoctorHistory1" component={DoctorHistory} />
      <Stack.Screen name="Doctor" component={DoctorScreen} />
      <Stack.Screen name="AddDoctor" component={AddDoctor} />
    </Stack.Navigator>
  );
};
