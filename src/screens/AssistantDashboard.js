import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {Color, Fonts} from '../theme';
import AssistantCard from '../components/AssistantCard';
import {dummyAssistants} from './test';

export default function AssistantDashboard({navigation}) {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.addContainer}
        onPress={() => navigation.navigate('AddAssistant')}>
        <MaterialIcons
          name="add-box"
          size={64}
          color={Color.white}
          style={styles.addIcon}
        />
        <Text style={styles.addText}>Add new assistant</Text>
      </TouchableOpacity>
      <Text style={styles.title}>Your Assistants</Text>
      <FlatList
        data={dummyAssistants}
        renderItem={({item}) => <AssistantCard item={item} />}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  addContainer: {
    backgroundColor: Color.primary,
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 10,
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
    color: Color.white,
    marginTop: 10,
  },
  title: {
    fontSize: 20,
    fontFamily: Fonts.primarySemiBold,
    color: Color.black,
    marginTop: 30,
  },
});
