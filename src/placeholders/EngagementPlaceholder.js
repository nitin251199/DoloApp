import {Dimensions, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

const {width} = Dimensions.get('window');

export default function EngagementPlaceholder() {
  return (
    <SkeletonPlaceholder borderRadius={4}>
      <SkeletonPlaceholder.Item flexDirection="row" alignItems="center">
        <SkeletonPlaceholder.Item
          width={width / 2 - 20}
          marginVertical={10}
          marginHorizontal={5}
          height={120}
          borderRadius={20}
        />
      </SkeletonPlaceholder.Item>
    </SkeletonPlaceholder>
  );
}

const styles = StyleSheet.create({
  itemContainer: {
    height: 120,
    // width: 200,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    overflow: 'hidden',
    borderRadius: 20,
    marginVertical: 10,
    marginHorizontal: 5,
  },
});
