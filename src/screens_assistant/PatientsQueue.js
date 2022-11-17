import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {Color, Fonts} from '../theme';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import DoctorCard from '../components/DoctorCard';
import DoctorPlaceholder from '../placeholders/DoctorPlaceholder';
import {getData} from '../API';
import {useSelector} from 'react-redux';
import {useEffect} from 'react';
import AppointmentCard from '../components/AppointmentCard';
import {useFocusEffect} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';

export default function PatientsQueue({navigation}) {
  const user = useSelector(state => state.user);
  const [appointmentData, setAppointmentData] = React.useState([]);

  const [appointments, setAppointments] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [refresh, setRefresh] = React.useState(false);
  const [time, setTime] = React.useState('Morning');
  const _scrollRef = React.useRef(null);
  const {t} = useTranslation();
  const fetchAppointments = async () => {
    const list = await getData(`appointment/${user?.doctor_id}`);
   console.log('list?.data==',list?.data);
  setAppointmentData(list?.data)
      
    setLoading(false);
  };


  useEffect(() => {
    fetchAppointments();
   // filterAppointments();
  }, []);

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
      
    if (time === 'Morning') {
      // setAppointments(
      //   filteredAppointments.filter(
      //     item => new Date(item.created_at).getHours() < 12,
      //   ),
      // );

       setAppointments(
        appointmentData.filter(
          item => item.shift_name == 'Morning',
        ),
      );

    } else {
      // setAppointments(
      //   filteredAppointments.filter(
      //     item => new Date(item.created_at).getHours() >= 12,
      //   ),
      // );

      setAppointments(
        appointmentData.filter(
          item => item.shift_name == 'Evening',
        ),
      );
      
    }
   
  }, [time,appointmentData]);

  // useEffect(() => {
  //   navigation.addListener('focus', () => {
  //     fetchAppointments();
  //   });
  // }, []);

  // useFocusEffect(
  //   React.useCallback(() => {
  //     console.log('focus');
  //     // alert('Screen was focused');
  //     // Do something when the screen is focused
  //     fetchAppointments();
  //   }, []),
  // );



  return (
    <View style={styles.container}>
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
            onPress={() => setTime('Morning') }
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
          <FlatList
            ref={_scrollRef}
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
            contentContainerStyle={{paddingHorizontal: 20}}
            data={appointments}
            renderItem={({item, index}) => (
              <AppointmentCard
                key={index}
                item={item}
                bgColor={{ ...conditionalStyles(item.status)}}
                //   onPress={() => navigation.navigate('Appointment', {item})}
                // onDoublePress={() =>
                //   navigation.navigate('AddPatient', {item, type: 'edit'})
                // }
                onPress={() =>
                  navigation.navigate('AddPatient', {item, type: 'edit'})
                   }
              />
            )}
            keyExtractor={item => item.id}
          />

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
 absent: {
   // borderWidth: 5,
   // borderColor: Color.red,
  backgroundColor:Color.red,

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
