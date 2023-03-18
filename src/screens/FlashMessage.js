import {StyleSheet, Text, TouchableOpacity, View,Alert} from 'react-native';
import React,{useEffect} from 'react';
import {Color, Fonts} from '../theme';
import {Button, TextInput} from 'react-native-paper';
import {useSelector} from 'react-redux';
import {postData,getData} from '../API';
import {useTranslation} from 'react-i18next';
import {successToast, errorToast} from '../components/toasts';
import { ScrollView } from 'react-native-gesture-handler';
import EngagementSheet from '../components/bottomsheets/EngagementSheet';
import AnnouncementSheet from '../components/bottomsheets/AnnouncementSheet';
export default function FlashMessage({navigation, route}) {
  const theme = {colors: {text: '#000', background: '#aaaaaa50'}}; // for text input\
  const _sheetRef = React.useRef(null);
  const {t} = useTranslation();

  const [msg, setMsg] = React.useState('');
  const user = useSelector(state => state.user); 
  const [loading, setLoading] = React.useState(false);
  const [announcementLoading, setAnnouncementLoading] = React.useState(false);
  const [annoucements,setAnnouncements] = React.useState([]);
  const [selectedAnnouncement, setSelectedAnnouncement] = React.useState(null);
 

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
    getAnnouncementList();
    setLoading(false);
   //navigation.goBack();
  };

  const getAnnouncementList = async () => {

    setLoading(true);
    let body = {
      id:user?.userid,
     };

    let res = await postData(`doctorannoucementlist`,body);
    
    if (res.success) {
       console.log(res.data);
      setAnnouncements(res.data.sort((a, b) => new Date(b.id) - new Date(a.id)));
    }
    setLoading(false);
    setMsg('')

  }

  const conditionalStyles = status => {
    switch (status) {
    
      case 0:
        return styles.active;
        case 1:
          return styles.hide;
      default:
        return styles.active;
    }
  };


  const handleChange = async (id, status) => {
    
    setAnnouncementLoading(true);
    let currentA = null;
    //let previousA = null;
    const newData = annoucements.map(item => {
   

      if (item.id === id ) {
       
      
          currentA = item;
          item.status = status;
   
         }

       

      return item;
    });
    let currentBody = {
      status: currentA?.status,
      id: currentA?.id,
      doctor_id: user?.userid,
    };
  
    if (currentA) {
      var result1 = await postData('doctorannoucementstatus', currentBody);
    }
      console.log('currentA?.status==',currentA?.status);
    setAnnouncementLoading(false);
    if (result1?.success) {
      successToast('Announcetment status updated successfully');
      setAnnouncements(newData);
      getAnnouncementList();
      _sheetRef.current.close();
    } else {
      errorToast('Something went wrong');
    }
  };

  const selectOptions = (id, status) => {
    Alert.alert(
      'Are you sure you want to Delete?',
      '',
      [
        {
          text: 'Yes',
          onPress: () => handleChange(id, status),
        },
        {
          text: 'No',
          onPress: () =>  _sheetRef.current.close(),
        },
        // {
        //   text: 'Camera',
        //   onPress: () => takePhotoFromCamera(),
        // },
        // {
        //   text: 'Gallery',
        //   onPress: () => choosePhotoFromLibrary(),
        // },
      ],
      {
        cancelable: true,
      },
    );
  };
  
  

  useEffect(() => {
   getAnnouncementList();
   

  }, []);

  return (
    <View style={styles.container}>
      <AnnouncementSheet
        ref={_sheetRef}
        item={selectedAnnouncement}
        handleChange={(id, status) => handleChange(id, status)}
        handleDelete={(id, status) => selectOptions(id, status)}
      />
      <ScrollView contentContainerStyle={{paddingBottom:30}} showsVerticalScrollIndicator={false}>
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
        <TouchableOpacity style={{...styles.card, ...conditionalStyles(item.status)} }   onLongPress=  {() => {
          setSelectedAnnouncement(item);
         _sheetRef.current.open();
        }}>
      <Text style={{color:Color.white,fontFamily:Fonts.primaryRegular}}>{item.annoucement_message}</Text>
      </TouchableOpacity>
      )
        
      }
      )}
      </ScrollView>
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
    backgroundColor: '#a9a9a9',
    shadowColor: Color.black,
    justifyContent: 'center',
  //  alignItems: 'center',
    paddingVertical:20,
    paddingHorizontal:10
    
  },
  annoucement_heading:{
    fontFamily:Fonts.primaryBold,
    color:Color.black,
    paddingLeft:10,
    paddingTop:20,
    fontSize: 22,
  },
  active:{
  backgroundColor:'#006400'
  },
  hide:{
    backgroundColor:Color.red
  },

});
