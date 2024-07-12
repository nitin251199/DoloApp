import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useEffect} from 'react';
import {Color, Dimension, Fonts} from '../theme';
import DoctorCard from '../components/DoctorCard';
import {useSelector} from 'react-redux';
import {getData} from '../API';
import DoctorPlaceholder from '../placeholders/DoctorPlaceholder';
import AppointmentCard from '../components/AppointmentCard';

export default function TodayAppointments({navigation}) {
  const [appointmentData, setAppointmentData] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  const user = useSelector(state => state.user);

  const fetchAppointments = async () => {
    setLoading(true);
    let res = await getData(`agent/doctorview/${user?.userid}`);
    if (res.success) {
      
      setDoctorData(res?.data?.filter(item => item?.status === '1'));
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Today Appointments. 🩺</Text>
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
          }}>
          {appointmentData.map((item, index) => {
            return (
              <AppointmentCard
                key={index}
                item={item}
                onPress={() => navigation.navigate('Doctor', {id: item?.doctor_id})}
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
});
