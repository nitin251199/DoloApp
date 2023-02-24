import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';

import React, {useEffect} from 'react';
import {Color, Dimension, Fonts} from '../theme';
import {Button, Checkbox, Searchbar} from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useTranslation} from 'react-i18next';
import PatientCard from '../components/Patientcard';
import {postData, getData} from '../API';
import {errorToast} from '../components/toasts';
import AppointmentDetails from '../components/bottomsheets/AppointmentDetails';

const AllAppointments = ({navigation, route}) => {
  const Id = route.params?.id;
  const [loading, setLoading] = React.useState(false);
  const [mobile, setMobile] = React.useState('');
  const [allAppointments, setAllAppointments] = React.useState([]);
  const [detail, setDetail] = React.useState([]);
  
  const {t} = useTranslation();
  const [searchQuery, setSearchQuery] = React.useState('');

  const getAppointmentList = async txt => {
    // console.log('dt==',appointment?.patient_id,appointment?.doctor_id,feedBack,prescriptions)
    setLoading(true);

    const result = await getData(`patientsearchclick/${Id}`);
    console.log('result==', result);

    setAllAppointments(result?.data);

    setLoading(false);
  };

  const getAppointmentDetail = async (txt) => {
    // console.log('dt==',appointment?.patient_id,appointment?.doctor_id,feedBack,prescriptions)
    setLoading(true);

    const result = await getData(`patient_appointement_detail/${txt}`);
    console.log('detailll==', result?.data[0]);

    setDetail(result?.data[0]);
   

    setLoading(false);
  };

  

  useEffect(() => {
    getAppointmentList();
  }, []);




  const _sheetRef = React.useRef(null);

  const conditionalStyles = status => {
    switch (status) {
      case 2:
        return styles.resolved;
      case 3:
        return styles.absent;
      case 1:
        return styles.current;
      case 0:
        return styles.pending;
      default:
        return styles.resolved;
    }
  };
  return (
    <View style={styles.main_container}>
      <AppointmentDetails 
      item={detail}
      loading={loading}
      ref={_sheetRef}
      />
      <View style={{flexDirection: 'row', padding: 20}}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialCommunityIcons
            name="arrow-left"
            size={32}
            color={Color.black}
          />
        </TouchableOpacity>
        <Text style={styles.title}> All Appointments</Text>
      </View>

      <View style={{marginTop: 10, paddingHorizontal: 15}}>
        {allAppointments &&
          allAppointments.map((item, index) => {
            return (
              <TouchableOpacity
                style={{
                  ...styles.listItem,
                  // flex: 1,
                  // flexDirection: 'row',
                  padding: 15,
                  alignItems: 'center',
                  //justifyContent: 'center',
                
                  marginTop: 5,
                  ...conditionalStyles(item.status)
                }} 
                 
                 onPress={() =>getAppointmentDetail(item.id) &&(item.status == 2 && _sheetRef.current.open()) }
             // onPress={() =>getAppointmentDetail(item.id)}
              >
                <Text style={styles.name_style}>
                  {new Date(item.date).getDate()}/
                  {new Date(item.date).getMonth()}/
                  {new Date(item.date).getFullYear()}
                </Text>
              </TouchableOpacity>
            );
          })}
      </View>
    </View>
  );
};

export default AllAppointments;

const styles = StyleSheet.create({
  main_container: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontFamily: 'Poppins-Bold',
    color: Color.black,
    paddingHorizontal: 20,
  },
  name_style: {
    fontSize: 18,
    lineHeight: 18 * 1.4,
    color: Color.white,
    // marginHorizontal: 10,
    fontFamily: Fonts.primarySemiBold,
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

  resolved: {
    backgroundColor: '#006400',
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
