import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import {Color, Fonts} from '../theme';
import {dummyRating} from './test';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {ActivityIndicator, ProgressBar} from 'react-native-paper';
import {useSelector} from 'react-redux';
import {getData} from '../API';

export default function FeedbackScreen() {
  const finalRating = feedbacks => {
    return feedbacks.reduce((a, b) => a + b.rating, 0) / feedbacks.length || 0;
  };

  const user = useSelector(state => state.user);

  const [feedbacks, setFeedbacks] = React.useState([]);
  const [overAllRating, setOverAllRating] = React.useState(finalRating([]));
  const [color, setColor] = React.useState('green');
  const [loading, setLoading] = React.useState(true);

  const fetchAllFeedbacks = async () => {
    const res = await getData(`doctorfeedback/${user?.userid}`);
    if (res.success) {
      setFeedbacks(res?.data);
      setOverAllRating(finalRating(res?.data));
    }
    setLoading(false);
  };

  useEffect(() => {
    if (overAllRating <= 3) {
      setColor('red');
    } else if (overAllRating <= 4) {
      setColor('orange');
    } else {
      setColor('green');
    }
  }, [overAllRating]);

  useEffect(() => {
    fetchAllFeedbacks();
  }, []);

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
      <Text style={{...styles.rating, color: color}}>
        {loading ? (
          <ActivityIndicator
            animating={loading}
            size="large"
            color={Color.primary}
          />
        ) : (
          overAllRating
        )}
      </Text>
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
                  <Text style={styles.feedbackRating}>
                    {item.date.split(' ')[0]}
                  </Text>
                </View>
                <Text style={styles.feedbackText}>{item.description}</Text>
                <Text style={styles.feedbackName}>{item.patient_name}</Text>
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
