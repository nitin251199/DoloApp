import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {Color, Fonts} from '../theme';
import {useDispatch, useSelector} from 'react-redux';
import {Avatar} from 'react-native-paper';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {successToast} from '../components/toasts';
import {
  Menu,
  MenuOption,
  MenuOptions,
  MenuTrigger,
} from 'react-native-popup-menu';
import { CommonActions } from '@react-navigation/native';

export default function HomeScreen({navigation}) {
  const user = useSelector(state => state.user);

  const [available, setAvailable] = React.useState(false);

  const dispatch = useDispatch();

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
      <View style={styles.topContainer}>
        <View style={{flex: 1}}>
          <Text style={styles.topText}>
            {user?.username &&
              user?.username.charAt(0).toUpperCase() + user?.username.slice(1)}
          </Text>
          <Text
            style={{
              color: Color.black,
              fontFamily: Fonts.primaryRegular,
              fontSize: 12,
              lineHeight: 12 * 1.4,
            }}>
            Under:{/* {profileData?.do_lo_id} */} dolo id
          </Text>
        </View>
        <Menu>
          <MenuTrigger>
            <Avatar.Image
              size={45}
              source={{
                uri:
                  //  profileData?.profileimage
                  //   ? profileData?.profileimage.length > 20
                  //     ? `data:image/png;base30,${profileData?.profileimage}`
                  //     : `https://rapidhealth.me/assets/doctor/${profileData?.profileimage}`
                  //   :
                  'https://www.w3schools.com/w3images/avatar6.png',
              }}
            />
          </MenuTrigger>
          <MenuOptions
            optionsContainerStyle={
              {
                // height: Dimension.window.height * 0.5,
                //   justifyContent: 'flex-end',
              }
            }
            customStyles={{
              optionText: {
                color: Color.black,
                fontSize: 15,
                fontFamily: Fonts.primaryBold,
              },
              optionWrapper: {
                // padding: 20,
              },
            }}>
            <MenuOption
              customStyles={{
                optionText: {
                  color: '#000',
                  fontFamily: Fonts.primaryRegular,
                  lineHeight: 14 * 1.4,
                },
                optionWrapper: {
                  padding: 15,
                  //   backgroundColor: 'red',
                },
              }}
              onSelect={() => navigation.navigate('AssistantProfile')}
              text="Your profile"
            />
            <MenuOption
              customStyles={{
                optionText: {
                  color: 'red',
                  fontFamily: Fonts.primaryRegular,
                  lineHeight: 14 * 1.4,
                },
                optionWrapper: {
                  padding: 15,
                  //   backgroundColor: 'red',
                },
              }}
              onSelect={() => logOut()}
              text="Logout"
            />
          </MenuOptions>
        </Menu>
      </View>
      <View style={styles.mainContainer}>
        <ScrollView style={styles.cardContainer}>
          <TouchableOpacity
            activeOpacity={0.5}
            style={styles.addContainer}
            onPress={() => navigation.navigate('AddPatient')}>
            <MaterialIcons
              name="add-box"
              size={30}
              color={Color.white}
              style={styles.addIcon}
            />
            <Text style={styles.addText}>ADD NEW PATIENT</Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.5}
            style={styles.addContainer}
            onPress={() => navigation.navigate('Queue')}>
            <MaterialIcons
              name="people"
              size={30}
              color={Color.white}
              style={styles.addIcon}
            />
            <Text style={styles.addText}>PATIENT’S QUEUE</Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.5}
            style={styles.addContainer}
            onPress={() => navigation.navigate('UploadPrescription')}>
            <MaterialCommunityIcons
              name="file-upload"
              size={30}
              color={Color.white}
              style={styles.addIcon}
            />
            <Text style={styles.addText}>UPLOAD PRESCRIPTION</Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.5}
            style={styles.addContainer}
            onPress={() => navigation.navigate('AddAssistant')}>
            <MaterialIcons
              name="person-pin"
              size={30}
              color={Color.white}
              style={styles.addIcon}
            />
            <Text style={styles.addText}>ENGAGEMENT STATUS</Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.5}
            style={{
              ...styles.addContainer,
              backgroundColor: available ? 'green' : 'red',
            }}
            onPress={() => {
              setAvailable(prev => !prev);
              successToast('Status updated successfully !');
            }}>
            <MaterialCommunityIcons
              name={available ? 'check-circle' : 'close-circle'}
              size={30}
              color={Color.white}
              style={styles.addIcon}
            />
            <Text style={styles.addText}>AVAILABLE NOW</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mainContainer: {
    elevation: 10,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingTop: 15,
    flex: 1,
    backgroundColor: '#fff',
  },
  cardContainer: {
    paddingHorizontal: 10,
    flex: 1,
  },
  topContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 30,
    paddingVertical: 25,
    width: '100%',
    alignSelf: 'center',
    // borderBottomLeftRadius: 50,
    // borderBottomRightRadius: 50,
    // elevation: 10,
    // backgroundColor: 'transparent',
    alignItems: 'center',
  },
  topText: {
    fontSize: 20,
    lineHeight: 20 * 1.4,
    fontFamily: Fonts.primarySemiBold,
    color: Color.black,
  },
  menuIcon: {
    marginRight: 15,
  },
  addContainer: {
    backgroundColor: Color.primary,
    borderRadius: 20,
    padding: 20,
    margin: 10,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 10,
    shadowColor: Color.black,
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  addIcon: {
    fontWeight: '800',
  },
  addText: {
    fontSize: 18,
    fontFamily: Fonts.primarySemiBold,
    color: Color.white,
    marginTop: 10,
  },
});
