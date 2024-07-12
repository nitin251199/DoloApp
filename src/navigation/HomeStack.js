import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AppointmentList from '../screens/AppointmentList';
import AddDoctor from '../screens/AddDoctor';
import AppointmentScreen from '../screens/AppointmentScreen';
import HomeScreen from '../screens/HomeScreen';
<<<<<<< HEAD
import FlashMessage from '../screens/FlashMessage';
import AssistantDashboard from '../screens/AssistantDashboard';
import FeedbackScreen from '../screens/FeedbackScreen';
import AddAssistant from '../screens/AddAssistant';
import PaymentHistory from '../screens/PaymentHistory';
import MySchedule from '../screens/MySchedule';
import SettingScreen from '../screens/SettingScreen';
=======
import MapScreen from '../screens/MapScreen';
import NotificationScreen from '../screens/NotificationScreen';

>>>>>>> d1975df8ed49d1788667332400a166743f1d1a3b

const Stack = createNativeStackNavigator();

export const HomeStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="Home1"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Home1" component={HomeScreen} />
<<<<<<< HEAD
      <Stack.Screen name="Appointment" component={AppointmentScreen} />
      <Stack.Screen name="Schedule" component={MySchedule} />
      <Stack.Screen name="AppointmentList" component={AppointmentList} />
      <Stack.Screen name="Flash" component={FlashMessage} />
      <Stack.Screen name="AssistantDashboard" component={AssistantDashboard} />
      <Stack.Screen name="AddAssistant" component={AddAssistant} />
      <Stack.Screen name="Feedback" component={FeedbackScreen} />
      <Stack.Screen name="PaymentHistory" component={PaymentHistory} />
      <Stack.Screen name="Settings" component={SettingScreen} />
=======
      <Stack.Screen name="Doctor" component={DoctorScreen} />
      <Stack.Screen name="AddDoctor" component={AddDoctor} />
      <Stack.Screen name="DoctorList" component={DoctorList} />
      <Stack.Screen name="Notification" component={NotificationScreen} />
>>>>>>> d1975df8ed49d1788667332400a166743f1d1a3b
    </Stack.Navigator>
  );
};
