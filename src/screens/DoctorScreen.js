import React, {useEffect} from 'react';
import {
  ActivityIndicator,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions
} from 'react-native';
import {Checkbox} from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {getData} from '../API';
import DocProfilePlaceholder from '../placeholders/DocProfilePlaceholder';
import {Color, Dimension, Fonts} from '../theme';

export default function DoctorScreen({navigation, route}) {
  const docId = route.params.id;
  console.log('doc id', docId);

  const [doctorData, setDoctorData] = React.useState([]);
  const [timeSchedule,setTimeSchedule] = React.useState();
  const [loading, setLoading] = React.useState(true);

  const fetchDocProfile = async () => {
    let res = await getData(`dolo/profile/${docId}`);
    console.log('doc profile', res?.data?.date_of_birth);
    if (res.status) {
      setDoctorData(res?.data);
    }
    setLoading(false);
  };

  const getTimeSchedule = async () => {
    //  setLoading(true);
    let result = await getData(`scheduleprofile/${docId}`);
    if (result.message == 'Successully') {
      setTimeSchedule(result?.data[0]);
    }
  };

  useEffect(() => {
    fetchDocProfile();
    getTimeSchedule();
  }, []);

  console.log('doctorData1==',doctorData?.schedule_morning);

  return (
    <View style={styles.container}>
      <View style={styles.doctorContainer}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.icon}>
          <MaterialCommunityIcons
            name="arrow-left"
            size={32}
            color={Color.black}
          />
        </TouchableOpacity>
        {loading ? (
          <View>
            <DocProfilePlaceholder />
          </View>
        ) : (
          <View style={styles.profileContainer}>
            <Image
              source={{
                uri: doctorData?.profileimage
                  ? `data:image/png;base64,${doctorData?.profileimage}`
                  : 'https://www.w3schools.com/w3images/avatar6.png',
              }}
              style={styles.image}
            />
            <View style={styles.profileDetails}>
              <Text style={styles.doctorName}>{doctorData?.name}</Text>
              <Text style={styles.doctorSpeciality}>
                {doctorData?.specialization}
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
                  <Text style={styles.ratingText}>DOLO Id</Text>
                  <Text style={styles.ratingStat}>{doctorData?.do_lo_id}</Text>
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
                  <Text style={styles.ratingStat}>₹ {doctorData?.fees}</Text>
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
          }}>
          {/* <View style={{...styles.card, backgroundColor: Color.white}}>
          <Text style={{...styles.cardTitle}}>Biography</Text>
          <View style={styles.cardContent}>
            <Text style={{...styles.cardText}}>
              He is heart specialist with 5 yrs of experience.
            </Text>
          </View>
        </View> */}
          <View style={{...styles.card, backgroundColor: Color.white}}>
            <Text style={{...styles.cardTitle}}>Registration Number</Text>
            <View style={styles.cardContent}>
              <Text style={{...styles.cardText}}>
                {doctorData?.registration_number}
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
              <Text style={{...styles.cardTitle}}>Gender</Text>
              <View style={styles.cardContent}>
                <Text style={{...styles.cardText}}>{doctorData?.gender}</Text>
              </View>
            </View>
            <View
              style={{
                ...styles.card,
                backgroundColor: Color.white,
                flex: 1,
              }}>
              <Text style={{...styles.cardTitle}}>Approval Date</Text>
              <View style={styles.cardContent}>
                <Text style={{...styles.cardText}}>
                  {doctorData?.approve_date}
                </Text>
              </View>
            </View>
          </View>
          <View style={{...styles.card, backgroundColor: Color.white}}>
            <Text style={{...styles.cardTitle}}>Email Address</Text>
            <View style={styles.cardContent}>
              <Text style={{...styles.cardText}}>{doctorData?.email}</Text>
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
              <Text style={{...styles.cardTitle}}>Date of Birth</Text>
              <View style={styles.cardContent}>
                <Text style={{...styles.cardText}}>
                  {/* {new Date(doctorData?.date_of_birth).toDateString().slice(4)} */}
                  {doctorData?.date_of_birth}
                </Text>
              </View>
            </View>
            <View
              style={{
                ...styles.card,
                backgroundColor: Color.white,
                flex: 1,
              }}>
              <Text style={{...styles.cardTitle}}>Marital Status</Text>
              <View style={styles.cardContent}>
                <Text style={{...styles.cardText}}>
                  {doctorData?.marital_status}
                </Text>
              </View>
            </View>
          </View>
          <View style={{...styles.card, backgroundColor: Color.white}}>
            <Text style={{...styles.cardTitle}}>
              Fee Consultation through app
            </Text>
            <View style={styles.cardContent}>
              <Text style={{...styles.cardText}}>
                {doctorData?.feeconsultation ? 'Yes' : 'No'}
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
              <Text style={{...styles.cardTitle}}>Aadhar</Text>
              <View style={styles.cardContent}>
                <Text style={{...styles.cardText}}>{doctorData?.adhar}</Text>
              </View>
            </View>
            <View
              style={{
                ...styles.card,
                backgroundColor: Color.white,
                flex: 1,
              }}>
              <Text style={{...styles.cardTitle}}>Avg Time per patient</Text>
              <View style={styles.cardContent}>
                <Text style={{...styles.cardText}}>
                  {doctorData?.avgTime} min.
                </Text>
              </View>
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
              <Text style={{...styles.cardTitle}}>Doctor Contact</Text>
              <View style={styles.cardContent}>
                <Text style={{...styles.cardText}}>
                  {doctorData?.doctorContact}
                </Text>
              </View>
            </View>

            <View
              style={{
                ...styles.card,
                backgroundColor: Color.white,
                flex: 1,
              }}>
              <Text style={{...styles.cardTitle}}>Clinic Contact</Text>
              <View style={styles.cardContent}>
                <Text style={{...styles.cardText}}>
                  {doctorData?.clinic_contact}
                </Text>
              </View>
            </View>
          </View>
          <View style={{...styles.card, backgroundColor: Color.white}}>
            <Text style={{...styles.cardTitle}}>Location</Text>
            <View style={styles.cardContent}>
              <Text style={{...styles.cardText}}>{doctorData?.location}</Text>
            </View>
            <View style={styles.cardContent}>
              {doctorData?.city && (
                <Text style={{...styles.cardText}}>{doctorData?.city},</Text>
              )}
              {doctorData?.state && (
                <Text style={{...styles.cardText}}>{doctorData?.state},</Text>
              )}
              {doctorData?.country && (
                <Text style={{...styles.cardText}}>{doctorData?.country}</Text>
              )}
            </View>
          </View>
          <View style={{...styles.card, backgroundColor: Color.white}}>
            <Text style={{...styles.cardTitle}}>Facilities</Text>
            <View style={styles.cardContent}>
              <Text style={{...styles.cardText}}>{doctorData?.facilities}</Text>
            </View>
          </View>
          <View style={{...styles.card, backgroundColor: Color.white}}>
            <Text style={{...styles.cardTitle}}>Clininc Locations</Text>
            <View style={styles.cardContent}>
              {doctorData?.clinic_location &&
                doctorData?.clinic_location.map((item, index) => {
                  return (
                    <Text style={{...styles.cardText}} key={index}>
                      {item}
                    </Text>
                  );
                })}
            </View>
          </View>
          <View style={{...styles.card, backgroundColor: Color.white}}>
            <Text style={{...styles.cardTitle}}>Clinic Schedule</Text>
            <View style={styles.cardContent}>
             
         {/* <Text style={styles.label}>Morning Schedule</Text>
          {doctorData?.schedule_morning && doctorData?.schedule_morning.map((item, index) => (
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
          {doctorData?.schedule_evening && doctorData?.schedule_evening.map((item, index) => (
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
          ))} */}

<ScrollView horizontal={true}>
            {timeSchedule?.Sunday?.morning?.checked &&
              timeSchedule?.Sunday?.evening?.checked && (
                <View style={styles.timing_card_style}>
                  <Text style={styles.day_name_style}>
                    {/* {t('Doctor Profile.Sunday')} */}
                    Sunday
                  </Text>
                  {timeSchedule?.Sunday?.morning?.checked ? (
                    <Text style={styles.shift_style}>
                      Morning :{' '}
                      {new Date(timeSchedule?.Sunday?.morning?.start_time)
                        .toLocaleTimeString()
                        .slice(0, -6)}
                      {new Date(timeSchedule?.Sunday?.morning?.start_time)
                        .toLocaleTimeString()
                        .slice(8)}{' '}
                      -{' '}
                      {new Date(timeSchedule?.Sunday?.morning?.end_time)
                        .toLocaleTimeString()
                        .slice(0, -6)}
                      {new Date(timeSchedule?.Sunday?.morning?.end_time)
                        .toLocaleTimeString()
                        .slice(7)}
                    </Text>
                  ) : (
                    <Text style={styles.shift_style}>
                     Morning :{' '}
                      {/* {t('Doctor Profile.Close')} */}
                      Close
                    </Text>
                  )}

                  {timeSchedule?.Sunday?.evening?.checked ? (
                    <Text style={styles.shift_style}>
                      Evening :{' '}
                      {timeSchedule?.Sunday?.evening?.start_time} -{' '}
                      {timeSchedule?.Sunday?.evening?.end_time}
                    </Text>
                  ) : (
                    <Text style={styles.shift_style}>
                      Evening :{' '}
                      {/* {t('Doctor Profile.Close')} */}
                      Close
                    </Text>
                  )}
                </View>
              )}
            {/* ------------ */}

            {/* --------- */}
            {timeSchedule?.Monday?.morning?.checked &&
              timeSchedule?.Monday?.evening?.checked && (
                <View style={styles.timing_card_style}>
                  <Text style={styles.day_name_style}>
                    {/* {t('Doctor Profile.Monday')} */}
                    Monday
                  </Text>
                  {timeSchedule?.Monday?.morning?.checked ? (
                    <Text style={styles.shift_style}>
                      Morning :{' '}
                      {timeSchedule?.Monday?.morning?.start_time} -{' '}
                      {timeSchedule?.Monday?.morning?.end_time}
                    </Text>
                  ) : (
                    <Text style={styles.shift_style}>
                     Morning :{' '}
                     Close
                    </Text>
                  )}

                  {timeSchedule?.Monday?.evening?.checked ? (
                    <Text style={styles.shift_style}>
                      Evening :{' '}
                      {timeSchedule?.Monday?.evening?.start_time} -{' '}
                      {timeSchedule?.Monday?.evening?.end_time}
                    </Text>
                  ) : (
                    <Text style={styles.shift_style}>
                    Evening  :{' '}
                    Close
                    </Text>
                  )}
                </View>
              )}
            {/* ------------ */}
            {/* --------- */}
            {timeSchedule?.Tuesday?.morning?.checked &&
              timeSchedule?.Tuesday?.evening?.checked && (
                <View style={styles.timing_card_style}>
                  <Text style={styles.day_name_style}>
                    Tuesday
                  </Text>
                  {timeSchedule?.Tuesday?.morning?.checked ? (
                    <Text style={styles.shift_style}>
                      Morning :{' '}
                      {timeSchedule?.Tuesday?.morning?.start_time} -{' '}
                      {timeSchedule?.Tuesday?.morning?.end_time}
                    </Text>
                  ) : (
                    <Text style={styles.shift_style}>
                      Morning :{' '}
                      Close
                    </Text>
                  )}

                  {timeSchedule?.Tuesday?.evening?.checked ? (
                    <Text style={styles.shift_style}>
                     Evening :{' '}
                      {timeSchedule?.Tuesday?.evening?.start_time} -{' '}
                      {timeSchedule?.Tuesday?.evening?.end_time}
                    </Text>
                  ) : (
                    <Text style={styles.shift_style}>
                      Evening :{' '}
                      Close
                    </Text>
                  )}
                </View>
              )}
            {/* ------------ */}
            {/* --------- */}
            {timeSchedule?.Wednesday?.morning?.checked &&
              timeSchedule?.Wednesday?.evening?.checked && (
                <View style={styles.timing_card_style}>
                  <Text style={styles.day_name_style}>
                    Wednesday
                  </Text>
                  {timeSchedule?.Wednesday?.morning?.checked ? (
                    <Text style={styles.shift_style}>
                      Morning :{' '}
                      {timeSchedule?.Wednesday?.morning?.start_time} -{' '}
                      {timeSchedule?.Wednesday?.morning?.end_time}
                    </Text>
                  ) : (
                    <Text style={styles.shift_style}>
                     Morning :{' '}
                     Close
                    </Text>
                  )}

                  {timeSchedule?.Wednesday?.evening?.checked ? (
                    <Text style={styles.shift_style}>
                      Evening :{' '}
                      {timeSchedule?.Wednesday?.evening?.start_time} -{' '}
                      {timeSchedule?.Wednesday?.evening?.end_time}
                    </Text>
                  ) : (
                    <Text style={styles.shift_style}>
                      Evening :{' '}
                      Close
                    </Text>
                  )}
                </View>
              )}
            {/* ------------ */}
            {/* --------- */}
            {timeSchedule?.Thursday?.morning?.checked &&
              timeSchedule?.Thursday?.evening?.checked && (
                <View style={styles.timing_card_style}>
                  <Text style={styles.day_name_style}>
                   Thursday
                  </Text>
                  {timeSchedule?.Thursday?.morning?.checked ? (
                    <Text style={styles.shift_style}>
                      Morning :{' '}
                      {timeSchedule?.Thursday?.morning?.start_time} -{' '}
                      {timeSchedule?.Thursday?.morning?.end_time}
                    </Text>
                  ) : (
                    <Text style={styles.shift_style}>
                      Morning :{' '}
                      Close
                    </Text>
                  )}

                  {timeSchedule?.Thursday?.evening?.checked ? (
                    <Text style={styles.shift_style}>
                      Evening :{' '}
                      {timeSchedule?.Thursday?.evening?.start_time} -{' '}
                      {timeSchedule?.Thursday?.evening?.end_time}
                    </Text>
                  ) : (
                    <Text style={styles.shift_style}>
                      Evening :{' '}
                      Close
                    </Text>
                  )}
                </View>
              )}
            {/* ------------ */}
            {/* --------- */}
            {timeSchedule?.Friday?.morning?.checked &&
              timeSchedule?.Friday?.evening?.checked && (
                <View style={styles.timing_card_style}>
                  <Text style={styles.day_name_style}>
                    Friday
                  </Text>
                  {timeSchedule?.Friday?.morning?.checked ? (
                    <Text style={styles.shift_style}>
                      Morning :{' '}
                      {timeSchedule?.Friday?.morning?.start_time} -{' '}
                      {timeSchedule?.Friday?.morning?.end_time}
                    </Text>
                  ) : (
                    <Text style={styles.shift_style}>
                      Morning :{' '}
                      Close
                    </Text>
                  )}

                  {timeSchedule?.Friday?.evening?.checked ? (
                    <Text style={styles.shift_style}>
                      Evening :{' '}
                      {timeSchedule?.Friday?.evening?.start_time} -{' '}
                      {timeSchedule?.Friday?.evening?.end_time}
                    </Text>
                  ) : (
                    <Text style={styles.shift_style}>
                      Evening :{' '}
                      Close
                    </Text>
                  )}
                </View>
              )}
            {/* ------------ */}
            {/* --------- */}
            {timeSchedule?.Saturday?.morning?.checked &&
              timeSchedule?.Saturday?.evening?.checked && (
                <View style={styles.timing_card_style}>
                  <Text style={styles.day_name_style}>
                    Saturday
                  </Text>
                  {timeSchedule?.Saturday?.morning?.checked ? (
                    <Text style={styles.shift_style}>
                      Morning :{' '}
                      {timeSchedule?.Saturday?.morning?.start_time} -{' '}
                      {timeSchedule?.Saturday?.morning?.end_time}
                    </Text>
                  ) : (
                    <Text style={styles.shift_style}>
                      Morning :{' '}
                      Close
                    </Text>
                  )}

                  {timeSchedule?.Saturday?.evening?.checked ? (
                    <Text style={styles.shift_style}>
                      Evening :{' '}
                      {timeSchedule?.Saturday?.evening?.start_time} -{' '}
                      {timeSchedule?.Saturday?.evening?.end_time}
                    </Text>
                  ) : (
                    <Text style={styles.shift_style}>
                      Evening :{' '}
                      Close
                    </Text>
                  )}
                </View>
              )}
            {/* ------------ */}
          </ScrollView>


            </View>
          </View>
          <View style={{...styles.card, backgroundColor: Color.white}}>
            <Text style={{...styles.cardTitle}}>Academic Information</Text>
            <View style={styles.cardContent}>
              <Text style={{...styles.cardText}}>{doctorData?.Degree}</Text>
              <Text style={{...styles.cardText}}>
                {doctorData?.collegename},{doctorData?.year_of_passout}
              </Text>
              <Text style={{...styles.cardText}}>
                {doctorData?.college_location}
              </Text>
            </View>
          </View>
          <View style={{...styles.card, backgroundColor: Color.white}}>
            <Text style={{...styles.cardTitle}}>Awards</Text>
            {doctorData?.award_list &&
              doctorData?.award_list.map((item, index) => {
                return (
                  <View style={styles.cardContent} key={index}>
                    <Text style={{...styles.cardText}}>{item?.award_name}</Text>
                    <Text style={{...styles.cardText}}>
                      {item?.award_giving_authority_name}
                    </Text>
                  </View>
                );
              })}
          </View>
          <View style={{...styles.card, backgroundColor: Color.white}}>
            <Text style={{...styles.cardTitle}}>Certificates</Text>
            {doctorData?.certList &&
              doctorData?.certList.map((item, index) => {
                return (
                  <View style={styles.cardContent} key={index}>
                    <Text style={{...styles.cardText}}>{item}</Text>
                  </View>
                );
              })}
          </View>
          <View style={{...styles.card, backgroundColor: Color.white}}>
            <Text style={{...styles.cardTitle}}>Achievements</Text>
            {doctorData?.achievementList &&
              doctorData?.achievementList.map((item, index) => {
                return (
                  <View style={styles.cardContent} key={index}>
                    <Text style={{...styles.cardText}}>
                      {item?.achievement_specialization},{' '}
                      {item?.achievement_year}
                    </Text>
                  </View>
                );
              })}
          </View>
        </ScrollView>
      )}
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
    paddingBottom:20,
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
    marginTop: 20,
    marginHorizontal: 10,
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
  timing_card_style: {
    marginLeft: 8,
    marginTop: 10,
    backgroundColor: Color.primary,
    paddingVertical: 15,
    paddingHorizontal: 3,
    width: Dimensions.get('window').width - 100,
    borderRadius: 8,
    elevation: 10,

    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 3.84,
    //backgroundColor: '#25CCF7',
    shadowColor: Color.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  day_name_style: {
    fontFamily: Fonts.primarySemiBold,
    color: Color.black,
    borderBottomColor: Color.black,
    borderBottomWidth: 0.5,
    fontSize: 18,
    width: '95%',
    textAlign: 'center',
    // paddingVertical: 5,
  },
  shift_style: {
    fontFamily: Fonts.primaryRegular,
    color: Color.black,
    borderBottomColor: Color.black,
    borderBottomWidth: 0.5,
    width: '95%',
    textAlign: 'center',
    paddingVertical: 5,
    fontSize: 17,
  },
});
