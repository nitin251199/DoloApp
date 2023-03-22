import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from 'react-native';
import React, {useEffect} from 'react';
import {Color, Dimension, Fonts} from '../theme';
import DoctorCard from '../components/DoctorCard';
import {useSelector} from 'react-redux';
import {getData} from '../API';
import DoctorPlaceholder from '../placeholders/DoctorPlaceholder';
import AppointmentCard from '../components/AppointmentCard';
import {useTranslation} from 'react-i18next';

export default function TodayAppointments({navigation}) {
  const [appointmentData, setAppointmentData] = React.useState([]);
  const [appointments, setAppointments] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [time, setTime] = React.useState('Morning');

  const user = useSelector(state => state.user);
  const {t} = useTranslation();
  const fetchAppointments = async () => {
    setLoading(true);
    const list = await getData(`appointment/${user?.userid}`);
    console.log('listdataaaaa--',list)
    setAppointmentData(
      list?.data
        // .filter(
        //   item =>
        //   item?.create_date ==
        //     `${new Date().getDate()}/${new Date().getMonth()}/${new Date().getFullYear()}`,
        // )
       // .sort((a, b) => new Date(a.create_date) - new Date(b.create_date)),
    );
    setLoading(false);
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

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

   const conditionalStyles = (status, online_offline) => {
    if (online_offline === 'online' && status === 0) {
      return styles.online;
    } else {
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
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>{t('todayAppointment.screenTitle')}  🩺</Text>
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
              {t('todayAppointment.morning')}
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
              {t('todayAppointment.evening')}
            </Text>
          </TouchableOpacity>
        </View>
      {loading ? (
        <View
          style={{
            margin: 10,
          }}>
          <DoctorPlaceholder />
          <DoctorPlaceholder />
          <DoctorPlaceholder />
          <DoctorPlaceholder />
          <DoctorPlaceholder />
          <DoctorPlaceholder />
        </View>
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{
            width: '100%',
          }}
          contentContainerStyle={{paddingBottom:30}}
          >
          {appointmentData.length != 0 && appointments.map((item, index) => {
            return (
              <AppointmentCard
                key={index}
                item={item}
                bgColor={item.online_offline === 'online' && item.status === 0 ? Color.yellow : conditionalStyles(item.status)}
                onPress={() => navigation.navigate('Appointment', {item})}
              />
            );
          })}
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
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
  },
  heading: {
    fontSize: 22,
    color: '#000',
    fontFamily: Fonts.primaryBold,
    width: '100%',
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
});
