import React, {useEffect, useRef} from 'react';
import {
  ActivityIndicator,
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  FlatList,
} from 'react-native';
import {Button, Checkbox} from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import ImagePicker from 'react-native-image-crop-picker';
import DocProfilePlaceholder from '../placeholders/DocProfilePlaceholder';
import {Color, Dimension, Fonts} from '../theme';
import HomeScreen from './HomeScreen';
import {postData, getData} from '../API';
import {successToast, errorToast} from '../components/toasts';
import FeedbackDetails from './FeedbackDetails';

export default function DoctorScreen({navigation, route}) {
  const appointment = route.params.item;
  //console.log('appointment',appointment);
  const [appointmentData, setAppointmentData] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [feedBack, setFeedBack] = React.useState('');
  const [description, setDescription] = React.useState('');

  const [prescriptions, setPrescriptions] = React.useState([]);
  const [prescriptionList, setPrescriptionList] = React.useState([]);
  const [imgList, setImgList] = React.useState([]);
  const [prescriptionData, setPrescriptionData] = React.useState([]);
  
  const fetchDocProfile = async () => {
    // let res = await getData(`doctor/profile/${docId}`);
    // console.log('doc profile', JSON.stringify(res));
    // if (res.success) {
    //   setAppointmentData(res.data);
    // }
    // console.log('appointment', appointment);
    setTimeout(() => {
      setAppointmentData(appointment);
      setLoading(false);
    }, 100);
  };

  const takePhotoFromCamera = () => {
    ImagePicker.openCamera({
      compressImageMaxWidth: 300,
      compressImageMaxHeight: 300,
      cropping: true,
      compressImageQuality: 0.7,
      includeBase64: true,
      multiple: true,
    }).then(image => {
      setPrescriptions(prev => [...prev, image]);
      console.log('imggggcmr==', prescriptions);
    });
  };

  const choosePhotoFromLibrary = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 300,
      cropping: true,
      compressImageQuality: 0.7,
      includeBase64: true,
      multiple: true,
    }).then(image => {
      // let images = image.map(item => item?.path);
      setPrescriptions(prev => [...prev, image].flat());
      console.log('imggggcmr==', prescriptions);
    });
  };

  const addPrescription = () => {
    Alert.alert(
      'Add Prescription',
      'Upload prescription from',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel'),
          style: 'cancel',
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
      {cancelable: true},
    );
  };

  const sendPerscription = async () => {
    // console.log('dt',appointment?.patient_id,appointment?.doctor_id,feedBack,prescriptions)
    setLoading(true);
    var body = {
      patient_id: appointment?.patient_id,
      doctor_id: appointment?.doctor_id,
      description: feedBack,
      prescription: prescriptions.map(item => item?.data),
    };
    const result = await postData('doctor_send_prescrition_patient', body);
    // console.log('result', result);
    if (result.success) {
      successToast('Feedback Send SuccessFullly');
     // navigation.navigate('Home1');
    // navigation.goBack();
    } else {
      errorToast('Something Went Wrong Please Check');
    }
    setLoading(false);
  };

  const getFeedbackList = async () => {
    setLoading(true);
    let res = await getData(
      `doctorfeedback/${appointment?.doctor_id}/${appointment?.patient_id}`,
    );

    if (res.success) {
    

      setPrescriptionList(res.data);

    }
    setLoading(false);
  };

  useEffect(() => {
    fetchDocProfile();
    getFeedbackList();
   
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.doctorContainer}>
        {loading ? (
          <View>
            <DocProfilePlaceholder />
          </View>
        ) : (
          <View style={styles.profileContainer}>
            <Image
              source={{
                uri: appointmentData?.profileimage
                  ? appointmentData.profileimage.length > 20
                    ? `data:image/png;base64,${appointmentData.profileimage}`
                    : appointmentData.profileimage
                  : 'https://www.w3schools.com/w3images/avatar6.png',
              }}
              style={styles.image}
            />
            <View style={styles.profileDetails}>
              <Text style={styles.doctorName}>
                {appointmentData?.patient_name}
              </Text>
              {/* <Text style={styles.doctorSpeciality}>
                {appointmentData?.category}
              </Text> */}
              <View style={styles.ratingContainer}>
                <View style={styles.ratingIconContainer}>
                  {/* <MaterialCommunityIcons
                    name="star"
                    size={20}
                    color={Color.yellow}
                    style={styles.ratingIcon}
                  /> */}
                  <Text>📙</Text>
                </View>
                <View style={styles.textContainer}>
                  <Text style={styles.ratingText}>Appointment No.</Text>
                  <Text style={styles.ratingStat}>{appointmentData?.id}</Text>
                </View>
              </View>
              <View style={{...styles.ratingContainer, marginTop: 10}}>
                <View style={styles.ratingIconContainer}>
                  <MaterialIcons
                    name="payments"
                    size={20}
                    color={Color.green}
                    style={styles.ratingIcon}
                  />
                </View>
                <View style={styles.textContainer}>
                  <Text style={styles.ratingText}>Fees</Text>
                  <Text style={styles.ratingStat}>₹ 500</Text>
                </View>
              </View>
            </View>
          </View>
        )}
      </View>
      {loading ? (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            height: Dimension.window.height * 0.5,
          }}>
          <ActivityIndicator size="large" color="#FFF" />
        </View>
      ) : (
        <ScrollView
          contentContainerStyle={{
            paddingBottom: 30,
            padding: 10,
          }}>
          {/* <View style={{...styles.card, backgroundColor: Color.white}}>
          <Text style={{...styles.cardTitle}}>Biography</Text>
          <View style={styles.cardContent}>
            <Text style={{...styles.cardText}}>
              He is heart specialist with 5 yrs of experience.
            </Text>
          </View>
        </View> */}
          <View
            style={{
              flexDirection: 'row',
            }}>
            <View
              style={{
                ...styles.card,
                backgroundColor: Color.white,
                flex: 1,
              }}>
              <Text style={{...styles.cardTitle}}>Date Time</Text>
              <View style={styles.cardContent}>
                <Text style={{...styles.cardText}}>
                  {appointmentData?.created_at.toString().split('T')[0]}
                </Text>
              </View>
              <View>
                <Text style={{...styles.cardText}}>
                  {new Date(appointmentData?.created_at).toLocaleTimeString()}
                </Text>
              </View>
            </View>
            <View
              style={{
                ...styles.card,
                backgroundColor: Color.white,
                flex: 1,
              }}>
              <Text style={{...styles.cardTitle}}>Status</Text>
              <View style={styles.cardContent}>
                <Text style={{...styles.cardText}}>Waiting</Text>
              </View>
            </View>
          </View>
          <View style={{...styles.card, backgroundColor: Color.white}}>
            <Text style={{...styles.cardTitle}}>Patient Problem</Text>
            <View style={styles.cardContent}>
              <Text style={{...styles.cardText}}>
                {appointmentData?.patient_problem_description}
              </Text>
            </View>
          </View>
          <View style={{...styles.card, backgroundColor: Color.white}}>
            <Text style={{...styles.cardTitle}}>Patient Weight</Text>
            <View style={styles.cardContent}>
              <Text style={{...styles.cardText}}>
                {appointmentData?.weight} {appointmentData?.weighttype}
              </Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
            }}>
            <View
              style={{
                ...styles.card,
                backgroundColor: Color.white,
                flex: 1,
              }}>
              <Text style={{...styles.cardTitle}}>Age</Text>
              <View style={styles.cardContent}>
                <Text style={{...styles.cardText}}>
                  {appointmentData?.age} {appointmentData?.agetype}
                </Text>
              </View>
            </View>
            <View
              style={{
                ...styles.card,
                backgroundColor: Color.white,
                flex: 1,
              }}>
              <Text style={{...styles.cardTitle}}>Sex</Text>
              <View style={styles.cardContent}>
                <Text style={{...styles.cardText}}>
                  {appointmentData?.gender.charAt(0).toUpperCase() +
                    appointmentData?.gender.slice(1)}
                </Text>
              </View>
            </View>
          </View>
          <View style={{...styles.card, backgroundColor: Color.white}}>
            <Text style={{...styles.cardTitle}}>Send Feedback</Text>
            <View>
              <TextInput
                placeholder="Enter your feedback"
                placeholderTextColor={Color.grey}
                color={'#000'}
                style={{
                  textAlignVertical: 'top',
                  borderBottomWidth: 1,
                  borderBottomColor: '#ccc',
                  fontFamily: 'Poppins-Regular',
                }}
                value={feedBack}
                onChangeText={setFeedBack}
                multiline={true}
                numberOfLines={3}
              />
            </View>
          </View>
          <View style={{flexDirection: 'row', paddingHorizontal: 5}}>
            <Button
              mode="contained"
              onPress={addPrescription}
              icon="plus"
              uppercase={false}
              color={Color.white}
              labelStyle={{
                color: Color.black,
                fontFamily: Fonts.primaryRegular,
                lineHeight: 14 * 1.4,
                letterSpacing: 0,
              }}
              contentStyle={{
                paddingVertical: 5,
              }}
              style={{
                marginTop: 10,
                flex: 1,
                borderRadius: 10,
              }}>
              Add prescription
            </Button>
            <Button
              mode="contained"
              icon="send"
              onPress={sendPerscription}
              uppercase={false}
              color={Color.white}
              labelStyle={{
                color: Color.black,
                fontFamily: Fonts.primaryRegular,
                lineHeight: 14 * 1.4,
                letterSpacing: 0,
              }}
              contentStyle={{
                paddingVertical: 5,
              }}
              style={{
                marginTop: 10,
                marginLeft: 10,
                flex: 1,
                borderRadius: 10,
              }}>
              Send
            </Button>
          </View>
          <View
            style={{
              flexDirection: 'row',
              marginTop: 10,
              flexWrap: 'wrap',
            }}>
            {/* {prescriptions.map((prescription, index) => {
              return (
                <>
                  <Image
                    source={{uri: prescription}}
                    style={{
                      // flex: 1,
                      width: '38%',
                      height: 150,
                      margin: 5,
                      borderRadius: 5,
                    }}
                  />
                  <TouchableOpacity
                    onPress={() => {
                      setPrescriptions(
                        prescriptions.filter((item, i) => i !== index),
                      );
                    }}
                    style={{
                      // position: 'absolute',
                      margin: 5,
                      // top: index % 3 == 0 ? index * 130 : (index - 1) * 130,
                      // right: Dimension.window.width * 0.3 * index,
                      zIndex: 999,
                    }}>
                    <MaterialCommunityIcons
                      name="close"
                      size={24}
                      color={Color.white}
                      style={styles.closeIcon}
                    />
                  </TouchableOpacity>
                </>
              );
            })} */}

            <FlatList
              data={prescriptions}
              nestedScrollEnabled={true}
              numColumns={2}
              renderItem={({item, index}) => {
                return (
                  <>
                    <Image
                      source={{uri: item?.path}}
                      style={{
                        flex: 1,
                        height: 150,
                        margin: 5,
                        marginTop: 15,
                        borderRadius: 5,
                        borderWidth: 1,
                        borderColor: '#ccc',
                      }}
                    />
                    <TouchableOpacity
                      onPress={() => {
                        setPrescriptions(
                          prescriptions.filter((item, i) => i !== index),
                        );
                      }}
                      style={{
                        // position: 'absolute',
                        margin: 5,
                        marginTop: 15,
                        // top: index % 3 == 0 ? index * 130 : (index - 1) * 130,
                        // right: Dimension.window.width * 0.3 * index,
                        zIndex: 999,
                      }}>
                      <MaterialCommunityIcons
                        name="close"
                        size={24}
                        color={Color.black}
                        style={styles.closeIcon}
                      />
                    </TouchableOpacity>
                  </>
                );
              }}
              keyExtractor={(item, index) => index.toString()}
              contentContainerStyle={{
                paddingHorizontal: 20,
              }}
            />
          </View>

          <Text
            style={{
              fontSize: 20,
              fontFamily: Fonts.primaryBold,
              color: Color.black,
              marginTop: 20,
            }}>
            Feedback List
          </Text>

          {prescriptionList.map((item, index) => {
            return (
              <TouchableOpacity
      activeOpacity={1}
      style={styles.listItem}
      //onPress={onPress}
      >
      <View
        style={{
          flexDirection: 'row',
          flex: 1,
        }}>
        <Image
          style={styles.listImage}
          source={{uri: `data:image/png;base64,${item?.prescription[0]}`}}
        />
        <View style={styles.listItemText}>
          <Text style={styles.listItemTitle} numberOfLines={1}>{item.description}</Text>
          {/* <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginVertical: 3,
            }}>
            <View style={{flexDirection: 'row', width: '65%'}}>
              <MaterialCommunityIcons
                name="map-marker"
                size={17}
                color={Color.primary}
                style={{
                  marginRight: 10,
                }}
              />
              <Text style={styles.listItemSubTitle}>{item.address}</Text>
            </View>
            <View style={{flexDirection: 'row'}}>
              <MaterialCommunityIcons
                name="gender-male-female"
                size={17}
                color={Color.primary}
                style={{
                  marginRight: 10,
                }}
              />
              <Text style={styles.listItemSubTitle}>{item.gender}</Text>
            </View>
          </View> */}
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingTop:5
            }}>
            <MaterialCommunityIcons
              name="clock"
              size={20}
              color={Color.primary}
              style={{
                marginRight: 5,
              }}
            />
            <Text
              style={{
                fontFamily: Fonts.primaryRegular,
                color: '#000',
                lineHeight: 14 * 1.4,
              }}>
              {new Date(item.date).toDateString().slice(3)}
            </Text>
          </View>
          <Button
          mode="contained"
          onPress={ () =>navigation.navigate('FeedbackDetails',{
            desc:item.description,
            date: new Date(item.date).toDateString().slice(3),
            img:item.prescription,
          })}
          icon={({size, color}) => (
            <MaterialCommunityIcons
              name="file-eye-outline"
              size={24}
              style={{color}}
            />
          )}
          labelStyle={{
            fontFamily: Fonts.primaryBold,
            fontSize: 14,
          }}
          dark
          style={{
            backgroundColor: Color.primary,
            marginTop: 15,
            borderRadius: 8,
            marginRight: 5,
            width:'70%'
           // flex: 1,
          }}>
          View
        </Button>
        </View>
       
      </View>
      {/* <View
        style={{
          //flexDirection: 'row',
          width:'40%',
          alignSelf:'center'
        }}>
        <Button
          mode="contained"
        //  onPress={onEdit}
          icon={({size, color}) => (
            <MaterialCommunityIcons
              name="file-eye-outline"
              size={24}
              style={{color}}
            />
          )}
          labelStyle={{
            fontFamily: Fonts.primaryBold,
            fontSize: 14,
          }}
          dark
          style={{
            backgroundColor: Color.green,
            marginTop: 15,
            borderRadius: 8,
            marginRight: 10,
            flex: 1,
          }}>
          View
        </Button>
      
      </View> */}
    </TouchableOpacity>
            );
          })}
        </ScrollView>
      )}
      {/* <View style={styles.bottom}>
        {new Date(appointmentData.date) >= new Date().setHours(0, 0, 0, 0) &&
        !appointmentData?.status ? (
          <>
            <Button
              mode="contained"
              onPress={() => {}}
              color={Color.red}
              style={{
                flex: 1,
                borderRadius: 0,
              }}
              contentStyle={{
                height: 55,
              }}>
              Cancel
            </Button>
            <Button
              mode="contained"
              onPress={() => {}}
              color={Color.green}
              style={{
                flex: 1,
                borderRadius: 0,
              }}
              contentStyle={{
                height: 55,
              }}>
              Confirm
            </Button>
          </>
        ) : appointmentData?.status == -1 ? (
          <Button
            mode="contained"
            onPress={() => {}}
            icon={({size, color}) => (
              <MaterialCommunityIcons name="close" size={24} style={{color}} />
            )}
            color={Color.red}
            style={{
              flex: 1,
              borderRadius: 0,
            }}
            contentStyle={{
              height: 55,
            }}>
            Cancelled
          </Button>
        ) : (
          <Button
            mode="contained"
            onPress={() => {}}
            icon={({size, color}) => (
              <MaterialCommunityIcons name="check" size={24} style={{color}} />
            )}
            color={Color.green}
            style={{
              flex: 1,
              borderRadius: 0,
            }}
            contentStyle={{
              height: 55,
            }}>
            Confirmed
          </Button>
        )}
      </View> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.primary,
  },
  doctorContainer: {
    // height: '40%',
    width: '100%',
    paddingVertical: 20,
    borderBottomLeftRadius: 25,
    alignItems: 'center',
    // justifyContent: 'center',
    borderBottomRightRadius: 25,
    backgroundColor: Color.white,
    elevation: 10,
  },
  icon: {
    width: '100%',
    padding: 20,
  },
  image: {
    height: 180,
    width: 120,
    borderRadius: 20,
    marginRight: 25,
  },
  profileContainer: {
    flexDirection: 'row',
    width: '90%',
    // alignItems: 'center',
    // justifyContent: 'space-around',
  },
  profileDetails: {
    paddingVertical: 5,
    flexDirection: 'column',
  },
  doctorName: {
    fontSize: 17,
    fontFamily: 'Poppins-Bold',
    color: Color.black,
  },
  doctorSpeciality: {
    color: Color.grey,
    fontFamily: 'Poppins-Regular',
  },
  ratingContainer: {
    flexDirection: 'row',
    marginTop: 15,
  },
  ratingIconContainer: {
    elevation: 6,
    shadowColor: Color.grey,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    backgroundColor: Color.white,
    alignSelf: 'center',
    padding: 12,
    borderRadius: 10,
  },
  textContainer: {
    marginLeft: 15,
  },
  ratingText: {
    fontFamily: 'Poppins-Regular',
    color: Color.grey,
    fontSize: 12,
    lineHeight: 14 * 1.5,
  },
  ratingStat: {
    fontFamily: 'Poppins-Bold',
    lineHeight: 14 * 1.5,
    color: Color.black,
  },
  card: {
    flexDirection: 'column',
    marginTop: 10,
    marginHorizontal: 5,
    backgroundColor: Color.white,
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 10,
    shadowColor: '#00000050',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 10,
  },
  cardTitle: {
    fontSize: 14,
    color: Color.black,
    fontFamily: 'Poppins-Regular',
  },
  cardContent: {
    flexDirection: 'column',
    paddingTop: 10,
  },
  cardText: {
    fontSize: 16,
    color: Color.black,
    fontFamily: 'Poppins-Medium',
  },
  bottom: {
    bottom: 0,
    position: 'absolute',
    width: '100%',
    flexDirection: 'row',
  },
  card: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    padding: 15,
    marginVertical: 10,
    backgroundColor: '#fff',
    borderRadius: 15,
    elevation: 8,
    shadowColor: Color.primary,
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },
  listItem: {
    flexDirection: 'column',
    justifyContent: 'space-between',
   // padding: 15,
    marginVertical: 10,
    backgroundColor: '#fff',
    borderRadius: 15,
    elevation: 8,
    shadowColor: Color.primary,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    width: '100%',
    marginTop:10
  },
  listImage: {
    // height: 75,
    // width: 75,
    borderTopLeftRadius: 15,
    borderBottomLeftRadius: 15,
    marginRight: 15,
    flex:1
  },
  listItemText: {
    justifyContent: 'space-evenly',
    flex: 1,
    padding:10
  },
  listItemTitle: {
    fontSize: 16,
    color: Color.black,
    // fontWeight: '700',
    fontFamily: Fonts.primaryRegular,
    width:'80%',
    textAlign:'center'
  },
  listItemSubTitle: {
    fontSize: 14,
    lineHeight: 14 * 1.4,
    fontFamily: Fonts.primaryRegular,
    color: '#999',
  },
});
