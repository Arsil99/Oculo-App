import React, { useState } from 'react';
import {
  Dimensions,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import styles from './styles';
import Animated, {
  SlideInLeft,
  SlideOutLeft,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { formatObjectValues } from '@utils/eyeTracking';

const ACTION_BTN_WIDTH = Dimensions.get('window').width - 60;

export default function DebugBar(props) {
  const [isHidden, setIsHidden] = useState(false);
  const offset = useSharedValue(0); // animation value
  console.log('debugData ==> ', props.debugData);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: offset.value }],
    };
  });

  const hideBar = () => {
    offset.value = withTiming(-ACTION_BTN_WIDTH); // assume the width of the debug bar is 250
    setIsHidden(true);
  };

  const showBar = () => {
    offset.value = withTiming(0);
    setIsHidden(false);
  };

  return (
    <Animated.View
      entering={SlideInLeft}
      exiting={SlideOutLeft}
      style={[styles.debugBar, animatedStyle]}
    >
      <ScrollView style={styles.infoScroll}>
        <View style={styles.infoRow}>
          <View>
            <Text style={styles.dlabel}>Light</Text>
            <Text style={styles.dvalue}>
              {props.debugData.light ? props.debugData.light.toFixed(4) : '-'}
            </Text>
          </View>
          <View>
            <Text style={styles.dlabel}>Face Rot</Text>
            <Text style={styles.dvalue}>
              {formatObjectValues(props.debugData.faceRotation) || '-'}
            </Text>
          </View>
          <View>
            <Text style={styles.dlabel}>Device Rot</Text>
            <Text style={styles.dvalue}>
              {formatObjectValues(props.debugData.deviceRotation) || '-'}
            </Text>
          </View>
          <View>
            <Text style={styles.dlabel}>Face Dist</Text>
            <Text style={styles.dvalue}>
              {props.debugData.rightEyeDistance
                ? props.debugData.rightEyeDistance.toFixed(4)
                : '-'}
            </Text>
          </View>
        </View>
        <View style={styles.infoRow}>
          <View>
            <Text style={styles.dlabel}>Last Updated</Text>
            <Text style={styles.dvalue}>
              {props.debugData.timestamp || '-'}
            </Text>
          </View>
        </View>
      </ScrollView>
      <View style={styles.dActions}>
        <TouchableOpacity onPress={isHidden ? showBar : hideBar}>
          <Text style={[styles.dvalue, styles.actionHide]}>
            {isHidden ? 'Show' : 'Hide'}
          </Text>
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
}
