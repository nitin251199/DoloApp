import {
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getData} from '../API';
import {Color, Fonts} from '../theme';
import {Avatar, IconButton} from 'react-native-paper';
import {
  Menu,
  MenuOption,
  MenuOptions,
  MenuTrigger,
} from 'react-native-popup-menu';
import {useTranslation} from 'react-i18next';
import { CommonActions } from '@react-navigation/native';
import Fontisto from 'react-native-vector-icons/Fontisto'

export default function AppHeader(props) {
  const user = useSelector(state => state.user);

  const {navigation} = props;

  const {t} = useTranslation();

  const dispatch = useDispatch();

  //   console.log(navigation.getParent());

  const [profileData, setProfileData] = React.useState();
  const [notificationCount, setNotificationCount] = React.useState(0);
  const fetchProfileInfo = async () => {
    let res = await getData(`dolo/profile/${user?.userid}`);
    console.log('headres==',res)
    if (res.status) {
      setProfileData(res.data);
    }
  };

  useEffect(() => {
    fetchProfileInfo();
    
  }, []);

  useEffect(() => {
    setInterval(() => {
    getNotificationCount();
   }, 10000);
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

  const getNotificationCount = async() =>{
    const res = await getData(`notificationdoctorcount/${user?.userid}`);
    if(res?.success){
      setNotificationCount(res?.doctor);
    }
  }

  return (
    <View style={styles.topContainer}>
      <StatusBar backgroundColor={Color.white} barStyle="dark-content" />
      <IconButton
        icon="menu"
        onPress={() => navigation.openDrawer()}
        size={30}
        color={Color.black}
        style={styles.menuIcon}
      />
      <View style={{flex: 1,width:'75%'}}>
        <Text style={styles.topText}>
          Dr.{' '}
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
          {profileData?.do_lo_id}
        </Text>
      </View>
      <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between',width:'25%'}}>
      <Menu>
        <MenuTrigger>
          <Avatar.Image
            size={45}
            source={{
              uri: profileData?.profileimage
                ? profileData?.profileimage.length > 20
                  ? `data:image/png;base64,${profileData?.profileimage}`
                  : `https://rapidhealth.me/assets/doctor/${profileData?.profileimage}`
                : 'https://www.w3schools.com/w3images/avatar6.png',
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
            onSelect={() => navigation.navigate('Profile')}
            text={t('header.your_profile')}
          />
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
            onSelect={() => navigation.navigate('Settings')}
            text={t('header.settings')}
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
            text={t('header.logout')}
          />
        </MenuOptions>
      </Menu>
      <TouchableOpacity onPress={() =>navigation.navigate('Notification')}>
        {
          notificationCount > 0 &&
          <View
              style={{
                width: 8,
                height: 8,
                backgroundColor: 'red',
                borderRadius: 15 / 2,
                position: 'absolute',
                bottom: 20,
                right: 13,
              }}></View>
        }
      <Fontisto name="bell" size={25} color={Color.black} />
     
      </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  topContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 30,
    paddingVertical: 5,
    width: '110%',
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
});
