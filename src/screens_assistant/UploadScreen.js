import {
  Alert,
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Color, Fonts} from '../theme';
import ImagePicker from 'react-native-image-crop-picker';
import {Button} from 'react-native-paper';
import SuccessModal from '../components/modals/SuccessModal';
import {warnToast} from '../components/toasts';

export default function UploadScreen({navigation, route}) {
  const [prescriptions, setPrescriptions] = React.useState([]);

  const [showModal, setShowModal] = React.useState(false);

  const takePhotoFromCamera = () => {
    ImagePicker.openCamera({
      compressImageMaxWidth: 300,
      compressImageMaxHeight: 300,
      cropping: true,
      compressImageQuality: 0.7,
      includeBase64: true,
      multiple: true,
    }).then(image => {
      setPrescriptions(prev => [...prev, image?.path]);
    });
  };

  const choosePhotoFromLibrary = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 300,
      cropping: true,
      compressImageQuality: 0.7,
      includeBase64: true,
      multiple: true,
    }).then(image => {
      let images = image.map(item => item?.path);
      setPrescriptions(prev => [...prev, images].flat());
    });
  };

  const addPrescription = () => {
    Alert.alert(
      'Add Prescription',
      'Upload prescription from',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel'),
          style: 'cancel',
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
      {cancelable: true},
    );
  };

  const onPrimaryPress = () => {
    setPrescriptions([]);
    setShowModal(false);
  };
  const sendPrescriptions = () => {
    if (prescriptions.length) {
      setShowModal(true);
    } else {
      warnToast('Please add at least one prescription');
    }
  };

  return (
    <View style={styles.container}>
      <View style={{flexDirection: 'row', padding: 20}}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialCommunityIcons
            name="arrow-left"
            size={32}
            color={Color.black}
          />
        </TouchableOpacity>
        <Text style={styles.title}>Upload Prescription</Text>
      </View>
      <View
        style={{
          paddingHorizontal: 20,
        }}>
        <TouchableOpacity style={styles.addContainer} onPress={addPrescription}>
          <MaterialCommunityIcons
            name="upload"
            size={64}
            color={Color.primary}
            style={styles.addIcon}
          />
          <Text style={styles.addText}>Upload Prescription</Text>
        </TouchableOpacity>
      </View>
      <Text
        style={{
          color: '#000',
          fontFamily: Fonts.primarySemiBold,
          fontSize: 18,
          paddingHorizontal: 20,
          marginTop: 20,
        }}>
        Your prescriptions
      </Text>
      {/* <View
        horizontal
        style={{
          flex: 1,
          flexDirection: 'row',
          paddingHorizontal: 20,
          flexWrap: 'wrap',
        }}>
        {prescriptions.map((prescription, index) => {
          return (
            <>
              <Image
                source={{uri: prescription}}
                style={{
                  width: '37%',
                  height: 150,
                  margin: 5,
                  marginTop: 15,
                  borderRadius: 5,
                  borderWidth: 1,
                  borderColor: '#ccc',
                }}
              />
              <TouchableOpacity
                onPress={() => {
                  setPrescriptions(
                    prescriptions.filter((item, i) => i !== index),
                  );
                }}
                style={{
                  // position: 'absolute',
                  margin: 5,
                  marginTop: 15,
                  // top: index % 3 == 0 ? index * 130 : (index - 1) * 130,
                  // right: Dimension.window.width * 0.3 * index,
                  zIndex: 999,
                }}>
                <MaterialCommunityIcons
                  name="close"
                  size={24}
                  color={Color.black}
                  style={styles.closeIcon}
                />
              </TouchableOpacity>
            </>
          );
        })}
      </View> */}
      <FlatList
        data={prescriptions}
        numColumns={2}
        renderItem={({item, index}) => {
          return (
            <>
              <Image
                source={{uri: item}}
                style={{
                  flex: 1,
                  height: 150,
                  margin: 5,
                  marginTop: 15,
                  borderRadius: 5,
                  borderWidth: 1,
                  borderColor: '#ccc',
                }}
              />
              <TouchableOpacity
                onPress={() => {
                  setPrescriptions(
                    prescriptions.filter((item, i) => i !== index),
                  );
                }}
                style={{
                  // position: 'absolute',
                  margin: 5,
                  marginTop: 15,
                  // top: index % 3 == 0 ? index * 130 : (index - 1) * 130,
                  // right: Dimension.window.width * 0.3 * index,
                  zIndex: 999,
                }}>
                <MaterialCommunityIcons
                  name="close"
                  size={24}
                  color={Color.black}
                  style={styles.closeIcon}
                />
              </TouchableOpacity>
            </>
          );
        }}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={{
          paddingHorizontal: 20,
        }}
      />
      <Button
        onPress={() => sendPrescriptions()}
        mode="contained"
        dark
        color={Color.primary}
        style={{
          borderRadius: 0,
        }}
        labelStyle={{
          fontFamily: Fonts.primarySemiBold,
          fontSize: 18,
          lineHeight: 18 * 1.4,
        }}
        contentStyle={{
          paddingVertical: 10,
        }}>
        Send Prescription
      </Button>
      <SuccessModal
        visible={showModal}
        onRequestClose={() => setShowModal(false)}
        title="Prescriptions Sent Successfully"
        primaryBtnText="Add More"
        onPrimaryPress={() => onPrimaryPress()}
        secondaryBtnText="Go Back"
        onSecondaryPress={() => {
          setShowModal(false);
          navigation.goBack();
        }}
      />
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
  addContainer: {
    borderColor: Color.primary,
    borderRadius: 10,
    borderWidth: 5,
    borderStyle: 'dashed',
    height: 200,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    // elevation: 10,
    shadowColor: Color.primary,
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
    fontSize: 20,
    fontFamily: Fonts.primarySemiBold,
    color: Color.primary,
    marginTop: 10,
  },
});
