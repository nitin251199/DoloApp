import {Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import RBSheet from 'react-native-raw-bottom-sheet';
import {Avatar, Button, TextInput, Checkbox} from 'react-native-paper';
import {Color, Dimension, Fonts} from '../../theme';
import {useEffect} from 'react';
import ImagePicker from 'react-native-image-crop-picker';

export default EditAssistant = React.forwardRef((props, ref) => {
  const {item, handleEdit, loading} = props;

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


  const [address, setAddress] = React.useState('');
  const [gender, setGender] = React.useState(
    item?.gender?.toLowerCase() || 'male',
  );
  const [password, setPassword] = React.useState('');
  const [profilePic, setProfilePic] = React.useState('');
  const [clinicLocation, setClinicLocation] = React.useState('');
  const [fees, setFees] = React.useState('');
  const [regNumber, setRegNumber] = React.useState('');
  const [specialization, setSpecialization] = React.useState('');
  const [yearOfPassout, setYearOfPassout] = React.useState('');
  const [facilities, setFacilities] = React.useState('');
  const [collegeName, setCollegeName] = React.useState('');
  const [degree, setDegree] = React.useState('');
  const [adhar, setAdhar] = React.useState('');
  const [awardList, setAwardList] = React.useState('');
  const [certificateList, setCertificateList] = React.useState('');
  const [city, setCity] = React.useState('');
  const [morningschedule, setMorningSchedule] = React.useState(morningSchedule);
  const [eveningschedule, setEveningSchedule] = React.useState(eveningSchedule);
  const [achievementList, setAchievementList] = React.useState([]);
  const [checked, setChecked] = React.useState(false);
  const [doctorPic, setDoctorPic] = React.useState('');
  const [showModal, setShowModal] = React.useState(false);
  const [showMap, setShowMap] = React.useState(false);
  const _scrollRef = React.useRef(null);

  useEffect(() => {
    
    setAddress(item?.address || '');
    setPassword(item?.password || '');
    setProfilePic(item?.profileimage || '');
    setClinicLocation(item?.clinic_location[0] || '');
    setFees(item?.fees || '');
    setRegNumber(item?.registration_number || '');
    setSpecialization(item?.specialization || '');
    setYearOfPassout(item?.year_of_passout || '');
    setFacilities(item?.facilities || '');
    setCollegeName(item?.collegename || '');
    setDegree(item?.Degree || '');
    setAdhar(item?.adhar || '');
    setAwardList(item?.award_list || '');
    setCertificateList(item?.certList || '');
    setCity(item?.city || '');

  }, [item]);

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
  return (
    <RBSheet
      ref={ref}
      closeOnDragDown={true}
      closeOnPressMask={true}
      customStyles={{
        wrapper: {
          backgroundColor: 'transparent',
        },
        draggableIcon: {
          // backgroundColor: textColor,
        },
        container: {
          backgroundColor: Color.white,
          borderTopLeftRadius: 25,
          borderTopRightRadius: 25,
        },
      }}
      height={Dimension.window.height * 0.8}>
        <ScrollView contentContainerStyle={{paddingBottom:30}} showsVerticalScrollIndicator={false}>
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
            {/* <View style={{marginRight: 10, flex: 1}}>
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
            </View> */}
            <View style={{flex: 1}}>
              <Text style={styles.label}>Registration No.</Text>
              <TextInput
                theme={theme}
                dense
                onChangeText={text => setRegNumber(text)}
                value={regNumber}
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
          <View
            style={{
              flexDirection: 'row',
              marginTop: 15,
            }}>
            <View style={{marginRight: 10, flex: 1}}>
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
          <View
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








        </View>
        <View style={{alignItems: 'center', marginTop: 25}}>
          <Button
            mode="contained"
            onPress={() => {
              handleEdit({
                name,
                mobile,
                gender,
                email,
                address,
                password,
                profileimage: profilePic,
                assistant_id: item?.assistant_id,
              });
            }}
            dark
            loading={loading}
            style={styles.button}
            labelStyle={styles.buttonLabel}
            contentStyle={styles.buttonContent}>
            Save Profile
          </Button>
        </View>
      </View>
      </ScrollView>
    </RBSheet>
  );
});

const styles = StyleSheet.create({
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
});
