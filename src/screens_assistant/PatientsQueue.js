import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Alert
} from 'react-native';
import React from 'react';
import {Color, Fonts} from '../theme';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import DoctorCard from '../components/DoctorCard';
import DoctorPlaceholder from '../placeholders/DoctorPlaceholder';
import {getData, postData} from '../API';
import {useSelector} from 'react-redux';
import {useEffect} from 'react';
import AppointmentCard from '../components/AppointmentCard';
import {useFocusEffect} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';
import AppointmentSheet from '../components/bottomsheets/AppointmentSheet';
import { errorToast, successToast } from '../components/toasts';
import InputModal from '../components/modals/InputModal';

export default function PatientsQueue({navigation}) {
  const user = useSelector(state => state.user);
  const [appointmentData, setAppointmentData] = React.useState([]);
  const [selectedAppointment, setSelectedAppointment] = React.useState(null);
  const [appointments, setAppointments] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [refresh, setRefresh] = React.useState(false);
  const [time, setTime] = React.useState('Morning');
  const [modalVisible,setModalVisible] = React.useState(false);
  const [consultCharge,setConsultCharge] = React.useState('');

  
  const _sheetRef = React.useRef(null);
  const _scrollRef = React.useRef(null);
  const {t} = useTranslation();
  const fetchAppointments = async () => {
    const list = await getData(`appointment/${user?.doctor_id}`);
    console.log('quedata==', list?.data);
    setAppointmentData(list?.data);

    setLoading(false);
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener(
      'focus',
      async () => {
        await fetchAppointments();
        _sheetRef.current.close();
      },
      [],
    );

    return unsubscribe;
  }, []);

  const conditionalStyles = status => {
    switch (status) {
      case 2:
        return styles.resolved;
      case 3:
        return styles.absent;
      case 5:
        return styles.due_payment;
      case 0:
        return styles.pending;
      default:
        return styles.pending;
    }
  };

  // const filterAppointments = () => {
  //  // let filteredAppointments = appointmentData;

  //   if (time === 'Morning') {
  //     // setAppointments(
  //     //   filteredAppointments.filter(
  //     //     item => new Date(item.created_at).getHours() < 12,
  //     //   ),
  //     // );

  //      setAppointments(
  //       appointmentData.filter(
  //         item => item.shift_name == 'Evening',
  //       ),
  //     );

  //   } else {
  //     // setAppointments(
  //     //   filteredAppointments.filter(
  //     //     item => new Date(item.created_at).getHours() >= 12,
  //     //   ),
  //     // );

  //     setAppointments(
  //       appointmentData.filter(
  //         item => item.shift_name == 'Evening',
  //       ),
  //     );

  //   }

  // }

  useEffect(() => {
    // let filteredAppointments = appointmentData;
    _sheetRef.current.close();
    if (time === 'Morning') {
      // setAppointments(
      //   filteredAppointments.filter(
      //     item => new Date(item.created_at).getHours() < 12,
      //   ),
      // );

      setAppointments(
        appointmentData.filter(item => item.shift_name == 'Morning'),
      );
    } else {
      // setAppointments(
      //   filteredAppointments.filter(
      //     item => new Date(item.created_at).getHours() >= 12,
      //   ),
      // );

      setAppointments(
        appointmentData.filter(item => item.shift_name == 'Evening'),
      );
    }
  }, [time, appointmentData]);

const deleteAppointment = async(item) => {
  console.log('atmmm==>',item);
let body = {
doctor_id:user?.doctor_id,
assistant_id:item?.assistant_id,
patient_id: item?.patient_id,
id:item?.id,
}
console.log('Body==>',body)
var result = await postData('doctor_assitant_appointment_delete',body)
if(result.success){
successToast('Appointment Deleted Successfully');
fetchAppointments();
_sheetRef.current.close();
}
else{
errorToast('Something went wrong');

}

}

const selectOptions = (item) => {
  Alert.alert(
    'Are you sure you want to Delete?',
    '',
    [
      {
        text: 'Yes',
        onPress: () => deleteAppointment(item),
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

const updatePaymentStatus = async(item) =>{
  let body={
    doctor_id:user?.doctor_id,
    patient_id: item?.patient_id,

    appointment_id:item?.id,
    payment:consultCharge,
    payment_status:1,


  }
  console.log('body',body)
  const res = await postData('paymentupdate',body);
  if (res.success){
    successToast('status marked successfully');
    setModalVisible(false);
    fetchAppointments();
    _sheetRef.current.close();
  }
  else{
    errorToast('something went wrong');
  }
}


  return (
    <View style={styles.container}>
      <AppointmentSheet
        ref={_sheetRef}
        item={selectedAppointment}
        deleteAppointment={(item) => selectOptions(item)}
        showModal={() => setModalVisible(true)}
      //  onChangeText={(txt) =>setConsultCharge(txt)}
        editAppointment={(item) => navigation.navigate('AddPatient', {item, type: 'edit'})}
      />
      <InputModal
      item={selectedAppointment}
      visible={modalVisible}
      primaryBtnText='Close'
      secondaryBtnText='Submit'
      setAmount={(txt)=>setConsultCharge(txt)}
      onPrimaryPress={()=>setModalVisible(false)}
      onSecondaryPress={(item)=>updatePaymentStatus(item)}

      />
      <View style={{flexDirection: 'row', padding: 20}}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialCommunityIcons
            name="arrow-left"
            size={32}
            color={Color.black}
          />
        </TouchableOpacity>
        <Text style={styles.title}> {t('patientQueue.screenTitle')}</Text>
      </View>

      <View style={styles.btnContainer}>
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => setTime('Morning')}
          style={{
            ...styles.btn,
            backgroundColor: time === 'Morning' ? Color.primary : Color.white,
          }}>
          <Text
            style={{
              ...styles.btnText,
              color: time === 'Morning' ? '#fff' : '#000',
            }}>
            {t('patientQueue.morning')}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => setTime('Evening')}
          style={{
            ...styles.btn,
            backgroundColor: time === 'Evening' ? Color.primary : Color.white,
          }}>
          <Text
            style={{
              ...styles.btnText,
              color: time === 'Evening' ? '#fff' : '#000',
            }}>
            {t('patientQueue.evening')}
          </Text>
        </TouchableOpacity>
      </View>
      {loading ? (
        <View
          style={{
            margin: 20,
          }}>
          <DoctorPlaceholder />
          <DoctorPlaceholder />
          <DoctorPlaceholder />
          <DoctorPlaceholder />
          <DoctorPlaceholder />
          <DoctorPlaceholder />
        </View>
      ) : (
        <View>
          {/* {appointmentData.map((item, index) => {
            return (
              <AppointmentCard
                key={index}
                item={item}
                //   onPress={() => navigation.navigate('Appointment', {item})}
                onDoublePress={() =>
                  navigation.navigate('AddPatient', {item, type: 'edit'})
                }
              />
            );
          })} */}
          <ScrollView
            contentContainerStyle={{paddingBottom: 50}}
            showsVerticalScrollIndicator={false}>
            <FlatList
              ref={_scrollRef}
              nestedScrollEnabled={true}
              // onScrollToIndexFailed={() => {}}
              // onLayout={() => {
              //   _scrollRef.current.scrollToIndex({
              //     animated: true,
              //     index: appointmentData.findIndex(item => item.status === 1),
              //     viewPosition: 0.5,
              //   });
              // }}
              showsVerticalScrollIndicator={false}
              style={{
                width: '100%',
              }}
              contentContainerStyle={{paddingHorizontal: 30,paddingBottom:100}}
              data={appointments}
              renderItem={({item, index}) => (
                <AppointmentCard
                  key={index}
                  item={item}
                  bgColor={item.online_offline === 'online' && item.status === 0 ? Color.yellow : conditionalStyles(item.status)}
                  //   onPress={() => navigation.navigate('Appointment', {item})}
                  // onDoublePress={() =>
                  //   navigation.navigate('AddPatient', {item, type: 'edit'})
                  // }
                  onPress={() =>{
                    setSelectedAppointment(item);
                    _sheetRef.current.open();
                  }}
                />
              )}
              keyExtractor={item => item.id}
            />
          </ScrollView>
          {appointmentData.length === 0 && (
            <View
              style={{
                flex: 1,
                alignItems: 'center',
                marginTop: 60,
              }}>
              <Text
                style={{
                  color: Color.grey,
                  fontSize: 16,
                  fontFamily: Fonts.primarySemiBold,
                }}>
                No appointments here
              </Text>
            </View>
          )}
        </View>
      )}
    </View>
  );
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
  btnContainer: {
    flexDirection: 'row',
  },
  btn: {
    flex: 1,
    paddingVertical: 15,
  },
  btnText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#000',
    fontFamily: Fonts.primarySemiBold,
    lineHeight: 16 * 1.4,
  },
  resolved: {
    backgroundColor: '#006400',
  },
  due_payment:{
    backgroundColor:'#ff7f50',
    },
  absent: {
    // borderWidth: 5,
    // borderColor: Color.red,
    backgroundColor: Color.red,
  },
  current: {
    backgroundColor: '#ff8c00',
    //borderWidth: 5,
    // borderColor: Color.blue,
  },
  pending: {
    backgroundColor: Color.graylight,
    // borderWidth: 2,
    // borderStyle: 'dashed',
  },
});
