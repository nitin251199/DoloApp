import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
  FlatList,
  Dimensions
} from 'react-native';
import React,{useEffect} from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Color, Fonts} from '../theme';
import {
  Avatar,
  Button,
  Checkbox,
  Chip,
  HelperText,
  RadioButton,
  TextInput,
} from 'react-native-paper';
import {useSelector} from 'react-redux';
import ImagePicker from 'react-native-image-crop-picker';
import {postData, postDataAndImage,getData} from '../API';
import {Picker} from '@react-native-picker/picker';
import {DateTimePickerAndroid} from '@react-native-community/datetimepicker';
import SuccessModal from '../components/modals/SuccessModal';
import MapModal from '../components/modals/MapModal';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import messaging from '@react-native-firebase/messaging';
import { getSyncData, storeDatasync } from '../storage/AsyncStorage';
export default function AddDoctor({navigation}) {
  const theme = {colors: {text: '#000', background: '#aaaaaa50'}}; // for text input
  let morningSchedule = [
    {
      day: 'Sunday',
      start_time: new Date(new Date().setHours(10, 0, 0)),
      end_time: new Date(new Date().setHours(13, 0, 0)),
      checked: false,
    },
    {
      day: 'Monday',
      start_time: new Date(new Date().setHours(10, 0, 0)),
      end_time: new Date(new Date().setHours(13, 0, 0)),
      checked: true,
    },
    {
      day: 'Tuesday',
      start_time: new Date(new Date().setHours(10, 0, 0)),
      end_time: new Date(new Date().setHours(13, 0, 0)),
      checked: true,
    },
    {
      day: 'Wednesday',
      start_time: new Date(new Date().setHours(10, 0, 0)),
      end_time: new Date(new Date().setHours(13, 0, 0)),
      checked: true,
    },
    {
      day: 'Thursday',
      start_time: new Date(new Date().setHours(10, 0, 0)),
      end_time: new Date(new Date().setHours(13, 0, 0)),
      checked: true,
    },
    {
      day: 'Friday',
      start_time: new Date(new Date().setHours(10, 0, 0)),
      end_time: new Date(new Date().setHours(13, 0, 0)),
      checked: true,
    },
    {
      day: 'Saturday',
      start_time: new Date(new Date().setHours(10, 0, 0)),
      end_time: new Date(new Date().setHours(13, 0, 0)),
      checked: true,
    },
  ];

  let eveningSchedule = [
    {
      day: 'Sunday',
      start_time: new Date(new Date().setHours(17, 0, 0)),
      end_time: new Date(new Date().setHours(19, 0, 0)),
      checked: false,
    },
    {
      day: 'Monday',
      start_time: new Date(new Date().setHours(17, 0, 0)),
      end_time: new Date(new Date().setHours(19, 0, 0)),
      checked: true,
    },
    {
      day: 'Tuesday',
      start_time: new Date(new Date().setHours(17, 0, 0)),
      end_time: new Date(new Date().setHours(19, 0, 0)),
      checked: true,
    },
    {
      day: 'Wednesday',
      start_time: new Date(new Date().setHours(17, 0, 0)),
      end_time: new Date(new Date().setHours(19, 0, 0)),
      checked: true,
    },
    {
      day: 'Thursday',
      start_time: new Date(new Date().setHours(17, 0, 0)),
      end_time: new Date(new Date().setHours(19, 0, 0)),
      checked: true,
    },
    {
      day: 'Friday',
      start_time: new Date(new Date().setHours(17, 0, 0)),
      end_time: new Date(new Date().setHours(19, 0, 0)),
      checked: true,
    },
    {
      day: 'Saturday',
      start_time: new Date(new Date().setHours(17, 0, 0)),
      end_time: new Date(new Date().setHours(19, 0, 0)),
      checked: true,
    },
  ];

  let defaultSchedule = [
    {
      day: 'Sunday',
      start_time: new Date(new Date().setHours(10, 0, 0)),
      end_time: new Date(new Date().setHours(19, 0, 0)),
      checked: false,
    },
    {
      day: 'Monday',
      start_time: new Date(new Date().setHours(10, 0, 0)),
      end_time: new Date(new Date().setHours(19, 0, 0)),
      checked: true,
    },
    {
      day: 'Tuesday',
      start_time: new Date(new Date().setHours(10, 0, 0)),
      end_time: new Date(new Date().setHours(19, 0, 0)),
      checked: true,
    },
    {
      day: 'Wednesday',
      start_time: new Date(new Date().setHours(10, 0, 0)),
      end_time: new Date(new Date().setHours(19, 0, 0)),
      checked: true,
    },
    {
      day: 'Thursday',
      start_time: new Date(new Date().setHours(10, 0, 0)),
      end_time: new Date(new Date().setHours(19, 0, 0)),
      checked: true,
    },
    {
      day: 'Friday',
      start_time: new Date(new Date().setHours(10, 0, 0)),
      end_time: new Date(new Date().setHours(19, 0, 0)),
      checked: true,
    },
    {
      day: 'Saturday',
      start_time: new Date(new Date().setHours(10, 0, 0)),
      end_time: new Date(new Date().setHours(19, 0, 0)),
      checked: true,
    },
  ];

  const user = useSelector(state => state.user);

  const [name, setName] = React.useState('');
  const [gender, setGender] = React.useState('Male');
  const [dob, setDob] = React.useState('');
  
  const [maritalStatus, setMaritalStatus] = React.useState('Married');
  const [pinCode, setPinCode] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [experience, setExperience] = React.useState('');
  const [location, setLocation] = React.useState('');
  const [adhar, setAdhar] = React.useState('');
  const [doctorContact, setDoctorContact] = React.useState('');
  const [clinicContact, setClinicContact] = React.useState('');
  const [registration_number, setRegistration_number] = React.useState('');
  const [specialization, setSpecialization] = React.useState('');
  const [Degree, setDegree] = React.useState('');
  const [collegename, setCollegename] = React.useState('');
  const [year_of_passout, setYear_of_passout] = React.useState('');
  const [college_location, setCollege_location] = React.useState('');
  const [award_name, setAward_name] = React.useState('');
  const [certifications, setCertifications] = React.useState('');
  const [certList, setCertList] = React.useState([]);
  const [award_giving_authority_name, setAward_giving_authority_name] =
    React.useState('');
  const [awardList, setAwardList] = React.useState([]);
  const [achievement_year, setAchievement_year] = React.useState('');
  const [achievement_specialization, setAchievement_specialization] =
    React.useState('');
  const [achievementList, setAchievementList] = React.useState([]);
  const [checked, setChecked] = React.useState(false);
  const [languages, setLanguages] = React.useState('');
  const [facilities, setFacilities] = React.useState('');
  const [avgTime, setAvgTime] = React.useState('');
  const [clinicLocations, setClinicLocations] = React.useState([]);
  const [clinicLocationText, setClinicLocationText] = React.useState('');
  const [schedule, setSchedule] = React.useState(defaultSchedule);
  const [morningschedule, setMorningSchedule] = React.useState(morningSchedule);
  const [eveningschedule, setEveningSchedule] = React.useState(eveningSchedule);
  const [doctor_fees, setDoctor_fees] = React.useState('');
  const [dolo_id, setDolo_id] = React.useState('');
  const [doctorPic, setDoctorPic] = React.useState('');
  const [specialities,setSpecialities] = React.useState([]);
  const [selectedId,setSelectedId] = React.useState([]);
  const [cloading, setCloading] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [showModal, setShowModal] = React.useState(false);
  const [showMap, setShowMap] = React.useState(false);
  const [latitude, setLatitude] = React.useState('');
  const [docSpecialization, setDocSpecialization] = React.useState('');
  const [longitude, setLongitude] = React.useState('');
  const [categoryList,setCategoryList] = React.useState([]);
  const [isChecked,setIschecked] = React.useState(false);
  const [showDobDatePicker,setShowDobDatePicker] = React.useState(false);
  const [showExperienceDatePicker,setShowExperienceDatePicker] = React.useState(false);
  const [accountNumber,setAccountNumber] = React.useState('');
  const [confirmAccountNumber,setConfirmAccountNumber] = React.useState('');
  const [accountHolderName,setAccountHolderName] = React.useState('');
  const [ifscCode,setIfscCode] = React.useState('');
  const [bankName,setBankName] = React.useState('');

  const _scrollRef = React.useRef(null);
  
 validateEmail = email => {
    var re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  };

  const checkValidations = async() =>{
    if(doctorPic === ''){
      Alert.alert('Error', 'Please select profile pic');
      
    }
    else if(name === ''){
      Alert.alert('Error', 'Please enter name');
      
    }
    else if(dob === ''){
      Alert.alert('Error', 'Please enter Date of Birth');
      
    }
  else if(email === ''){
    Alert.alert('Error', 'Please enter email');
   }

    else if((!this.validateEmail(email))){
      Alert.alert('Error', 'Please enter valid email');
      
    }

   
    

    else if(adhar === ''){
      Alert.alert('Error', 'Please enter adhar');
      
    }
   

    else if(doctor_fees === ''){
      Alert.alert('Error', 'Please enter Fees');
      
    }

    else if(experience === ''){
      Alert.alert('Error', 'Please enter Experience');
      
    }

    else if(doctorContact === ''){
      Alert.alert('Error', 'Please enter Doctor Contact Number');
      
    }

    else if(clinicContact === ''){
      Alert.alert('Error', 'Please enter Clinic Contact Number');
      
    }

    else if(location === ''){
      Alert.alert('Error', 'Please select Location');
      
    }

    else if(pinCode === ''){
      Alert.alert('Error', 'Please select Pin Code');
      
    }

    else if(registration_number === ''){
      Alert.alert('Error', 'Please enter registration number');
      
    }
   
   
   



    else if(accountNumber === ''){
      Alert.alert('Error', 'Please enter account number');
      
    }


   else if (accountNumber !== confirmAccountNumber || confirmAccountNumber === '') {
      Alert.alert('Error', 'Please Confirm Account Number');
      
    }

    else if(accountHolderName === ''){
      Alert.alert('Error', 'Please enter account holder name');
      
    }

    else if(ifscCode === ''){
      Alert.alert('Error', 'Please enter IFSC code');
      
    }

    else if(bankName === ''){
      Alert.alert('Error', 'Please enter bank name');
      
    }

    else if(avgTime === ''){
      Alert.alert('Error', 'Please enter avg time');
      
    }


    else if(clinicLocationText === ''){
      Alert.alert('Error', 'Please enter clinic location');
      
    }

    else if(Degree === ''){
      Alert.alert('Error', 'Please enter Degree');
      
    }

    else if(collegename === ''){
      Alert.alert('Error', 'Please enter College Name');
      
    }

    else if(year_of_passout === ''){
      Alert.alert('Error', 'Please enter passout year');
      
    }

    else if(college_location === ''){
      Alert.alert('Error', 'Please enter college location');
      
    }

    else if(languages === ''){
      Alert.alert('Error', 'Please enter languages');
      
    }

    else if(specialization  === ''){
      Alert.alert('Error', 'Please select specialization ');
      
    }

    else{
    await  addDoctor(); 
    }

  }


  const getFcmToken = async () => {
    let fcmToken = await getSyncData('fcmToken');
    // console.log('the old token', fcmToken);
    if (!fcmToken) {
      try {
        const fcmToken = await messaging().getToken();
        if (fcmToken) {
          // user has a device token
          console.log('the new token', fcmToken);
          await storeDatasync('fcmToken', fcmToken);
        }
      } catch (error) {
        console.log('error getting token', error);
      }
    }
  };

  const addDoctor = async () => {
    var fcmToken = await getSyncData('fcmToken');
    console.log('fcmToken==',fcmToken);
    
   
    setLoading(true);

    let body1 = 
      {
        device_token: fcmToken,
        user_id: user?.userid,
        name,
        date_of_birth: dob,
        marital_status: maritalStatus,
        gender,
        email,
        account_holdername:accountHolderName,
        ifsc_code:ifscCode,
        account_no:accountNumber,
        fees: doctor_fees,
        experience: experience,
        bank_name:bankName,
        doctorContact,
        clinic_contact: clinicContact,
        location,
        latitude:latitude,
        longitude:longitude,
        pincode: pinCode,
        adhar,
        registration_number,
        schedule_morning: morningschedule.map(item => {
          return {
            day: item.day,
            start_time: item.start_time
            .toLocaleTimeString()
            .replace(
              item.start_time.toLocaleTimeString().slice(-6, -3),
              '',
            ),
            end_time: item.end_time
            .toLocaleTimeString()
            .replace(
              item.end_time.toLocaleTimeString().slice(-6, -3),
              '',
            ),
            checked: item.checked,
          };
        }),
        schedule_evening: eveningschedule.map(item => {
          return {
            day: item.day,
            start_time: item.start_time
            .toLocaleTimeString()
            .replace(
              item.start_time.toLocaleTimeString().slice(-6, -3),
              '',
            ),
            end_time: item.end_time
            .toLocaleTimeString()
            .replace(
              item.end_time.toLocaleTimeString().slice(-6, -3),
              '',
            ),
            checked: item.checked,
          };
        }),
        avgTime,
        clinicLocations:
          clinicLocations.length > 0 ? clinicLocations : [clinicLocationText],
        facilities,
        specialization:specialization,
        Degree,
        collegename,
        year_of_passout,
        college_location,
        feeconsultation: checked,
        languages,
        awardList:
          awardList.length > 0
            ? awardList
            : [
                {
                  award_name,
                  award_giving_authority_name,
                },
              ],
        certList: certList.length > 0 ? certList : [certifications],
        achievementList:
          achievementList.length > 0
            ? achievementList
            : [{achievement_specialization, achievement_year}],
        profileimage: doctorPic.data,
      };
    
    const body = JSON.stringify(body1)
    console.log('body-->',body1)
    // let result = await postDataAndImage('agent/doctorcreate', formData);
    let result = await postData('agent/doctorcreate', body1);
    // console.log('add doc==>',result);
    if (!result.success) {
      if (result.msg === 'Validation Error.') {
        Alert.alert('Error', 'Doctor already exists');
        setLoading(false);
        return;
      }
    }
    if (result.success) {
      setShowModal(true);
      setLoading(false);
    } else {
      setLoading(false);
      ToastAndroid.show(
        'Something Went Wrong! Please try again.',
        ToastAndroid.SHORT,
      );
    }
    ImagePicker.clean()
      .then(() => {
        console.log('removed all tmp images from tmp directory');
      })
      .catch(e => {
        console.log(e);
      });
   
  };

  const setScheduleDay = index => {
    let temp = [...schedule];
    // console.log('temp', temp[index]['day']);
    if (temp[index]['checked']) {
      temp[index]['checked'] = false;
      setSchedule(temp);
    } else {
      temp[index]['checked'] = true;
      setSchedule(temp);
    }
  };

  const setMorningSchedules = index => {
    let temp = [...morningschedule];
    // console.log('temp', temp[index]['day']);
    if (temp[index]['checked']) {
      temp[index]['checked'] = false;
      setMorningSchedule(temp);
    } else {
      temp[index]['checked'] = true;
      setMorningSchedule(temp);
    }
  };

  // const setDoctorCategory = index => {
   
  //   let temp = [...specialization];
    
  //   if (temp[index]['checked']) {
  //     temp[index]['checked'] = false;
  //     setSpecialization(temp);
  //   } else {
  //     temp[index]['checked'] = true;
  //     setSpecialization(temp);
  //   }
   // let data = selectedId;
    // let data2 = specialities;

    // if (selectedId.includes(id)) {
    //   var index = data.indexOf(id);
    //   if (index !== -1) {
    //     data.splice(index, 1);
    //     data2.splice(index, 1);

    //    setSelectedId(data)
    //    setSpecialities(data2)
      
    //   }
    // } else {
    //   data.push(id);
    //   data2.push(specialist);
    //   setSelectedId(data)
    //   setSpecialities(data2)
      
    // }
   
  // };

  const setDoctorCategory = async (specialist,index) => {
    setSpecialization(specialist);
    };

  const setEveningSchedules = index => {
    let temp = [...eveningschedule];
    // console.log('temp', temp[index]['day']);
    if (temp[index]['checked']) {
      temp[index]['checked'] = false;
      setEveningSchedule(temp);
    } else {
      temp[index]['checked'] = true;
      setEveningSchedule(temp);
    }
  };

  const setMorningScheduleStartTime = index => {
    let temp = [...morningschedule];
    DateTimePickerAndroid.open({
      value: temp[index]['start_time'],
      onChange: (event, date) => {
        temp[index]['start_time'] = date;
        setMorningSchedule(temp);
      },
      mode: 'time',
      is24Hour: false,
    });
  };

  const setMorningScheduleEndTime = index => {
    let temp = [...morningschedule];
    DateTimePickerAndroid.open({
      value: temp[index]['end_time'],
      onChange: (event, date) => {
        temp[index]['end_time'] = date;
        setMorningSchedule(temp);
      },
      mode: 'time',
      is24Hour: false,
    });
  };

  const setEveningScheduleStartTime = index => {
    let temp = [...eveningschedule];
    DateTimePickerAndroid.open({
      value: temp[index]['start_time'],
      onChange: (event, date) => {
        temp[index]['start_time'] = date;
        setEveningSchedule(temp);
      },
      mode: 'time',
      is24Hour: false,
    });
  };

  const setEveningScheduleEndTime = index => {
    let temp = [...eveningschedule];
    DateTimePickerAndroid.open({
      value: temp[index]['end_time'],
      onChange: (event, date) => {
        temp[index]['end_time'] = date;
        setEveningSchedule(temp);
      },
      mode: 'time',
      is24Hour: false,
    });
  };

  const setScheduleStartTime = index => {
    let temp = [...schedule];
    DateTimePickerAndroid.open({
      value: temp[index]['start_time'],
      onChange: (event, date) => {
        temp[index]['start_time'] = date;
        setSchedule(temp);
      },
      mode: 'time',
      is24Hour: false,
    });
  };

  const setScheduleEndTime = index => {
    let temp = [...schedule];
    DateTimePickerAndroid.open({
      value: temp[index]['end_time'],
      onChange: (event, date) => {
        temp[index]['end_time'] = date;
        setSchedule(temp);
      },
      mode: 'time',
      is24Hour: false,
    });
  };

  
  const showDobDatePicker1 = () =>{
    setShowDobDatePicker(true)
  }

  const openDobCalender = () => {
    DateTimePickerAndroid.open({
      value: dob,
      onChange: (event, date) => {
      //  setDob(date);
      },
      mode: 'date',
      is24Hour: false,
    });
  };

  const openExperienceCalender = () => {
    DateTimePickerAndroid.open({
      value: experience,
      onChange: (event, date) => {
       // setExperience(date);
      },
      mode: 'date',
      is24Hour: false,
    });
  };

  const addClinicLocations = () => {
    setClinicLocations(prev => [...prev, clinicLocationText]);
    setClinicLocationText('');
  };

  const addAwards = () => {
    setAwardList(prev => [
      ...prev,
      {
        award_name,
        award_giving_authority_name,
      },
    ]);
    setAward_name('');
    setAward_giving_authority_name('');
  };

  const addAchievements = () => {
    setAchievementList(prev => [
      ...prev,
      {
        achievement_specialization,
        achievement_year,
      },
    ]);
    setAchievement_year('');
    setAchievement_specialization('');
  };

  const takePhotoFromCamera = () => {
    ImagePicker.openCamera({
      compressImageMaxWidth: 300,
      compressImageMaxHeight: 300,
      cropping: true,
      compressImageQuality: 0.7,
      includeBase64: true,
    }).then(image => {
      setDoctorPic(image);
    });
  };

  const choosePhotoFromLibrary = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 300,
      cropping: true,
      compressImageQuality: 0.7,
      includeBase64: true,
    }).then(image => {
      setDoctorPic(image);
    });
  };

  const selectProfilePic = () => {
    Alert.alert(
      'Select Profile Picture from',
      '',
      [
        {
          text: 'Cancel',
          onPress: () => {},
        },
        {
          text: 'Camera',
          onPress: () => takePhotoFromCamera(),
        },
        {
          text: 'Gallery',
          onPress: () => choosePhotoFromLibrary(),
        },
      ],
      {
        cancelable: true,
      },
    );
  };

  const hideDobDatePicker = () =>{
    setShowDobDatePicker(false)
  }

  const showExperienceDatePicker1 = () =>{
    setShowExperienceDatePicker(true)
  }

  const hideExperienceDatePicker = () =>{
    setShowExperienceDatePicker(false)
  }

  const getDateValue = date => {
    let d = new Date(date);
    let day = d.getDate();
    let month = d.getMonth() + 1;
    let year = d.getFullYear();
    setDob(`${day}-${month}-${year}`);
    setShowDobDatePicker(false)
    return `${day}-${month}-${year}`;
   
  };

  const getExperienceDateValue = date => {
    let d = new Date(date);
    let day = d.getDate();
    let month = d.getMonth() + 1;
    let year = d.getFullYear();
    setExperience(`${day}-${month}-${year}`);
    setShowExperienceDatePicker(false)
    return `${day}-${month}-${year}`;
  };

  const onPrimaryPress = () => {
    setName('');
    setGender('Male');
     setDob('');
     setExperience('');
    setMaritalStatus('Married');
    setPinCode('');
    setDoctor_fees('');
    setConfirmAccountNumber('');
   setAccountNumber('')
   setAccountHolderName('')
   setIfscCode('')
   setBankName('')
    setEmail('');
    setDoctorContact('');
    setClinicContact('');
    setLocation('');
    setLatitude('')
    setLongitude('')
    setAdhar('');
    setRegistration_number('');
    setSchedule(defaultSchedule);
    setAvgTime('');
    setClinicLocations([]);
    setClinicLocationText('');
    setFacilities('');
    setSpecialization('');
    setDegree('');
    setCollegename('');
    setYear_of_passout('');
    setCollege_location('');
    setChecked(false);
    setLanguages('');
    setSpecialities([])
    setSelectedId([]);
    setAwardList([]);
    setAward_name('');
    setAward_giving_authority_name('');
    setCertList([]);
    setCertifications('');
    setAchievementList([]);
    setAchievement_specialization('');
    setAchievement_year('');
    setDoctorPic('');
    _scrollRef.current.scrollTo({x: 0, y: 0, animated: true});
    setShowModal(false);
  };

   const fetchCategoryList = async () => {
    setCloading(true)
    let result = await getData('doctorspeacialist');
        if (result?.success) {
         
        setCategoryList(result.data)
       // console.log('clist==',result.data)
        setCloading(false) 
        }
  };

  useEffect(() => {
   
    fetchCategoryList();
    getFcmToken();
  }, []);

  return (
    <View style={styles.container}>
      <SuccessModal
        visible={showModal}
        onRequestClose={() => setShowModal(false)}
        title="Doctor Added Successfully"
        primaryBtnText="Add More"
        onPrimaryPress={() => onPrimaryPress()}
        secondaryBtnText="Go Back"
        onSecondaryPress={() => {
          setShowModal(false);
          navigation.goBack();
        }}
      />
      <MapModal
        setLocation={setLocation}
        setLatitude={setLatitude}
        setLongitude={setLongitude}

        onRequestClose={() => setShowMap(false)}
        onPress={() => {
          setShowMap(false);
          // navigation.goBack();
        }}
        visible={showMap}
      />
      <View style={{flexDirection: 'row', padding: 20}}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialCommunityIcons
            name="arrow-left"
            size={32}
            color={Color.black}
          />
        </TouchableOpacity>
        <Text style={styles.title}>Create Doctor Profile 📝</Text>
      </View>
      <ScrollView
        ref={_scrollRef}
        style={styles.form}
        keyboardShouldPersistTaps="always">
        <View>
          <Text style={styles.sectionTitle}>Personal Details</Text>

          <View style={{alignSelf: 'center'}}>
            <Avatar.Image
              size={100}
              style={{alignSelf: 'center'}}
              source={{
                uri: doctorPic?.path
                  ? doctorPic?.path
                  : 'https://www.w3schools.com/w3images/avatar6.png',
              }}
            />
            <Button
              color={Color.primary}
              onPress={() => selectProfilePic()}
              style={{
                margin: 10,
                borderColor: Color.primary,
              }}
              mode="outlined">
              Add Profile Pic*
            </Button>
          </View>
          <Text
            style={{
              color: Color.red,
              fontSize: 12,
              fontFamily: Fonts.primaryRegular,
              marginVertical: 10,
            }}>
            All fields marked with * is required to fill.
          </Text>
          <Text style={styles.label}>Name*</Text>
          <TextInput
            theme={theme}
            dense
            onChangeText={text => setName(text)}
            value={name}
            mode="flat"
            underlineColor="#000"
            activeUnderlineColor={Color.primary}
          />
        </View>
        <View style={{marginTop: 15}}>
          <Text style={styles.label}>Gender</Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: 5,
            }}>
            <TouchableOpacity
              onPress={() => setGender('Male')}
              style={{
                ...styles.radioStyle,
                backgroundColor:
                  gender == 'Male' ? `${Color.primary}50` : '#aaaaaa50',
              }}>
              <Text
                style={{
                  color: '#000',
                  fontFamily: Fonts.primaryRegular,
                  lineHeight: 14 * 1.5,
                }}>
                Male
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setGender('Female')}
              style={{
                ...styles.radioStyle,
                backgroundColor:
                  gender == 'Female' ? `${Color.primary}50` : '#aaaaaa50',
                marginLeft: 5,
              }}>
              <Text
                style={{
                  color: '#000',
                  fontFamily: Fonts.primaryRegular,
                  lineHeight: 14 * 1.5,
                }}>
                Female
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setGender('Others')}
              style={{
                ...styles.radioStyle,
                backgroundColor:
                  gender == 'Others' ? `${Color.primary}50` : '#aaaaaa50',
                marginLeft: 5,
              }}>
              <Text
                style={{
                  color: '#000',
                  fontFamily: Fonts.primaryRegular,
                  lineHeight: 14 * 1.5,
                }}>
                Others
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{marginTop: 15}}>
          <Text style={styles.label}>Date of Birth*</Text>
          {/* <TextInput
            theme={theme}
            dense
            editable={false}
            onChangeText={text => setDob(text)}
            forceTextInputFocus={false}
            right={
              <TextInput.Icon
                icon="calendar"
                color={Color.primary}
                onPress={openDobCalender}
              />
            }
            value={getDateValue(dob)}
            mode="flat"
            underlineColor="#000"
            activeUnderlineColor={Color.primary}
          /> */}
          <TextInput
            // ref={_inputRef}
            theme={theme}
            //keyboardType="numeric"
            dense
            onChangeText={val => setDob(val)}
            value={dob}
            mode="flat"
            underlineColor="#000"
            activeUnderlineColor={Color.primary}
            editable={false}
            right={
              <TextInput.Icon
                icon="calendar"
                color={Color.black}
                onPress={() => showDobDatePicker1()}
              />
            }
          />
          <DateTimePickerModal
            isVisible={showDobDatePicker}
            mode="date"
            onConfirm={e => getDateValue(e)}
            onCancel={hideDobDatePicker}
          />
        </View>
        <View style={{marginTop: 15}}>
          <Text style={styles.label}>Marital Status</Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: 5,
            }}>
            <TouchableOpacity
              onPress={() => setMaritalStatus('Married')}
              style={{
                ...styles.radioStyle,
                backgroundColor:
                  maritalStatus == 'Married'
                    ? `${Color.primary}50`
                    : '#aaaaaa50',
              }}>
              <Text
                style={{
                  color: '#000',
                  fontFamily: Fonts.primaryRegular,
                  lineHeight: 14 * 1.5,
                }}>
                Married
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setMaritalStatus('Single')}
              style={{
                ...styles.radioStyle,
                backgroundColor:
                  maritalStatus == 'Single'
                    ? `${Color.primary}50`
                    : '#aaaaaa50',
                marginLeft: 5,
              }}>
              <Text
                style={{
                  color: '#000',
                  fontFamily: Fonts.primaryRegular,
                  lineHeight: 14 * 1.5,
                }}>
                Single
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            marginTop: 15,
          }}>
          <View style={{marginRight: 10, flex: 1}}>
            <Text style={styles.label}>Doctor Fees*</Text>
            <TextInput
              theme={theme}
              dense
              keyboardType="numeric"
              onChangeText={text => setDoctor_fees(text)}
              value={doctor_fees}
              mode="flat"
              underlineColor="#000"
              activeUnderlineColor={Color.primary}
            />
          </View>
          <View style={{flex: 1}}>
            {/* <Text style={styles.label}>DOLO ID</Text>
            <TextInput
              theme={theme}
              dense
              onChangeText={text => setDolo_id(text)}
              value={dolo_id}
              mode="flat"
              underlineColor="#000"
              activeUnderlineColor={Color.primary}
            /> */}

<Text style={styles.label}>Experience*</Text>
          {/* <TextInput
            theme={theme}
            dense
            editable={false}
            onChangeText={text => setExperience(text)}
            forceTextInputFocus={false}
            right={
              <TextInput.Icon
                icon="calendar"
                color={Color.primary}
                onPress={openExperienceCalender}
              />
            }
            value={getExperienceDateValue(experience)}
            mode="flat"
            underlineColor="#000"
            activeUnderlineColor={Color.primary}
          /> */}

          <TextInput
            // ref={_inputRef}
            theme={theme}
            //keyboardType="numeric"
            dense
            onChangeText={val => setExperience(val)}
            value={experience}
            mode="flat"
            underlineColor="#000"
            activeUnderlineColor={Color.primary}
            editable={false}
            right={
              <TextInput.Icon
                icon="calendar"
                color={Color.black}
                onPress={() => showExperienceDatePicker1()}
              />
            }
          />
          <DateTimePickerModal
            isVisible={showExperienceDatePicker}
            mode="date"
            onConfirm={e => getExperienceDateValue(e)}
            onCancel={hideExperienceDatePicker}
          />
          </View>
        </View>
        <View style={{marginTop: 15}}>
          <Text style={styles.label}>Email*</Text>
          <TextInput
            theme={theme}
            dense
            keyboardType='email-address'
            onChangeText={text => setEmail(text)}
            value={email}
            mode="flat"
            underlineColor="#000"
            activeUnderlineColor={Color.primary}
          />
        </View>
        <View
          style={{
            flexDirection: 'row',
            marginTop: 15,
          }}>
          <View style={{marginRight: 10, flex: 1}}>
            <Text style={styles.label}>Doctor Contact*</Text>
            <TextInput
              theme={theme}
              dense
              maxLength={10}
              keyboardType="numeric"
              onChangeText={text => setDoctorContact(text)}
              value={doctorContact}
              mode="flat"
              underlineColor="#000"
              activeUnderlineColor={Color.primary}
            />
          </View>
          <View style={{flex: 1}}>
            <Text style={styles.label}>Clinic Contact*</Text>
            <TextInput
              theme={theme}
              dense
              maxLength={10}
              keyboardType="numeric"
              onChangeText={text => setClinicContact(text)}
              value={clinicContact}
              mode="flat"
              underlineColor="#000"
              activeUnderlineColor={Color.primary}
            />
          </View>
        </View>
        <View style={{marginTop: 15}}>
          <Text style={styles.label}>Location*</Text>
          {location.length > 0 && (
            <Text
              style={{
                fontSize: 16,
                fontFamily: Fonts.primarySemiBold,
                color: Color.black,
              }}>
              {location}  
            </Text>
          )}
          {/* <TextInput
            theme={theme}
            dense
            multiline
            numberOfLines={4}
            onChangeText={text => setLocation(text)}
            value={location}
            mode="flat"
            underlineColor="#000"
            activeUnderlineColor={Color.primary}
          /> */}
          <Button
            mode="contained"
            onPress={() => setShowMap(true)}
            color={Color.primary}
            dark
            style={{marginTop: 10}}>
            Locate on Map
          </Button>
        </View>
        {/* <View
          style={{
            flexDirection: 'row',
            marginTop: 15,
          }}>
          <View style={{marginRight: 10, flex: 1}}>
            <Text style={styles.label}>Latitude</Text>
            <TextInput
              theme={theme}
              dense
             // keyboardType="numeric"
             // onChangeText={text => setAdhar(text)}
              value={{latitude}}
              mode="flat"
              editable={false}
              underlineColor="#000"
              activeUnderlineColor={Color.primary}
            />
          </View>
          <View style={{flex: 1}}>
            <Text style={styles.label}>Longitude</Text>
            <TextInput
              theme={theme}
              dense
             // onChangeText={text => setRegistration_number(text)}
              value={longitude}
              editable={false}
              mode="flat"
              underlineColor="#000"
              activeUnderlineColor={Color.primary}
            />
          </View>
        </View> */}
        <View style={{marginTop: 15}}>
          <Text style={styles.label}>Pin Code*</Text>
          <TextInput
            theme={theme}
            dense
            onChangeText={text => setPinCode(text)}
            value={pinCode}
            mode="flat"
            maxLength={6}
            keyboardType='numeric'
            underlineColor="#000"
            activeUnderlineColor={Color.primary}
          />
        </View>
        <View
          style={{
            flexDirection: 'row',
            marginTop: 15,
          }}>
          <View style={{marginRight: 10, flex: 1}}>
            <Text style={styles.label}>Aadhar Number*</Text>
            <TextInput
              theme={theme}
              dense
              keyboardType="numeric"
              maxLength={12}
              onChangeText={text => setAdhar(text)}
              value={adhar}
              mode="flat"
             
              underlineColor="#000"
              activeUnderlineColor={Color.primary}
            />
          </View>
          <View style={{flex: 1}}>
            <Text style={styles.label}>Registration Number*</Text>
            <TextInput
              theme={theme}
              dense
              onChangeText={text => setRegistration_number(text)}
              value={registration_number}
              mode="flat"
              underlineColor="#000"
              activeUnderlineColor={Color.primary}
            />
          </View>
        </View>
        <View style={{marginTop: 15}}>
          <Text
            style={{
              ...styles.sectionTitle,
              paddingVertical: 15,
              marginTop: 10,
            }}>
            Bank Details
          </Text>
          <Text style={styles.label}>Account Number*</Text>
          <TextInput
            theme={theme}
            dense
            onChangeText={text => setAccountNumber(text)}
            value={accountNumber}
            mode="flat"
            keyboardType='numeric'
            underlineColor="#000"
            activeUnderlineColor={Color.primary}
          />
          <View style={{marginTop:15}}>
           <Text style={styles.label}>Confirm Account Number*</Text>
          <TextInput
            theme={theme}
            dense
            onChangeText={text => setConfirmAccountNumber(text)}
            value={confirmAccountNumber}
            mode="flat"
            keyboardType='numeric'
            underlineColor="#000"
            activeUnderlineColor={Color.primary}
          />
          </View> 
          <View style={{marginTop:15}}>
          <Text style={styles.label}>Account Holder's Name*</Text>
          <TextInput
            theme={theme}
            dense
            onChangeText={text => setAccountHolderName(text)}
            value={accountHolderName}
            mode="flat"
            underlineColor="#000"
            activeUnderlineColor={Color.primary}
          />
          </View>
          <View style={{marginTop:15}}>
          <Text style={styles.label}>IFSC Code*</Text>
          <TextInput
            theme={theme}
            dense
            onChangeText={text => setIfscCode(text)}
            autoCapitalize='characters'
            value={ifscCode}
            mode="flat"
            underlineColor="#000"
            activeUnderlineColor={Color.primary}
          />
          </View>
          <View style={{marginTop:15}}>
          <Text style={styles.label}>Bank Name*</Text>
          <TextInput
            theme={theme}
            dense
            onChangeText={text => setBankName(text)}
            value={bankName}
            mode="flat"
            underlineColor="#000"
            activeUnderlineColor={Color.primary}
          />
          </View>
          </View>
        <View style={{marginTop: 15}}>
          <Text
            style={{
              ...styles.sectionTitle,
              paddingVertical: 15,
              marginTop: 10,
            }}>
            Clinic Details
          </Text>
          {/* <Text style={styles.label}>Clinic Schedule</Text>
          {schedule.map((item, index) => (
            <View
              key={index}
              style={{
                flexDirection: 'row',
                flexWrap: 'wrap',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingVertical: 5,
              }}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Checkbox
                  uncheckedColor={Color.grey}
                  color={Color.primary}
                  onPress={() => setScheduleDay(index)}
                  status={item.checked ? 'checked' : 'unchecked'}
                />
                <TouchableOpacity
                  activeOpacity={1}
                  onPress={() => setScheduleDay(index)}>
                  <Text
                    style={{
                      color: '#000',
                      fontFamily: Fonts.primaryRegular,
                      marginHorizontal: 5,
                    }}>
                    {item.day}
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <TouchableOpacity
                  activeOpacity={item.checked ? 0.5 : 1}
                  onPress={() =>
                    item.checked ? setScheduleStartTime(index) : null
                  }>
                  <Text
                    style={{
                      color: item.checked ? Color.black : '#ccc',
                      fontSize: 16,
                      fontFamily: Fonts.primaryRegular,
                    }}>
                    {item.start_time
                      .toLocaleTimeString()
                      .replace(
                        item.start_time.toLocaleTimeString().slice(-6, -3),
                        '',
                      )}
                  </Text>
                </TouchableOpacity>
                <Text
                  style={{
                    marginHorizontal: 20,
                    fontFamily: Fonts.primaryRegular,
                    color: item.checked ? Color.black : '#ccc',
                  }}>
                  -
                </Text>
                <TouchableOpacity
                  activeOpacity={item.checked ? 0.5 : 1}
                  onPress={() =>
                    item.checked ? setScheduleEndTime(index) : null
                  }>
                  <Text
                    style={{
                      color: item.checked ? Color.black : '#ccc',
                      fontSize: 16,
                      fontFamily: Fonts.primaryRegular,
                    }}>
                    {item.end_time
                      .toLocaleTimeString()
                      .replace(
                        item.end_time.toLocaleTimeString().slice(-6, -3),
                        '',
                      )}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          ))} */}

         <Text style={styles.label}>Morning Schedule</Text>
          {morningschedule.map((item, index) => (
            <View
              key={index}
              style={{
                flexDirection: 'row',
                flexWrap: 'wrap',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingVertical: 5,
              }}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Checkbox
                  uncheckedColor={Color.grey}
                  color={Color.primary}
                  onPress={() => setMorningSchedules(index)}
                  status={item.checked ? 'checked' : 'unchecked'}
                />
                <TouchableOpacity
                  activeOpacity={1}
                  onPress={() => setMorningSchedules(index)}>
                  <Text
                    style={{
                      color: '#000',
                      fontFamily: Fonts.primaryRegular,
                      marginHorizontal: 5,
                    }}>
                    {item.day}
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <TouchableOpacity
                  activeOpacity={item.checked ? 0.5 : 1}
                  onPress={() =>
                    item.checked ? setMorningScheduleStartTime(index) : null
                  }>
                  <Text
                    style={{
                      color: item.checked ? Color.black : '#ccc',
                      fontSize: 16,
                      fontFamily: Fonts.primaryRegular,
                    }}>
                    {item.start_time
                      .toLocaleTimeString()
                      .replace(
                        item.start_time.toLocaleTimeString().slice(-6, -3),
                        '',
                      )}
                  </Text>
                </TouchableOpacity>
                <Text
                  style={{
                    marginHorizontal: 20,
                    fontFamily: Fonts.primaryRegular,
                    color: item.checked ? Color.black : '#ccc',
                  }}>
                  -
                </Text>
                <TouchableOpacity
                  activeOpacity={item.checked ? 0.5 : 1}
                  onPress={() =>
                    item.checked ? setMorningScheduleEndTime(index) : null
                  }>
                  <Text
                    style={{
                      color: item.checked ? Color.black : '#ccc',
                      fontSize: 16,
                      fontFamily: Fonts.primaryRegular,
                    }}>
                    {item.end_time
                      .toLocaleTimeString()
                      .replace(
                        item.end_time.toLocaleTimeString().slice(-6, -3),
                        '',
                      )}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}

<Text style={styles.label}>Evening Schedule</Text>
          {eveningschedule.map((item, index) => (
            <View
              key={index}
              style={{
                flexDirection: 'row',
                flexWrap: 'wrap',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingVertical: 5,
              }}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Checkbox
                  uncheckedColor={Color.grey}
                  color={Color.primary}
                  onPress={() => setEveningSchedules(index)}
                  status={item.checked ? 'checked' : 'unchecked'}
                />
                <TouchableOpacity
                  activeOpacity={1}
                  onPress={() => setEveningSchedules(index)}>
                  <Text
                    style={{
                      color: '#000',
                      fontFamily: Fonts.primaryRegular,
                      marginHorizontal: 5,
                    }}>
                    {item.day}
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <TouchableOpacity
                  activeOpacity={item.checked ? 0.5 : 1}
                  onPress={() =>
                    item.checked ? setEveningScheduleStartTime(index) : null
                  }>
                  <Text
                    style={{
                      color: item.checked ? Color.black : '#ccc',
                      fontSize: 16,
                      fontFamily: Fonts.primaryRegular,
                    }}>
                    {item.start_time
                      .toLocaleTimeString()
                      .replace(
                        item.start_time.toLocaleTimeString().slice(-6, -3),
                        '',
                      )}
                  </Text>
                </TouchableOpacity>
                <Text
                  style={{
                    marginHorizontal: 20,
                    fontFamily: Fonts.primaryRegular,
                    color: item.checked ? Color.black : '#ccc',
                  }}>
                  -
                </Text>
                <TouchableOpacity
                  activeOpacity={item.checked ? 0.5 : 1}
                  onPress={() =>
                    item.checked ? setEveningScheduleEndTime(index) : null
                  }>
                  <Text
                    style={{
                      color: item.checked ? Color.black : '#ccc',
                      fontSize: 16,
                      fontFamily: Fonts.primaryRegular,
                    }}>
                    {item.end_time
                      .toLocaleTimeString()
                      .replace(
                        item.end_time.toLocaleTimeString().slice(-6, -3),
                        '',
                      )}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>
        <View style={{marginTop: 15}}>
          <Text style={styles.label}>Avg. Time per patient (in mins.)*</Text>
          <TextInput
            theme={theme}
            dense
            onChangeText={text => setAvgTime(text)}
            value={avgTime}
            mode="flat"
            keyboardType='numeric'
            underlineColor="#000"
            activeUnderlineColor={Color.primary}
          />
        </View>
        <View style={{marginTop: 15}}>
          <Text style={styles.label}>Clinic Address*</Text>
          {clinicLocations.length > 0 &&
            clinicLocations.map((item, index) => (
              <View
                key={index}
                style={{
                  flexDirection: 'row',
                  padding: 10,
                  marginVertical: 5,
                  justifyContent: 'space-between',
                  backgroundColor: `${Color.primary}50`,
                  borderRadius: 10,
                }}>
                <Text
                  style={{
                    fontSize: 14,
                    fontFamily: Fonts.primarySemiBold,
                    color: Color.black,
                  }}>
                  {item}
                </Text>
                <TouchableOpacity
                  onPress={() => {
                    let temp = [...clinicLocations];
                    temp.splice(index, 1);
                    setClinicLocations(temp);
                  }}>
                  <MaterialCommunityIcons
                    name="delete-outline"
                    size={20}
                    color="black"
                  />
                </TouchableOpacity>
              </View>
            ))}
          <TextInput
            theme={theme}
            dense
            multiline
            numberOfLines={4}
            onChangeText={text => setClinicLocationText(text)}
            value={clinicLocationText}
            mode="flat"
            underlineColor="#000"
            activeUnderlineColor={Color.primary}
          />
          <Button
            mode="contained"
            onPress={addClinicLocations}
            color={Color.primary}
            dark
            style={{marginTop: 10}}>
            Add
          </Button>
        </View>
        <View style={{marginTop: 15}}>
          <Text style={styles.label}>Facilities*</Text>
          <TextInput
            theme={theme}
            dense
            onChangeText={text => setFacilities(text)}
            value={facilities}
            mode="flat"
            underlineColor="#000"
            activeUnderlineColor={Color.primary}
          />
          <HelperText
            type="info"
            padding="none"
            visible={true}
            style={{
              fontFamily: Fonts.primaryRegular,
              fontSize: 12,
              color: Color.grey,
            }}>
            Enter different facilities seperated by commas.
          </HelperText>
        </View>
        <View style={{marginTop: 15,}}>
          <Text
            style={{
              ...styles.sectionTitle,
              paddingVertical: 15,
              marginTop: 10,
            }}>
            Education Details
          </Text>
          <Text style={styles.label}>Specialization*</Text>
          <TextInput
           placeholderTextColor={Color.black}
            theme={theme}
            dense
           // onChangeText={text => setDegree(text)}
            value={specialization == '' ? 'Heart' : specialization}
            mode="flat"
           // disabled={true}
            underlineColor="#000"
            activeUnderlineColor={Color.primary}
          />
          {categoryList && 
            <FlatList
            data={categoryList}
           
            numColumns={2}
           // keyExtractor={(item, index) => index.toString()}
            renderItem={({ item, index }) => (
             <View style={{flexDirection:'row',justifyContent:'space-between',marginTop:10}}>
             <View style={styles.specialization_container}>
                {/* <Checkbox
                  uncheckedColor={Color.grey}
                  color={Color.primary}
                 // onPress={() => setDoctorCategory(item.id,item.specialist,index)}
                 onPress={() => setDoctorCategory(item.specialist,index)}
                  //status={selectedId.includes(item.id) ? 'checked' : 'unchecked'}
                  status={item.checked ? 'checked' : 'unchecked'}
                 
                /> */}
                 <TouchableOpacity
                  activeOpacity={1}
                  onPress={() => setDoctorCategory(item.specialist)}>
                  <Text
                    style={{
                      color: '#000',
                      fontFamily: Fonts.primaryRegular,
                     // marginHorizontal: 5,
                     width:'100%'
                    }}>
                    {item.specialist}
                  </Text>
                </TouchableOpacity>

           </View>

           </View>


          )}

          />
          
          
          
          
          
          }
        
       




         
        </View>
        <View style={{marginTop: 15}}>
          <Text style={styles.label}>Degree*</Text>
          <TextInput
            theme={theme}
            dense
            onChangeText={text => setDegree(text)}
            value={Degree}
            mode="flat"
            underlineColor="#000"
            activeUnderlineColor={Color.primary}
          />
        </View>
        <View style={{marginTop: 15}}>
          <Text style={styles.label}>College Name*</Text>
          <TextInput
            theme={theme}
            dense
            onChangeText={text => setCollegename(text)}
            value={collegename}
            mode="flat"
            underlineColor="#000"
            activeUnderlineColor={Color.primary}
          />
        </View>
        <View
          style={{
            flexDirection: 'row',
            marginTop: 15,
          }}>
          <View style={{marginRight: 10, flex: 1}}>
            <Text style={styles.label}>Year of Passout*</Text>
            <TextInput
              theme={theme}
              dense
              keyboardType="numeric"
              onChangeText={text => setYear_of_passout(text)}
              value={year_of_passout}
              mode="flat"
              underlineColor="#000"
              activeUnderlineColor={Color.primary}
            />
          </View>
          <View style={{flex: 1}}>
            <Text style={styles.label}>College Location*</Text>
            <TextInput
              theme={theme}
              dense
              onChangeText={text => setCollege_location(text)}
              value={college_location}
              mode="flat"
              underlineColor="#000"
              activeUnderlineColor={Color.primary}
            />
          </View>
        </View>
        <View style={{marginTop: 15}}>
          <Text
            style={{
              ...styles.sectionTitle,
              paddingVertical: 15,
              marginTop: 10,
            }}>
            Miscellaneous
          </Text>
          <Text style={styles.label}>Fee Consultation</Text>
          <Text
            style={{
              fontFamily: Fonts.primaryRegular,
              fontSize: 12,
              color: Color.grey,
              marginBottom: 5,
            }}>
            Is he/she willing to take consultation fee through our app ?
          </Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <TouchableOpacity
              onPress={() => setChecked(true)}
              style={{
                ...styles.radioStyle,
                backgroundColor: `${Color.green}50`,
                marginRight: 10,
              }}>
              {checked && (
                <MaterialCommunityIcons
                  name="check"
                  size={26}
                  color={Color.green}
                  style={{
                    marginHorizontal: 10,
                    position: 'absolute',
                    top: 10,
                    left: 10,
                  }}
                />
              )}
              <Text
                style={{
                  color: '#000',
                  fontFamily: Fonts.primaryRegular,
                  lineHeight: 14 * 1.5,
                }}>
                Yes
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setChecked(false)}
              style={{
                ...styles.radioStyle,
                backgroundColor: `${Color.red}50`,
              }}>
              {!checked && (
                <MaterialCommunityIcons
                  name="close"
                  size={26}
                  color={Color.red}
                  style={{
                    marginHorizontal: 10,
                    position: 'absolute',
                    top: 10,
                    left: 10,
                  }}
                />
              )}
              <Text
                style={{
                  color: '#000',
                  fontFamily: Fonts.primaryRegular,
                  lineHeight: 14 * 1.5,
                }}>
                No
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={{marginTop: 15}}>
          <Text style={styles.label}>Languages*</Text>
          <TextInput
            theme={theme}
            dense
            onChangeText={text => setLanguages(text)}
            value={languages}
            mode="flat"
            underlineColor="#000"
            activeUnderlineColor={Color.primary}
          />
          <HelperText
            type="info"
            padding="none"
            visible={true}
            style={{
              fontFamily: Fonts.primaryRegular,
              fontSize: 12,
              color: Color.grey,
            }}>
            Enter different languages seperated by commas.
          </HelperText>
        </View>

        <View style={{marginTop: 15}}>
          <Text
            style={{
              ...styles.sectionTitle,
              paddingVertical: 15,
              marginTop: 10,
            }}>
            Awards & Recognitions
          </Text>
          {awardList.length > 0 &&
            awardList.map((item, index) => {
              return (
                <View
                  key={index}
                  style={{
                    flexDirection: 'row',
                    padding: 10,
                    marginVertical: 5,
                    justifyContent: 'space-between',
                    backgroundColor: `${Color.primary}50`,
                    borderRadius: 10,
                  }}>
                  <View>
                    <Text
                      style={{
                        fontFamily: Fonts.primarySemiBold,
                        color: Color.black,
                      }}>
                      {item.award_name}
                    </Text>
                    <Text
                      style={{
                        fontFamily: Fonts.primaryRegular,
                        color: Color.black,
                      }}>
                      {item.award_giving_authority_name}
                    </Text>
                  </View>
                  <TouchableOpacity
                    onPress={() => {
                      let arr = [...awardList];
                      arr.splice(index, 1);
                      setAwardList(arr);
                    }}>
                    <MaterialCommunityIcons
                      name="delete-outline"
                      size={20}
                      color="black"
                    />
                  </TouchableOpacity>
                </View>
              );
            })}
          <Text style={styles.label}>Award Names</Text>
          <TextInput
            theme={theme}
            dense
            onChangeText={text => setAward_name(text)}
            value={award_name}
            mode="flat"
            underlineColor="#000"
            activeUnderlineColor={Color.primary}
          />
        </View>
        <View style={{marginTop: 15}}>
          <Text style={styles.label}>Award Giving Authorities</Text>
          <TextInput
            theme={theme}
            dense
            onChangeText={text => setAward_giving_authority_name(text)}
            value={award_giving_authority_name}
            mode="flat"
            underlineColor="#000"
            activeUnderlineColor={Color.primary}
          />
        </View>
        <Button
          mode="contained"
          onPress={addAwards}
          color={Color.primary}
          dark
          style={{marginTop: 10}}>
          Add Award
        </Button>
        <View style={{marginTop: 15}}>
          <Text
            style={{
              ...styles.sectionTitle,
              paddingVertical: 15,
              marginTop: 10,
            }}>
            Certifications
          </Text>
          {certList.length > 0 &&
            certList.map((item, index) => {
              return (
                <View
                  key={index}
                  style={{
                    flexDirection: 'row',
                    padding: 10,
                    marginVertical: 5,
                    justifyContent: 'space-between',
                    backgroundColor: `${Color.primary}50`,
                    borderRadius: 10,
                  }}>
                  <Text
                    style={{
                      fontFamily: Fonts.primarySemiBold,
                      color: Color.black,
                    }}>
                    {item}
                  </Text>
                  <TouchableOpacity
                    onPress={() => {
                      let arr = [...certList];
                      arr.splice(index, 1);
                      setCertList(arr);
                    }}>
                    <MaterialCommunityIcons
                      name="delete-outline"
                      size={20}
                      color="black"
                    />
                  </TouchableOpacity>
                </View>
              );
            })}
          <Text style={styles.label}>Certifications</Text>
          <TextInput
            theme={theme}
            dense
            onChangeText={text => setCertifications(text)}
            value={certifications}
            mode="flat"
            underlineColor="#000"
            activeUnderlineColor={Color.primary}
          />
          <Button
            mode="contained"
            onPress={() => {
              setCertList(prev => [...prev, certifications]);
              setCertifications('');
            }}
            color={Color.primary}
            dark
            style={{marginTop: 10}}>
            Add Certificate
          </Button>
        </View>
        <View style={{marginTop: 15}}>
          <Text
            style={{
              ...styles.sectionTitle,
              paddingVertical: 15,
              marginTop: 10,
            }}>
            Achievements
          </Text>
          {achievementList.length > 0 &&
            achievementList.map((item, index) => {
              return (
                <View
                  key={index}
                  style={{
                    flexDirection: 'row',
                    padding: 10,
                    marginVertical: 5,
                    justifyContent: 'space-between',
                    backgroundColor: `${Color.primary}50`,
                    borderRadius: 10,
                  }}>
                  <View style={{flexDirection: 'row'}}>
                    <Text
                      style={{
                        fontFamily: Fonts.primarySemiBold,
                        color: Color.black,
                      }}>
                      {item.achievement_specialization},{' '}
                    </Text>
                    <Text
                      style={{
                        fontFamily: Fonts.primaryRegular,
                        color: Color.black,
                      }}>
                      {item.achievement_year}
                    </Text>
                  </View>
                  <TouchableOpacity
                    onPress={() => {
                      let arr = [...achievementList];
                      arr.splice(index, 1);
                      setAchievementList(arr);
                    }}>
                    <MaterialCommunityIcons
                      name="delete-outline"
                      size={20}
                      color="black"
                    />
                  </TouchableOpacity>
                </View>
              );
            })}
          <Text style={styles.label}>Achievement Specialization</Text>
          <TextInput
            theme={theme}
            dense
            onChangeText={text => setAchievement_specialization(text)}
            value={achievement_specialization}
            mode="flat"
            underlineColor="#000"
            activeUnderlineColor={Color.primary}
          />
        </View>
        <View style={{marginTop: 15}}>
          <Text style={styles.label}>Achievement Year</Text>
          <TextInput
            theme={theme}
            dense
            keyboardType="numeric"
            onChangeText={text => setAchievement_year(text)}
            value={achievement_year}
            mode="flat"
            underlineColor="#000"
            activeUnderlineColor={Color.primary}
          />
          <Button
            mode="contained"
            onPress={addAchievements}
            color={Color.primary}
            dark
            style={{marginTop: 10}}>
            Add
          </Button>
        </View>
        <Button
          style={{
            backgroundColor: Color.primary,
            marginTop: 60,
            marginBottom: 10,
          }}
          contentStyle={{height: 55, alignItems: 'center'}}
          dark
          loading={loading}
          mode="contained"
          onPress={() => checkValidations()}>
          Submit Profile
        </Button>
      </ScrollView>
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
    paddingHorizontal: 20,
    color: Color.black,
  },
  label: {
    fontFamily: Fonts.primaryRegular,
    color: '#000',
  },
  sectionTitle: {
    fontSize: 18,
    color: Color.black,
    fontFamily: Fonts.primaryBold,
    marginBottom: 10,
  },
  form: {
    paddingHorizontal: 20,
    width: '100%',
  },
  input: {
    backgroundColor: 'white',
    color: '#ff9000',
  },
  pickerStyle: {
    width: '100%',
    marginTop: 5,
    borderBottmColor: '#000',
    borderBottomWidth: 1,
    backgroundColor: '#E0E0E070',
    height: 50,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
  },
  radioStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    // width: '49%',
    padding: 12,
    borderRadius: 5,
  },
  specialization_container:{
    flexDirection: 'row',
   // alignItems: 'center',
   // flex: 1,
//    justifyContent: 'center',
     width: '50%',
   // padding: 12,
    
  }
});
