import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect} from 'react';
import {useSelector} from 'react-redux';
import {getData} from '../API';
import {Color, Fonts} from '../theme';
import { Avatar, IconButton } from 'react-native-paper';


export default function AppHeader(props) {
  const user = useSelector(state => state.user);

  const {navigation} = props;

//   console.log(navigation.getParent());

  const [profileData, setProfileData] = React.useState();

  const fetchProfileInfo = async () => {
    let res = await getData(`dolo/profile/${user?.userid}`);
    if (res.status) {
      setProfileData(res.data);
    }
  };

  useEffect(() => {
    fetchProfileInfo();
  }, []);

  return (
    <View style={styles.topContainer}>
      <IconButton
        icon="menu"
        onPress={() => navigation.openDrawer()}
        size={30}
        color={Color.black}
        style={styles.menuIcon}
      />
      <View style={{flex: 1}}>
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
      <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
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
      </TouchableOpacity>
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
