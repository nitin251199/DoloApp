import React, {useState} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Animated,
  Easing,
  ToastAndroid,
  Keyboard,
  KeyboardAvoidingView,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';

import CustomButton from '../components/CustomButton';
import InputField from '../components/InputField';
import {Color, Fonts} from '../theme';
import {errorToast, successToast} from '../components/toasts';
import BannerSlider from '../components/BannerSlider';
import {useEffect} from 'react';
import {postData} from '../API';
import OtpModal from '../components/modals/OtpModal';
import {useTranslation} from 'react-i18next';

export default function RegisterScreen({navigation, route}) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [referCode, setReferCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [isKBOpen, setIsKBOpen] = useState(false);
  const [otp, setOtp] = useState('');

  const [modalVisible, setModalVisible] = useState(false);

  const animated = new Animated.Value(600);
  const duration = 300;

  useEffect(() => {
    Animated.timing(animated, {
      toValue: 0,
      duration: duration,
      easing: Easing.inOut(Easing.ease),
      useNativeDriver: true,
    }).start();
  }, []);

  const handleOTP = async () => {
    if (phone.length < 10) {
      errorToast(t('register.enterValidNo'));
      return;
    }
    setLoading(true);
    // const response = await postData('api/getCheckemail', {
    //   email,
    //   mobile: phone,
    // });
    // if (response.success) {
    //   ToastAndroid.show(
    //     'User Already Exist ! Please Login',
    //     ToastAndroid.SHORT,
    //   );
    //   setLoading(false);
    //   navigation.goBack();
    // } else {
    let otp = Math.floor(1000 + Math.random() * 9000);
    setOtp(otp);
    console.log(otp);
    successToast(t('register.otpSent'));
    setLoading(false);
    setModalVisible(true);
    // }
  };

  const handleRegister = async pass => {
    let body = {
      username: name,
      email: email,
     // password: pass,
      mobile: phone,
     // refer_code: referCode,
    };
    const response = await postData('doctor_enquiry', body);
    if (response.success) {
      successToast(t('register.registerSuccess'));
      navigation.goBack();
    } else {
      errorToast(t('register.somethingWentWrong'));
    }
  };

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        // or some other action
        setIsKBOpen(true);
      },
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setIsKBOpen(false);
        // or some other action
      },
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  const {t} = useTranslation();

  return (
    <View
      style={{
        flex: 1,
      }}>
      <OtpModal
        t={t}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
        phone={phone}
        otp={otp}
        setPassword={setPassword}
        handleRegister={pass => handleRegister(pass)}
      />
      {!isKBOpen && <BannerSlider />}
      <Animated.View
        style={{
          paddingHorizontal: 25,
          paddingTop: 50,
          borderTopLeftRadius: isKBOpen ? 0 : 30,
          borderTopRightRadius: isKBOpen ? 0 : 30,
          backgroundColor: Color.primary,
          flex: 1,
          transform: [{translateY: animated}],
          opacity: animated.interpolate({
            inputRange: [0, 600],
            outputRange: [1, 0],
          }),
          // justifyContent: 'center',
          elevation: 10,
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
        }}>
        <Text
          style={{
            fontSize: 28,
            fontFamily: Fonts.primaryBold,
            color: Color.secondary,
          }}>
          {t('register.screenTitle')}
        </Text>
        <Text
          style={{
            fontSize: 14,
            fontWeight: '600',
            fontFamily: Fonts.primaryRegular,
            color: Color.secondary,
            marginBottom: 30,
          }}>
          {t('register.screenSubTitle')}
        </Text>

        <InputField
          label={t('register.name')}
          value={name}
          onChangeText={setName}
          icon={
            <MaterialIcons
              name="account-circle"
              size={20}
              color="#fff"
              style={{marginRight: 5}}
            />
          }
        />
        <InputField
          label={t('register.email')}
          value={email}
          onChangeText={setEmail}
          icon={
            <MaterialIcons
              name="mail"
              size={20}
              color="#fff"
              style={{marginRight: 5}}
            />
          }
        />
        <InputField
          keyboardType="numeric"
          label={t('register.mobile')}
          value={phone}
          onChangeText={setPhone}
          icon={
            <Ionicons
              name="call-outline"
              size={20}
              color="#fff"
              style={{marginRight: 5}}
            />
          }
        />

        {/* <InputField
          label={t('register.referral')}
          value={referCode}
          onChangeText={setReferCode}
          icon={
            <Ionicons
              name="code"
              size={20}
              color="#fff"
              style={{marginRight: 5}}
            />
          }
        /> */}

        <CustomButton
          loading={loading}
          label={t('register.proceed')}
          onPress={() => handleRegister()}
        />
      </Animated.View>
    </View>
  );
}
