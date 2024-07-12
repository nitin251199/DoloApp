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
import AppointmentCard from '../components/AppointmentCard';

export default function AppointmentList({navigation, route}) {
  const [appointmentData, setAppointmentData] = React.useState(
    route.params?.appointments,
  );

  const {t} = route.params;

  console.log('ddd==',route.params?.doctors)

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>
        {route.params?.type == 2
          ? t('appointmentList.upcoming')
          : route.params?.type == 1
          ? t('appointmentList.today')
          : t('appointmentList.past')}{' '}
        {t('appointmentList.appointments')}. 🩺
      </Text>
      {/* {loading ? (
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
      ) : ( */}
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
              {t('appointmentList.noAppointments')}
            </Text>
          </View>
        )}
      </ScrollView>
      {/* )} */}
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
