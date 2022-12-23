import {
    FlatList,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Alert
  } from 'react-native';
  import React,{useEffect} from 'react';
  import {Color, Fonts} from '../theme';
  import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
  import {
    Avatar,
    Button,
    Checkbox,
    Chip,
    HelperText,
    RadioButton,
    TextInput,
  } from 'react-native-paper';
  import {DateTimePickerAndroid} from '@react-native-community/datetimepicker';
  import {useTranslation} from 'react-i18next';
  import { successToast,errorToast } from '../components/toasts';
  import { postData,getData } from '../API';
  import { useSelector } from 'react-redux';
  export default function DisableAppointments  ({navigation}) {
    const theme = {colors: {text: '#000', background: '#aaaaaa50'}}; // for text input
    const {t} = useTranslation();
    const user = useSelector(state => state.user);
    const nextWeek = new Date();
    nextWeek.setDate(nextWeek.getDate() + 7);
    const [fromDate, setFromDate] = React.useState(nextWeek) ;
    const [toDate, setToDate] = React.useState(nextWeek);

    const [loading, setLoading] = React.useState(false);

    const [holidaysList,setHolidayList] = React.useState([])

  

    const openFromCalender = () => {
      const nextWeek = new Date();
        nextWeek.setDate(nextWeek.getDate() + 7);
        DateTimePickerAndroid.open({
          value: fromDate,
          
          onChange: (event, date) => {
            setFromDate(date);
          },
          mode: 'date',
          is24Hour: false,
          minimumDate: nextWeek
         
        });
      };

      const openToCalender = () => {
        const nextWeek = new Date();
        nextWeek.setDate(nextWeek.getDate() + 7);
        DateTimePickerAndroid.open({
          value: toDate,
          onChange: (event, date) => {
            setToDate(date);
          },
          mode: 'date',
          is24Hour: false,
          minimumDate: nextWeek
        });
      };

      const getFromDate = date => {
        let d = new Date(date);
        let day = d.getDate();
        let month = d.getMonth() + 1;
        let year = d.getFullYear();
        return `${day}/${month}/${year}`;
      };

      const getToDate = date => {
        let d = new Date(date);
        let day = d.getDate();
        let month = d.getMonth() + 1;
        let year = d.getFullYear();
        return `${day}/${month}/${year}`;
      };


      const onSubmit = async () => {
        setLoading(true);
       
        let body = {start_date:getFromDate(fromDate),end_date:getToDate(toDate),doctor_available:0,id: user?.userid};
        
        let result = await postData('doctor_enable_and_disable', body);
        if (result?.success) {
          successToast(t('Successfully Disabled'));
        //  navigation.navigate('Home1')
        getHolidayList();
         
        } else {
          errorToast(t('register.somethingWentWrong'));
        }
       
        setLoading(false);
        setFromDate(nextWeek);
        setToDate(nextWeek);
      
      };


      const getHolidayList = async () => {
       // setLoading(true);
       
        let body = {id: user?.userid};
        
        let result = await postData('doctor_disable_list', body);
        if (result?.success) {
         setHolidayList(result?.data);
         console.log('hlist==',result?.data)
         
        }
        // else {
        //   errorToast(t('register.somethingWentWrong'));
        // }
       
        setLoading(false);
        setFromDate(nextWeek);
        setToDate(nextWeek);
      
      };

      useEffect(() => {
        getHolidayList();
      },[])


      const deleteListItem = () => {
        Alert.alert(
          'Are you sure you want to Delete ?',
         // 'Upload prescription from',
          [
            {
              text: 'Cancel',
              onPress: () => console.log('Cancel'),
              style: 'cancel',
            },
            // {
            //   text: 'Camera',
            //  // onPress: () => takePhotoFromCamera(),
            // },
            {
              text: 'Yes',
             // onPress: () => choosePhotoFromLibrary(),
            },
          ],
          {cancelable: true},
        );
      };
     
  return (
    <View style={styles.container}>
    <View style={{flexDirection: 'row', padding: 20}}>
      {/* <TouchableOpacity onPress={() => navigation.goBack()}>
        <MaterialCommunityIcons
          name="arrow-left"
          size={32}
          color={Color.black}
        />
      </TouchableOpacity> */}
      <Text style={styles.title}>{t('disableAppointments.screenTitle')}. 🗓</Text>
    </View>
  <View style={{marginTop:20,paddingHorizontal:20}}>
    <View style={{marginTop: 15}}>
          <Text style={styles.label}>{t('disableAppointments.FromDate')}</Text>
          <TextInput
            theme={theme}
            dense
            editable={false}
            onChangeText={text => setFromDate(text)}
            forceTextInputFocus={false}
            right={
              <TextInput.Icon
                icon="calendar"
                color={Color.primary}
                onPress={openFromCalender}
              />
            }
            value={getFromDate(fromDate)}
            mode="flat"
            underlineColor="#000"
            activeUnderlineColor={Color.primary}
          />
        </View>


        <View style={{marginTop: 15}}>
          <Text style={styles.label}>{t('disableAppointments.ToDate')}</Text>
          <TextInput
            theme={theme}
            dense
            editable={false}
            onChangeText={text => setToDate(text)}
            forceTextInputFocus={false}
            right={
              <TextInput.Icon
                icon="calendar"
                color={Color.primary}
                onPress={openToCalender}
              />
            }
            value={getToDate(toDate)}
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
        onPress={onSubmit}
      >
   {t('disableAppointments.Disable')}
      </Button>

      <Text style={styles.secondary_heading_style}>{t('disableAppointments.holidaysList')}   📃</Text>
      <ScrollView contentContainerStyle={{paddingBottom:30}}>

      <View style={{marginTop: 10, paddingHorizontal: 15}}>
        {holidaysList &&
          holidaysList.map((item, index) => {
            return (
              <TouchableOpacity
                style={{
                  ...styles.listItem,
                  
                  padding: 15,
                  alignItems: 'center',
                  
                
                  marginTop: 5,
                  backgroundColor:Color.graylight
                }} 
                 
              // onPress={()=>deleteListItem()} 
              >
                <Text style={styles.list_item_style}>
                 {item.start_date} To {item.End_date}
                </Text>
              </TouchableOpacity>
            );
          })}
      </View>
      
      </ScrollView>

        </View>




    </View>
  )
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        //backgroundColor: Color.white,
      },
      title: {
        fontSize: 20,
        fontFamily: 'Poppins-Bold',
        color: Color.black,
        paddingHorizontal: 20,
      },
      label: {
        fontFamily: Fonts.primaryRegular,
        color: '#000',
      },
      secondary_heading_style:{
        fontSize: 20,
        fontFamily: 'Poppins-Bold',
        color: Color.black,
        paddingTop:20
      },
      listItem: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        marginVertical: 20,
        overflow: 'hidden',
        borderRadius: 10,
        // borderWidth: 4,
        // borderColor: '#00b050',
        width: '95%',
        alignSelf: 'center',
      },
      list_item_style:{
        fontSize: 18,
        lineHeight: 18 * 1.4,
        color: Color.white,
        // marginHorizontal: 10,
        fontFamily: Fonts.primarySemiBold,
      }
      
})