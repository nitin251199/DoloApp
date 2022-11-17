import {StyleSheet, Text, View, Image, ScrollView} from 'react-native';
import React, {useEffect} from 'react';
import {Color, Dimension, Fonts} from '../theme';
import ImageModal from 'react-native-image-modal';

const FeedbackDetails = ({navigation, route}) => {
  const feedback = route.params;
  const [feedbackImg, setFeedbackImg] = React.useState([]);
  const [description, setDescription] = React.useState('');
  const [createDate, setCreateDate] = React.useState('');

  console.log('route==', route.params);

  const fetchDetails = async () => {
    // let res = await getData(`doctor/profile/${docId}`);
    // console.log('doc profile', JSON.stringify(res));
    // if (res.success) {
    //   setAppointmentData(res.data);
    // }
    // console.log('appointment', appointment);
    setTimeout(() => {
      setFeedbackImg(feedback.img);
      setDescription(feedback.desc);
      setCreateDate(feedback.date);
    }, 100);
  };

  useEffect(() => {
    fetchDetails();
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={{paddingBottom: 30}} showsVerticalScrollIndicator={false}>
        <Text style={styles.heading}>Feedback Details. 📔</Text>
        <Text style={styles.desc_style}>{description}</Text>

        {feedbackImg.map((item, index) => {
          return (
            // <Image
            //   style={styles.img_style}
            //   source={{uri: `data:image/png;base64,${item}`}}
            // />
          <ImageModal
                             //resizeMode="contain"
                             modalImageResizeMode='contain'
                             modalImageStyle={{
                            //   height: 182,
                            //   width: 317,
                            //   borderRadius: 4,
                            height: 200,
                             width: 317,
                            
                            borderRadius: 10,
                            resizeMode: 'cover',
                            }}
                              style={{
                                // height: 182,
                                // width: 317,
                                // borderRadius: 4,
                                height: 200,
                                width: 317,
                                marginTop: 20,
                                borderRadius: 10,
                                resizeMode: 'cover',
                              }}
                              source={{uri: `data:image/png;base64,${item}`}}
                          /> 
          );
        })}
      </ScrollView>
    </View>
  );
};

export default FeedbackDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
  },
  heading: {
    fontSize: 22,
    color: '#000',
    fontFamily: Fonts.primaryBold,
    width: '100%',
  },
  desc_style: {
    fontSize: 16,
    color: Color.black,
    // fontWeight: '700',
    fontFamily: Fonts.primaryRegular,
    paddingTop: 10,
  },
  img_style: {
    height: 200,
    width: '100%',
    marginTop: 20,
    borderRadius: 10,
    resizeMode: 'cover',
  },
});
