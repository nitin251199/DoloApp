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
import {Picker} from '@react-native-picker/picker';
import {postData} from '../API';
import {useSelector} from 'react-redux';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export default function AddPatient({navigation, route}) {
  const theme = {colors: {text: '#000', background: '#aaaaaa50'}}; // for text input

  const user = useSelector(state => state.user);

  const itemData = route.params?.item;

  const [category, setCategory] = React.useState(itemData?.category || '');
  const [name, setName] = React.useState(itemData?.name || '');
  const [age, setAge] = React.useState(itemData?.age || '');
  const [ageType, setAgeType] = React.useState(itemData?.ageType || '');
  const [weight, setWeight] = React.useState(itemData?.weight || '');
  const [weightType, setWeightType] = React.useState(
    itemData?.weightType || '',
  );
  const [gender, setGender] = React.useState(itemData?.gender || 'Male');
  const [mobileNo, setMobileNo] = React.useState(itemData?.mobileNo || '');

  const [showModal, setShowModal] = React.useState(false);

  const [loading, setLoading] = React.useState(false);
  const _scrollRef = React.useRef(null);

  const onPrimaryPress = () => {
    setCategory('');
    setName('');
    setAge('');
    setAgeType('');
    setWeight('');
    setWeightType('');
    setGender('Male');
    setMobileNo('');
    setShowModal(false);
    _scrollRef.current.scrollTo({x: 0, y: 0, animated: true});
  };

  const onSubmit = async () => {
    setLoading(true);
    var body = {
      category,
      name,
      age,
      ageType,
      weight,
      weightType,
      gender,
      mobileNo,
    };
    // const result = await postData('doctorassistant', body);
    // console.log('result', result);
    // if (result.success) {
    setShowModal(true);
    // }
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
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialCommunityIcons
            name="arrow-left"
            size={32}
            color={Color.black}
          />
        </TouchableOpacity>
        <Text style={styles.title}>Add New Patient</Text>
      </View>
      <ScrollView
        ref={_scrollRef}
        style={styles.form}
        keyboardShouldPersistTaps="always">
        <View>
          <Text style={styles.label}>Category</Text>
          <View
            style={{
              borderBottomWidth: 1,
              borderTopLeftRadius: 5,
              borderTopRightRadius: 5,
              marginTop: 5,
              backgroundColor: '#aaaaaa50',
              //   height: 45,
            }}>
            <Picker
              mode="dropdown"
              style={{
                color: '#000',
              }}
              dropdownIconColor={Color.primary}
              selectedValue={category}
              onValueChange={(itemValue, itemIndex) => setCategory(itemValue)}>
              <Picker.Item
                color={Color.grey}
                label="Select Category"
                value=""
              />
              <Picker.Item label="General" value="General" />
              <Picker.Item label="Vaccination" value="Vaccination" />
              <Picker.Item label="Revisit" value="Revisit" />
            </Picker>
          </View>
        </View>
        <Text style={styles.sectionTitle}>Personal Details</Text>
        <View>
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
          <Text style={styles.label}>Age</Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: 5,
            }}>
            <TextInput
              theme={theme}
              dense
              style={{flex: 3}}
              onChangeText={text => setAge(text)}
              value={age}
              mode="flat"
              underlineColor="#000"
              activeUnderlineColor={Color.primary}
            />
            <View
              style={{
                borderBottomWidth: 1,
                borderTopLeftRadius: 5,
                borderTopRightRadius: 5,
                marginLeft: 5,
                flex: 2,
                backgroundColor: '#aaaaaa50',
                //   height: 45,
              }}>
              <Picker
                mode="dropdown"
                style={{
                  color: '#000',
                }}
                dropdownIconColor={Color.primary}
                selectedValue={ageType}
                onValueChange={(itemValue, itemIndex) => setAgeType(itemValue)}>
                <Picker.Item color={Color.grey} label="Y/M/D" value="" />
                <Picker.Item label="Year" value="Year" />
                <Picker.Item label="Month" value="Months" />
                <Picker.Item label="Days" value="Days" />
              </Picker>
            </View>
          </View>
        </View>
        <View style={{marginTop: 15}}>
          <Text style={styles.label}>Weight</Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: 5,
            }}>
            <TextInput
              theme={theme}
              dense
              style={{flex: 3}}
              onChangeText={text => setWeight(text)}
              value={weight}
              mode="flat"
              underlineColor="#000"
              activeUnderlineColor={Color.primary}
            />
            <View
              style={{
                borderBottomWidth: 1,
                borderTopLeftRadius: 5,
                borderTopRightRadius: 5,
                marginLeft: 5,
                flex: 2,
                backgroundColor: '#aaaaaa50',
                //   height: 45,
              }}>
              <Picker
                mode="dropdown"
                style={{
                  color: '#000',
                }}
                dropdownIconColor={Color.primary}
                selectedValue={weightType}
                onValueChange={(itemValue, itemIndex) =>
                  setWeightType(itemValue)
                }>
                <Picker.Item color={Color.grey} label="Kg/Grm" value="" />
                <Picker.Item label="Kg" value="Kg" />
                <Picker.Item label="Gram" value="Gram" />
              </Picker>
            </View>
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
          <Text style={styles.label}>Mobile Number</Text>
          <TextInput
            theme={theme}
            dense
            onChangeText={text => setMobileNo(text)}
            value={mobileNo}
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
          Save & Approve
        </Button>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.white,
  },
  title: {
    fontSize: 20,
    fontFamily: 'Poppins-Bold',
    color: Color.black,
    paddingHorizontal: 20,
  },
  label: {
    fontFamily: Fonts.primaryRegular,
    color: '#000',
  },
  sectionTitle: {
    fontSize: 18,
    color: Color.black,
    fontFamily: Fonts.primaryBold,
    marginTop: 20,
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
