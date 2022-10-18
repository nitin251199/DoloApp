import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect} from 'react';
import {Color, Dimension, Fonts} from '../theme';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Avatar} from 'react-native-paper';
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
import {dummyProfile} from './test';

export default function ProfileScreen({navigation}) {
  const dispatch = useDispatch();

  const user = useSelector(state => state.user);

  const [profileData, setProfileData] = React.useState();
  const [loading, setLoading] = React.useState(false);

  const fetchProfileInfo = async () => {
    setLoading(true);
    // let res = await getData(`agent/${user?.userid}`);
    // console.log(`agent/${user?.userid}`);
    // if (res.status) {
    //   console.log(res);
    //   setProfileData(res.agent);
    // }
    setTimeout(() => {
      setProfileData(dummyProfile);
      setLoading(false);
    }, 200);
  };

  useEffect(() => {
    fetchProfileInfo();
  }, []);

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
      <Menu renderer={renderers.SlideInMenu} style={styles.dots}>
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
      </Menu>
      <View style={styles.imageView}>
        {loading ? (
          <ProfilePlaceholder />
        ) : (
          <>
            <Avatar.Image
              size={100}
              source={{
                uri: profileData?.profileimage
                  ? profileData?.profileimage
                  : 'https://www.w3schools.com/w3images/avatar6.png',
              }}
              style={styles.image}
            />
            {/* <Avatar.Icon
              size={40}
              icon="pencil"
              style={{
                backgroundColor: Color.gray,
                position: 'absolute',
                left: '52%',
                top: '38%',
                elevation: 10,
              }}
            /> */}
            <Text style={{...styles.imageText, color: '#fff'}}>
              {profileData?.name}
            </Text>
            <Text style={{color: '#000', fontFamily: Fonts.primaryRegular}}>
              {profileData?.specialization}
            </Text>
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
            paddingBottom: 20,
          }}>
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
                  {profileData?.registrationNo}
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
                  {profileData?.clinicContact}
                </Text>
              </View>
            </View>
          </View>
          <View style={{...styles.card, backgroundColor: Color.white}}>
            <Text style={{...styles.cardTitle}}>Average Time per patient</Text>
            <View style={styles.cardContent}>
              <Text style={{...styles.cardText}}>{profileData?.avgTime}</Text>
            </View>
          </View>
          <View style={{...styles.card, backgroundColor: Color.white}}>
            <Text style={{...styles.cardTitle}}>
              Fee Consultation through App
            </Text>
            <View style={styles.cardContent}>
              <Text style={{...styles.cardText}}>
                {profileData?.feeConsultation ? 'Yes' : 'No'}
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
                width: '48.5%',
              }}>
              <Text style={{...styles.cardTitle}}>Location</Text>
              <View style={styles.cardContent}>
                <Text style={{...styles.cardText}}>
                  {profileData?.location}
                </Text>
              </View>
            </View>
            <View
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
            </View>
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
            <Text style={{...styles.cardTitle}}>CLinic Locations</Text>
            <View style={styles.cardContent}>
              <Text style={{...styles.cardText}}>
                {profileData?.clinicLocations}
              </Text>
            </View>
          </View>
          <View style={{...styles.card, backgroundColor: Color.white}}>
            <Text style={{...styles.cardTitle}}>Clinic Schedule</Text>
            <View>
              {profileData?.clinicSchedule &&
                profileData?.clinicSchedule.map(
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
          </View>
          <View style={{...styles.card, backgroundColor: Color.white}}>
            <Text style={{...styles.cardTitle}}>Academic Information</Text>
            <View>
              {profileData?.education_details.map((item, index) => {
                return (
                  <View key={index}>
                    <Text style={{...styles.cardText}}>
                      {item?.class && item?.class + ', '}
                      {item?.Institue && item?.Institue + ', '}
                      {item?.Address && item?.Address + ', '}
                      {item?.Yearofpassout && item?.Yearofpassout}
                    </Text>
                  </View>
                );
              })}
            </View>
          </View>
          <View style={{...styles.card, backgroundColor: Color.white}}>
            <Text style={{...styles.cardTitle}}>Awards</Text>
            {profileData?.awardList.map(item => {
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
    paddingVertical: 20,
    borderBottomLeftRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomRightRadius: 25,
    backgroundColor: Color.primary,
    elevation: 10,
  },
  image: {
    elevation: 8,
  },
  imageText: {
    marginTop: 25,
    fontSize: 20,
    color: '#000',
    fontFamily: Fonts.primaryBold,
    textShadowColor: Color.gray,
    textShadowOffset: {width: 0.5, height: 0.5},
    textShadowRadius: 1,
  },
  profileContainer: {
    width: '100%',
    paddingHorizontal: 20,
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
    top: 20,
    zIndex: 10,
    color: Color.white,
  },
});
