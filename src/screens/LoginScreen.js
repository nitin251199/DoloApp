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
  StyleSheet,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CustomButton from '../components/CustomButton';
import InputField from '../components/InputField';
import {Color, Dimension, Fonts} from '../theme';
import {errorToast, successToast} from '../components/toasts';
import BannerSlider from '../components/BannerSlider';
import {useDispatch} from 'react-redux';
import {CommonActions, useFocusEffect} from '@react-navigation/native';
import {postData} from '../API';
import RBSheet from 'react-native-raw-bottom-sheet';
import ForgetPass from '../components/bottomsheets/ForgetPass';
import {getSyncData} from '../storage/AsyncStorage';

export default function LoginScreen({navigation, route}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [type, setType] = React.useState('doctor');
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

  const signIn = async () => {
    setLoading(true);

    let fcmToken = await getSyncData('fcmToken');

    let body = {
      email,
      password,
      token: fcmToken,
    };

    let apiUrl = type === 'doctor' ? 'doctor/login' : 'doctorassistantlogin';

    const response = await postData(apiUrl, body);
    console.log('response', response);
    if (response.success) {
      successToast('Login Successfull');
      setLoading(false);
      dispatch({
        type: 'SET_TYPE',
        payload: type,
      });
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
      errorToast('Invalid Credentials', 'or User not found!');
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
          draggableIcon: {backgroundColor: Color.white},
          container: {
            backgroundColor: Color.primary,
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
            marginBottom: 10,
          }}>
          Welcome !
        </Text>
        <View style={styles.btnContainer}>
          <TouchableOpacity
            onPress={() => setType('doctor')}
            style={{
              ...styles.btn,
              backgroundColor: type === 'doctor' ? '#fff' : null,
            }}>
            <Text
              style={{
                ...styles.btnText,
                color: type === 'doctor' ? Color.primary : '#fff',
              }}>
              Doctor
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setType('assistant')}
            style={{
              ...styles.btn,
              backgroundColor: type === 'assistant' ? '#fff' : null,
            }}>
            <Text
              style={{
                ...styles.btnText,
                color: type === 'assistant' ? Color.primary : '#fff',
              }}>
              Assistant
            </Text>
          </TouchableOpacity>
        </View>
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
      {forgetPasswordSheet()}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  btnContainer: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 10,
    marginBottom: 30,
  },
  btn: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 8,
  },
  btnText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#fff',
    fontFamily: Fonts.primarySemiBold,
    lineHeight: 16 * 1.4,
  },
});
