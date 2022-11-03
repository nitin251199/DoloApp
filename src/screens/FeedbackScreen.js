import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import {Color, Fonts} from '../theme';
import {dummyRating} from './test';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {ProgressBar} from 'react-native-paper';

export default function FeedbackScreen() {
  const finalRating = () => {
    return dummyRating.reduce((a, b) => a + b.rating, 0) / dummyRating.length;
  };

  const [feedbacks, setFeedbacks] = React.useState(dummyRating);
  const [overAllRating, setOverAllRating] = React.useState(finalRating());
  const [color, setColor] = React.useState('green');

  useEffect(() => {
    if (overAllRating <= 3) {
      setColor('red');
    } else if (overAllRating <= 4) {
      setColor('orange');
    } else {
      setColor('green');
    }
  }, [overAllRating]);

  const getProgress = rating => {
    return feedbacks.length
      ? feedbacks.filter(item => item.rating == rating).length /
          feedbacks.length
      : 0;
  };

  const getColor = rating => {
    if (rating <= 2) {
      return 'red';
    } else if (rating < 4) {
      return 'orange';
    } else {
      return 'green';
    }
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{
        paddingBottom: 30,
      }}>
      <Text style={styles.title}>Your Overall Rating</Text>
      <Text style={{...styles.rating, color: color}}>{overAllRating}</Text>
      <View>
        {[5, 4, 3, 2, 1].map(count => {
          return (
            <View style={styles.ratingBar}>
              <Text style={styles.ratingText}>{count}</Text>
              <View
                style={{
                  flex: 1,
                  paddingHorizontal: 20,
                }}>
                <ProgressBar
                  progress={getProgress(count)}
                  color={getColor(count)}
                />
              </View>
              <Text style={styles.ratingCount}>
                ({feedbacks.filter(item => item.rating == count).length})
              </Text>
            </View>
          );
        })}
      </View>
      <View style={{marginTop: 20}}>
        <Text style={styles.title}>Your Feedbacks</Text>
        {feedbacks.map((item, index) => {
          return (
            <View style={styles.feedback}>
              <View
                style={{
                  flex: 1,
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}>
                    {[1, 2, 3, 4, 5].map(count => {
                      return (
                        <MaterialCommunityIcons
                          name="star"
                          size={20}
                          color={count <= item.rating ? 'orange' : 'grey'}
                        />
                      );
                    })}
                  </View>
                  <Text style={styles.feedbackRating}>{item.date}</Text>
                </View>
                <Text style={styles.feedbackText}>
                  {item.feedback}
                </Text>
                <Text style={styles.feedbackName}>{item.name}</Text>
              </View>
            </View>
          );
        })}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontFamily: Fonts.primarySemiBold,
    color: Color.black,
  },
  rating: {
    fontSize: 88,
    fontFamily: Fonts.primarySemiBold,
    color: Color.green,
    lineHeight: 88 * 1.4,
    textAlign: 'center',
  },
  ratingBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    alignItems: 'center',
  },
  ratingText: {
    fontSize: 20,
    fontFamily: Fonts.primarySemiBold,
    color: Color.black,
  },
  ratingCount: {
    fontSize: 18,
    fontFamily: Fonts.primaryRegular,
    color: Color.black,
  },
  feedback: {
    marginVertical: 10,
    paddingHorizontal: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  feedbackText: {
    fontFamily: Fonts.primarySemiBold,
    fontSize: 15,
    color: Color.black,
    marginVertical: 5,
  },
  feedbackName: {
    fontFamily: Fonts.primaryRegular,
    color: Color.gray,
    fontSize: 12,
  },
  feedbackRating: {
    fontFamily: Fonts.primaryRegular,
    color: Color.grey,
    textAlign: 'right',
  },
});
