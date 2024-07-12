import React from 'react';
import {
  Modal,
  Pressable,
  StyleSheet,
  Text,
  View,
  TextInput,
  Dimensions,
} from 'react-native';
import AnimatedLottieView from 'lottie-react-native';
//import { TextInput,Button } from 'react-native-paper';
import {Color, Dimension} from '../../theme';
// import {useTheme} from 'react-native-paper';

const {width, height} = Dimension.window;

export default function InputModal(props) {
  const theme = {colors: {text: '#000', background: '#aaaaaa50'}}; // for text input
  const {item} = props

  return (
    <Modal
      animationType="slide"
      visible={props.visible}
      transparent
     
      onRequestClose={props.onRequestClose}>
      <View style={styles.centeredView}>
        <View style={[styles.modalView, {backgroundColor: Color.white}]}>
          <Text
            style={[
              styles.modalText,
              {
                color: Color.black,
              },
            ]}>
            Enter amount
          </Text>
          {/* <AnimatedLottieView
          source={require('../../assets/animations/success.json')}
          style={{width: 130, height: 130}}
          autoPlay
          loop={false}
        /> */}
          {/* <Pressable
          style={[styles.button, {backgroundColor: Color.primary}]}
          onPress={props.onPrimaryPress}>
          <Text style={[styles.textStyle]}>{props.primaryBtnText}</Text>
        </Pressable>
        <Pressable
          style={[styles.button, {backgroundColor: Color.gray}]}
          onPress={props.onSecondaryPress}>
          <Text style={[styles.textStyle]}>{props.secondaryBtnText}</Text>
        </Pressable> */}
        {/* <Text style={styles.label_style}>Enter amount</Text> */}
          <TextInput
            // theme={theme}
            // dense
            style={styles.txt_input_style}
            keyboardType='number-pad'
            onChangeText={(txt) => props.setAmount(txt)}
          // value={consultCharge}
            //     mode="outlined"
            //     underlineColor="#000"
            //     activeUnderlineColor={Color.primary}
          />

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginTop: 20,
              // paddingHorizontal:20,
              paddingBottom: 10,
              alignSelf: 'center',
            }}>
            <Pressable
              style={[styles.button, {backgroundColor: Color.red}]}
              onPress={props.onPrimaryPress}>
              <Text style={[styles.textStyle]}>{props.primaryBtnText}</Text>
            </Pressable>
            <Pressable
              style={[
                styles.button,
                {backgroundColor: `#1e90ff`, marginLeft: 10},
              ]}
              onPress={()=>props.onSecondaryPress(item)}>
              <Text style={[styles.textStyle]}>{props.secondaryBtnText}</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
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
    alignItems: 'center',
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
  // button: {
  //   borderRadius: 25,
  //   padding: 10,
  //   marginVertical:5,
  //   elevation: 2,
  //   width: width * 0.7,
  // },
  label_style:{
    fontFamily: 'Poppins-SemiBold',
    textAlign: 'center',
    fontSize: 15,
    color:Color.black

  },
  txt_input_style: {
    paddingVertical: 8,
    width: Dimensions.get('window').width - 100,
    borderWidth: 2,
    borderColor: Color.black,
    borderRadius: 5,
    color:Color.black,
    paddingHorizontal:10,
    fontSize:18,
   // textAlign:'center'
  },
  textStyle: {
    color: 'white',
    fontFamily: 'Poppins-SemiBold',
    textAlign: 'center',
    fontSize: 16,
  },
  modalText: {
    fontSize: 20,
    fontFamily: 'Poppins-SemiBold',
   // textAlign: 'center',
  },
  Buttons_container: {
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  button: {
    borderRadius: 15,
    padding: 8,
    marginVertical: 5,
    elevation: 2,
    width: width * 0.3,
  },
  textStyle: {
    color: Color.white,
    fontFamily: 'Poppins-SemiBold',
    textAlign: 'center',
    fontSize: 15,
  },
});
