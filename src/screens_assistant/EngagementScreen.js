import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Color, Fonts} from '../theme';
import LinearGradient from 'react-native-linear-gradient';
import EngagementSheet from '../components/bottomsheets/EngagementSheet';
import {useSelector} from 'react-redux';
import {useEffect} from 'react';
import {getData, postData} from '../API';
import EngagementPlaceholder from '../placeholders/EngagementPlaceholder';
import {errorToast, successToast} from '../components/toasts';
import {ActivityIndicator} from 'react-native-paper';
import {useTranslation} from 'react-i18next';
import { ScrollView } from 'react-native-gesture-handler';
export default function EngagementScreen({navigation}) {
  const user = useSelector(state => state.user);
  console.log('did2--',user?.doctor_id)
  const [engagementData, setEngagementData] = React.useState([]);
  const [engagements, setEngagements] = React.useState([]);
  const [selectedEngagement, setSelectedEngagement] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [statusLoading, setStatusLoading] = React.useState(false);
  const [time, setTime] = React.useState('Morning');
  const [currentPatient, setCurrentPatient] = React.useState('');
  const {t} = useTranslation();
  const fetchAppointments = async () => {
    const list = await getData(`appointment/${user?.doctor_id}`);
    console.log('app ls--', list?.data)
    // .filter(
    //   item =>
    //     new Date(item.created_at).setHours(0, 0, 0, 0) ==
    //     new Date().setHours(0, 0, 0, 0),
    // ));

    setEngagementData(
      list?.data,
      // .filter(
      //   item =>
      //     new Date(item.created_at).setHours(0, 0, 0, 0) ==
      //     new Date().setHours(0, 0, 0, 0),
      // ),
    );
    setLoading(false);
  };

  // useEffect(() => {
  //   fetchAppointments();
  // }, []);

  const getCurrentPatient = async() =>{
    setLoading(true);
    let body = {
     shift_name:time,
     doctor_id:user?.doctor_id
  
    }
  var result = await postData('patinemaximumtokenno',body);
  console.log('result--',result)
  setLoading(false);
  
    setCurrentPatient(result.token_no);

    }

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', async() => {
     
   
     await fetchAppointments();
     await getCurrentPatient();
    },[]);

   
    return unsubscribe;
    
  }, []);

  useEffect(() => {
    // let filteredAppointments = appointmentData;
    
    if (time === 'Morning') {
      // setAppointments(
      //   filteredAppointments.filter(
      //     item => new Date(item.created_at).getHours() < 12,
      //   ),
      // );
     
      setEngagements(
        engagementData && engagementData.filter(item => item.shift_name == 'Morning'),
      );
      getCurrentPatient()
     
    } else {
      // setAppointments(
      //   filteredAppointments.filter(
      //     item => new Date(item.created_at).getHours() >= 12,
      //   ),
      // );

      setEngagements(
        engagementData &&  engagementData.filter(item => item.shift_name == 'Evening'),
      );
      getCurrentPatient()
    }
  }, [time, engagementData, currentPatient]);

  const _sheetRef = React.useRef(null);

  const conditionalStyles = status => {
    switch (status) {
      case 2:
        return styles.resolved;
      case 3:
        return styles.absent;
      case 5:
        return styles.due_payment;
      case 0:
        return styles.pending;
      default:
        return styles.pending;
    }
  };

  const handleChange = async (id, status) => {
    
    setStatusLoading(true);
    let currentA = null;
    //let previousA = null;
    const newData = engagements.map(item => {
      // if (item.status === 1 && status === 1) {
      //   item.status = 2;
      //   previousA = item;
      // }

      // if (item.status === 4){
      //   errorToast('cannot active previous token')
  
      //   }

      if (item.id === id ) {
       
      
          currentA = item;
          item.status = status;
   
         }

       

      return item;
    });
    let currentBody = {
      status: currentA?.status,
      id: currentA?.id,
      shift_name:currentA?.shift_name
    };
    // let previousBody = {
    //   status: previousA?.status,
    //   id: previousA?.id,
    //   shift_name:previousA?.shift_name
    // };
    if (currentA) {
      var result1 = await postData('statusappointmentupdate', currentBody);
    }
    // if (previousA) {
    //   var result2 = await postData('statusappointmentupdate', previousBody);
    // }
    setStatusLoading(false);
    if (result1?.success) {
      successToast('Appointment status updated successfully');
      setEngagements(newData);
      fetchAppointments();
      _sheetRef.current.close();
    } else {
      errorToast('Something went wrong');
    }
  };



  const renderItem = ({item, index}) => {
    return (
    
     
      <TouchableOpacity
      onLongPress=  {() => {
          setSelectedEngagement(item);
          {item.status !=2 &&
          _sheetRef.current.open();
        } 
        }}
        style={{
          flex: 1,
          overflow: 'hidden',
          borderRadius: 20,
          marginVertical: 10,
          marginHorizontal: 5,
         
          height: 60,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',

          ...conditionalStyles(item.status),
        }}>
        {/* <LinearGradient
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          colors={
            item.status == 3 || item.status == 0
              ? ['#ffffff', '#ffffff']
              : ['#d4f0da', '#9ee1ae']
          }
          style={{...styles.itemContainer}}> */}
        <Text style={styles.itemText}>
          {item.token_no <= 9 ? `0${item.token_no}` : item.token_no}
        </Text>
        {/* </LinearGradient> */}
      </TouchableOpacity>
      
       
    );
  };

  return (
    <View style={styles.container}>
      <ActivityIndicator
        animating={statusLoading}
        color={Color.primary}
        size={40}
        style={{
          position: 'absolute',
          zIndex: 1,
          top: '50%',
          left: '50%',
          transform: [{translateX: -20}, {translateY: -20}],
        }}
      />
      <EngagementSheet
        ref={_sheetRef}
        item={selectedEngagement}
        handleChange={(id, status) => handleChange(id, status)}
      />
      <View style={{flexDirection: 'row', padding: 20}}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialCommunityIcons
            name="arrow-left"
            size={32}
            color={Color.black}
          />
        </TouchableOpacity>
        <Text style={styles.title}>Engagement Status</Text>
      </View>
      <Text style={{color:Color.black,paddingLeft:20,fontSize: 16,fontFamily: 'Poppins-Bold',}}>
        Current Consulting Patient  <Text style={{fontSize:30,color:Color.green}}>   {currentPatient}  </Text> 
        </Text>
      <View style={styles.btnContainer}>
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => setTime('Morning') }
          style={{
            ...styles.btn,
            backgroundColor: time === 'Morning' ? Color.primary : Color.white,
          }}>
          <Text
            style={{
              ...styles.btnText,
              color: time === 'Morning' ? '#fff' : '#000',
            }}>
            {t('engagementStatus.morning')}
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
            {t('engagementStatus.evening')}
          </Text>
        </TouchableOpacity>
      </View>
      {loading ? (
        <FlatList
          data={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
          renderItem={() => <EngagementPlaceholder />}
          numColumns={2}
          keyExtractor={item => item}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{paddingBottom: 20, margin: 10}}
        />
      ) : (
        <ScrollView contentContainerStyle={{paddingBottom:30}} showsVerticalScrollIndicator={false}>
          <View style={{paddingHorizontal:80,marginTop:20}}>
        <FlatList
          data={engagements}
          renderItem={renderItem}
          numColumns={2}
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
         // contentContainerStyle={{paddingBottom: 20, margin: 10}}
        />
        </View>
        </ScrollView>
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
  itemContainer: {
    height: 120,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  resolved: {
    backgroundColor: '#006400',
  },
  absent: {
   backgroundColor: Color.red,
  },
  current: {
    backgroundColor: '#ff8c00',
   },
   due_payment:{
   backgroundColor:'#ff7f50',
   },
  pending: {
    backgroundColor: Color.graylight,
    },
  itemText: {
    fontSize: 30,
    fontFamily: Fonts.primarySemiBold,
    color: Color.black,
    textShadowColor: Color.black,
    textShadowOffset: {width: 1, height: 2},
    textShadowRadius: 3.87,
    //textAlign:'center',
  },
  btnContainer: {
    flexDirection: 'row',
    marginTop:15
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
