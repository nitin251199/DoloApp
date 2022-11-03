import React, {useEffect} from 'react';
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
} from 'react-native';
import {Button, Checkbox} from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import ImagePicker from 'react-native-image-crop-picker';
import DocProfilePlaceholder from '../placeholders/DocProfilePlaceholder';
import {Color, Dimension, Fonts} from '../theme';

export default function DoctorScreen({navigation, route}) {
  const appointment = route.params.item;

  const [appointmentData, setAppointmentData] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [feedBack, setFeedBack] = React.useState('');
  const [prescriptions, setPrescriptions] = React.useState([]);

  const fetchDocProfile = async () => {
    // let res = await getData(`doctor/profile/${docId}`);
    // console.log('doc profile', JSON.stringify(res));
    // if (res.success) {
    //   setAppointmentData(res.data);
    // }
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
      setPrescriptions(prev => [...prev, image?.path]);
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
      let images = image.map(item => item?.path);
      setPrescriptions(prev => [...prev, images].flat());
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

  useEffect(() => {
    fetchDocProfile();
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
                  ? appointmentData.profileimage.length < 20
                    ? `data:image/png;base64,${appointmentData.profileimage}`
                    : appointmentData.profileimage
                  : 'https://www.w3schools.com/w3images/avatar6.png',
              }}
              style={styles.image}
            />
            <View style={styles.profileDetails}>
              <Text style={styles.doctorName}>{appointmentData?.name}</Text>
              <Text style={styles.doctorSpeciality}>
                {appointmentData?.location}
              </Text>
              <View style={styles.ratingContainer}>
                <View style={styles.ratingIconContainer}>
                  <MaterialCommunityIcons
                    name="star"
                    size={20}
                    color={Color.yellow}
                    style={styles.ratingIcon}
                  />
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
                  {appointmentData?.date}
                </Text>
              </View>
              <View>
                <Text style={{...styles.cardText}}>
                  {appointmentData?.time}
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
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s.
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
                <Text style={{...styles.cardText}}>22 years</Text>
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
                <Text style={{...styles.cardText}}>Male</Text>
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
            {prescriptions.map((prescription, index) => {
              return (
                <>
                  <Image
                    source={{uri: prescription}}
                    style={{
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
            })}
          </View>
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
});
