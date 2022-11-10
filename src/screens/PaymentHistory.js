import {FlatList, ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Color, Fonts} from '../theme';
import {Avatar, Divider} from 'react-native-paper';
import {getData} from '../API';
import {useSelector} from 'react-redux';
import {useEffect} from 'react';
import PaymentHistoryPlaceholder from '../placeholders/PaymentHistoryPlaceholder';

export default function PaymentHistory() {
  const [payments, setPayments] = React.useState([]);

  const user = useSelector(state => state.user);
  const [loading, setLoading] = React.useState(true);

  const fetchPayments = async () => {
    const res = await getData(`paymenthistory/${user?.userid}`);
    if (res.success) {
      setPayments(res?.data);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchPayments();
  }, []);

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
                uri:
                  item?.patient_profile.length > 20
                    ? `data:image/png;base64,${item?.patient_profile}`
                    : 'https://www.w3schools.com/w3images/avatar6.png',
              }}
            />
            <View
              style={{
                marginLeft: 15,
              }}>
              <Text style={styles.listItemTitle}>{item?.patient_name}</Text>
              <Text style={styles.listItemSubTitle}>
                {new Date(item.date).toLocaleTimeString()}
              </Text>
            </View>
          </View>
          <Text style={styles.listItemText}>₹ {item.rating}</Text>
        </View>
        <Text
          style={{
            fontSize: 12,
            color: Color.gray,
            marginTop: 10,
          }}>
          {item.date.split(' ')[0]}
        </Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Payment History. 💵</Text>
      {payments.length === 0 && !loading && (
        <View>
          <Text style={{...styles.label, marginTop: 25}}>No payments yet.</Text>
        </View>
      )}
      {loading ? (
        <View>
          <PaymentHistoryPlaceholder />
          <PaymentHistoryPlaceholder />
          <PaymentHistoryPlaceholder />
          <PaymentHistoryPlaceholder />
          <PaymentHistoryPlaceholder />
        </View>
      ) : (
        <FlatList
          data={payments}
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
      )}
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
    textAlign: 'center',
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
