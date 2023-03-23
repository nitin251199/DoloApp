import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  StatusBar
} from 'react-native';
import React, {useEffect} from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Color, Dimension, Fonts} from '../theme';
import {Avatar} from 'react-native-paper';
import DoctorCard from '../components/DoctorCard';
import {getData} from '../API';
import {useSelector} from 'react-redux';
import DoctorPlaceholder from '../placeholders/DoctorPlaceholder';
import Fontisto from 'react-native-vector-icons/Fontisto';

export default function HomeScreen({navigation}) {
  const user = useSelector(state => state.user);

  console.log('user==', user);

  const [doctorData, setDoctorData] = React.useState([]);
  const [profileData, setProfileData] = React.useState();
  const [pending, setPending] = React.useState([]);
  const [approved, setApproved] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [notificationCount, setNotificationCount] = React.useState(0);

  const fetchProfileInfo = async () => {
    let res = await getData(`agent/${user?.userid}`);
    console.log('agent==', res.agent);
    if (res.status) {
      setProfileData(res.agent);
    }
  };

  const fetchDoctorInfo = async () => {
    setLoading(true);
    let res = await getData(`agent/doctorview/${user?.userid}`);
    if (res.success) {
      let approved = res?.data?.filter(item => item?.status === '1');
      let pending = res?.data?.filter(item => item?.status === '0');
      setApproved(approved);
      setPending(pending);
      setDoctorData(res.data.sort((a, b) => new Date(b.id) - new Date(a.id)));
      console.log('DoctorData==',res.data);
    }
    setLoading(false);
  };

  useEffect(() => {
    let eventListener = navigation.addListener('focus', () =>
      fetchDoctorInfo(),
    );
  }, []);

  useEffect(() => {
    fetchDoctorInfo();
    fetchProfileInfo();
  }, []);

  const getNotificationCount = async() =>{
    const res = await getData(`notificationagentcount/${user?.userid}`);
    console.log('Count--->',res)
    if(res?.success){
      setNotificationCount(res?.agent);
    }
  }

  useEffect(() => {
    setInterval(() => {
    getNotificationCount();
   }, 10000);
}, []);

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        hidden={false}
        backgroundColor={Color.primary}
        style="dark"
      />
      <View style={styles.topContainer}>
      <View style={{width:'75%'}}>
        <Text style={styles.topText}>
          Hi,{' '}
          {user?.username &&
            user?.username.charAt(0).toUpperCase() +
              user?.username.slice(1)}{' '}
          👋
        </Text>
        </View>
        <View style={{flexDirection:'row',justifyContent:'space-around',alignItems:'center',width:'25%'}}>
      
        <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
          <Avatar.Image
            size={40}
            source={{
              uri: profileData?.profileimage
                ? profileData?.profileimage
                : 'https://www.w3schools.com/w3images/avatar6.png',
            }}
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={() =>navigation.navigate('Notification')}>

       { notificationCount > 0 &&
        <View
            style={{
              width: 8,
              height: 8,
              backgroundColor: 'red',
              borderRadius: 15 / 2,
              position: 'absolute',
              bottom: 20,
              right: 13,
            }}></View>
      }

      <Fontisto name="bell" size={25} color={Color.black} />
     
      </TouchableOpacity>
        
        </View>
      </View>
      <ScrollView
      showsVerticalScrollIndicator={false}
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
            onPress={() => navigation.navigate('Profile')}
            style={{
              ...styles.card,
              backgroundColor: '#25CCF7',
              shadowColor: Color.black,
            }}>
            <MaterialCommunityIcons
              name="account"
              size={32}
              color={'#fff'}
              style={{...styles.icon, textShadowColor: '#FFF'}}
            />
            <Text style={styles.subText}>My Profile</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate('AddDoctor')}>
            <MaterialCommunityIcons
              name="plus-circle-outline"
              size={32}
              color={'#25CCF7'}
              style={styles.icon}
            />
            <Text
              style={{
                ...styles.subText,
                fontSize: 14,
                textAlign: 'center',
                color: '#25CCF7',
              }}>
              Add Doctor
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate('DoctorHistory')}
            style={{
              ...styles.card,
              backgroundColor: '#25CCF7',
              shadowColor: '#000',
            }}>
            <MaterialCommunityIcons
              name="history"
              size={32}
              color={'#fff'}
              style={{...styles.icon, textShadowColor: '#FFF'}}
            />
            <Text
              style={{
                ...styles.subText,
                fontSize: 14,
                textAlign: 'center',
                color: '#fff',
              }}>
              History
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.cardContainer}>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('DoctorList', {doctors: pending, type: 0})
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
              {pending?.length}
            </Text>
            <Text style={styles.subText}>Pending</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.card}
            onPress={() =>
              navigation.navigate('DoctorList', {doctors: approved, type: 1})
            }>
            <Text
              style={{
                ...styles.icon,
                color: '#25CCF7',
                fontSize: 46,
                fontFamily: Fonts.primaryBold,
                lineHeight: 46 * 1.2,
              }}>
              {approved?.length}
            </Text>
            <Text
              style={{
                ...styles.subText,
                fontSize: 14,
                textAlign: 'center',
                color: '#25CCF7',
              }}>
              Approved
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.list}>
          <Text style={styles.title}>Recently Added Doctors</Text>
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
            doctorData.map((item, index) => {
              return (
                <DoctorCard
                  item={item}
                  key={index}
                  onPress={() => navigation.navigate('Doctor', {id: item.doctor_id})}
                />
              );
            })
          )}
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
