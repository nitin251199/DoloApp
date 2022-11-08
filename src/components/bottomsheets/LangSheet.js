import {Alert, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import RBSheet from 'react-native-raw-bottom-sheet';
import {Color, Dimension, Fonts} from '../../theme';
import {RadioButton} from 'react-native-paper';
import {useTranslation} from 'react-i18next';

export default LangSheet = React.forwardRef((props, ref) => {
  const {value, handleChange} = props;

  const {t} = useTranslation();

  return (
    <RBSheet
      ref={ref}
      //   openDuration={100}
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
      }}>
      <View
        style={{
          paddingVertical: 20,
          paddingHorizontal: 20,
          width: '100%',
        }}>
        <View>
          <Text style={{...styles.sheetTitle, color: Color.primary}}>
            {t('settings.change_language')}
          </Text>
        </View>
        <RadioButton.Group onValueChange={handleChange} value={value}>
          <TouchableOpacity
            onPress={() => handleChange('en')}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginVertical: 20,
              paddingHorizontal: 10,
              justifyContent: 'space-between',
            }}>
            <Text
              style={{
                color: Color.black,
                fontSize: 16,
                fontFamily: Fonts.primaryRegular,
                lineHeight: 16 * 1.4,
              }}>
              {t('settings.english')}
            </Text>
            <RadioButton.IOS value="en" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleChange('hi')}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingHorizontal: 10,
              justifyContent: 'space-between',
            }}>
            <Text
              style={{
                color: Color.black,
                fontSize: 16,
                fontFamily: Fonts.primaryRegular,
                lineHeight: 16 * 1.4,
              }}>
              {t('settings.hindi')}
            </Text>
            <RadioButton.IOS value="hi" />
          </TouchableOpacity>
        </RadioButton.Group>
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
