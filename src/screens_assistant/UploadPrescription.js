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
import {useTranslation} from 'react-i18next';

export default function UploadPrescription({navigation}) {
  const [time, setTime] = React.useState('Morning');
  const [appointmentData, setAppointmentData] = React.useState([]);
  const [appointments, setAppointments] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
 

  const _scrollRef = React.useRef(null);

  const user = useSelector(state => state.user);

  const {t} = useTranslation();

  const months = [
    t('scheduleScreen.jan'),
    t('scheduleScreen.feb'),
    t('scheduleScreen.mar'),
    t('scheduleScreen.apr'),
    t('scheduleScreen.may'),
    t('scheduleScreen.jun'),
    t('scheduleScreen.jul'),
    t('scheduleScreen.aug'),
    t('scheduleScreen.sep'),
    t('scheduleScreen.oct'),
    t('scheduleScreen.nov'),
    t('scheduleScreen.dec'),
  ];

  const days = [
    t('scheduleScreen.sun'),
    t('scheduleScreen.mon'),
    t('scheduleScreen.tue'),
    t('scheduleScreen.wed'),
    t('scheduleScreen.thu'),
    t('scheduleScreen.fri'),
    t('scheduleScreen.sat'),
  ];

  const [dates, setDates] = React.useState([]);
  const _datesRef = React.useRef(null);
  const [selectedDate, setSelectedDate] = React.useState({
    date: new Date().getDate(),
    month: months[new Date().getMonth()],
    day: days[new Date().getDay()],
  });
  const fetchAppointments = async () => {
    console.log('api', `allappointment/${user?.doctor_id}`);
    const list = await getData(`allappointment/${user?.doctor_id}`);
    console.log('listdata-->',  list?.data)
    setAppointmentData(
      list?.data
        // .filter(
        //   item =>
        //   `${item?.create_date}` ===
        //     `${new Date().getDate()}/${new Date().getMonth()}/${new Date().getFullYear()}`,
        // )
        // .sort((a, b) => new Date(a.create_date) - new Date(b.create_date)),
    );
   // console.log('dddtt==',list?.data);
    setLoading(false);
  };






  useEffect(() => {
    fetchAppointments();
  }, []);



  const getDates = () => {
    let dates = [];
    for (let i = -30; i < 30; i++) {
      let d = new Date();
      d.setDate(d.getDate() + i);
      dates.push({
        date: d.getDate(),
        month: months[d.getMonth()],
        day: days[d.getDay()],
      });
    }
    setDates(dates);
  };

  useEffect(() => {
    getDates();
  }, []);


  useEffect(() => {
    let filteredAppointments = appointmentData.filter(
      item =>
        new Date(item.created_at).getDate() === selectedDate.date &&
        months[new Date(item.created_at).getMonth()] === selectedDate.month,
    );
    if (time === 'Morning') {
      // setAppointments(
      //   filteredAppointments.filter(
      //     item => new Date(item.created_at).getHours() < 12,
      //   ),
      // );

       setAppointments(
        filteredAppointments.filter(
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
        filteredAppointments.filter(
          item => item.shift_name == 'Evening',
        ),
      );
      
    }
  }, [selectedDate.date, selectedDate.month, time, appointmentData]);




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
        <Text style={styles.title}>{t('uploadPrescription.screenTitle')}</Text>
      </View>
     
      <View
        style={{
          width: '100%',
          borderBottomWidth: 1,
          paddingBottom: 10,
          borderBottomColor: '#ddd',
        }}>
        <Text style={styles.subHeading}>
          {selectedDate.month}, {new Date().getFullYear()}
        </Text>
        <View style={styles.row}>
          <MaterialCommunityIcons
            name="chevron-left"
            size={30}
            color={'#000'}
          />
          <FlatList
            ref={_datesRef}
            data={dates}
            horizontal
            onLayout={e => {
              _datesRef &&
                _datesRef.current.scrollToIndex({
                  index: dates.length / 2 - 5,
                  animated: true,
                });
            }}
            // initialScrollIndex={dates.length / 2 - 2}
            getItemLayout={(data, index) => ({
              length: 60,
              offset: 60 * index,
              index,
            })}
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item, index) => index}
            renderItem={({item, index}) => {
              return (
                <TouchableOpacity
                  key={index}
                  onPress={() => setSelectedDate(item)}
                  style={{
                    ...styles.dayContainer,
                    backgroundColor:
                      item.date === selectedDate.date &&
                      item.day === selectedDate.day
                        ? `${Color.primary}80`
                        : null,
                    borderWidth:
                      item.date == new Date().getDate() &&
                      item.day == days[new Date().getDay()]
                        ? 0.5
                        : 0,
                    borderColor: '#999',
                  }}>
                  <Text style={styles.day}>{item.day}</Text>
                  <Text style={styles.date}>{item.date}</Text>
                </TouchableOpacity>
              );
            }}
          />
          <MaterialCommunityIcons
            name="chevron-right"
            size={30}
            color={'#000'}
          />
        </View>
      </View>
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
              {t('scheduleScreen.morning')}
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
              {t('scheduleScreen.evening')}
            </Text>
          </TouchableOpacity>
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
            data={appointments}
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
   // backgroundColor: Color.white,
  },
  title: {
    fontSize: 20,
    fontFamily: 'Poppins-Bold',
    color: Color.black,
    paddingHorizontal: 20,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  subHeading: {
    fontSize: 18,
    color: '#000',
    textAlign: 'center',
    fontFamily: Fonts.primarySemiBold,
    marginBottom: 10,
  },
  dayContainer: {
    width: 50,
    paddingVertical: 10,
    marginHorizontal: 2,
    alignItems: 'center',
    borderRadius: 7,
  },
  day: {
    fontFamily: Fonts.primaryBold,
    color: '#000',
  },
  date: {
    fontFamily: Fonts.primaryRegular,
    color: '#000',
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
