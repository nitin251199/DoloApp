import {Alert, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import RBSheet from 'react-native-raw-bottom-sheet';
import {Avatar, Button, TextInput, TouchableRipple} from 'react-native-paper';
import {Color, Dimension, Fonts} from '../../theme';

export default EngagementSheet = React.forwardRef((props, ref) => {
  const {item, handleChange} = props;

  return (
    <RBSheet
      ref={ref}
      openDuration={100}
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
          backgroundColor: '#e0e0e0',
          borderTopLeftRadius: 25,
          borderTopRightRadius: 25,
          alignItems: 'center',
        },
      }}
      height={Dimension.window.height * 0.4}>
      <View
        style={{
          paddingVertical: 20,
          paddingHorizontal: 20,
          width: '100%',
        }}>
        <View>
          <Text style={{...styles.sheetTitle, color: Color.primary}}>
            Change the engagement status
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            marginTop: 30,
            justifyContent: 'space-between',
          }}>
          {/* <View style={{alignItems: 'center', flex: 1}}>
            <TouchableRipple
              onPress={() => handleChange(item?.id, 1)}
              style={styles.button}>
              <Text style={styles.buttonLabel}>Set Active</Text>
            </TouchableRipple>
          </View> */}
          <View style={{alignItems: 'center', flex: 1}}>
            <TouchableRipple
              onPress={() => handleChange(item?.id, 2)}
              style={{...styles.button, backgroundColor: 'green'}}>
              <Text style={styles.buttonLabel}>Set Engaged</Text>
            </TouchableRipple>
          </View>
          <View style={{alignItems: 'center', flex: 1, marginLeft: 10}}>
            <TouchableRipple
              onPress={() => handleChange(item?.id, 3)}
              style={{...styles.button, backgroundColor: 'red'}}>
              <Text style={styles.buttonLabel}>Set Absent</Text>
            </TouchableRipple>
          </View>
        </View>
        {/* <View
          style={{
            flexDirection: 'row',
            marginTop: 20,
            justifyContent: 'space-between',
          }}>
          <View style={{alignItems: 'center', flex: 1}}>
            <TouchableRipple
              onPress={() => handleChange(item?.id, 2)}
              style={{...styles.button, backgroundColor: 'green'}}>
              <Text style={styles.buttonLabel}>Set Engaged</Text>
            </TouchableRipple>
          </View>
          <View style={{alignItems: 'center', flex: 1, marginLeft: 10}}>
            <TouchableRipple
              onPress={() => handleChange(item?.id, 0)}
              style={{...styles.button, backgroundColor: 'white'}}>
              <Text style={{...styles.buttonLabel, color: '#000'}}>
                Set Pending
              </Text>
            </TouchableRipple>
          </View>
        </View> */}
      </View>
    </RBSheet>
  );
});

const styles = StyleSheet.create({
  sheetTitle: {
    fontSize: 20,
    fontFamily: 'Poppins-SemiBold',
    color: Color.black,
    textShadowColor: Color.primary,
    textShadowOffset: {width: 0, height: 0},
    textShadowRadius: 1,
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
    borderRadius: 10,
    backgroundColor: Color.primary,
    padding: 15,
    elevation: 2,
  },
  buttonLabel: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    lineHeight: 16 * 1.4,
    textAlign: 'center',
    color: Color.white,
    textTransform: 'uppercase',
    letterSpacing: 1,
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
