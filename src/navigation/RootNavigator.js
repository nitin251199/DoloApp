import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useEffect} from 'react';
import {useTranslation} from 'react-i18next';
import {Provider as PaperProvider} from 'react-native-paper';
import {useSelector} from 'react-redux';
import AppHeader from './AppHeader';
import AssistantNavigator from './AssistantNavigator';
import AuthStack from './AuthStack';
import {DrawerContent} from './DrawerContent';
import { HomeStack } from './HomeStack';


const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

export const RootNavigator = () => {
  const isLoggedIn = useSelector(state => state.isLoggedIn);
  const type = useSelector(state => state.type);

  const language = useSelector(state => state.language) || 'en';

  const {t, i18n} = useTranslation();

  useEffect(() => {
    i18n.changeLanguage(language);
  }, []);

  function DrawerNavigator() {
    return (
      <Drawer.Navigator drawerContent={props => <DrawerContent {...props} />}>
        <Drawer.Screen
          name="DrawerNavigator"
          component={HomeStack}
          options={{
            header: props => <AppHeader {...props} />,
          }}
        />
      </Drawer.Navigator>
    );
  }

  return (
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName={isLoggedIn ? 'HomeScreen' : 'Auth'}>
          <Stack.Screen
            name="Auth"
            component={AuthStack}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="HomeScreen"
            component={type == 'doctor' ? DrawerNavigator : AssistantNavigator}
            options={{
              headerShown: false,
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
};
