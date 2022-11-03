import {FlatList, ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Color, Fonts} from '../theme';
import {Avatar, Divider} from 'react-native-paper';

export default function PaymentHistory() {
  const renderItem = ({item}) => {
    return (
      <View
        style={{
          marginTop: 20,
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Avatar.Image
              size={50}
              source={{
                uri: 'https://www.w3schools.com/w3images/avatar6.png',
              }}
            />
            <View
              style={{
                marginLeft: 15,
              }}>
              <Text style={styles.listItemTitle}>Kuldeep Singh</Text>
              <Text style={styles.listItemSubTitle}>10:00 AM</Text>
            </View>
          </View>
          <Text style={styles.listItemText}>₹ 500</Text>
        </View>
        <Text
          style={{
            fontSize: 12,
            color: Color.gray,
            marginTop: 10,
          }}>
          28/10/2022
        </Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Payment History. 💵</Text>
      <ScrollView>
        <Text style={styles.label}>Today</Text>
        <FlatList
          data={[1, 2, 3, 4, 5]}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          ItemSeparatorComponent={() => (
            <Divider
              style={{
                backgroundColor: '#ccc',
                marginTop: 10,
              }}
            />
          )}
        />
        <Text style={{...styles.label, marginTop: 25}}>27/10/2022</Text>
        <FlatList
          data={[1, 2, 3, 4, 5]}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          ItemSeparatorComponent={() => (
            <Divider
              style={{
                backgroundColor: '#ccc',
                marginTop: 10,
              }}
            />
          )}
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  heading: {
    fontSize: 22,
    color: '#000',
    fontFamily: Fonts.primaryBold,
    width: '100%',
    marginBottom: 20,
  },
  label: {
    fontFamily: Fonts.primaryRegular,
    color: '#000',
    fontSize: 16,
  },
  listItemTitle: {
    fontFamily: Fonts.primarySemiBold,
    color: '#000',
    fontSize: 16,
    lineHeight: 16 * 1.4,
  },
  listItemSubTitle: {
    fontFamily: Fonts.primaryRegular,
    color: '#000',
    fontSize: 14,
  },
  listItemText: {
    fontFamily: Fonts.primarySemiBold,
    color: '#000',
    fontSize: 18,
  },
});
