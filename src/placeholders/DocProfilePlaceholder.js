import React from 'react';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import {Dimensions, View} from 'react-native';

const {width} = Dimensions.get('window');

export default function DocProfilePlaceholder() {
  return (
    <SkeletonPlaceholder borderRadius={4}>
      <SkeletonPlaceholder.Item flexDirection="row" alignItems="center">
        <SkeletonPlaceholder.Item width={120} height={180} borderRadius={20} />
        <SkeletonPlaceholder.Item marginLeft={20} flexDirection="column">
          <SkeletonPlaceholder.Item width={210} height={40} />
          <SkeletonPlaceholder.Item
            marginTop={10}
            flexDirection="row"
            alignItems="center">
            <SkeletonPlaceholder.Item margin={10} width={40} height={40} />
            <SkeletonPlaceholder.Item width={100} height={40} />
          </SkeletonPlaceholder.Item>
          <SkeletonPlaceholder.Item flexDirection="row" alignItems="center">
            <SkeletonPlaceholder.Item margin={10} width={40} height={40} />
            <SkeletonPlaceholder.Item width={100} height={40} />
          </SkeletonPlaceholder.Item>
        </SkeletonPlaceholder.Item>
      </SkeletonPlaceholder.Item>
    </SkeletonPlaceholder>
  );
}
