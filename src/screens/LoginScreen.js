import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Keyboard,
  Animated,
  Easing,
  ToastAndroid,
  BackHandler,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';

import CustomButton from '../components/CustomButton';
import InputField from '../components/InputField';
import {Color, Dimension, Fonts} from '../theme';
// import {errorToast, successToast} from '../components/Toasts';
import BannerSlider from '../components/BannerSlider';
import {useDispatch} from 'react-redux';
import {CommonActions, useFocusEffect} from '@react-navigation/native';
import {postData} from '../API';
// import RBSheet from 'react-native-raw-bottom-sheet';
import ForgetPass from '../components/bottomsheets/ForgetPass';
import {getSyncData,storeDatasync} from '../storage/AsyncStorage';
import messaging from '@react-native-firebase/messaging';

export default function LoginScreen({navigation, route}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [contentPadding, setContentPadding] = useState(50);
  const _sheetRef = React.useRef(null);

  const animated = new Animated.Value(600);
  const duration = 400;

  useEffect(() => {
    Animated.timing(animated, {
      toValue: 0,
      duration: duration,
      easing: Easing.inOut(Easing.ease),
      useNativeDriver: true,
    }).start();
  }, []);

  const dispatch = useDispatch();

  const getFcmToken = async () => {
    let fcmToken = await getSyncData('fcmToken');
    // console.log('the old token', fcmToken);
    if (!fcmToken) {
      try {
        const fcmToken = await messaging().getToken();
        if (fcmToken) {
          // user has a device token
          console.log('the new token', fcmToken);
          await storeDatasync('fcmToken', fcmToken);
        }
      } catch (error) {
        console.log('error getting token', error);
      }
    }
  };

  useEffect(() => {
    
    getFcmToken();
   
  }, [])

  const signIn = async () => {
    var fcmToken = await getSyncData('fcmToken');
    console.log('fcm1==',fcmToken)
    setLoading(true);
    let body = {
      email,
      password,
      token:fcmToken
    };
    const response = await postData('agent/login', body);
    if (response.success) {
      ToastAndroid.show('Login Successful !', ToastAndroid.SHORT);
      setLoading(false);
      console.log('agentroll-->',response.data);
      dispatch({
        type: 'SET_USER',
        payload: response.data,
      });
      navigation.dispatch(
        CommonActions.reset({
          index: 1,
          routes: [{name: 'HomeScreen'}],
        }),
      );
    } else {
      // errorToast('Invalid Credentials', 'or User not found!');
      setLoading(false);
      ToastAndroid.show('Invalid Credentials', ToastAndroid.SHORT);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        BackHandler.exitApp();
        return true;
      };

      BackHandler.addEventListener('hardwareBackPress', onBackPress);

      return () =>
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    }, []),
  );

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        // or some other action
        setContentPadding(30);
      },
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setContentPadding(50);
        // or some other action
      },
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  const forgetPasswordSheet = () => {
    return (
      <RBSheet
        ref={_sheetRef}
        closeOnDragDown
        closeOnPressMask
        height={Dimension.window.height * 0.7}
        customStyles={{
          draggableIcon: {backgroundColor: Color.secondary},
          container: {
            backgroundColor: Color.primaryDark,
            borderTopLeftRadius: 30,
            borderTopRightRadius: 30,
            shadowColor: '#000000',
            shadowOpacity: 0.8,
            shadowRadius: 2,
            shadowOffset: {
              height: 1,
              width: 0,
            },
          },
        }}>
        <ForgetPass onClose={() => _sheetRef.current.close()} />
      </RBSheet>
    );
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}>
      <BannerSlider />
      <Animated.View
        style={{
          paddingHorizontal: 25,
          paddingTop: contentPadding,
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
          backgroundColor: Color.primary,
          flex: 1,
          transform: [{translateY: animated}],
          opacity: animated.interpolate({
            inputRange: [0, 600],
            outputRange: [1, 0],
          }),
          // justifyContent: 'center',
        }}>
        <Text
          style={{
            fontSize: 28,
            fontWeight: '900',
            fontFamily: Fonts.primaryBold,
            color: Color.secondary,
            marginBottom: 30,
          }}>
          Welcome !
        </Text>

        <InputField
          label={'Email ID'}
          value={email}
          onChangeText={setEmail}
          icon={
            <MaterialIcons
              name="alternate-email"
              size={20}
              color="#fff"
              style={{marginRight: 5}}
            />
          }
          keyboardType="email-address"
        />

        <InputField
          label={'Password'}
          value={password}
          onChangeText={setPassword}
          icon={
            <Ionicons
              name="ios-lock-closed-outline"
              size={20}
              color="#fff"
              style={{marginRight: 5}}
            />
          }
          secure={!showPass}
          setSecure={setShowPass}
          inputType="password"
          fieldButtonLabel={'Forgot?'}
          fieldButtonFunction={() => _sheetRef.current.open()}
        />

        <CustomButton
          loading={loading}
          label={'Login'}
          onPress={() => signIn()}
        />

        <TouchableOpacity onPress={() => navigation.navigate('Register')}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              marginBottom: 30,
              borderWidth: 1,
              padding: 15,
              borderRadius: 10,
              borderColor: Color.secondary,
            }}>
            <Text style={{color: '#fff'}}>New to the app?</Text>
            <Text
              style={{color: Color.secondary, fontFamily: Fonts.primaryBold}}>
              {' '}
              Register
            </Text>
          </View>
        </TouchableOpacity>
      </Animated.View>
      {/* {forgetPasswordSheet()} */}
    </SafeAreaView>
  );
}
