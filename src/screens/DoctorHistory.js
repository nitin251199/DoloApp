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
import {getData} from '../API';
import {useSelector} from 'react-redux';
import DoctorPlaceholder from '../placeholders/DoctorPlaceholder';

export default function HistoryScreen({navigation}) {
  const [doctorData, setDoctorData] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  const user = useSelector(state => state.user);

  const fetchDoctorInfo = async () => {
    setLoading(true);
    let res = await getData(`agent/doctorview/${user?.userid}`);
    if (res.success) {
      
      setDoctorData(res?.data?.filter(item => item?.status === '1'));
    }
    setLoading(false);
  };

  useEffect(() => {
    navigation.addListener('focus', () => fetchDoctorInfo());
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Doctors Added by you. 👨‍⚕️</Text>
      {loading ? (
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
      ) : (
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
                onPress={() => navigation.navigate('Doctor', {id: item.id})}
              />
            );
          })}
          {!loading && doctorData.length === 0 && (
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
                No doctors added
              </Text>
            </View>
          )}
        </ScrollView>
      )}
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
