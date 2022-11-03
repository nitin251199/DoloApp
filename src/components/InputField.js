import React from 'react';
import {View, Text, TouchableOpacity, TextInput} from 'react-native';
import {Color, Fonts} from '../theme';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export default function InputField({
  label,
  icon,
  inputType,
  keyboardType,
  fieldButtonLabel,
  fieldButtonFunction,
  onChangeText,
  value,
  editable,
  secure,
  setSecure,
  color,
}) {
  return (
    <View
      style={{
        flexDirection: 'row',
        borderBottomColor: '#fff',
        borderBottomWidth: 1,
        paddingBottom: 8,
        marginBottom: 25,
      }}>
      {icon}
      {inputType == 'password' ? (
        <View
          style={{
            flex: 1,
            paddingVertical: 0,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <TextInput
            placeholder={label}
            placeholderTextColor="#e0e0e0"
            keyboardType={keyboardType}
            onChangeText={onChangeText}
            value={value}
            style={{
              color: color || '#fff',
              paddingVertical: 0,
              flex: 1,
              fontFamily: Fonts.primaryRegular,
            }}
            secureTextEntry={secure}
          />
          <TouchableOpacity onPress={() => setSecure(prev => !prev)}>
            <MaterialCommunityIcons
              name={secure ? 'eye-off' : 'eye'}
              color={'#fff'}
              size={23}
              style={{
                paddingHorizontal: 15,
              }}
            />
          </TouchableOpacity>
        </View>
      ) : (
        <TextInput
          placeholder={label}
          editable={editable}
          placeholderTextColor="#e0e0e0"
          keyboardType={keyboardType}
          onChangeText={onChangeText}
          value={value}
          style={{
            flex: 1,
            paddingVertical: 0,
            color: color || '#fff',
            fontFamily: Fonts.primaryRegular,
          }}
        />
      )}
      <TouchableOpacity onPress={fieldButtonFunction}>
        <Text
          style={{
            color: Color.secondary,
            fontWeight: '700',
            fontFamily: Fonts.primaryBold,
          }}>
          {fieldButtonLabel}
        </Text>
      </TouchableOpacity>
    </View>
  );
}
