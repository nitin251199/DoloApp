import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {Color, Fonts} from '../theme';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export default function DoctorCard({item, onPress}) {
  return (
    <TouchableOpacity style={styles.listItem} onPress={onPress}>
      <View
        style={{
          flexDirection: 'row',
          width:'80%'
        }}>
        <Image
          style={styles.listImage}
          source={{
            uri: item.profileimage
              ? `data:image/png;base64,${item.profileimage}`
              : 'https://www.w3schools.com/w3images/avatar6.png',
          }}
        />
        <View style={styles.listItemText}>
          <Text style={styles.listItemTitle}>{item.name}</Text>
          <Text style={styles.listItemSubTitle}>{item.specialization}</Text>
          <View
            style={{
              flexDirection: 'row',
             // alignItems: 'center',
            }}>
            <MaterialCommunityIcons
              name="map-marker"
              size={20}
              color={Color.primary}
            />
            <Text style={{fontFamily: Fonts.primaryRegular, color: '#000',}}>
              {item.location}
            </Text>
          </View>
        </View>
      </View>
      <View style={{width:'20%'}}>
        {item.status == '0' && (
          <Text
            style={{
              color: Color.red,
              fontFamily: Fonts.primarySemiBold,
            }}>
            Pending
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  listItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
    marginVertical: 10,
    backgroundColor: '#fff',
    borderRadius: 15,
    elevation: 8,
    shadowColor: Color.primary,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    width: '100%',
  },
  listImage: {
    height: 75,
    width: 75,
    borderRadius: 15,
    marginRight: 15,
  },
  listItemText: {
    justifyContent: 'space-evenly',
    width:'80%'
  },
  listItemTitle: {
    fontSize: 16,
    color: Color.black,
    // fontWeight: '700',
    fontFamily: Fonts.primarySemiBold,
  },
  listItemSubTitle: {
    fontSize: 14,
    fontFamily: Fonts.primaryRegular,
    color: '#999',
  },
});
