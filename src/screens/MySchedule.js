import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useEffect} from 'react';
import {Color, Dimension, Fonts} from '../theme';
import {getData} from '../API';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useSelector} from 'react-redux';

export default function MySchedule({navigation}) {
  const [doctorData, setDoctorData] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  const user = useSelector(state => state.user);

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
          {months[new Date().getMonth()]}, {new Date().getFullYear()}
        </Text>
        <View style={styles.row}>
          <MaterialCommunityIcons
            name="chevron-left"
            size={30}
            color={'#000'}
          />
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={styles.dayContainer}>
              <Text style={styles.day}>Sat</Text>
              <Text style={styles.date}>15</Text>
            </View>
            <View style={styles.dayContainer}>
              <Text style={styles.day}>Sun</Text>
              <Text style={styles.date}>16</Text>
            </View>
            <View style={styles.dayContainer}>
              <Text style={styles.day}>Mon</Text>
              <Text style={styles.date}>17</Text>
            </View>
            <View
              style={{
                ...styles.dayContainer,
                backgroundColor: `${Color.primary}50`,
              }}>
              <Text style={styles.day}>Tue</Text>
              <Text style={styles.date}>18</Text>
            </View>
            <View style={styles.dayContainer}>
              <Text style={styles.day}>Wed</Text>
              <Text style={styles.date}>19</Text>
            </View>
            <View style={styles.dayContainer}>
              <Text style={styles.day}>Thu</Text>
              <Text style={styles.date}>20</Text>
            </View>
            <View style={styles.dayContainer}>
              <Text style={styles.day}>Fri</Text>
              <Text style={styles.date}>21</Text>
            </View>
            <View style={styles.dayContainer}>
              <Text style={styles.day}>Sat</Text>
              <Text style={styles.date}>22</Text>
            </View>
            <View style={styles.dayContainer}>
              <Text style={styles.day}>Sun</Text>
              <Text style={styles.date}>23</Text>
            </View>
            <View style={styles.dayContainer}>
              <Text style={styles.day}>Mon</Text>
              <Text style={styles.date}>24</Text>
            </View>
            <View style={styles.dayContainer}>
              <Text style={styles.day}>Tue</Text>
              <Text style={styles.date}>25</Text>
            </View>
          </ScrollView>
          <MaterialCommunityIcons
            name="chevron-right"
            size={30}
            color={'#000'}
          />
        </View>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.scheduleContainer}>
          <Text style={styles.dayTime}>Morning</Text>
          <View style={styles.batchContainer}>
            <View style={[styles.batch, styles.booked]}>
              <Text style={[styles.time, styles.bookedTime]}>6:00 AM</Text>
            </View>
            <View style={styles.batch}>
              <Text style={styles.time}>7:00 AM</Text>
            </View>
            <View style={styles.batch}>
              <Text style={styles.time}>8:00 AM</Text>
            </View>
            <View style={[styles.batch, styles.booked]}>
              <Text style={[styles.time, styles.bookedTime]}>9:00 AM</Text>
            </View>
            <View style={[styles.batch, styles.booked]}>
              <Text style={[styles.time, styles.bookedTime]}>10:00 AM</Text>
            </View>
            <View style={[styles.batch, styles.booked]}>
              <Text style={[styles.time, styles.bookedTime]}>11:00 AM</Text>
            </View>
          </View>
        </View>
        <View style={styles.scheduleContainer}>
          <Text style={styles.dayTime}>Afternoon</Text>
          <View style={styles.batchContainer}>
            <View style={styles.batch}>
              <Text style={styles.time}>12:00 AM</Text>
            </View>
            <View style={[styles.batch, styles.booked]}>
              <Text style={[styles.time, styles.bookedTime]}>1:00 PM</Text>
            </View>
            <View style={[styles.batch, styles.booked]}>
              <Text style={[styles.time, styles.bookedTime]}>2:00 PM</Text>
            </View>
            <View style={styles.batch}>
              <Text style={styles.time}>3:00 PM</Text>
            </View>
          </View>
        </View>
        <View style={styles.scheduleContainer}>
          <Text style={styles.dayTime}>Evening</Text>
          <View style={styles.batchContainer}>
            <View style={[styles.batch, styles.booked]}>
              <Text style={[styles.time, styles.bookedTime]}>4:00 PM</Text>
            </View>
            <View style={styles.batch}>
              <Text style={styles.time}>5:00 PM</Text>
            </View>
            <View style={styles.batch}>
              <Text style={styles.time}>6:00 PM</Text>
            </View>
            <View style={[styles.batch, styles.booked]}>
              <Text style={[styles.time, styles.bookedTime]}>7:00 PM</Text>
            </View>
          </View>
        </View>
        <View style={styles.scheduleContainer}>
          <Text style={styles.dayTime}>Night</Text>
          <View style={styles.batchContainer}>
            <View style={styles.batch}>
              <Text style={styles.time}>8:00 PM</Text>
            </View>
            <View style={[styles.batch, styles.booked]}>
              <Text style={[styles.time, styles.bookedTime]}>9:00 PM</Text>
            </View>
            <View style={[styles.batch, styles.booked]}>
              <Text style={[styles.time, styles.bookedTime]}>10:00 PM</Text>
            </View>
            <View style={styles.batch}>
              <Text style={styles.time}>11:00 PM</Text>
            </View>
          </View>
        </View>
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
    paddingHorizontal: 10,
    paddingVertical: 10,
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
    marginTop: 26,
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
    textAlign: 'center',
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
});
