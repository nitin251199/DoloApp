import {
  ActivityIndicator,
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useMemo} from 'react';
import {Color, Dimension, Fonts} from '../theme';
import {getData} from '../API';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useSelector} from 'react-redux';

export default function MySchedule({navigation}) {
  const [time, setTime] = React.useState('Morning');
  const [allAppointments, setAllAppointments] = React.useState([]);
  const [appointments, setAppointments] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  const user = useSelector(state => state.user);

  const fetchAppointments = async () => {
    const list = await getData(`appointment/${user?.userid}`);
    setAllAppointments(list?.data);
    setLoading(false);
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  const months = [
    'January',
    'Februauy',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const [dates, setDates] = React.useState([]);
  const _datesRef = React.useRef(null);
  const [selectedDate, setSelectedDate] = React.useState({
    date: new Date().getDate(),
    month: months[new Date().getMonth()],
    day: days[new Date().getDay()],
  });

  useEffect(() => {
    let filteredAppointments = allAppointments.filter(
      item =>
        new Date(item.created_at).getDate() === selectedDate.date &&
        months[new Date(item.created_at).getMonth()] === selectedDate.month,
    );
    if (time === 'Morning') {
      setAppointments(
        filteredAppointments.filter(
          item => new Date(item.created_at).getHours() < 12,
        ),
      );
    } else {
      setAppointments(
        filteredAppointments.filter(
          item => new Date(item.created_at).getHours() >= 12,
        ),
      );
    }
  }, [selectedDate.date, selectedDate.month, time, allAppointments]);

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

  const slots = [
    '06:00',
    '07:00',
    '08:00',
    '09:00',
    '10:00',
    '11:00',
    '12:00',
    '13:00',
    '14:00',
    '15:00',
    '16:00',
    '17:00',
    '18:00',
    '19:00',
    '20:00',
    '21:00',
    '22:00',
    '23:00',
  ];

  const convert24to12 = time => {
    let hours = time.split(':')[0];
    let minutes = time.split(':')[1];
    let newFormat = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12;
    return hours + ':' + minutes + ' ' + newFormat;
  };

  const getSlotName = time => {
    if (time === undefined) return null;
    let slotName = '';
    let hours = parseInt(time.split(':')[0]);
    if (hours === 6) {
      slotName = 'Morning';
    } else if (hours === 16) {
      slotName = 'Evening';
    } else slotName = null;
    return slotName;
  };

  const renderItem = ({item, index}) => {
    return (
      <View
        key={index}
        style={{
          flexDirection: 'row',
          marginHorizontal: 5,
          borderBottomWidth: 1,
          borderBottomColor: '#ccc',
          borderTopWidth: index === 0 ? 1 : 0,
          borderTopColor: '#ccc',
        }}>
        <TouchableOpacity
          activeOpacity={1}
          // onPress={() => setTime('Morning')}
          style={{
            ...styles.btn,
            paddingVertical: 10,
            borderRightWidth: 1,
            borderColor: '#ccc',
            borderLeftWidth: 1,
            flex: 1,
          }}>
          <Text
            style={{
              ...styles.btnText,
              fontFamily: Fonts.primaryRegular,
            }}>
            {item.id}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={1}
          // onPress={() => setTime('Evening')}
          style={{
            ...styles.btn,
            paddingVertical: 10,
            borderRightWidth: 1,
            borderColor: '#ccc',
            flex: 2,
          }}>
          <Text
            adjustsFontSizeToFit
            style={{
              ...styles.btnText,
              fontFamily: Fonts.primaryRegular,
            }}>
            {item.patient_name}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={1}
          // onPress={() => setTime('Evening')}
          style={{
            ...styles.btn,
            paddingVertical: 10,
            borderRightWidth: 1,
            borderColor: '#ccc',
            flex: 2,
          }}>
          <Text
            adjustsFontSizeToFit
            style={{
              ...styles.btnText,
              fontFamily: Fonts.primaryRegular,
            }}>
            {item.category}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>My Schedule 📆</Text>
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
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* <View style={styles.legendContainer}>
          <View style={{...styles.row, marginHorizontal: 10}}>
            <View style={styles.legend}></View>
            <Text style={styles.legendText}>Booked</Text>
          </View>
          <View style={{...styles.row, marginHorizontal: 10}}>
            <View
              style={{...styles.legend, backgroundColor: Color.white}}></View>
            <Text style={styles.legendText}>Empty</Text>
          </View>
        </View> */}
        {/* <View style={{...styles.scheduleContainer, ...styles.batchContainer}}>
          {slots.map((slot, index) => {
            let currentSlotName = getSlotName(slot);

            let status =
              currentSlotName == 'Morning' ||
              currentSlotName == 'Afternoon' ||
              currentSlotName == 'Evening' ||
              currentSlotName == 'Night'
                ? true
                : false;

            let isBooked =
              appointments.filter(item => {
                return item.time === convert24to12(slot);
              }).length > 0;

            let batchClassName = isBooked
              ? [styles.batch, styles.booked]
              : styles.batch;
            let batchTextClassName = isBooked
              ? [styles.time, styles.bookedTime]
              : styles.time;

            return (
              <>
                {status && (
                  <Text style={styles.dayTime}>{getSlotName(slot)}</Text>
                )}
                <View style={batchClassName}>
                  <Text style={batchTextClassName}>{convert24to12(slot)}</Text>
                </View>
              </>
            );
          })}
        </View> */}
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
              Morning
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
              Evening
            </Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            flexDirection: 'row',
            marginVertical: 10,
            marginHorizontal: 5,
            // borderWidth: 1,
            borderColor: '#999',
            borderRadius: 10,
          }}>
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => setTime('Morning')}
            style={{
              ...styles.btn,
              paddingVertical: 10,
              // borderRightWidth: 1,
              borderRightColor: '#999',
              flex: 1,
            }}>
            <Text
              style={{
                ...styles.btnText,
              }}>
              Token
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => setTime('Evening')}
            style={{
              ...styles.btn,
              paddingVertical: 10,
              // borderRightWidth: 1,
              borderRightColor: '#999',
              flex: 2,
            }}>
            <Text
              style={{
                ...styles.btnText,
              }}>
              Name
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => setTime('Evening')}
            style={{
              ...styles.btn,
              paddingVertical: 10,
              flex: 2,
            }}>
            <Text
              style={{
                ...styles.btnText,
              }}>
              Category
            </Text>
          </TouchableOpacity>
        </View>
        {loading ? (
          <ActivityIndicator
            size={'large'}
            color={Color.primary}
            style={{marginTop: 40}}
          />
        ) : (
          <FlatList
            data={appointments}
            keyExtractor={(item, index) => index}
            renderItem={renderItem}
            contentContainerStyle={{paddingBottom: 20}}
            style={{
              marginHorizontal: 5,
            }}
          />
        )}
        {appointments.length == 0 && !loading && (
          <View>
            <Text
              style={{
                textAlign: 'center',
                marginTop: 60,
                color: '#999',
                fontFamily: Fonts.primarySemiBold,
              }}>
              No Appointments at selected time
            </Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  heading: {
    fontSize: 22,
    color: '#000',
    fontFamily: Fonts.primaryBold,
    width: '100%',
    padding: 20,
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
  scheduleContainer: {
    alignItems: 'flex-start',
    paddingHorizontal: 20,
  },
  batchContainer: {
    flexDirection: 'row',
    flexShrink: 1,
    flexWrap: 'wrap',
  },
  dayTime: {
    fontSize: 16,
    width: '100%',
    marginTop: 26,
    marginBottom: 10,
    fontFamily: Fonts.primarySemiBold,
    color: '#000',
  },
  time: {
    color: '#000',
    fontFamily: Fonts.primaryRegular,
    lineHeight: 14 * 1.4,
    // paddingHorizontal: 4,
  },
  batch: {
    // borderWidth: 1,
    borderColor: `${Color.primary}80`,
    borderRadius: 7,
    backgroundColor: '#fff',
    padding: 8,
    marginRight: 10,
    marginBottom: 10,
    elevation: 5,
    shadowColor: Color.primary,
  },
  booked: {
    backgroundColor: Color.primary,
    shadowColor: '#000',
  },
  bookedTime: {
    color: '#fff',
  },
  legendContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  legend: {
    width: 20,
    height: 20,
    backgroundColor: Color.primary,
    borderRadius: 3,
    elevation: 2,
  },
  legendText: {
    color: '#000',
    fontFamily: Fonts.primarySemiBold,
    marginHorizontal: 10,
    lineHeight: 14 * 1.4,
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
