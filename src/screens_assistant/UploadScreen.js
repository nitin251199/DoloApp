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
import React,{useEffect} from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Color, Fonts} from '../theme';
import ImagePicker from 'react-native-image-crop-picker';
import {Button} from 'react-native-paper';
import SuccessModal from '../components/modals/SuccessModal';
import {errorToast, warnToast,successToast} from '../components/toasts';
import {postData,getData} from '../API';
import PerscriptionCard from '../components/PerscriptionCard'
import autoMergeLevel1 from 'redux-persist/es/stateReconciler/autoMergeLevel1';
export default function UploadScreen({navigation, route}) {
  const [prescriptions, setPrescriptions] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [uploading, setUploading] = React.useState(false);
 const [uploadedPerscriptions,setUploadedPerscriptions] = React.useState([]);
  const itemData = route.params?.item;
  // console.log('itemData==',itemData);
   console.log('patent,assis,doct==',itemData.patient_id,itemData.assistant_id,itemData.doctor_id);


  const [showModal, setShowModal] = React.useState(false);

  const takePhotoFromCamera = () => {
    ImagePicker.openCamera({
      compressImageMaxWidth: 2048,
      compressImageMaxHeight: 1024,
      cropping: true,
      compressImageQuality: 1,
      includeBase64: true,
      multiple: true,
    }).then(image => {
      setPrescriptions(prev => [...prev, image]);
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
      // let images = image.map(item => item?.path);
      setPrescriptions(prev => [...prev, image].flat());
     
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
    getPerscriptionList();
  };
  const sendPrescriptions = async () => {
    setUploading(true)
    if (prescriptions.length) {
      var body = {
        patient_id: itemData.patient_id,
        assitant_id: itemData.assistant_id,
        doctor_id: itemData.doctor_id,
        prescription: prescriptions.map(item => item?.data),
      };
      console.log('ubody==',body)
      const result = await postData('assistant_send_prescrition_patient', body);
      if (result.data) {
        setShowModal(true);
      } else {
        errorToast('Something went wrong');
      }
    } else {
      warnToast('Please add at least one prescription');
    }
    setUploading(false)
  };

  const getPerscriptionList = async() =>{
    
     setLoading(true);
    
     const result = await getData(`assistantfeedback/${itemData?.doctor_id}/${itemData?.patient_id}`);
    console.log('resultlist----', result.data);
    setUploadedPerscriptions(result.data)
  
    setLoading(false);
    }

    
   useEffect(() => {
    const unsubscribe = navigation.addListener('focus', async() => {
      // The screen is focused
      // Call any action
     await getPerscriptionList();

    },[uploadedPerscriptions]);

    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
    
  }, []);


  const deletePerscription = async (id) => {
    console.log('perid==',id);
      setLoading(true);
      let res = await getData(
        `doctorfeedbackdelete/${id}`,
      );
    
      if (res.success) {
      
      successToast('Successfully Delete')
      
      }
      else{
        errorToast('Something Went wrong please check')
      }
      setLoading(false);
    
      getPerscriptionList();
    
     }
  


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
      <ScrollView contentContainerStyle={{paddingBottom:30}} showsVerticalScrollIndicator={false}>
      <View
        style={{
          paddingHorizontal: 20,
        }}>
        <TouchableOpacity style={styles.addContainer} onPress={addPrescription}>
          <MaterialCommunityIcons
            name="upload"
            size={50}
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
    
      <FlatList
        data={prescriptions}
        numColumns={2}
        minHeight={170}
        renderItem={({item, index}) => {
          return (
            <>
              <Image
                source={{uri: item?.path}}
                style={{
                  flex: 0.5,
                  minHeight:190,
                  margin: 5,
                  marginTop: 15,
                
                  
                  borderRadius: 5,
                  borderWidth: 1,
                  borderColor: '#ccc',


                }}
                resizeMode='center'
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
      <Text
        style={{
          color: '#000',
          fontFamily: Fonts.primarySemiBold,
          fontSize: 18,
          paddingHorizontal: 20,
          marginTop: 20,
       
        }}>
        Uploaded prescriptions
      </Text>
      {/* {uploadedPerscriptions.length > 0 &&  */}

{/* <FlatList
data={uploadedPerscriptions}
numColumns={2}
renderItem={({item, index}) => {
  return (
    <>
      <Image
        source={{uri: `data:image/png;base64,${item?.prescription[0]}`}}
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
     
    </>
  );
}}
keyExtractor={(item, index) => index.toString()}
contentContainerStyle={{
  paddingHorizontal: 20,
}}
/> */}
      
      {uploadedPerscriptions && uploadedPerscriptions.map((item, index) => {
            return (
              <PerscriptionCard
               onEdit={ () =>navigation.navigate('PerscriptionDetails',{
                desc:item.description != null ? item.description : 'Perscription',
                date: new Date(item.date).toDateString().slice(3),
                img:item?.prescription,
              })}
              date={new Date(item.date).toDateString().slice(3)}
              source={{uri: `data:image/png;base64,${item?.prescription[0]}`}}
              description={item.description != null ? item.description : 'Perscription' }
              onDelete={ () => deletePerscription(item.id)}
              />
            );
          })}   
    
    {/* } */}

</ScrollView>
      <Button
        onPress={() => sendPrescriptions()}
        mode="contained"
        loading={uploading}
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
