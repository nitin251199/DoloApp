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

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>
        {route.params?.type == 2
          ? 'Future'
          : route.params?.type == 1
          ? 'Today'
          : 'Past'}{' '}
        Appointments. 🩺
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
