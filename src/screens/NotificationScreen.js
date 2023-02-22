import {
    View,
    Text,
    ScrollView,
    Image,
    StyleSheet,
    FlatList,
    StatusBar
  } from 'react-native';
  import React, {useEffect} from 'react';
  import AntIcon from 'react-native-vector-icons/EvilIcons';
  import FontAwesome from 'react-native-vector-icons/FontAwesome';
 
  import { Color } from '../theme';
  import { getData } from '../API';
  
  const NotificationScreen = () => {
    const [notificationList, setNotificationList] = React.useState([]);
  
    const getNotificationList = async () => {
      const res = await getData('notificationlist/5');
  
      if (res.success) {
        setNotificationList(res?.data);
       }
    };
  
    useEffect(() => {
      getNotificationList();
    }, []);
  
    return (
      <ScrollView style={{backgroundColor: Color.white}}>
        <StatusBar
        barStyle="dark-content"
        hidden={false}
        backgroundColor={Color.primary}
        style="dark"
      />
        <View style={{paddingHorizontal:8}}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              padding: 15,
            }}>
            <Text style={{color: '#000', fontSize: 25, fontWeight: '600'}}>
              Notifications({notificationList.length})
            </Text>
            {/* <Text
              style={{
                color: '#1e90ff',
                fontSize: 15,
                justifyContent: 'center',
                alignSelf: 'center',
              }}>
              Marks all read
            </Text> */}
          </View>
  
          <FlatList
            keyExtractor={(item, index) => `key-${index}`}
            nestedScrollEnabled={true}
            data={notificationList}
            renderItem={({item, index}) => (
              <View style={styles.noti_container}>
                <View style={{padding:10, flexDirection: 'row'}}>
                  <View style={{flex:1}}>
                    <Text style={{color: '#fff', fontSize: 15}}>
                    {item.message}
                    </Text>
                    <Text style={{color: Color.red, fontSize: 12,alignSelf:'flex-end'}}>
                     {item.created_at}
                    </Text>
                  </View>
                </View>
              </View>
              
            )}
          />
        </View>
      </ScrollView>
    );
  };
  
  export default NotificationScreen;
  const styles = StyleSheet.create({
    InputField: {
      fontSize: 17,
      color: '#000',
      fontWeight: '500',
      padding: 2,
    },
    Rows: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: '10%',
    },
    dropdown: {
      margin: 16,
      height: 50,
      borderBottomColor: 'gray',
      borderBottomWidth: 0.5,
    },
    icon: {
      marginRight: 5,
    },
    placeholderStyle: {
      fontSize: 16,
    },
    selectedTextStyle: {
      fontSize: 16,
      color: '#000',
    },
    iconStyle: {
      width: 20,
      height: 20,
    },
    inputSearchStyle: {
      height: 40,
      fontSize: 16,
    },
    container: {
      backgroundColor: 'white',
      padding: 6,
      borderWidth: 1,
      marginTop: 10,
    },
    noti_container:{
      borderRadius:5,
      marginTop: 7,
      backgroundColor:Color.primary,
      elevation: 20,
  
      shadowOffset: {
        width: 0,
        height: 5,
      },
      shadowOpacity: 0.5,
      shadowRadius: 5.84,
      //backgroundColor: '#25CCF7',
      shadowColor: Color.white,
  
    }
  });
  