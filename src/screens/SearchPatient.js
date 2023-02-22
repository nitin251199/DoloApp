import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';

import React, {useEffect} from 'react';
import {Color, Dimension, Fonts} from '../theme';
import {Button, Checkbox, Searchbar} from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useTranslation} from 'react-i18next';
import PatientCard from '../components/Patientcard';
import { postData } from '../API';
import { errorToast } from '../components/toasts';
import { useSelector } from 'react-redux';

const SearchPatient = ({navigation}) => {
  const [loading,setLoading] = React.useState(false);
  const [mobile,setMobile] = React.useState('');
  const [patientData,setPatientData] = React.useState('');
  const {t} = useTranslation();
  const user = useSelector(state => state.user); 
  const [searchQuery, setSearchQuery] = React.useState('');

  const searchPatient = async (txt) => {
    // console.log('dt==',appointment?.patient_id,appointment?.doctor_id,feedBack,prescriptions)
    setLoading(true);
    var body = {
      doctor_id: user?.userid,
      mobile: txt,
      
    };
    const result = await postData('patientsearchfilter', body);
     console.log('result==', result);
    if (result.success) {
      
    console.log('patient data==',result?.data)
    setPatientData(result?.data);
 
    } else {
     // errorToast('Something Went Wrong Please Check');
      setPatientData('')
    }
    setLoading(false);
  
     
  };

  useEffect(() => {
 
  // searchPatient();
   
  }, []);
  return (
    <View style={styles.main_container}>
      <View style={{flexDirection: 'row', padding: 20}}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialCommunityIcons
            name="arrow-left"
            size={32}
            color={Color.black}
          />
        </TouchableOpacity>
        <Text style={styles.title}> {t('searchPatient.screenTitle')}</Text>
      </View>
      <View style={{paddingHorizontal: 12}}>
        <Searchbar
          placeholder={t('searchPatient.Enter patient mobile number')}
          onChangeText={(txt) => searchPatient(txt)}
         // value={searchQuery}
          keyboardType="number-pad"
          maxLength={10}
        />
   





      </View>
      {patientData && 
      <View style={{marginTop:20,paddingHorizontal:15}}>
      <TouchableOpacity style={{...styles.listItem,
            // flex: 1,
            // flexDirection: 'row',
            padding: 15,
            alignItems: 'center',
            //justifyContent: 'center',
            backgroundColor:Color.graylight,
            marginTop:20
          }}
          onPress={() => navigation.navigate('AllAppointments', {id:patientData.id})}
          >
     <Text style={styles.name_style}>{patientData.patient_name}</Text>
     </TouchableOpacity>
     </View>
     }
    </View>
  );
};

export default SearchPatient;

const styles = StyleSheet.create({
  main_container: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontFamily: 'Poppins-Bold',
    color: Color.black,
    paddingHorizontal: 20,
  },
  name_style:{
    fontSize: 18,
    lineHeight: 18 * 1.4,
    color: Color.white,
   // marginHorizontal: 10,
    fontFamily: Fonts.primarySemiBold,
  },
  listItem: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginVertical: 20,
    overflow: 'hidden',
    borderRadius: 10,
    // borderWidth: 4,
    // borderColor: '#00b050',
    width: '95%',
    alignSelf:'center',


  },
});
