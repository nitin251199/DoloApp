import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {Color, Fonts} from '../theme';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import DoubleClick from 'react-native-double-tap';
import LinearGradient from 'react-native-linear-gradient';

export default function AppointmentCard({item, onPress, onDoublePress,bgColor}) {
  const [status, setStatus] = React.useState(item?.status);

  const conditionalStyles = (status,online_offline) => {
    if (online_offline === 'online' && status === 0){
      backgroundColor:Color.yellow
    }
    else{
    switch (status) {
      case 2:
        return styles.resolved;
      case 3:
        return styles.absent;
      case 5:
        return styles.due_payment;
        // case 'online':
        // if (online_offline === 'online' && status === 0) {
        //   return styles.online;
        // }
      
      case 0:
        return styles.pending;
      default:
        return styles.pending;
    }
  }
  };

  return (
    <View style={{...styles.listItem, ...conditionalStyles(status)}}>
      {/* <DoubleClick singleTap={onPress} doubleTap={onDoublePress} delay={300}> */}
      <TouchableOpacity onPress={onPress} style={{
            flex: 1,
            flexDirection: 'row',
            padding: 15,
            alignItems: 'center',
            //justifyContent: 'center',
            backgroundColor:bgColor
          }}>
        {/* <LinearGradient
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          colors={
            status == 3
              ? ['#f6dbdb', '#f0b9b9', '#ec9898']
              : ['#e0ddff', '#c3beff', '#a79fff']
          }
          style={{
            flex: 1,
            flexDirection: 'row',
            padding: 15,
            alignItems: 'center',
            //justifyContent: 'center',
          }}> */}
          <Text style={styles.listItemTitle}>{item.token_no}.</Text>
          <Text style={styles.listItemTitle}>{item.patient_name}</Text>
        {/* </LinearGradient> */}
        </TouchableOpacity>
      {/* </DoubleClick> */}
    </View>
  );
}

const styles = StyleSheet.create({
  listItem: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginVertical: 10,
    overflow: 'hidden',
    borderRadius: 10,
    // borderWidth: 4,
    // borderColor: '#00b050',
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
    fontSize: 18,
    lineHeight: 18 * 1.4,
    color: Color.white,
    marginHorizontal: 5,
    fontFamily: Fonts.primarySemiBold,
   
  },
  listItemSubTitle: {
    fontSize: 16,
    lineHeight: 16 * 1.4,
    fontFamily: Fonts.primaryRegular,
    color: Color.white,
    
  },
   resolved: {
    backgroundColor: '#006400',
  },
  absent: {
   backgroundColor: Color.red,
  },
  current: {
    backgroundColor: '#ff8c00',
   },
   due_payment:{
   backgroundColor:'#ff7f50',
   },
  pending: {
    backgroundColor: Color.graylight,
    },
});
