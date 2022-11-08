import {Alert, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import RBSheet from 'react-native-raw-bottom-sheet';
import {Avatar, Button, TextInput} from 'react-native-paper';
import {Color, Dimension, Fonts} from '../../theme';
import {useEffect} from 'react';
import ImagePicker from 'react-native-image-crop-picker';

export default EditAssistant = React.forwardRef((props, ref) => {
  const {item, handleEdit, loading} = props;

  const theme = {colors: {text: '#000', background: '#aaaaaa50'}}; // for text input

  const [name, setName] = React.useState('');
  const [mobile, setMobile] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [address, setAddress] = React.useState('');
  const [gender, setGender] = React.useState(
    item?.gender?.toLowerCase() || 'male',
  );
  const [password, setPassword] = React.useState('');
  const [profilePic, setProfilePic] = React.useState('');

  useEffect(() => {
    setName(item?.name || '');
    setMobile(item?.mobile || '');
    setEmail(item?.email || '');
    setAddress(item?.address || '');
    setPassword(item?.password || '');
    setProfilePic(item?.profileimage || '');
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
      <View
        style={{
          paddingHorizontal: 30,
          paddingVertical: 20,
        }}>
        <View>
          <Text style={{...styles.sheetTitle, color: Color.primary}}>
            Edit the assistant details
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
            <View style={{marginRight: 10, flex: 1}}>
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
            </View>
            <View style={{flex: 1}}>
              <Text style={styles.label}>Mobile</Text>
              <TextInput
                theme={theme}
                dense
                onChangeText={text => setMobile(text)}
                value={mobile}
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
              <Text style={styles.label}>Email</Text>
              <TextInput
                theme={theme}
                dense
                onChangeText={text => setEmail(text)}
                value={email}
                mode="flat"
                underlineColor="#000"
                activeUnderlineColor={Color.primary}
              />
            </View>
            <View style={{flex: 1}}>
              <Text style={styles.label}>Address</Text>
              <TextInput
                theme={theme}
                dense
                onChangeText={text => setAddress(text)}
                value={address}
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
});
