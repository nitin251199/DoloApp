import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect} from 'react';
import {Color, Fonts, Dimension} from '../theme';
import SuccessModal from '../components/modals/SuccessModal';
import {Avatar, Button, TextInput} from 'react-native-paper';
import {Picker} from '@react-native-picker/picker';
import {postData} from '../API';
import {useSelector} from 'react-redux';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import AddpatientSuccessModal from '../components/modals/AddPatientSuccessModal';
import ThermalPrinterModule from 'react-native-thermal-printer';
import Reciept from '../components/Reciept';
import RNPrint from 'react-native-print';
const {width, height} = Dimension;
export default function AddPatient({navigation, route}) {
  const theme = {colors: {text: '#000', background: '#aaaaaa50'}}; // for text input

  const user = useSelector(state => state.user);

  const itemData = route.params?.item;

  const [category, setCategory] = React.useState(itemData?.category || '');
  const [shiftName, setShiftName] = React.useState(
    itemData?.shift_name || 'Morning',
  );
  const [name, setName] = React.useState(itemData?.patient_name || '');
  const [age, setAge] = React.useState(itemData?.age || '');
  const [ageType, setAgeType] = React.useState(itemData?.ageType || 'Years');
  const [weight, setWeight] = React.useState(itemData?.weight || '');
  const [weightType, setWeightType] = React.useState(
    itemData?.weightType || 'Kg',
  );
  const [gender, setGender] = React.useState(
    itemData?.gender.toLowerCase() || 'male',
  );
  const [mobileNo, setMobileNo] = React.useState(itemData?.mobile || '');

  const [showModal, setShowModal] = React.useState(false);
  const [isDatePickerVisible, setIsDatePickerVisible] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [createTime, setCreateTime] = React.useState('');
  const [createDate, setCreateDate] = React.useState(
    itemData?.create_date || '',
  );
  const [modalData, setModalData] = React.useState('');
  const _scrollRef = React.useRef(null);
  const _inputRef = React.useRef(null);

  const onSecondaryPress = () => {
    setCategory('');
    setName('');
    setAge('');
    setAgeType('Years');
    setWeight('');
    setWeightType('Kg');
    setGender('male');
    setMobileNo('');
    setShowModal(false);
    setCreateDate('');
    setShiftName('Morning');

    _scrollRef.current.scrollTo({x: 0, y: 0, animated: true});
    _inputRef.current.blur();
  };

  const onSubmit = async () => {
    setLoading(true);
    var addbody = {
      doctor_id: user?.doctor_id,
      assistant_id: user?.userid,
      category,
      patient_name: name,
      age,
      agetype: ageType,
      weight,
      weighttype: weightType,
      gender,
      mobile: mobileNo,
      status: 0,
      create_date: createDate,
      shift_name: shiftName,
    };
    var editbody = {
      id: itemData?.id,
      doctor_id: user?.doctor_id,
      assistant_id: user?.userid,
      category: category,
      patient_name: name,
      age,
      agetype: ageType,
      weight,
      weighttype: weightType,
      gender,
      mobile: mobileNo,
      status: 0,
      // create_date:createDate,
      shift_name: shiftName,
    };
    const apiUrl =
      route.params?.type !== 'add' ? 'appointmentupdate' : 'createappointment';
    const body = route.params?.type !== 'add' ? editbody : addbody;
    const result = await postData(apiUrl, body);
    console.log('res==', result);
    if (result.success) {
      setShowModal(true);
      setModalData(result.data);
    }
    setLoading(false);
  };

  const showDatePicker = () => {
    setIsDatePickerVisible(true);
  };

  FormatDate = async data => {
    let dateTimeString =
      data.getDate() + '/' + (data.getMonth() + 1) + '/' + data.getFullYear();

    hideDatePicker();
    setCreateDate(dateTimeString);

    return dateTimeString; // It will look something like this 3-5-2021 16:23
  };

  const hideDatePicker = () => {
    setIsDatePickerVisible(false);
  };

  const printHTML = async () => {
    await RNPrint.print({
      html:
        // '<div style="background-color:#fdf8db;"> <h1>Token No. :   ' +
        // modalData.token_no +
        // '</h1></br><h1>Category :    ' +
        // modalData.category +
        // '</h1></br><h1>Name :   ' +
        // modalData.patient_name +
        // '</h1></br><h1>Age :    ' +
        // modalData.age +
        // modalData.agetype +
        // '</h1></br><h1>Weight :    ' +
        // modalData.weight +
        // modalData.weighttype +
        // '</h1></br><h1>Gender :     ' +
        // modalData.gender +
        // '</h1></br><h1>Time :    ' +
        // modalData.create_date +
        // '</h1></br></div>',

        '  <div style="height:fit-content; border: 2px solid black; width: fit-content; background-color: #fdf8db;  padding-top: 30px;padding-right: 40px;padding-left: 40px;padding-bottom:100pxline-height: 1; border-radius: 20px; "><div style="border:2px solid black;border-radius: 20px; margin-left: 50px; width: 132px; "><h1 style="text-align: center;">' +
        modalData.token_no +
        '</h1><p style="text-align: center;  font-weight: 600;margin-bottom: 4px;">  TOKEN NO.</p></div><div style="display:flex; font-weight: 600;margin-top:10"><p>Category&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp:&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp' +
        modalData.category +
        '</p></div><div style="display:flex; font-weight: 600;"><p>Name&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp:&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp' +
        modalData.patient_name +
        '</p></div><div style="display:flex; font-weight: 600;"><p>Age&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp:&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp' +
        modalData.age + 
        modalData.agetype +
        '</p></div><div style="display:flex; font-weight: 600;"><p>Weight&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp:&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp' +
        modalData.weight +
        modalData.weighttype +
        '</p></div><div style="display:flex; font-weight: 600;"><p>Gender&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp:&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp' +
        modalData.gender +
        '</p></div><div style="display:flex; font-weight: 600; "><p>Time&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp:&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp' +
        modalData.create_date +
        '</p></div>',
    });
  };

  return (
    <View style={styles.container}>
      <AddpatientSuccessModal
        visible={showModal}
        onRequestClose={() => setShowModal(false)}
        title={
          route.params?.type !== 'add'
            ? 'Patient Details Updated'
            : 'Patient Added Successfully'
        }
        primaryBtnText={
          route.params?.type !== 'add'
            ? 'Edit More Details'
            : 'ADD MORE PATIENT'
        }
        // onPrimaryPress={() => onPrimaryPress()}
        onPrimaryPress={() => {
          setShowModal(false);
          navigation.goBack();
        }}
        // secondaryBtnText="Go Back"
        onSecondaryPress={() => {
          onSecondaryPress();
        }}
        category={modalData.category}
        patient_name={modalData.patient_name}
        age={modalData.age}
        agetype={modalData.agetype}
        weight={modalData.weight}
        gender={modalData.gender}
        // time={
        //   new Date(modalData.created_at).getDate() /
        //   new Date(modalData.created_at).getMonth() /
        //   new Date(modalData.created_at).getFullYear()
        // }
        time={
          `${new Date(modalData.created_at).getDate()}/${new Date(modalData.created_at).getMonth()}/${new Date(modalData.created_at).getFullYear()}`
          
        }
        weight_type={modalData.weighttype}
        onPrintPress={() => printHTML()}
        token_no={modalData.token_no}
      />
      <View style={{flexDirection: 'row', padding: 20}}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialCommunityIcons
            name="arrow-left"
            size={32}
            color={Color.black}
          />
        </TouchableOpacity>
        <Text style={styles.title}>
          {route.params?.type == 'add' ? 'Add New Patient' : 'Edit Patient'}
        </Text>
      </View>
      <ScrollView
        ref={_scrollRef}
        style={styles.form}
        keyboardShouldPersistTaps="always"
        showsVerticalScrollIndicator={false}>
        {/* {route.params?.type == 'add' && */}
        <View>
          <Text style={styles.label}>Shift Name</Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: 5,
            }}>
            <TouchableOpacity
              onPress={() => setShiftName('Morning')}
              style={{
                ...styles.radioStyle,
                backgroundColor:
                  shiftName == 'Morning' ? `${Color.primary}50` : '#aaaaaa50',
              }}>
              <Text
                style={{
                  color: '#000',
                  fontFamily: Fonts.primaryRegular,
                  lineHeight: 14 * 1.5,
                }}>
                Morning
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setShiftName('Evening')}
              style={{
                ...styles.radioStyle,
                backgroundColor:
                  shiftName == 'Evening' ? `${Color.primary}50` : '#aaaaaa50',
                marginLeft: 5,
              }}>
              <Text
                style={{
                  color: '#000',
                  fontFamily: Fonts.primaryRegular,
                  lineHeight: 14 * 1.5,
                }}>
                Evening
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        {/* } */}
        <View style={{marginTop: 15}}>
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
              <Picker.Item label="OtherCategory" value="OtherCategory" />
            </Picker>
          </View>
        </View>
        <View style={{marginTop: 15}}>
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
              style={{flex: 3, height: 55}}
              keyboardType="numeric"
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
              style={{flex: 3, height: 55}}
              keyboardType="numeric"
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
                  fontFamily: Fonts.primaryRegular,
                  lineHeight: 14 * 1.5,
                }}>
                Others
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* <View style={{marginTop: 15}}>
          <Text style={styles.label}>CreateDate</Text>
        
         <TouchableOpacity onPress={() => showDatePicker()}>
         <TextInput
            ref={_inputRef}
            theme={theme}
            //keyboardType="numeric"
            dense
            onChangeText={setCreateDate}
            value={createDate}
            mode="flat"
            underlineColor="#000"
            activeUnderlineColor={Color.primary}
            editable={false}
            
          />
       </TouchableOpacity>
       <DateTimePickerModal
       isVisible={isDatePickerVisible}
       mode="date"
       onConfirm={FormatDate}
       onCancel={hideDatePicker}
     />
   
         
        </View> */}
        <View style={{marginTop: 15}}>
          <Text style={styles.label}>Mobile Number</Text>
          <TextInput
            ref={_inputRef}
            theme={theme}
            keyboardType="numeric"
            dense
            onChangeText={text => setMobileNo(text)}
            value={mobileNo}
            mode="flat"
            underlineColor="#000"
            activeUnderlineColor={Color.primary}
          />
        </View>
        {/* <View style={{marginTop:15}}>
          <Text style={styles.label}>Shift</Text>
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
              selectedValue={shiftName}
              onValueChange={(itemValue, itemIndex) => setShiftName(itemValue)}>
              <Picker.Item
                color={Color.grey}
                label="Select Shift"
                value=""
              />
              <Picker.Item label="Morning" value="Morning" />
              <Picker.Item label="Evening" value="Evening" />
            
            </Picker>
          </View>
        </View> */}
        {route.params?.type === 'edit' && (
          <Text style={styles.sectionTitle}>Token No.{itemData?.token_no}</Text>
        )}
        <Button
          style={{
            backgroundColor: Color.primary,
            marginTop: 25,
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
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalView: {
    margin: 20,
    borderRadius: 25,
    padding: 25,
    // alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    flexDirection: 'column',
    // justifyContent: 'space-between',
  },
  button: {
    borderRadius: 10,
    padding: 10,
    marginVertical: 5,
    elevation: 2,
    width: width * 0.7,
  },
  close_button: {
    borderRadius: 10,
    padding: 10,
    marginVertical: 5,
    elevation: 2,
    width: width * 0.3,
    borderWidth: 1,
    borderColor: Color.black,
  },
  print_button: {
    borderRadius: 10,
    padding: 10,
    marginVertical: 5,
    elevation: 2,
    width: width * 0.3,
    borderWidth: 1,
    borderColor: Color.black,
  },
  textStyle: {
    color: Color.black,
    fontFamily: 'Poppins-SemiBold',
    textAlign: 'center',
    fontSize: 16,
  },
  modalText: {
    fontSize: 20,
    fontFamily: 'Poppins-SemiBold',
    textAlign: 'center',
  },
  card: {
    paddingTop: 10,

    //paddingHorizontal:10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: Color.black,
    width: width * 0.4,
    alignSelf: 'center',
  },
  token_no: {
    fontSize: 45,
    fontFamily: Fonts.primaryBold,
    color: Color.black,
    textAlign: 'center',
  },
  token_no_txt: {
    fontSize: 15,
    fontFamily: Fonts.primaryRegular,
    color: Color.black,
    textAlign: 'center',
  },
  title: {
    fontSize: 15,
    fontFamily: Fonts.primaryRegular,
    color: Color.black,
    // textAlign:'center',
    width: '28%',
  },
  title2: {
    fontSize: 15,
    fontFamily: Fonts.primaryRegular,
    color: Color.black,
    textAlign: 'center',
    width: '28%',
  },
  descr: {
    fontSize: 15,
    fontFamily: Fonts.primarySemiBold,
    color: Color.black,
    textAlign: 'auto',
    width: '50%',
  },
  details_container: {
    alignSelf: 'center',
    width: width * 0.7,
  },
});
