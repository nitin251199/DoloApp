import {StyleSheet, Text, ToastAndroid, View} from 'react-native';
import React from 'react';
import {TouchableOpacity} from 'react-native';
import OTPTextView from 'react-native-otp-textinput';
import {Color, Dimension, Fonts} from '../../theme';
import {Button, HelperText, TextInput} from 'react-native-paper';
import {successToast} from '../toasts';
// import {postData} from '../../API';

export default function ForgetPass(props) {
  const theme = {
    colors: {text: '#000', background: '#fff', placeholder: '#CCC'},
  }; // for text input

  const {t} = props;

  const [view, setView] = React.useState('');
  const [isEmailShow, setIsEmailShow] = React.useState(false);

  const [email, setEmail] = React.useState('');
  const [mobileNo, setMobileNo] = React.useState('');
  const [otp, setOtp] = React.useState('');
  const [otpError, setOtpError] = React.useState(false);

  const [realOTP, setRealOTP] = React.useState('');

  const [newPassword, setNewPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');

  const [showNewPass, setShowNewPass] = React.useState(true);
  const [showConfirmPass, setShowConfirmPass] = React.useState(true);

  const [checkLoading, setCheckLoading] = React.useState(false);

  const checkUser = async () => {
    setCheckLoading(true);
    if (isEmailShow && email === '') {
      setCheckLoading(false);
      return ToastAndroid.show(
        'Please enter a valid email',
        ToastAndroid.SHORT,
      );
    } else {
      let otp = Math.floor(1000 + Math.random() * 9000);
      console.log(otp);
      setRealOTP(otp);
      let body = {
        type: isEmailShow ? 'mail' : 'mobileno',
        email,
        otp,
        mobile: mobileNo,
      };
      // let result = await postData('api/getForget', body);
      // if (result.success) {
      setCheckLoading(false);
      setView('otp');
      // } else {
      //   setCheckLoading(false);
      //   ToastAndroid.show(
      //     'Something Went Wrong! Please Try Again',
      //     ToastAndroid.SHORT,
      //   );
      // }
    }
  };

  const checkOTP = () => {
    if (otp != realOTP) {
      return setOtpError(true);
    }
    setView('password');
  };

  const isValidPassword = () => {
    if (newPassword.length) return newPassword.length < 8;
  };

  const checkConfirmPass = () => {
    return confirmPassword.length && newPassword != confirmPassword;
  };

  const changePassword = () => {
    successToast(t('forgot.changedSuccessfully'));
    props.onClose();
  };

  const checkSubmitStatus = () => {
    if (newPassword.length > 0 && confirmPassword.length > 0) {
      return isValidPassword() || checkConfirmPass();
    }
    return true;
  };

  const checkEmail = () => {
    let emailTestReg =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (email.length > 0 && !emailTestReg.test(email)) {
      return true;
    } else {
      return false;
    }
  };

  const errorTextStatus = () => {
    if (isEmailShow) {
      return checkEmail();
    } else {
      return mobileNo.length > 10;
    }
  };

  const checkBtnStatus = () => {
    if (isEmailShow) {
      return checkEmail();
    } else {
      return mobileNo.length != 10;
    }
  };

  const sheetView = () => {
    switch (view) {
      case '':
        return (
          <View style={{margin: 10}}>
            <Text style={styles.label}>
              {isEmailShow
                ? t('forgot.screenSubTitleforEmail')
                : t('forgot.screenSubTitleforMob')}
            </Text>
            {isEmailShow ? (
              <TextInput
                theme={theme}
                mode="outlined"
                // label="Email ID"
                placeholder={t('forgot.emailPlaceholder')}
                value={email}
                autoFocus
                outlineColor={'#ccc'}
                error={checkEmail()}
                onChangeText={text => {
                  setEmail(text);
                }}
                activeOutlineColor={Color.white}
                style={styles.input}
                left={<TextInput.Icon icon="email" color={Color.primary} />}
              />
            ) : (
              <TextInput
                theme={theme}
                mode="outlined"
                // label="Mobile Number"
                value={mobileNo}
                placeholder={t('forgot.mobPlaceholder')}
                autoFocus
                outlineColor={'#ccc'}
                error={mobileNo.length > 10}
                onChangeText={text => {
                  setMobileNo(text);
                }}
                keyboardType="number-pad"
                activeOutlineColor={Color.white}
                style={styles.input}
                left={<TextInput.Icon icon="phone" color={Color.primary} />}
              />
            )}
            <HelperText
              padding="none"
              type="error"
              visible={errorTextStatus()}
              style={{
                display: errorTextStatus() ? 'flex' : 'none',
                fontFamily: Fonts.primaryRegular,
              }}>
              {isEmailShow ? t('forgot.emailHelper') : t('forgot.mobHelper')}
            </HelperText>
            <TouchableOpacity onPress={() => setIsEmailShow(prev => !prev)}>
              <Text
                style={{
                  marginVertical: 15,
                  marginHorizontal: 5,
                  textAlign: 'right',
                  color: Color.white,
                  fontFamily: Fonts.primaryRegular,
                }}>
                {isEmailShow ? t('forgot.askMob') : t('forgot.askEmail')}
              </Text>
            </TouchableOpacity>
            <Button
              // icon="refresh"
              onPress={() => checkUser()}
              loading={checkLoading}
              disabled={checkBtnStatus()}
              color={Color.white}
              labelStyle={{color: Color.primary}}
              style={{marginTop: 10}}
              contentStyle={{
                height: 55,
                alignItems: 'center',
              }}
              mode="contained">
              {t('forgot.verify')}
            </Button>
          </View>
        );
      case 'otp':
        return (
          <View style={{margin: 10}}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <Text style={styles.label}>
                {isEmailShow
                  ? `${t('forgot.otpEmail')} ${email}`
                  : `+91-${mobileNo} ${t('forgot.otpMob')}`}
              </Text>
              <TouchableOpacity
                onPress={() => {
                  setView('');
                }}>
                <Text
                  style={{
                    ...styles.label,
                    color: Color.white,
                    fontSize: 14,
                    fontFamily: Fonts.primaryBold,
                  }}>
                  {t('forgot.change')}
                </Text>
              </TouchableOpacity>
            </View>
            <OTPTextView
              autoFocus
              handleTextChange={text => {
                setOtp(text);
                setOtpError(false);
              }}
              containerStyle={{
                marginTop: 10,
              }}
              textInputStyle={{
                borderColor: otpError ? Color.red : Color.white,
                color: Color.white,
              }}
              inputCount={4}
              offTintColor={otpError ? Color.error : Color.white}
              tintColor={otpError ? Color.error : Color.white}
            />
            <HelperText
              padding="none"
              type="error"
              visible={otpError}
              style={{display: otpError ? 'flex' : 'none'}}>
              {t('forgot.otpHelper')}
            </HelperText>
            <Button
              onPress={() => checkOTP()}
              dark
              color={Color.white}
              labelStyle={{color: Color.primary}}
              style={{
                marginTop: 20,
                color: '#000',
              }}
              contentStyle={{
                height: 55,
                alignItems: 'center',
              }}
              mode="contained">
              {t('forgot.verify')}
            </Button>
          </View>
        );
      case 'password':
        return (
          <View style={{margin: 10}}>
            <Text style={styles.label}>{t('forgot.enterPassword')}</Text>
            <TextInput
              theme={theme}
              mode="outlined"
              secureTextEntry={showNewPass}
              right={
                <TextInput.Icon
                  icon={showNewPass ? 'eye-off' : 'eye'}
                  onPress={() => setShowNewPass(prev => !prev)}
                  color={Color.primary}
                />
              }
              left={<TextInput.Icon icon="key" color={Color.primary} />}
              value={newPassword}
              autoFocus
              outlineColor={'#ccc'}
              error={isValidPassword()}
              onChangeText={text => {
                setNewPassword(text);
              }}
              placeholder={t('forgot.enterPassword')}
              activeOutlineColor={Color.white}
              style={styles.input}
              // label="New Password"
            />
            <HelperText
              padding="none"
              type="error"
              visible={isValidPassword()}
              style={{
                display: isValidPassword() ? 'flex' : 'none',
                fontFamily: Fonts.primaryRegular,
              }}>
              {t('forgot.passwordHelper')}
            </HelperText>
            <TextInput
              theme={theme}
              mode="outlined"
              value={confirmPassword}
              secureTextEntry={showConfirmPass}
              right={
                <TextInput.Icon
                  icon={showConfirmPass ? 'eye-off' : 'eye'}
                  onPress={() => setShowConfirmPass(prev => !prev)}
                  color={Color.primary}
                />
              }
              left={<TextInput.Icon icon="key" color={Color.primary} />}
              outlineColor={'#ccc'}
              error={checkConfirmPass()}
              onChangeText={text => setConfirmPassword(text)}
              activeOutlineColor={Color.primary}
              style={styles.input}
              placeholder={t('forgot.confirmPassword')}
            />
            <HelperText
              padding="none"
              type="error"
              visible={checkConfirmPass()}
              style={{
                display: checkConfirmPass() ? 'flex' : 'none',
                fontFamily: Fonts.primaryRegular,
              }}>
              {t('forgot.confirmHelper')}
            </HelperText>
            <Button
              onPress={() => changePassword()}
              // loading={loading}
              disabled={checkSubmitStatus()}
              color={Color.white}
              style={{marginTop: 20}}
              labelStyle={{color: Color.primary}}
              contentStyle={{
                height: 55,
                alignItems: 'center',
              }}
              mode="contained">
              {t('forgot.changePassword')}
            </Button>
          </View>
        );
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.text}>{t('forgot.screenTitle')}</Text>
      </View>
      {sheetView()}
    </View>
  );
}

const styles = StyleSheet.create({
  label: {
    fontFamily: Fonts.primaryRegular,
    fontSize: 14,
    color: Color.white,
    // marginVertical: 10,
  },
  input: {
    fontFamily: Fonts.primaryMedium,
    fontSize: 16,
    marginTop: 10,
  },
  container: {
    flex: 1,
    width: Dimension.window.width,
    // alignItems: 'center',
    padding: 15,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  text: {
    fontSize: 20,
    fontFamily: Fonts.primaryBold,
    color: Color.white,
    padding: 10,
  },
  searchContainer: {
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: Color.primary,
    padding: 8,
  },
});
