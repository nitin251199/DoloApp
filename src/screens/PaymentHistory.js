import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {Color, Fonts} from '../theme';
import {Avatar, Divider} from 'react-native-paper';
import {getData} from '../API';
import {useSelector} from 'react-redux';
import {useEffect} from 'react';
import PaymentHistoryPlaceholder from '../placeholders/PaymentHistoryPlaceholder';
import {useTranslation} from 'react-i18next';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export default function PaymentHistory() {
  const [payments, setPayments] = React.useState([]);
  const [allPayments, setAllPayments] = React.useState([]);
  const user = useSelector(state => state.user);
  console.log('userid==', user?.userid);
  const [loading, setLoading] = React.useState(true);

  const fetchPayments = async () => {
    const res = await getData(`paymenthistory/${user?.userid}`);
    console.log('payments==', res);
  //  console.log('paymentDAte==', (res?.data[0]?.date).split(' ')[0]);
    if (res.success) {
      setAllPayments(res?.data);
   
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchPayments();
  }, []);

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
    // let filteredPayments = allPayments.filter(
    //   item =>
    //     new Date(item.date.split(' ')[0]).getDate() === selectedDate.date &&
    //     months[new Date(item.date.split(' ')[0]).getMonth()] ===
    //       selectedDate.month,
    // );
    let filteredPayments = allPayments.filter(
      item =>
      new Date((item.date).split('/').reverse().join("-")).getDate() === selectedDate.date &&
      months[new Date ((item.date).split('/').reverse().join("-")).getMonth()] === selectedDate.month,
    );
    console.log('filteredPayments-->',filteredPayments)
    setPayments(filteredPayments);
  }, [selectedDate.date, selectedDate.month, allPayments]);

  const renderItem = ({item}) => {
    return (
      <View
        style={{
          marginTop: 20,
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Avatar.Image
              size={50}
              source={{
                uri:
                  item?.patient_profile.length > 20
                    ? `data:image/png;base64,${item?.patient_profile}`
                    : 'https://www.w3schools.com/w3images/avatar6.png',
              }}
            />
            <View
              style={{
                marginLeft: 15,
              }}>
              <Text style={styles.listItemTitle}>{item?.patient_name}</Text>
              <Text style={styles.listItemSubTitle}>
                 {item.date}
              </Text>
            </View>
          </View>
          <Text style={styles.listItemText}>₹ {item.Amount}</Text>
        </View>
        {/* <Text
          style={{
            fontSize: 12,
            color: Color.gray,
            marginTop: 10,
          }}>
          {item.date}
        </Text> */}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Payment History 💵</Text>

      <View style={styles.row}>
        <MaterialCommunityIcons name="chevron-left" size={30} color={'#000'} />
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
        <MaterialCommunityIcons name="chevron-right" size={30} color={'#000'} />
      </View>

      {payments.length === 0 && !loading && (
        <View>
          <Text style={{...styles.label, marginTop: 25}}>No payments yet.</Text>
        </View>
      )}
      {loading ? (
        <View>
          <PaymentHistoryPlaceholder />
          <PaymentHistoryPlaceholder />
          <PaymentHistoryPlaceholder />
          <PaymentHistoryPlaceholder />
          <PaymentHistoryPlaceholder />
        </View>
      ) : (
        <FlatList
          data={payments}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          ItemSeparatorComponent={() => (
            <Divider
              style={{
                backgroundColor: '#ccc',
                marginTop: 10,
              }}
            />
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
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
  heading: {
    fontSize: 22,
    color: '#000',
    fontFamily: Fonts.primaryBold,
    width: '100%',
    marginBottom: 20,
  },
  label: {
    fontFamily: Fonts.primaryRegular,
    color: '#000',
    fontSize: 16,
    textAlign: 'center',
  },
  listItemTitle: {
    fontFamily: Fonts.primarySemiBold,
    color: '#000',
    fontSize: 16,
    lineHeight: 16 * 1.4,
  },
  listItemSubTitle: {
    fontFamily: Fonts.primaryRegular,
    color: '#000',
    fontSize: 14,
  },
  listItemText: {
    fontFamily: Fonts.primarySemiBold,
    color: '#000',
    fontSize: 18,
  },
});
