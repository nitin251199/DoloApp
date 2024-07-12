import {Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View,Image,ActivityIndicator} from 'react-native';
import React from 'react';
import RBSheet from 'react-native-raw-bottom-sheet';

import {Color, Dimension, Fonts} from '../../theme';
import { postData } from '../../API';
import {useEffect} from 'react';

import {Button, Checkbox} from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import DocProfilePlaceholder from '../../placeholders/DocProfilePlaceholder';


export default AppointmentDetails = React.forwardRef((props, ref) => {
  const {item,loading} = props;
  


 

  const theme = {colors: {text: '#000', background: '#aaaaaa50'}}; // for text input

  const [currentAge, setCurrentAge] = React.useState('');
  const [status, setStatus] = React.useState(''); 


  const getAge = () => {
    const {item,loading} = props;

    console.log('item-->',item)
 
    var d = new Date();
    var dates = item?.age.split('/');
    var userday = dates[0];
    var usermonth = dates[1];
    var useryear = dates[2];
  
    var curday = d.getDate();
    var curmonth = d.getMonth()+1;
    var curyear = d.getFullYear();

    var age = curyear - useryear;

    if((curmonth < usermonth) || ( (curmonth == usermonth) && curday < userday )){

        age--;

    }
   
    return setCurrentAge(age);
}

const getStatus = (status) => {
  if(status === 0){
    setStatus('Pending')
  }
  if(status === 2){
    setStatus('Done')
  }
  if(status === 3){
    setStatus('Absent')
  }
}

useEffect(() => {
//getAge();
const {item,loading} = props;
  getStatus(item.status);

}, [item]);

   return (
   
    <RBSheet
      ref={ref}
     closeOnDragDown={false}
      closeOnPressMask={true}
      customStyles={{
        wrapper: {
          backgroundColor: 'transparent',
        },
        draggableIcon: {
           backgroundColor: Color.gray,
        },
        container: {
          backgroundColor: Color.white,
          borderTopLeftRadius: 25,
          borderTopRightRadius: 25,
        },
      }}
      height={Dimension.window.height * 0.8}>
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
                uri: item?.profileimage
                  ? item.profileimage.length > 20
                    ? `data:image/png;base64,${item.profileimage}`
                    : item.profileimage
                  : 'https://www.w3schools.com/w3images/avatar6.png',
              }}
              style={styles.image}
            />
            <View style={styles.profileDetails}>
              <Text style={styles.doctorName}>
                {item?.patient_name}
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
                  <Text style={styles.ratingStat}>{item?.token_no}</Text>
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

          }} showsVerticalScrollIndicator={false}>
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
                {new Date(item.created_at).getDate()}/
                  {new Date(item.created_at).getMonth()}/
                  {new Date(item.created_at).getFullYear()}
               
                </Text>
              </View>
              <View>
                <Text style={{...styles.cardText}}>
                  {new Date(item?.created_at).toLocaleTimeString()}
                
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
                <Text style={{...styles.cardText}}>{status}</Text>
              </View>
            </View>
          </View>
          <View style={{...styles.card, backgroundColor: Color.white}}>
            <Text style={{...styles.cardTitle}}>Patient Problem</Text>
            <View style={styles.cardContent}>
              <Text style={{...styles.cardText}}>
                {item?.category}
              </Text>
            </View>
          </View>
          <View style={{...styles.card, backgroundColor: Color.white}}>
            <Text style={{...styles.cardTitle}}>Patient Weight</Text>
            <View style={styles.cardContent}>
              <Text style={{...styles.cardText}}>
                {item?.weight} {item?.weighttype}
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
                  {/* {currentAge} Years */}
               { item?.agevalue}
                </Text>
              </View>
            </View>
            {/* <View
              style={{
                ...styles.card,
                backgroundColor: Color.white,
                flex: 1,
              }}>
              <Text style={{...styles.cardTitle}}>Sex</Text>
              <View style={styles.cardContent}>
                <Text style={{...styles.cardText}}>
                  {item?.gender.charAt(0).toUpperCase() +
                    item?.gender.slice(1)}
                </Text>
              </View>
            </View> */}
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

          {item.prescription && item.prescription.map((i, index) => {
            return (
              <FeedbackCard 
            //    onEdit={ () =>navigation.navigate('FeedbackDetails',{
            //     desc:item.description != null ? item.description : 'Perscription',
            //     date: new Date(item.date).toDateString().slice(3),
            //     img:item.prescription,
            //   })}
              date={new Date(item.date).toDateString().slice(3)}
              source={{uri: `data:image/png;base64,${i?.prescription[0]}`}}
              description={i.description != null ? i.description : 'Perscription' }
             // onDelete={ () => deleteFeedback(item.id)}
              />
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
    </RBSheet>
   
  );
 
});

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
