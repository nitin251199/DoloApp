import {Modal, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import MapScreen from '../../screens/MapScreen';

export default function MapModal(props) {
  return (
    <Modal
      animationType="slide"
      visible={props.visible}
      transparent
      onRequestClose={props.onRequestClose}>
      <View style={styles.centeredView}>
        <MapScreen
          onPress={props.onPress}
          setLocation={props.setLocation}
        />
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
});
