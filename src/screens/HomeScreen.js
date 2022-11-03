import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect} from 'react';
import {Color, Dimension, Fonts} from '../theme';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {dummyAppointments} from './test';
import {successToast} from '../components/toasts';

export default function HomeScreen({navigation}) {
  const [appointments, setAppointments] = React.useState([]);
  const [past, setPast] = React.useState([]);
  const [today, setToday] = React.useState([]);
  const [available, setAvailable] = React.useState(false);
  const [future, setFuture] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [flashMsg, setFlashMsg] = React.useState('No\nAnouncement');

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
      setToday(
        dummyAppointments.filter(
          item =>
            new Date(item.date).setHours(0, 0, 0, 0) ==
            new Date().setHours(0, 0, 0, 0),
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
  }, []);

  return (
    <View style={styles.container}>
      <View
        style={{
          elevation: 10,
          borderTopLeftRadius: 25,
          borderTopRightRadius: 25,
          // marginTop: 15,
          paddingTop: 15,
          flex: 1,
          backgroundColor: '#fff',
        }}>
        <View style={styles.cardContainer}>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('AppointmentList', {
                appointments: today,
                type: 1,
              })
            }
            style={{
              ...styles.card,
              height: 130,
              backgroundColor: '#25CCF7',
              shadowColor: Color.black,
              justifyContent: 'center',
            }}>
            <View
              style={{
                flexDirection: 'row',
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <MaterialCommunityIcons
                name="human-queue"
                size={42}
                color={Color.white}
              />
              <Text
                style={{
                  ...styles.icon,
                  color: '#fff',
                  fontSize: 50,
                  textShadowColor: '#FFF',
                  fontFamily: Fonts.primaryBold,
                  lineHeight: 50 * 1.4,
                  textShadowOffset: {width: 1, height: 1},
                  marginHorizontal: 30,
                }}>
                {today?.length}
              </Text>
              <MaterialCommunityIcons
                name="human-queue"
                size={42}
                color={Color.white}
                style={{
                  transform: [{rotateY: '180deg'}],
                }}
              />
            </View>
            <Text style={styles.subText}>Walking Patient Today</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.cardContainer}>
          <TouchableOpacity
            onPress={() => {
              setAvailable(prev => !prev);
              // ToastAndroid.show(
              //   'Status updated successfully',
              //   ToastAndroid.SHORT,
              // );
              successToast('Status updated successfully');
            }}
            style={{
              ...styles.card,
              backgroundColor: available ? 'green' : 'red',
            }}>
            <MaterialCommunityIcons
              name={available ? 'check-circle' : 'close-circle'}
              size={42}
              color="#fff"
              style={styles.mainIcon}
            />
            <Text style={styles.mainText}>Available Now</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Schedule');
            }}
            style={styles.card}>
            <MaterialCommunityIcons
              name="calendar-clock"
              size={42}
              color="#fff"
              style={styles.mainIcon}
            />
            <Text style={styles.mainText}>My Schedule</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.cardContainer}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Flash', {
                setFlashMsg,
              });
            }}
            style={styles.card}>
            <MaterialCommunityIcons
              name="volume-source"
              size={42}
              color="#fff"
              style={styles.mainIcon}
            />
            <Text adjustsFontSizeToFit style={styles.mainText}>
              {flashMsg}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('AssistantDashboard');
            }}
            style={styles.card}>
            <MaterialCommunityIcons
              name="hand-coin"
              size={42}
              color="#fff"
              style={styles.mainIcon}
            />
            <Text style={styles.mainText}>Manage Assistant</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.cardContainer}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Feedback');
            }}
            style={styles.card}>
            <MaterialIcons
              name="feedback"
              size={42}
              color="#fff"
              style={styles.mainIcon}
            />
            <Text style={styles.mainText}>Patient Feedback</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('PaymentHistory');
            }}
            style={styles.card}>
            <MaterialCommunityIcons
              name="currency-inr"
              size={42}
              color="#fff"
              style={styles.mainIcon}
            />
            <Text style={styles.mainText}>Payment Recieved</Text>
          </TouchableOpacity>
        </View>
      </View>
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
    height: 130,
    flex: 1,
    margin: 10,
    borderRadius: 10,
    elevation: 10,
    padding: 10,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    backgroundColor: '#25CCF7',
    shadowColor: Color.black,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bigText: {
    fontSize: 30,
    fontWeight: '700',
    // fontFamily: Fonts.primaryBold,
    color: Color.white,
    textAlign: 'center',
  },
  subText: {
    fontSize: 16,
    fontFamily: Fonts.primaryRegular,
    color: Color.white,
    textAlign: 'center',
    textShadowColor: Color.grey,
    textShadowOffset: {width: 0.5, height: 0.5},
    textShadowRadius: 1,
  },
  mainText: {
    fontSize: 16,
    textTransform: 'uppercase',
    // lineHeight: 18 * 1.4,
    fontFamily: Fonts.primaryBold,
    color: Color.white,
    textAlign: 'center',
    textShadowColor: Color.grey,
    textShadowOffset: {width: 0.5, height: 0.5},
    textShadowRadius: 1,
  },
  mainIcon: {
    marginVertical: 10,
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
