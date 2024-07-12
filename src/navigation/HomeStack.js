import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AppointmentList from '../screens/AppointmentList';
import AddDoctor from '../screens/AddDoctor';
import AppointmentScreen from '../screens/AppointmentScreen';
import HomeScreen from '../screens/HomeScreen';
import FlashMessage from '../screens/FlashMessage';
import AssistantDashboard from '../screens/AssistantDashboard';
import FeedbackScreen from '../screens/FeedbackScreen';
import AddAssistant from '../screens/AddAssistant';
import PaymentHistory from '../screens/PaymentHistory';
import MySchedule from '../screens/MySchedule';
import SettingScreen from '../screens/SettingScreen';
import MapScreen from '../screens/MapScreen';
import NotificationScreen from '../screens/NotificationScreen';

import TodayAppointments from '../screens/TodayAppointments';
import ProfileScreen from '../screens/ProfileScreen';
import FeedbackDetails from '../screens/FeedbackDetails';
import SearchPatient from '../screens/SearchPatient';
import UpdateProfile from '../screens/UpdateProfile';
import AllAppointments from '../screens/AllAppointments';
import DisableAppointments from '../screens/DisableAppointments';
import NotificationScreen from '../screens/NotificationScreen';

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
      <Stack.Screen name="Schedule" component={MySchedule} />
      <Stack.Screen name="AppointmentList" component={AppointmentList} />
      <Stack.Screen name="Flash" component={FlashMessage} />
      <Stack.Screen name="AssistantDashboard" component={AssistantDashboard} />
      <Stack.Screen name="AddAssistant" component={AddAssistant} />
      <Stack.Screen name="Feedback" component={FeedbackScreen} />
      <Stack.Screen name="PaymentHistory" component={PaymentHistory} />
      <Stack.Screen name="Settings" component={SettingScreen} />
      <Stack.Screen name="Doctor" component={DoctorScreen} />
      <Stack.Screen name="AddDoctor" component={AddDoctor} />
      <Stack.Screen name="DoctorList" component={DoctorList} />
      <Stack.Screen name="Today" component={TodayAppointments} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="FeedbackDetails" component={FeedbackDetails} />
      <Stack.Screen name="SearchPatient" component={SearchPatient} />
      <Stack.Screen name="UpdateProfile" component={UpdateProfile} />
      <Stack.Screen name="AllAppointments" component={AllAppointments} />
      <Stack.Screen name="DisableAppointments" component={DisableAppointments} />
      <Stack.Screen name="Notification" component={NotificationScreen} />
    </Stack.Navigator>
  );
};
