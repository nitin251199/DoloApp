import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect} from 'react';
import {Color, Fonts} from '../theme';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {getData} from '../API';
import DoctorPlaceholder from '../placeholders/DoctorPlaceholder';
import AppointmentCard from '../components/AppointmentCard';
import {useSelector} from 'react-redux';

export default function UploadPrescription({navigation}) {
  const [appointmentData, setAppointmentData] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  const _scrollRef = React.useRef(null);

  const user = useSelector(state => state.user);

  const fetchAppointments = async () => {
    console.log('api', `appointment/${user?.doctor_id}`);
    const list = await getData(`appointment/${user?.doctor_id}`);
    setAppointmentData(list?.data);
    console.log('dddtt==',list?.data);
    setLoading(false);
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

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
        <Text style={styles.title}>Upload Prescription</Text>
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
            data={appointmentData}
            renderItem={({item, index}) => (
              <AppointmentCard
                key={index}
                item={item}
                onPress={() => navigation.navigate('Upload', {item})}
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
    backgroundColor: Color.white,
  },
  title: {
    fontSize: 20,
    fontFamily: 'Poppins-Bold',
    color: Color.black,
    paddingHorizontal: 20,
  },
});
