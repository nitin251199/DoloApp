import {
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
import {dummyAppointments} from '../screens/test';

export default function PatientsQueue({navigation}) {
  const [appointmentData, setAppointmentData] = React.useState(
    dummyAppointments.filter(
      item =>
        new Date(item.date).setHours(0, 0, 0, 0) ==
        new Date().setHours(0, 0, 0, 0),
    ),
  );
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
        <Text style={styles.title}>Patient Queue</Text>
      </View>
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
        }}
        contentContainerStyle={{paddingHorizontal: 20}}>
        {appointmentData.map((item, index) => {
          return (
            <DoctorCard
              key={index}
              item={item}
              //   onPress={() => navigation.navigate('Appointment', {item})}
              onDoublePress={() => navigation.navigate('AddPatient', {item})}
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
    backgroundColor: Color.white,
  },
  title: {
    fontSize: 20,
    fontFamily: 'Poppins-Bold',
    color: Color.black,
    paddingHorizontal: 20,
  },
});
