import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from '../screens_assistant/HomeScreen';
import AddPatient from '../screens_assistant/AddPatient';
import PatientsQueue from '../screens_assistant/PatientsQueue';
import UploadPrescription from '../screens_assistant/UploadPrescription';
import UploadScreen from '../screens_assistant/UploadScreen';
import AssistantProfile from '../screens_assistant/AssistantProfile';
import EngagementScreen from '../screens_assistant/EngagementScreen';
import SettingsScreen from '../screens_assistant/SettingsScreen';

const Stack = createStackNavigator();

function AssistantNavigator() {
  const config = {
    animation: 'spring',
    config: {
      stiffness: 1000,
      damping: 500,
      mass: 3,
      overshootClamping: true,
      restDisplacementThreshold: 0.01,
      restSpeedThreshold: 0.01,
    },
  };

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="AddPatient" component={AddPatient} />
      <Stack.Screen
        name="Queue"
        component={PatientsQueue}
        // options={{
        //   gestureDirection: 'horizontal',
        //   transitionSpec: {
        //     open: config,
        //     close: config,
        //   },
        // }}
      />
      <Stack.Screen name="UploadPrescription" component={UploadPrescription} />
      <Stack.Screen name="Upload" component={UploadScreen} />
      <Stack.Screen name="AssistantProfile" component={AssistantProfile} />
      <Stack.Screen name="Engagements" component={EngagementScreen} />
      <Stack.Screen name="Settings" component={SettingsScreen} />
    </Stack.Navigator>
  );
}

export default AssistantNavigator;
