import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Color, Fonts} from '../theme';
import {Button, TextInput} from 'react-native-paper';
import {useSelector} from 'react-redux';
import {postData} from '../API';
import {useTranslation} from 'react-i18next';
import {successToast, errorToast} from '../components/toasts';

export default function FlashMessage({navigation, route}) {
  const theme = {colors: {text: '#000', background: '#aaaaaa50'}}; // for text input\

  const {t} = useTranslation();

  const [msg, setMsg] = React.useState('');
  const user = useSelector(state => state.user);
  const [loading, setLoading] = React.useState(false);

  const onSubmit = async () => {
    setLoading(true);
    route.params?.setFlashMsg(msg);
    let body = {id: user?.userid, annoucement: msg};
    let result = await postData('doctorannoucementupdate', body);
    if (result?.success) {
      successToast(t('flashScreen.updatedSuccess'));
    } else {
      errorToast(t('register.somethingWentWrong'));
    }
    setLoading(false);
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>{t('flashScreen.screenTitle')}. 🔊</Text>
      <View style={{marginTop: 15}}>
        <Text style={styles.label}>{t('flashScreen.enterMsg')}</Text>
        <TextInput
          theme={theme}
          autoFocus
          multiline
          numberOfLines={4}
          onChangeText={text => setMsg(text)}
          value={msg}
          mode="flat"
          underlineColor="#000"
          activeUnderlineColor={Color.primary}
        />
      </View>
      <Button
        style={{
          backgroundColor: Color.primary,
          marginTop: 30,
          marginBottom: 10,
        }}
        contentStyle={{height: 55, alignItems: 'center'}}
        dark
        loading={loading}
        mode="contained"
        onPress={onSubmit}>
        {t('flashScreen.submit')}
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  heading: {
    fontSize: 22,
    color: '#000',
    fontFamily: Fonts.primaryBold,
    width: '100%',
  },
  label: {
    fontFamily: Fonts.primaryRegular,
    color: '#000',
  },
});
