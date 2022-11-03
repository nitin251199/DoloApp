import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {Color, Fonts} from '../theme';
import SuccessModal from '../components/modals/SuccessModal';
import {Avatar, Button, TextInput} from 'react-native-paper';
import {postData} from '../API';
import ImagePicker from 'react-native-image-crop-picker';
import {useSelector} from 'react-redux';

export default function AddAssistant({navigation}) {
  const theme = {colors: {text: '#000', background: '#aaaaaa50'}}; // for text input

  const user = useSelector(state => state.user);

  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [gender, setGender] = React.useState('Male');
  const [address, setAddress] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [profilePic, setProfilePic] = React.useState('');

  const [showModal, setShowModal] = React.useState(false);

  const [loading, setLoading] = React.useState(false);
  const _scrollRef = React.useRef(null);

  const onPrimaryPress = () => {
    setName('');
    setEmail('');
    setGender('Male');
    setAddress('');
    setPassword('');
    setProfilePic('');
    setShowModal(false);
    _scrollRef.current.scrollTo({x: 0, y: 0, animated: true});
  };

  const takePhotoFromCamera = () => {
    ImagePicker.openCamera({
      compressImageMaxWidth: 300,
      compressImageMaxHeight: 300,
      cropping: true,
      compressImageQuality: 0.7,
      includeBase64: true,
    }).then(image => {
      setProfilePic(image);
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
      setProfilePic(image);
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

  const onSubmit = async () => {
    setLoading(true);
    var body = {
      name,
      email,
      doctor_id: user.userid,
      gender,
      address,
      password,
      assistantimage: profilePic?.data,
    };
    const result = await postData('doctorassistant', body);
    console.log('result', result);
    if (result.success) {
      setShowModal(true);
    }
    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <SuccessModal
        visible={showModal}
        onRequestClose={() => setShowModal(false)}
        title="Assistant Added Successfully"
        primaryBtnText="Add More"
        onPrimaryPress={() => onPrimaryPress()}
        secondaryBtnText="Go Back"
        onSecondaryPress={() => {
          setShowModal(false);
          navigation.goBack();
        }}
      />
      <View style={{flexDirection: 'row', padding: 20}}>
        <Text style={styles.title}>Create Assistant Profile 📝</Text>
      </View>
      <ScrollView
        ref={_scrollRef}
        style={styles.form}
        keyboardShouldPersistTaps="always">
        <View>
          <Text style={styles.sectionTitle}>Personal Details</Text>

          <View style={{alignSelf: 'center'}}>
            <Avatar.Image
              size={100}
              style={{alignSelf: 'center'}}
              source={{
                uri: profilePic?.path
                  ? profilePic?.path
                  : 'https://www.w3schools.com/w3images/avatar6.png',
                // uri: 'https://www.w3schools.com/w3images/avatar6.png',
              }}
            />
            <Button
              color={Color.primary}
              onPress={() => selectProfilePic()}
              style={{
                margin: 10,
                borderColor: Color.primary,
              }}
              mode="outlined">
              Add Profile Pic*
            </Button>
          </View>
          <Text
            style={{
              color: Color.red,
              fontSize: 12,
              fontFamily: Fonts.primaryRegular,
              marginVertical: 10,
            }}>
            All fields markrd with * is required to fill.
          </Text>
          <Text style={styles.label}>Name*</Text>
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
        <View style={{marginTop: 15}}>
          <Text style={styles.label}>Gender</Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: 5,
            }}>
            <TouchableOpacity
              onPress={() => setGender('Male')}
              style={{
                ...styles.radioStyle,
                backgroundColor:
                  gender == 'Male' ? `${Color.primary}50` : '#aaaaaa50',
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
              onPress={() => setGender('Female')}
              style={{
                ...styles.radioStyle,
                backgroundColor:
                  gender == 'Female' ? `${Color.primary}50` : '#aaaaaa50',
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
              onPress={() => setGender('Others')}
              style={{
                ...styles.radioStyle,
                backgroundColor:
                  gender == 'Others' ? `${Color.primary}50` : '#aaaaaa50',
                marginLeft: 5,
              }}>
              <Text
                style={{
                  color: '#000',
                  fontFamily: Fonts.primaryRegular,
                  lineHeight: 14 * 1.5,
                }}>
                Others
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{marginTop: 15}}>
          <Text style={styles.label}>Email*</Text>
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
        <View style={{marginTop: 15}}>
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
        {/* <View
          style={{
            flexDirection: 'row',
            marginTop: 15,
          }}>
          <View style={{marginRight: 10, flex: 1}}>
            <Text style={styles.label}>Aadhar Number</Text>
            <TextInput
              theme={theme}
              dense
              keyboardType="numeric"
            //   onChangeText={text => setAdhar(text)}
            //   value={adhar}
              mode="flat"
              underlineColor="#000"
              activeUnderlineColor={Color.primary}
            />
          </View>
          <View style={{flex: 1}}>
            <Text style={styles.label}>Registration Number</Text>
            <TextInput
              theme={theme}
              dense
            //   onChangeText={text => setRegistration_number(text)}
            //   value={registration_number}
              mode="flat"
              underlineColor="#000"
              activeUnderlineColor={Color.primary}
            />
          </View>
        </View> */}
        <View style={{marginTop: 15}}>
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
        <Button
          style={{
            backgroundColor: Color.primary,
            marginTop: 60,
            marginBottom: 10,
          }}
          contentStyle={{height: 55, alignItems: 'center'}}
          dark
          loading={loading}
          mode="contained"
          onPress={onSubmit}>
          Submit Profile
        </Button>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.white,
    elevation: 10,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  title: {
    fontSize: 20,
    fontFamily: 'Poppins-Bold',
    color: Color.black,
  },
  label: {
    fontFamily: Fonts.primaryRegular,
    color: '#000',
  },
  sectionTitle: {
    fontSize: 18,
    color: Color.black,
    fontFamily: Fonts.primaryBold,
    marginBottom: 10,
  },
  form: {
    paddingHorizontal: 20,
    width: '100%',
  },
  input: {
    backgroundColor: 'white',
    color: '#ff9000',
  },
  pickerStyle: {
    width: '100%',
    marginTop: 5,
    borderBottmColor: '#000',
    borderBottomWidth: 1,
    backgroundColor: '#E0E0E070',
    height: 50,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
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
