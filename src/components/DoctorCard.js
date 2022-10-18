import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {Color, Fonts} from '../theme';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Button} from 'react-native-paper';

export default function DoctorCard({item, onPress}) {
  const [status, setStatus] = React.useState(item?.status);

  return (
    <TouchableOpacity
      activeOpacity={1}
      style={styles.listItem}
      onPress={onPress}>
      <View
        style={{
          flexDirection: 'row',
        }}>
        <Image
          style={styles.listImage}
          source={{
            uri: item.profileimage
              ? item.profileimage.length < 20
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
              marginVertical: 2,
            }}>
            <MaterialCommunityIcons
              name="calendar"
              size={17}
              color={Color.primary}
              style={{
                marginRight: 5,
              }}
            />
            <Text style={styles.listItemSubTitle}>{item.date}</Text>
            <MaterialCommunityIcons
              name="clock"
              size={17}
              color={Color.primary}
              style={{
                marginRight: 5,
                marginLeft: 10,
              }}
            />
            <Text style={styles.listItemSubTitle}>{item.time}</Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <MaterialCommunityIcons
              name="map-marker"
              size={20}
              color={Color.primary}
            />
            <Text style={{fontFamily: Fonts.primaryRegular, color: '#000'}}>
              {item.location}
            </Text>
          </View>
        </View>
      </View>
      {!status ? (
        <View
          style={{
            flexDirection: 'row',
          }}>
          <Button
            mode="contained"
            onPress={() => setStatus(-1)}
            icon={({size, color}) => (
              <MaterialCommunityIcons name="close" size={24} style={{color}} />
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
              marginRight: 10,
              flex: 1,
            }}>
            Cancel
          </Button>
          <Button
            mode="contained"
            onPress={() => setStatus(1)}
            icon={({size, color}) => (
              <MaterialCommunityIcons name="check" size={24} style={{color}} />
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
              flex: 1,
            }}>
            Confirm
          </Button>
        </View>
      ) : status == -1 ? (
        <View
          style={{
            flexDirection: 'row',
          }}>
          <Button
            mode="outlined"
            onPress={() => {}}
            pointerEvents="none"
            icon={({size, color}) => (
              <MaterialCommunityIcons name="close" size={24} style={{color}} />
            )}
            labelStyle={{
              fontFamily: Fonts.primaryBold,
              fontSize: 14,
              lineHeight: 14 * 1.4,
            }}
            color={Color.red}
            dark
            style={{
              borderWidth: 1,
              borderColor: Color.red,
              marginTop: 15,
              borderRadius: 8,
              flex: 1,
            }}>
            Cancelled
          </Button>
        </View>
      ) : (
        <View
          style={{
            flexDirection: 'row',
          }}>
          <Button
            mode="outlined"
            icon={({size, color}) => (
              <MaterialCommunityIcons name="check" size={24} style={{color}} />
            )}
            labelStyle={{
              fontFamily: Fonts.primaryBold,
              fontSize: 14,
            }}
            color={Color.primary}
            dark
            style={{
              borderWidth: 1,
              borderColor: Color.primary,
              marginTop: 15,
              borderRadius: 8,
              flex: 1,
            }}>
            Confirmed
          </Button>
        </View>
      )}
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
