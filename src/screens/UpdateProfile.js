import {Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import RBSheet from 'react-native-raw-bottom-sheet';
import {Avatar, Button, TextInput, Checkbox, HelperText,} from 'react-native-paper';
import {Color, Dimension, Fonts} from '../theme';
import { postData,getData } from '../API/index'
import {useEffect} from 'react';
import ImagePicker from 'react-native-image-crop-picker';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MapModal from '../components/modals/MapModal'
import {useDispatch, useSelector} from 'react-redux';
import DocProfilePlaceholder from '../placeholders/DocProfilePlaceholder';
import { errorToast, successToast } from '../components/toasts';


const UpdateProfile = ({navigation}) => {
  const dispatch = useDispatch();

  const user = useSelector(state => state.user);
    const theme = {colors: {text: '#000', background: '#aaaaaa50'}}; // for text input

    const [profileData, setProfileData] = React.useState('');

    const fetchProfileInfo = async () => {
      setLoading(true);
      let res = await getData(`dolo/profile/${user?.userid}`);
      console.log(`prodata==`, res.data);
      if (res.status) {
        // console.log(res);
        setProfileData(res.data);
      }
      setLoading(false);
    };
  
   
    useEffect(() => {
      fetchProfileInfo();
    }, []);

    
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
          start_time: new Date(new Date().setHours(17, 0, 0)),
          end_time: new Date(new Date().setHours(19, 0, 0)),
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
    
      const [editLoading,setEditLoading] = React.useState(false);
      const [address, setAddress] = React.useState('');
      const [name, setName] = React.useState('');
      const [gender, setGender] = React.useState(
        profileData?.gender?.toLowerCase() || 'male',
      );
      const [password, setPassword] = React.useState('');
      const [profilePic, setProfilePic] = React.useState('');
      const [dob, setDob] = React.useState('');
      const [fees, setFees] = React.useState('');
      const [registration_number, setRegNumber] = React.useState('');
      const [specialization, setSpecialization] = React.useState('');
      const [yearOfPassout, setYearOfPassout] = React.useState('');
      const [facilities, setFacilities] = React.useState('');
      const [loading, setLoading] = React.useState(false);
      const [Degree, setDegree] = React.useState('');
      const [adhar, setAdhar] = React.useState('');
      const [awardList, setAwardList] = React.useState('');
     
      const [morningschedule, setMorningSchedule] = React.useState(morningSchedule);
      const [eveningschedule, setEveningSchedule] = React.useState(eveningSchedule);
      const [achievementList, setAchievementList] = React.useState([]);
      const [checked, setChecked] = React.useState(false);
      const [doctorPic, setDoctorPic] = React.useState('');
      const [showModal, setShowModal] = React.useState(false);
      const [showMap, setShowMap] = React.useState(false);
      const [avgTime, setAvgTime] = React.useState('');
      const [clinicLocations, setClinicLocations] = React.useState([]);
      const [languages, setLanguages] = React.useState('');
      const [clinicLocationText, setClinicLocationText] = React.useState('');
      const [collegename, setCollegename] = React.useState('');
      const [year_of_passout, setYear_of_passout] = React.useState('');
      const [college_location, setCollege_location] = React.useState('');
      const [award_name, setAward_name] = React.useState('');
      const [certifications, setCertifications] = React.useState('');
      const [certList, setCertList] = React.useState([]);
    
      const [award_giving_authority_name, setAward_giving_authority_name] =
        React.useState('');
    
      const [achievement_year, setAchievement_year] = React.useState('');
      const [achievement_specialization, setAchievement_specialization] =
        React.useState('');
        
        const [maritalStatus, setMaritalStatus] = React.useState('Married');
        const [clinicContact, setClinicContact] = React.useState('');
        const [pinCode, setPinCode] = React.useState('');
       
        const [location, setLocation] = React.useState('');
        
     
      const _scrollRef = React.useRef(null);

    
    
      useEffect(() => {
        setName(profileData?.name || '')
        setAddress(profileData?.address || '');
        setPassword(profileData?.password || '');
        setProfilePic(profileData?.profileimage || '');
        setClinicLocations(profileData?.clinic_location || '');
        setFees(profileData?.fees || '');
        setRegNumber(profileData?.registration_number || '');
        setSpecialization(profileData?.specialization || '');
        setYear_of_passout(profileData?.year_of_passout || '');
        setFacilities(profileData?.facilities || '');
        setCollegename(profileData?.collegename || '');
        setDegree(profileData?.Degree || '');
        setAdhar(profileData?.adhar || '');
        setAwardList(profileData?.award_list || '');
       setDob(profileData?.date_of_birth || '')
        
        setMaritalStatus(profileData?.marital_status || '');
        setCollege_location(profileData?.college_location || '')
        setAvgTime(profileData?.avgTime || '')
        setAwardList(profileData?.award_list || '')
        setCertList(profileData?.certList || '')
        setAchievementList(profileData?.achievementList || '')
        setClinicContact(profileData?.clinic_contact || '')
        setPinCode(profileData?.pincode || '')
        setLocation(profileData?.location || '')
        setLanguages(profileData?.location || '')
    
      }, [profileData]);
    
      const takePhotoFromCamera = () => {
        ImagePicker.openCamera({
          compressImageMaxWidth: 300,
          compressImageMaxHeight: 300,
          cropping: true,
          compressImageQuality: 0.7,
          includeBase64: true,
        }).then(image => {
          setProfilePic(image.data);
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
          setProfilePic(image.data);
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
    
      const handleEdit = async() => {
        
        setEditLoading(true);
        let body1 = 
          {
            
            name,
            date_of_birth: dob,
            marital_status: maritalStatus,
            gender,
          
            fees: fees,
            
        
            clinic_contact: clinicContact,
            location,
            pincode: pinCode,
            adhar,
            registration_number:registration_number,
            schedule_morning: morningschedule.map(item => {
              return {
                day: item.day,
                start_time: item.start_time.toString(),
                end_time: item.end_time.toString(),
                checked: item.checked,
              };
            }),
            schedule_evening: eveningschedule.map(item => {
              return {
                day: item.day,
                start_time: item.start_time.toString(),
                end_time: item.end_time.toString(),
                checked: item.checked,
              };
            }),
            avgTime,
            clinicLocations:
              clinicLocations.length > 0 ? clinicLocations : [clinicLocationText],
            facilities,
            specialization,
            Degree,
            collegename,
            year_of_passout,
            college_location,
            feeconsultation: checked,
            // languages,
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
            profileimage: profilePic,
          };
        
        const body = JSON.stringify(body1)
        console.log('body==',body);
        const result = await postData(`doctorprofile/update/${profileData?.id}`, body1);
        if (result.success) {
       
          successToast('Successfully Updated');
          fetchProfileInfo()
        }
        else {
        
          errorToast('Something went wrong plz check')

        }
        setEditLoading(false);
      };
  return (
    <View style={styles.container}>
       <MapModal
        setLocation={setLocation}
        onRequestClose={() => setShowMap(false)}
        onPress={() => {
          setShowMap(false);
          // navigation.goBack();
        }}
        visible={showMap}
      />
     <ScrollView contentContainerStyle={{paddingBottom:30}} showsVerticalScrollIndicator={false}>
     {loading ? (
          <View>
            <DocProfilePlaceholder />
          </View>
        ) : (
      <View
        style={{
          paddingHorizontal: 30,
          paddingVertical: 20,
        }}>
        <View>
          <Text style={{...styles.sheetTitle, color: Color.primary}}>
            Edit the Doctor details
          </Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-evenly',
              alignItems: 'center',
              marginVertical: 15,
            }}>
            <Avatar.Image
              size={80}
              source={{
                uri: profilePic
                  ? profilePic.length > 20
                    ? `data:image/png;base64,${profilePic}`
                    : profilePic
                  : 'https://www.w3schools.com/w3images/avatar6.png',
              }}
            />
            <Button
              mode="contained"
              onPress={() => selectProfilePic()}
              color={Color.primary}
              dark
              labelStyle={{
                fontSize: 12,
                fontFamily: 'Poppins-Regular',
                lineHeight: 12 * 1.4,
              }}>
              Update picture
            </Button>
          </View>
          <View
            style={{
              flexDirection: 'row',
            }}>
            <View style={{marginRight: 10, flex: 1}}>
              <Text style={styles.label}>Name</Text>
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
            <View style={{flex: 1}}>
              <Text style={styles.label}>Registration No.</Text>
              <TextInput
                theme={theme}
                dense
                onChangeText={text => setRegNumber(text)}
                value={registration_number}
                mode="flat"
                underlineColor="#000"
                activeUnderlineColor={Color.primary}
              />
            </View>
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
                onPress={() => setGender('male')}
                style={{
                  ...styles.radioStyle,
                  backgroundColor:
                    gender == 'male' ? `${Color.primary}50` : '#aaaaaa50',
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
                onPress={() => setGender('female')}
                style={{
                  ...styles.radioStyle,
                  backgroundColor:
                    gender == 'female' ? `${Color.primary}50` : '#aaaaaa50',
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
                onPress={() => setGender('others')}
                style={{
                  ...styles.radioStyle,
                  backgroundColor:
                    gender == 'others' ? `${Color.primary}50` : '#aaaaaa50',
                  marginLeft: 5,
                }}>
                <Text
                  style={{
                    color: '#000',
                    lineHeight: 14 * 1.5,
                    fontFamily: Fonts.primaryRegular,
                  }}>
                  Others
                </Text>
              </TouchableOpacity>
            </View>
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
              <Text style={styles.label}>Date of birth</Text>
              <TextInput
                theme={theme}
                dense
                onChangeText={text => setDob(text)}
                value={dob}
                mode="flat"
                underlineColor="#000"
                activeUnderlineColor={Color.primary}
              />
            </View>
            <View style={{flex: 1}}>
              <Text style={styles.label}>Fees</Text>
              <TextInput
                theme={theme}
                dense
                onChangeText={text => setFees(text)}
                value={fees}
                mode="flat"
                underlineColor="#000"
                activeUnderlineColor={Color.primary}
              />
            </View>
          </View>
          {/* <View
            style={{
              flexDirection: 'row',
              marginTop: 15,
            }}>
            <View style={{flex: 1}}>
              <Text style={styles.label}>Clinic Location</Text>
              <TextInput
                theme={theme}
                dense
                onChangeText={text => setClinicLocation(text)}
                value={clinicLocation}
                mode="flat"
                underlineColor="#000"
                activeUnderlineColor={Color.primary}
              />
            </View>
          </View> */}
          <View
            style={{
              flexDirection: 'row',
              marginTop: 15,
            }}>
            <View style={{flex: 1}}>
              <Text style={styles.label}>Clinic Contact</Text>
              <TextInput
              theme={theme}
              dense
              keyboardType="numeric"
              onChangeText={text => setClinicContact(text)}
              value={clinicContact}
              mode="flat"
              underlineColor="#000"
              activeUnderlineColor={Color.primary}
            />
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              marginTop: 15,
            }}>
            <View style={{flex: 1}}>
              <Text style={styles.label}>Password</Text>
              <TextInput
                theme={theme}
                dense
                onChangeText={text => setPassword(text)}
                value={password}
                mode="flat"
                underlineColor="#000"
                activeUnderlineColor={Color.primary}
              />
            </View>
          </View>
          <View style={{marginTop: 15}}>
          <Text style={styles.label}>Pin Code</Text>
          <TextInput
            theme={theme}
            keyboardType="numeric"
            dense
            onChangeText={text => setPinCode(text)}
            value={pinCode}
            mode="flat"
            underlineColor="#000"
            activeUnderlineColor={Color.primary}
          />
        </View>
        <View style={{marginTop: 15}}>
          <Text style={styles.label}>Location</Text>
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
         
          <Button
            mode="contained"
            onPress={() => setShowMap(true)}
            color={Color.primary}
            dark
            style={{marginTop: 10}}>
            Locate on Map
          </Button>
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
          <Text style={styles.label}>Avg. Time per patient (in mins.)</Text>
          <TextInput
            theme={theme}
            dense
            onChangeText={text => setAvgTime(text)}
            value={avgTime}
            mode="flat"
            underlineColor="#000"
            activeUnderlineColor={Color.primary}
          />
        </View>
        <View style={{marginTop: 15}}>
          <Text style={styles.label}>Clinic Address</Text>
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
          <Text style={styles.label}>Facilities</Text>
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
        <View style={{marginTop: 15}}>
          <Text
            style={{
              ...styles.sectionTitle,
              paddingVertical: 15,
              marginTop: 10,
            }}>
            Education Details
          </Text>
          <Text style={styles.label}>Specialization</Text>
          <TextInput
            theme={theme}
            dense
            onChangeText={text => setSpecialization(text)}
            value={specialization}
            mode="flat"
            underlineColor="#000"
            activeUnderlineColor={Color.primary}
          />
        </View>
        <View style={{marginTop: 15}}>
          <Text style={styles.label}>Degree</Text>
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
          <Text style={styles.label}>College Name</Text>
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
            <Text style={styles.label}>Year of Passout</Text>
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
          {/* <View style={{flex: 1}}>
            <Text style={styles.label}>College Location</Text>
            <TextInput
              theme={theme}
              dense
              onChangeText={text => setCollege_location(text)}
              value={college_location}
              mode="flat"
              underlineColor="#000"
              activeUnderlineColor={Color.primary}
            />
          </View> */}
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






        </View>
        <View style={{alignItems: 'center', marginTop: 25}}>
          <Button
            mode="contained"
            onPress={() => {
              handleEdit();
            }}
            dark
            loading={editLoading}
            style={styles.button}
            labelStyle={styles.buttonLabel}
            contentStyle={styles.buttonContent}>
            Save Profile
          </Button>
        </View>
      </View>
        )}
      </ScrollView>
    </View>
  )
}

export default UpdateProfile

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
      },
    sheetTitle: {
        fontSize: 20,
        fontFamily: 'Poppins-SemiBold',
        color: Color.black,
      },
      sheetSubTitle: {
        fontSize: 12,
        fontFamily: 'Poppins-Regular',
        color: Color.gray,
      },
      label: {
        fontFamily: 'Poppins-Regular',
        color: '#000',
      },
      button: {
        width: '100%',
        backgroundColor: Color.primary,
        borderRadius: 10,
      },
      buttonLabel: {
        fontFamily: 'Poppins-Medium',
        fontSize: 16,
        lineHeight: 16 * 1.4,
      },
      buttonContent: {
        padding: 5,
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
      sectionTitle: {
        fontSize: 18,
        color: Color.black,
        fontFamily: Fonts.primaryBold,
        marginBottom: 10,
      },
})