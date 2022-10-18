import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import ProfileScreen from '../screens/ProfileScreen';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Color} from '../theme';
import {HomeStack} from './HomeStack';
import {ScheduleStack} from './ScheduleStack';

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
        name="MySchedule"
        component={ScheduleStack}
        options={{
          tabBarLabel: 'Schedule',
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
