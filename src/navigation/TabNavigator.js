import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import DoctorHistory from '../screens/DoctorHistory';
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Color} from '../theme';
import ClinicHistory from '../screens/ClinicHistory';
import {HomeStack} from './HomeStack';
import {HistoryStack} from './HistoryStack';

const Tab = createMaterialBottomTabNavigator();

function TabNavigator() {
  return (
    <Tab.Navigator
      activeColor="#000"
      inactiveColor="#f0edf6"
      //   sceneAnimationEnabled={true}
      barStyle={{
        backgroundColor: Color.primary,
      }}
      shifting={true}>
      <Tab.Screen
        name="Home"
        component={HomeStack}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons name="home" color={color} size={26} />
          ),
        }}
      />

      <Tab.Screen
        name="DoctorHistory"
        component={HistoryStack}
        options={{
          tabBarLabel: 'Doctors',
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons
              name="stethoscope"
              color={color}
              size={26}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons name="account" color={color} size={26} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default TabNavigator;
