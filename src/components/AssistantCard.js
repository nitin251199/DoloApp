import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {Color, Fonts} from '../theme';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Button} from 'react-native-paper';

export default function AssistantCard({item, onPress, onEdit, onDelete}) {
  return (
    <TouchableOpacity
      activeOpacity={1}
      style={styles.listItem}
      onPress={onPress}>
      <View
        style={{
          flexDirection: 'row',
          flex: 1,
        }}>
        <Image
          style={styles.listImage}
          source={{
            uri: item.profileimage
              ? item.profileimage.length > 20
                ? `data:image/png;base64,${item.profileimage}`
                : item.profileimage
              : 'https://www.w3schools.com/w3images/avatar6.png',
          }}
        />
        <View style={styles.listItemText}>
          <Text style={styles.listItemTitle}>{item.name}</Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginVertical: 3,
            }}>
            <View style={{flexDirection: 'row', width: '65%'}}>
              <MaterialCommunityIcons
                name="map-marker"
                size={17}
                color={Color.primary}
                style={{
                  marginRight: 10,
                }}
              />
              <Text style={styles.listItemSubTitle}>{item.address}</Text>
            </View>
            <View style={{flexDirection: 'row'}}>
              <MaterialCommunityIcons
                name="gender-male-female"
                size={17}
                color={Color.primary}
                style={{
                  marginRight: 10,
                }}
              />
              <Text style={styles.listItemSubTitle}>{item.gender}</Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <MaterialCommunityIcons
              name="clock"
              size={20}
              color={Color.primary}
              style={{
                marginRight: 10,
              }}
            />
            <Text
              style={{
                fontFamily: Fonts.primaryRegular,
                color: '#000',
                lineHeight: 14 * 1.4,
              }}>
              Joined {new Date(item.created_at).toDateString().slice(3)}
            </Text>
          </View>
        </View>
      </View>
      <View
        style={{
          flexDirection: 'row',
        }}>
        <Button
          mode="contained"
          onPress={onEdit}
          icon={({size, color}) => (
            <MaterialCommunityIcons
              name="account-edit"
              size={24}
              style={{color}}
            />
          )}
          labelStyle={{
            fontFamily: Fonts.primaryBold,
            fontSize: 14,
          }}
          dark
          style={{
            backgroundColor: Color.green,
            marginTop: 15,
            borderRadius: 8,
            marginRight: 10,
            flex: 1,
          }}>
          Edit
        </Button>
        <Button
          mode="contained"
          onPress={() => onDelete(item)}
          icon={({size, color}) => (
            <MaterialCommunityIcons
              name="delete-empty"
              size={24}
              style={{color}}
            />
          )}
          labelStyle={{
            fontFamily: Fonts.primaryBold,
            fontSize: 14,
          }}
          dark
          style={{
            backgroundColor: Color.red,
            marginTop: 15,
            borderRadius: 8,
            flex: 1,
          }}>
          Delete
        </Button>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  listItem: {
    flexDirection: 'column',
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
    flex: 1,
  },
  listItemTitle: {
    fontSize: 16,
    color: Color.black,
    // fontWeight: '700',
    fontFamily: Fonts.primarySemiBold,
  },
  listItemSubTitle: {
    fontSize: 14,
    lineHeight: 14 * 1.4,
    fontFamily: Fonts.primaryRegular,
    color: '#999',
  },
});
