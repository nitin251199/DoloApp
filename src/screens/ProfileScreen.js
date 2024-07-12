import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions
} from 'react-native';
import React, {useEffect} from 'react';
import {Color, Dimension, Fonts} from '../theme';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Avatar,Button} from 'react-native-paper';
import {
  Menu,
  MenuOption,
  MenuOptions,
  MenuTrigger,
  renderers,
} from 'react-native-popup-menu';
import {CommonActions} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {getData} from '../API';
import ProfilePlaceholder from '../placeholders/ProfilePlaceholder';
import EditDoctorProfile from '../components/bottomsheets/EditDoctorProfile';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {dummyProfile} from './test';

export default function ProfileScreen({navigation}) {
  const dispatch = useDispatch();

  const user = useSelector(state => state.user);
  console.log('user?.userid=',user);
  const _sheetRef = React.useRef(null);
  const [profileData, setProfileData] = React.useState();
  const [loading, setLoading] = React.useState(false);
  const [editLoading, setEditLoading] = React.useState(false);
  const [experience, setExperience] = React.useState('');
  const [timeSchedule,setTimeSchedule] = React.useState();
  

  const fetchProfileInfo = async () => {
    setLoading(true);
    let res = await getData(`dolo/profile/${user?.userid}`);
    console.log(`dolo/profile/${user?.userid}`, JSON.stringify(res));
    if (res.status) {
      // console.log(res);
      setProfileData(res?.data);
      calculateExperience(res?.data?.experience)
     
    }
    setLoading(false);
  };

   const calculateExperience = async (experience) => {
    
  

      var d = new Date();
  
      var userday = new Date(experience.split('-').reverse().join("-")).getDate();
      var usermonth = new Date(experience.split('-').reverse().join("-")).getMonth();
      var useryear = new Date(experience.split('-').reverse().join("-")).getFullYear();
  
      var curday = d.getDate();
      var curmonth = d.getMonth() + 1;
      var curyear = d.getFullYear();
  
      var exp = curyear - useryear;
  
      if (curmonth < usermonth || (curmonth == usermonth && curday < userday)) {
        exp--;
      }
     console.log('expppp==',exp)
      return setExperience(exp);


   }

   const getTimeSchedule = async () => {
    //  setLoading(true);
    let result = await getData(`scheduleprofile/${user?.userid}`);
    if (result.message == 'Successully') {
      setTimeSchedule(result?.data[0]);
    }
  };


 
  useEffect(() => {
    fetchProfileInfo();
    getTimeSchedule();
  }, []);


  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      // The screen is focused
      // Call any action
      fetchProfileInfo();
      getTimeSchedule();
    });

    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, [navigation]);

  const logOut = () => {
    dispatch({type: 'LOGOUT'});

    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{name: 'Auth'}],
      }),
    );
  };

  return (
   
    <View style={styles.container}>
      {/* <Menu renderer={renderers.SlideInMenu} style={styles.dots}>
        <MenuTrigger>
          <MaterialCommunityIcons
            name="dots-vertical"
            size={32}
            color={Color.black}
          />
        </MenuTrigger>
        <MenuOptions
          optionsContainerStyle={{
            // height: Dimension.window.height * 0.5,
            justifyContent: 'flex-end',
          }}
          customStyles={{
            optionText: {
              color: Color.black,
              fontSize: 15,
              fontFamily: Fonts.primaryBold,
            },
            optionWrapper: {
              padding: 20,
            },
          }}>
          <MenuOption
            customStyles={{
              optionText: {
                color: Color.white,
                fontSize: 15,
                fontFamily: Fonts.primaryBold,
              },
              optionWrapper: {
                padding: 20,
                backgroundColor: 'red',
              },
            }}
            onSelect={() => logOut()}
            text="Logout"
          />
        </MenuOptions>
      </Menu> */}
      
      <View style={styles.imageView}>
        {loading ? (
          <ProfilePlaceholder />
        ) : (
          <>
            <Avatar.Image
              size={100}
              source={{
                uri: profileData?.profileimage
                  ? profileData?.profileimage.length > 20
                    ? `data:image/png;base64,${profileData?.profileimage}`
                    : `https://rapidhealth.me/assets/doctor/${profileData?.profileimage}`
                  : 'https://www.w3schools.com/w3images/avatar6.png',
              }}
              style={styles.image}
            />
            <View style={{marginTop:10}}>
            <Button
              mode="contained"
             onPress={() => navigation.navigate('UpdateProfile')}
              color={Color.primary}
              dark
              labelStyle={{
                fontSize: 12,
                fontFamily: 'Poppins-Regular',
                lineHeight: 12 * 1.4,
              }}>
              Update Profile
            </Button>
            </View>
            <Text style={{...styles.imageText, color: Color.primary}}>
             Dr. {profileData?.name}
            </Text>
            <View style={{flexDirection:'row',alignItems:"center"}}>
            {/* {profileData?.specialization &&
            profileData?.specialization.map((item,index) => {

            return ( 
              <Text style={{color: '#000', fontFamily: Fonts.primaryRegular}}>
              
              {index<(profileData?.specialization?.length-1) ? (item+','):(item)}
           
            </Text>
            );

            } )} */}

         <Text style={{color: '#000', fontFamily: Fonts.primaryRegular}}>
              {profileData?.specialization}
          
           
            </Text>
          
            </View>
            <Text
              style={{
                fontFamily: Fonts.primaryBold,
                fontSize: 15,
                color: '#000',
              }}>
              Joined {profileData?.approve_date}
            </Text>
          </>
        )}
      </View>
      {loading ? (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            height: Dimension.window.height * 0.5,
          }}>
          <ActivityIndicator size="large" color="#25CCF7" />
        </View>
      ) : (
        <ScrollView
          style={styles.profileContainer}
          contentContainerStyle={{
            padding: 20,
          }}
          showsVerticalScrollIndicator={false}
          >
          <Text style={styles.imageText}>Your Profile</Text>
          <View
            style={{
              flexDirection: 'row',
            }}>
            <View
              style={{
                ...styles.card,
                backgroundColor: Color.white,
                width: '48.5%',
              }}>
              <Text style={{...styles.cardTitle}}>DOLO Id</Text>
              <View style={styles.cardContent}>
                <Text style={{...styles.cardText}}>
                  {profileData?.do_lo_id}
                </Text>
              </View>
            </View>
            <View
              style={{
                ...styles.card,
                backgroundColor: Color.white,
                width: '48.5%',
              }}>
              <Text style={{...styles.cardTitle}}>Registration No.</Text>
              <View style={styles.cardContent}>
                <Text style={{...styles.cardText}}>
                  {profileData?.registration_number}
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
                width: '48.5%',
              }}>
              <Text style={{...styles.cardTitle}}>Gender</Text>
              <View style={styles.cardContent}>
                <Text style={{...styles.cardText}}>{profileData?.gender}</Text>
              </View>
            </View>
            <View
              style={{
                ...styles.card,
                backgroundColor: Color.white,
                width: '48.5%',
              }}>
              <Text style={{...styles.cardTitle}}>Aadhar</Text>
              <View style={styles.cardContent}>
                <Text style={{...styles.cardText}}>{profileData?.adhar}</Text>
              </View>
            </View>
          </View>
          <View style={{...styles.card, backgroundColor: Color.white}}>
            <Text style={{...styles.cardTitle}}>Email</Text>
            <View style={styles.cardContent}>
              <Text style={{...styles.cardText}}>{profileData?.email}</Text>
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
                width: '48.5%',
              }}>
              <Text style={{...styles.cardTitle}}>Marital Status</Text>
              <View style={styles.cardContent}>
                <Text style={{...styles.cardText}}>
                  {profileData?.marital_status}
                </Text>
              </View>
            </View>
            <View
              style={{
                ...styles.card,
                backgroundColor: Color.white,
                width: '48.5%',
              }}>
              <Text style={{...styles.cardTitle}}>DOB</Text>
              <View style={styles.cardContent}>
                <Text style={{...styles.cardText}}>
                  {profileData?.date_of_birth}
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
                width: '48.5%',
              }}>
              <Text style={{...styles.cardTitle}}>Doctor Contact</Text>
              <View style={styles.cardContent}>
                <Text style={{...styles.cardText}}>
                  {profileData?.doctorContact}
                </Text>
              </View>
            </View>
            <View
              style={{
                ...styles.card,
                backgroundColor: Color.white,
                width: '48.5%',
              }}>
              <Text style={{...styles.cardTitle}}>Clinic Contact</Text>
              <View style={styles.cardContent}>
                <Text style={{...styles.cardText}}>
                  {profileData?.clinic_contact}
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
                width: '48.5%',
              }}>
              <Text style={{...styles.cardTitle}}>Average Time per patient(minutes)</Text>
              <View style={styles.cardContent}>
                <Text style={{...styles.cardText}}>
                  {profileData?.avgTime} 
                </Text>
              </View>
            </View>
            <View
              style={{
                ...styles.card,
                backgroundColor: Color.white,
                width: '48.5%',
              }}>
              <Text style={{...styles.cardTitle}}>Experience</Text>
              <View style={styles.cardContent}>
                <Text style={{...styles.cardText}}>
                 {experience} Year
                </Text>
              </View>
            </View>
          </View>
          <View style={{...styles.card, backgroundColor: Color.white}}>
            <Text style={{...styles.cardTitle}}>
              Fee Consultation through App
            </Text>
            <View style={styles.cardContent}>
              <Text style={{...styles.cardText}}>
                {profileData?.feeconsultation == '1' ? 'Yes' : 'No'}
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
                
              }}>
              <Text style={{...styles.cardTitle}}>Location</Text>
              <View style={styles.cardContent}>
                <Text style={{...styles.cardText}}>
                  {profileData?.location}
                </Text>
              </View>
            </View>
            {/* <View
              style={{
                ...styles.card,
                backgroundColor: Color.white,
                width: '48.5%',
              }}>
              <Text style={{...styles.cardTitle}}>Languages</Text>
              <View style={styles.cardContent}>
                <Text style={{...styles.cardText}}>
                  {profileData?.languages}
                </Text>
              </View>
            </View> */}
          </View>
          <View style={{...styles.card, backgroundColor: Color.white}}>
            <Text style={{...styles.cardTitle}}>Facilities</Text>
            <View style={styles.cardContent}>
              <Text style={{...styles.cardText}}>
                {profileData?.facilities}
              </Text>
            </View>
          </View>
          <View style={{...styles.card, backgroundColor: Color.white}}>
            <Text style={{...styles.cardTitle}}>Clinic Locations</Text>
            <View style={styles.cardContent}>
              {profileData?.clinic_location &&
                profileData?.clinic_location.map((item, index) => {
                  return (
                    <>
                      <Text style={{...styles.cardText}} key={index}>
                        {item}
                      </Text>
                      {index != profileData?.clinic_location.length - 1 ? (
                        <Text style={{...styles.cardText}}>,</Text>
                      ) : null}
                    </>
                  );
                })}
            </View>
          </View>
          {/* <View style={{...styles.card, backgroundColor: Color.white}}>
            <Text style={{...styles.cardTitle}}>Clinic Schedule</Text>
            <View>
              {profileData?.schedule &&
                profileData?.schedule.map(
                  (item, index) =>
                    item.checked && (
                      <View
                        key={index}
                        style={{
                          flexDirection: 'row',
                          flexWrap: 'wrap',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          paddingVertical: 5,
                        }}>
                        <View
                          style={{flexDirection: 'row', alignItems: 'center'}}>
                          <Text
                            style={{
                              color: '#000',
                              fontFamily: Fonts.primaryRegular,
                              marginHorizontal: 5,
                            }}>
                            {item.day}
                          </Text>
                        </View>
                        <View
                          style={{flexDirection: 'row', alignItems: 'center'}}>
                          <Text
                            style={{
                              color: item.checked ? Color.black : '#ccc',
                              fontSize: 16,
                              fontFamily: Fonts.primaryRegular,
                            }}>
                            {new Date(item.start_time)
                              .toLocaleTimeString()
                              .replace(
                                new Date(item.start_time)
                                  .toLocaleTimeString()
                                  .slice(-6, -3),
                                '',
                              )}
                          </Text>
                          <Text
                            style={{
                              marginHorizontal: 20,
                              fontFamily: Fonts.primaryRegular,
                              color: item.checked ? Color.black : '#ccc',
                            }}>
                            -
                          </Text>
                          <Text
                            style={{
                              color: item.checked ? Color.black : '#ccc',
                              fontSize: 16,
                              fontFamily: Fonts.primaryRegular,
                            }}>
                            {new Date(item.end_time)
                              .toLocaleTimeString()
                              .replace(
                                new Date(item.end_time)
                                  .toLocaleTimeString()
                                  .slice(-6, -3),
                                '',
                              )}
                          </Text>
                        </View>
                      </View>
                    ),
                )}
            </View>
          </View> */}

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
          <View style={{...styles.card, backgroundColor: Color.white}}>
            <Text style={{...styles.cardTitle}}>Academic Information</Text>
            <View style={styles.cardContent}>
              {profileData?.Degree && (
                <Text style={{...styles.cardText}}>
                  {profileData?.Degree},{' '}
                </Text>
              )}
              {profileData?.collegename && (
                <Text style={{...styles.cardText}}>
                  {profileData?.collegename},{' '}
                </Text>
              )}
              {profileData?.year_of_passout && (
                <Text style={{...styles.cardText}}>
                  {profileData?.year_of_passout}
                </Text>
              )}
            </View>
          </View>
          <View style={{...styles.card, backgroundColor: Color.white}}>
            <Text style={{...styles.cardTitle}}>Awards</Text>
            {profileData?.award_list.map(item => {
              return (
                <View style={styles.cardContent}>
                  {item?.award_name && (
                    <Text style={{...styles.cardText}}>
                      {item?.award_name},{' '}
                    </Text>
                  )}
                  <Text style={{...styles.cardText}}>
                    {item?.award_giving_authority_name}
                  </Text>
                </View>
              );
            })}
          </View>
          <View style={{...styles.card, backgroundColor: Color.white}}>
            <Text style={{...styles.cardTitle}}>Certificates</Text>
            {profileData?.certList.map(item => {
              return (
                <View style={styles.cardContent}>
                  <Text style={{...styles.cardText}}>
                    {item}
                    {profileData?.certList?.length > 1 && ', '}
                  </Text>
                </View>
              );
            })}
          </View>
          <View style={{...styles.card, backgroundColor: Color.white}}>
            <Text style={{...styles.cardTitle}}>Achievements</Text>
            {profileData?.achievementList.map(item => {
              return (
                <View style={styles.cardContent}>
                  {item?.achievement_specialization && (
                    <Text style={{...styles.cardText}}>
                      {item?.achievement_specialization},{' '}
                    </Text>
                  )}
                  <Text style={{...styles.cardText}}>
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
    alignItems: 'center',
  },
  imageView: {
    // height: '35%',
    width: '100%',
    paddingVertical: 10,
    // borderBottomLeftRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    // borderBottomRightRadius: 25,
    // backgroundColor: Color.white,
    // elevation: 10,
  },
  image: {
    elevation: 8,
  },
  imageText: {
    marginTop: 10,
    fontSize: 20,
    color: '#fff',
    fontFamily: Fonts.primaryBold,
    textShadowColor: Color.gray,
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 1,
  },
  profileContainer: {
    width: '100%',
    backgroundColor: Color.primary,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    elevation: 10,
  },
  card: {
    flexDirection: 'column',
    marginTop: 10,
    marginLeft: 5,
    backgroundColor: Color.white,
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 10,
    shadowColor: '#00000050',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 14,
    color: Color.black,
    fontFamily: 'Poppins-Regular',
  },
  cardContent: {
    flexDirection: 'row',
  },
  cardText: {
    fontSize: 16,
    color: Color.black,
    fontFamily: 'Poppins-Medium',
  },
  dots: {
    position: 'absolute',
    right: 12,
    top: 10,
    zIndex: 10,
    color: Color.white,
  },
  timing_card_style: {
    marginLeft: 8,
    marginTop: 10,
    backgroundColor: Color.white,
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
    shadowColor: Color.white,
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
