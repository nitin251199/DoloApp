import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect} from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Color, Dimension, Fonts} from '../theme';
import {Avatar} from 'react-native-paper';
import DoctorCard from '../components/DoctorCard';
import {getData} from '../API';
import {useSelector} from 'react-redux';
import DoctorPlaceholder from '../placeholders/DoctorPlaceholder';
import {dummyAppointments} from './test';

export default function HomeScreen({navigation}) {
  const user = useSelector(state => state.user);

  const [appointments, setAppointments] = React.useState([]);
  const [profileData, setProfileData] = React.useState();
  const [past, setPast] = React.useState([]);
  const [future, setFuture] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  const fetchProfileInfo = async () => {
    let res = await getData(`agent/${user?.userid}`);
    console.log('agent', res);
    if (res.status) {
      setProfileData(res.agent);
    }
  };

  const fetchDoctorInfo = async () => {
    setLoading(true);
    setTimeout(() => {
      setAppointments(
        dummyAppointments
          .filter(
            item =>
              `${new Date(item.date).getDate()}/${new Date(
                item.date,
              ).getMonth()}/${new Date(item.date).getFullYear()}` ==
              `${new Date().getDate()}/${new Date().getMonth()}/${new Date().getFullYear()}`,
          )
          .sort((a, b) => new Date(a.date) - new Date(b.date)),
      );
      setPast(
        dummyAppointments.filter(
          item => new Date(item.date) < new Date().setHours(0, 0, 0, 0),
        ),
      );
      setFuture(
        dummyAppointments.filter(item => new Date(item.date) > new Date()),
      );
      setLoading(false);
    }, 1000);
  };

  useEffect(() => {
    fetchDoctorInfo();
    fetchProfileInfo();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <Text style={styles.topText}>
          Hi,{' '}
          {user?.username &&
            user?.username.charAt(0).toUpperCase() +
              user?.username.slice(1)}{' '}
          👋
        </Text>
        <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
          <Avatar.Image
            size={45}
            source={{
              uri: profileData?.profileimage
                ? profileData?.profileimage
                : 'https://www.w3schools.com/w3images/avatar6.png',
            }}
          />
        </TouchableOpacity>
      </View>
      <ScrollView
        style={{
          elevation: 10,
          borderTopLeftRadius: 25,
          borderTopRightRadius: 25,
          marginTop: 15,
          paddingTop: 15,
          flex: 1,
          backgroundColor: '#fff',
        }}>
        <View style={styles.cardContainer}>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('AppointmentList', {
                appointments: past,
                type: 0,
              })
            }
            style={{
              ...styles.card,
              backgroundColor: '#25CCF7',
              shadowColor: Color.black,
              justifyContent: 'center',
            }}>
            <Text
              style={{
                ...styles.icon,
                color: '#fff',
                fontSize: 46,
                textShadowColor: '#FFF',
                fontFamily: Fonts.primaryBold,
                lineHeight: 46 * 1.2,
              }}>
              {past?.length}
            </Text>
            <Text style={styles.subText}>Past Appointments</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.card}
            onPress={() =>
              navigation.navigate('AppointmentList', {
                appointments: future,
                type: 1,
              })
            }>
            <Text
              style={{
                ...styles.icon,
                color: '#25CCF7',
                fontSize: 46,
                fontFamily: Fonts.primaryBold,
                lineHeight: 46 * 1.2,
              }}>
              {future?.length}
            </Text>
            <Text
              style={{
                ...styles.subText,
                fontSize: 14,
                textAlign: 'center',
                color: '#25CCF7',
              }}>
              Future Appointments
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.list}>
          <Text style={styles.title}>Appointments Today</Text>
          {loading ? (
            <View
              style={{
                margin: 10,
              }}>
              <DoctorPlaceholder />
              <DoctorPlaceholder />
              <DoctorPlaceholder />
              <DoctorPlaceholder />
            </View>
          ) : (
            appointments.map((item, index) => {
              return (
                <DoctorCard
                  item={item}
                  key={index}
                  onPress={() => navigation.navigate('Appointment', {item})}
                />
              );
            })
          )}
          {!loading && appointments.length === 0 && (
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
                No appointments today
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: `${Color.white}`,
    // alignItems: 'center',
  },
  cardContainer: {
    paddingHorizontal: 10,
    flexDirection: 'row',
    // justifyContent: 'space-between',
  },
  card: {
    backgroundColor: '#fff',
    height: 110,
    flex: 1,
    margin: 10,
    borderRadius: 10,
    elevation: 10,
    padding: 10,
    shadowColor: Color.primary,
    justifyContent: 'space-evenly',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  bigText: {
    fontSize: 30,
    fontWeight: '700',
    // fontFamily: Fonts.primaryBold,
    color: Color.white,
    textAlign: 'center',
  },
  subText: {
    fontSize: 14,
    fontFamily: Fonts.primaryRegular,
    color: Color.white,
    textAlign: 'center',
    textShadowColor: Color.grey,
    textShadowOffset: {width: 0.5, height: 0.5},
    textShadowRadius: 1,
  },
  icon: {
    alignSelf: 'center',
    textShadowColor: '#25CCF7',
    textShadowOffset: {width: 0.5, height: 0.5},
    textShadowRadius: 1,
  },
  topContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 20,
    paddingHorizontal: 30,
    width: '110%',
    alignSelf: 'center',
    // borderBottomLeftRadius: 50,
    // borderBottomRightRadius: 50,
    // elevation: 10,
    backgroundColor: 'white',
    alignItems: 'center',
  },
  topText: {
    fontSize: 20,
    fontFamily: Fonts.primarySemiBold,
    width: '80%',
    color: Color.black,
  },
  list: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  title: {
    fontSize: 18,
    fontFamily: Fonts.primaryBold,
    color: Color.black,
  },
});
