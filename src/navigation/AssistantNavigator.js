import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from '../screens_assistant/HomeScreen';
import AddPatient from '../screens_assistant/AddPatient';
import PatientsQueue from '../screens_assistant/PatientsQueue';
import UploadPrescription from '../screens_assistant/UploadPrescription';
import UploadScreen from '../screens_assistant/UploadScreen';
import AssistantProfile from '../screens_assistant/AssistantProfile';
import EngagementScreen from '../screens_assistant/EngagementScreen';
import SettingsScreen from '../screens_assistant/SettingsScreen';

const Stack = createNativeStackNavigator();

function AssistantNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="AddPatient" component={AddPatient} />
      <Stack.Screen name="Queue" component={PatientsQueue} />
      <Stack.Screen name="UploadPrescription" component={UploadPrescription} />
      <Stack.Screen name="Upload" component={UploadScreen} />
      <Stack.Screen name="AssistantProfile" component={AssistantProfile} />
      <Stack.Screen name="Engagements" component={EngagementScreen} />
      <Stack.Screen name="Settings" component={SettingsScreen} />
    </Stack.Navigator>
  );
}

export default AssistantNavigator;
