import {
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
import {errorToast, successToast} from '../components/toasts';
import {getData, postData} from '../API';
import {useSelector} from 'react-redux';
import {ActivityIndicator} from 'react-native-paper';
import {useTranslation} from 'react-i18next';

export default function HomeScreen({navigation}) {
  const {t} = useTranslation();

  const [appointments, setAppointments] = React.useState([]);
  const [available, setAvailable] = React.useState(1);
  const [loading, setLoading] = React.useState(false);
  const [availabilityLoading, setAvailabilityLoading] = React.useState(false);
  const [flashMsg, setFlashMsg] = React.useState('No\nAnouncement');

  const user = useSelector(state => state.user);

  const fetchAppointments = async () => {
    setLoading(true);
    const list = await getData(`appointment/${user?.userid}`);
    setAppointments(
      list?.data
        .filter(
          item =>
            `${new Date(item.created_at).getDate()}/${new Date(
              item.created_at,
            ).getMonth()}/${new Date(item.created_at).getFullYear()}` ==
            `${new Date().getDate()}/${new Date().getMonth()}/${new Date().getFullYear()}`,
        )
        .sort((a, b) => new Date(a.created_at) - new Date(b.created_at)),
    );
    setLoading(false);
  };

  const fetchProfileInfo = async () => {
    setAvailabilityLoading(true);
    let res = await getData(`dolo/profile/${user?.userid}`);
    if (res.status) {
      setAvailable(res.data?.doctor_available);
      setFlashMsg(res.data?.annoucement);
    }
    setAvailabilityLoading(false);
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  useEffect(() => {
    fetchProfileInfo();
  }, [flashMsg]);

  const handleAvailable = async () => {
    let body = {
      id: user?.userid,
      available: available == 1 ? 0 : 1,
    };
    let res = await postData('doctoravilableupdate', body);
    if (res?.success) {
      setAvailable(prev => !prev);
      successToast(t('assistantHome.statusUpdated'));
    } else {
      errorToast(t('assistantHome.somethingWentWrong'));
    }
  };

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
                appointments: appointments,
                type: 1,
                t: t,
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
              {loading ? (
                <ActivityIndicator
                  size={30}
                  color={Color.white}
                  style={{
                    marginHorizontal: 30,
                  }}
                />
              ) : (
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
                  {appointments?.length}
                </Text>
              )}
              <MaterialCommunityIcons
                name="human-queue"
                size={42}
                color={Color.white}
                style={{
                  transform: [{rotateY: '180deg'}],
                }}
              />
            </View>
            <Text style={styles.subText}>{t('doctorHome.walkIn')}</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.cardContainer}>
          <TouchableOpacity
            onPress={() => handleAvailable()}
            style={{
              ...styles.card,
              backgroundColor: availabilityLoading
                ? Color.primary
                : available
                ? 'green'
                : 'red',
            }}>
            {availabilityLoading ? (
              <ActivityIndicator
                size={42}
                color={Color.white}
                style={styles.mainIcon}
              />
            ) : (
              <MaterialCommunityIcons
                name={available ? 'check-circle' : 'close-circle'}
                size={42}
                color="#fff"
                style={styles.mainIcon}
              />
            )}
            <Text style={styles.mainText}>{t('doctorHome.available_now')}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Schedule', {t});
            }}
            style={styles.card}>
            <MaterialCommunityIcons
              name="calendar-clock"
              size={42}
              color="#fff"
              style={styles.mainIcon}
            />
            <Text style={styles.mainText}>{t('doctorHome.schedule')}</Text>
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
              {flashMsg ? flashMsg : t('doctorHome.noAnnouncement')}
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
            <Text style={styles.mainText}>
              {t('doctorHome.manageAssistant')}
            </Text>
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
            <Text style={styles.mainText}>{t('doctorHome.feedback')}</Text>
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
            <Text style={styles.mainText}>{t('doctorHome.payment')}</Text>
            <View
              style={{
                width: 15,
                height: 15,
                backgroundColor: 'red',
                borderRadius: 15 / 2,
                position: 'absolute',
                bottom: 50,
                right: 25,
              }}></View>
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
