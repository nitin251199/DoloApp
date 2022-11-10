import {StyleSheet, Text, View} from 'react-native';
import React,{useEffect} from 'react';
import {Color, Fonts} from '../theme';
import {Button, TextInput} from 'react-native-paper';
import {useSelector} from 'react-redux';
import {postData,getData} from '../API';
import {useTranslation} from 'react-i18next';
import {successToast, errorToast} from '../components/toasts';

export default function FlashMessage({navigation, route}) {
  const theme = {colors: {text: '#000', background: '#aaaaaa50'}}; // for text input\

  const {t} = useTranslation();

  const [msg, setMsg] = React.useState('');
  const user = useSelector(state => state.user); 
  const [loading, setLoading] = React.useState(false);
  const [annoucements,setAnnouncements] = React.useState([]);
 

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

  const getAnnouncementList = async () => {

    setLoading(true);
    let body = {
      id:user?.userid,
     
    };

    let res = await postData(`doctorannoucementlist`,body);
    
    if (res.success) {
       console.log(res.data);
      setAnnouncements(res.data);
    }
    setLoading(false);

  }

  

  useEffect(() => {
   getAnnouncementList();
   

  }, []);

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
      <Text style={styles.annoucement_heading}> {t('flashScreen.List')} 🧾</Text>
      {annoucements.map((item, index) => {
      return (
        <View style={styles.card}>
      <Text style={{color:Color.black,fontFamily:Fonts.primaryRegular}}>{item.annoucement_message}</Text>
      </View>
      )
        
      }
      )}
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
  card:{
   // height: 50,
   // flex: 1,
    margin: 10,
    borderRadius: 10,
    elevation: 10,
   // padding: 5,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    backgroundColor: '#25CCF7',
    shadowColor: Color.black,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical:20
    
  },
  annoucement_heading:{
    fontFamily:Fonts.primaryBold,
    color:Color.black,
    paddingLeft:10,
    paddingTop:20,
    fontSize: 22,
  }
});
