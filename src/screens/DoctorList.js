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

export default function DoctorList({navigation, route}) {
  const [doctorData, setDoctorData] = React.useState(route.params?.doctors);

  console.log('ddd==',route.params?.doctors)

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>
        {route.params?.type ? 'Approved' : 'Pending'} Doctors. 👨‍⚕️
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
        {doctorData.map((item, index) => {
          return (
            <DoctorCard
              key={index}
              item={item}
              onPress={() => navigation.navigate('Doctor', {id: item?.doctor_id})}
            />
          );
        })}
        {doctorData.length === 0 && (
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
              No doctors here
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
