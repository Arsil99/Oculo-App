/* eslint-disable */
import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  StatusBar,
  Animated,
  Easing,
  DeviceEventEmitter,
  NativeModules,
  NativeEventEmitter,
  Platform,
  Image,
  Text,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import KeepAwake from 'react-native-keep-awake';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import EyeTracking from '@redux/reducers/eyeTracking/actions';
import { useDispatch } from 'react-redux';
import styles from './styles';
import HeaderBar from '@components/HeaderBar';
import { BaseColors } from '@config/theme';
import {
  init,
  stopTracking,
  calculateAveragePosition,
  calculateScreenX,
  calculateScreenY,
} from '@utils/eyeTracking';
import { Images } from '@config';
import Button from '@components/Button';

let lastPosition = 'CENTER';
let CALIBRATED_POSITIONS = {
  CENTER: { x: [], y: [] },
  TL: { x: [], y: [] },
  TR: { x: [], y: [] },
  BR: { x: [], y: [] },
  BL: { x: [], y: [] },
};
let ViewHeight = 0;
let ViewWidth = 0;
let TRACK_EYES = false;
let MOVE_DOT = false;
let timeoutVar = null;
let NATIVE_TRACK_STARTED = false;

const emptyCalibrations = {
  CENTER: null,
  TL: null,
  TR: null,
  BR: null,
  BL: null,
};

export default function CalibrationStart() {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const { setCalibration, resetCalibration } = EyeTracking;
  const dispatch = useDispatch();

  const animatedValue = useRef(new Animated.Value(0)).current;
  const tXValue = useRef(new Animated.Value(-10)).current;
  const tYValue = useRef(new Animated.Value(-10)).current;
  const [viewWidth, setViewWidth] = useState(0);
  const [viewHeight, setViewHeight] = useState(0);
  const [dynamicDot, setDynamicDot] = useState(false);
  const [caliStatus, setCaliStatus] = useState(false);
  const [nativeTracking, setNativeTracking] = useState(true);
  let [calibrations, setCalibrations] = useState(emptyCalibrations);

  //
  // DONE: 1. Listening Eye Gaze X and Y from Native Code to Javascript code: DONE:
  // DONE: 2. Upon Listener -> Map Eye Gaze X and Y to Calibrated Point: DONE:
  // DONE: 3. Once it's calibrated: Store to Redux: DONE:
  // TODO: 4. On Question Screens Define AOI: and Provide Example to calculate Data required for Analytics
  // TODO: 5. Anaylytics Data, Heatmap, Sequence to be tracked and sent to Backend: TASKS Added in Symptoms screen
  // DONE: 6. Restart Calibration option to be added
  // LATER: 7. Optimise Code
  // LATER: 8. Find if head is moved
  // LATER: 9. If Head is moved, then Eye Tracking will not be accurate

  // Let's stop Native Eye Tracking when user navigates back
  React.useEffect(() => {
    const unsubscribe = navigation.addListener('beforeRemove', e => {
      stopTracking();
    });
    return () => {
      unsubscribe();
    };
  }, [navigation]);

  // On Screen Init
  useEffect(() => {
    // Let's Keep the Screen wake
    KeepAwake.activate();

    // Define Track Listener Function
    const trackListener = event => {
      if (!caliStatus) {
        return;
      }
      // console.log('EyeTracking Event: Received event:', caliStatus, event);

      // Let's log X and Y for Calibration
      if (TRACK_EYES) {
        // Adding Eye Gaze X and Y to the Array of Calibrated Data
        CALIBRATED_POSITIONS[lastPosition].x.push(event.centerEyeLookAtPoint.x);
        CALIBRATED_POSITIONS[lastPosition].y.push(event.centerEyeLookAtPoint.y);
      }

      // ADDED For TESTING PURPOSE: Let's move the dot using Eye Gaze.
      if (MOVE_DOT) {
        console.log(
          'Moving Dot: ',
          event.centerEyeLookAtPoint.x,
          ViewWidth,
          'Y: ',
          event.centerEyeLookAtPoint.y,
          ViewHeight,
        );
        const newXValue = calculateScreenX(
          event.centerEyeLookAtPoint.x,
          CALIBRATED_POSITIONS,
          ViewWidth,
        );
        const newYValue = calculateScreenY(
          event.centerEyeLookAtPoint.y,
          CALIBRATED_POSITIONS,
          ViewHeight,
        );

        // Let's move a fake red circle to test if Eye Tracking works or not
        if (!isNaN(newXValue) && !isNaN(newYValue)) {
          tXValue.setValue(newXValue);
          tYValue.setValue(newYValue);
        }
      }
    };

    // Setup Emitter based on Device OS
    const emitter =
      Platform.OS === 'ios'
        ? new NativeEventEmitter(NativeModules.EyeTrackingEventEmitter)
        : DeviceEventEmitter;

    // Let's listen to Tracking Event
    const subscription = emitter.addListener('tracking', trackListener);

    return () => {
      subscription.remove();
    };
  }, [dispatch, tXValue, tYValue, caliStatus]);

  useEffect(() => {
    if (nativeTracking) {
      init();
      NATIVE_TRACK_STARTED = true;
    } else {
      stopTracking();
      NATIVE_TRACK_STARTED = false;
    }
    return () => {
      stopTracking();
      NATIVE_TRACK_STARTED = false;
    };
  }, [nativeTracking]);

  useEffect(() => {
    // Let's Start Calibration once we get the View's Height and Width
    console.log('View Width / Cali Status Updated : ', viewWidth, caliStatus);
    // Let's disable Start
    if (caliStatus) {
      if (viewWidth > 0) {
        // On Screen Init let's clear Redux
        dispatch(resetCalibration());
        TRACK_EYES = true;
        startCalibration();
      }
    } else {
      TRACK_EYES = false;
      stopCalibration();
    }
  }, [
    caliStatus,
    viewWidth,
    startCalibration,
    stopCalibration,
    dispatch,
    resetCalibration,
  ]);

  const nextCalibration = () => {
    const keys = Object.keys(calibrations);
    console.log('keys: ', keys);
    console.log('keys Cals: ', calibrations);

    for (const key of keys) {
      if (calibrations[key] === null) {
        return key;
      }
    }

    if (lastPosition !== 'CENTER') {
      TRACK_EYES = false;
      return 'CENTER';
    }

    return null;
  };

  // Function to handle going back and forward
  const handleNavigation = type => {
    console.log('Handle Navigation called');
    stopTracking();
    if (type === 'back') {
      navigation.goBack();
      Toast.show({
        text1: 'Calibration process interrupted.',
        // text2: 'Please restart to continue.',
        type: 'error',
      });
    }
  };

  // Function to update calibrations
  const updateCalibrations = (key, value) => {
    setCalibrations(prevCalibrations => {
      const newCons = {
        ...prevCalibrations,
        [key]: value,
      };
      calibrations = newCons;
      return newCons;
    });
  };

  const startCalibration = () => {
    const nextCalibrationPosition = nextCalibration();
    console.log('Next Calibration ==> ', nextCalibrationPosition);

    if (nextCalibrationPosition !== null) {
      // Let's move dot to next location
      lastPosition = nextCalibrationPosition;
      moveDot(nextCalibrationPosition);
      // Calculate Location X / Y of Eye Gaze
      updateCalibrations(nextCalibrationPosition, { left: 0, top: 0 });
      // console.log(calibrations);

      // Set Time Out then move to the next location
      timeoutVar = setTimeout(() => {
        startCalibration();
      }, 2000);
    } else {
      // Done! Let's go!
      // Navigate to the next screen
      console.log('All Calibrations Done');

      TRACK_EYES = false;
      console.log('Final Calibrations are: ', CALIBRATED_POSITIONS);
      const keys = Object.keys(calibrations);
      for (const key of keys) {
        if (CALIBRATED_POSITIONS[key] !== null) {
          const avgPos = calculateAveragePosition(
            CALIBRATED_POSITIONS[key].x,
            CALIBRATED_POSITIONS[key].y,
          );

          CALIBRATED_POSITIONS[key].avgX = avgPos.x;
          CALIBRATED_POSITIONS[key].avgY = avgPos.y;
          CALIBRATED_POSITIONS[key].dotX = positionArray[key].left;
          CALIBRATED_POSITIONS[key].dotY = positionArray[key].top;
        }
      }

      if (!CALIBRATED_POSITIONS.WIDTH) {
        CALIBRATED_POSITIONS.viewWidth = viewWidth;
        CALIBRATED_POSITIONS.viewHeight = viewHeight;
      }

      // Storing Calibrated Positions to Redux
      dispatch(setCalibration(CALIBRATED_POSITIONS));

      const testing = false;

      if (!testing) {
        console.log('Navigating to other screen');
        setCaliStatus(false);
        handleNavigation('other');
        navigation?.navigate('Symptoms');
        // Toast.show({
        //   text1: 'Calibrations Done Successfully!',
        //   type: 'success',
        // });
      } else {
        // Moving dot is used for Testing
        MOVE_DOT = true;
        setDynamicDot(true);
      }

      console.log('CALIBRATED_POSITIONS AVG', CALIBRATED_POSITIONS);
    }
  };

  const stopCalibration = () => {
    if (timeoutVar) {
      clearTimeout(timeoutVar);
    }
    CALIBRATED_POSITIONS = {
      CENTER: { x: [], y: [] },
      TL: { x: [], y: [] },
      TR: { x: [], y: [] },
      BR: { x: [], y: [] },
      BL: { x: [], y: [] },
    };
    TRACK_EYES = false;
    MOVE_DOT = false;
    calibrations = emptyCalibrations;
    // TODO: Fix setCalibration not working
    setCalibration(emptyCalibrations);
    tXValue.setValue(-10);
    tYValue.setValue(-10);
    setDynamicDot(false);
  };

  const onLayout = event => {
    const { width, height } = event.nativeEvent.layout;
    console.log('onLayout==> ', width, height);
    setViewWidth(width);
    ViewWidth = width;
    ViewHeight = height;
    setViewHeight(height);
  };

  const moveDot = position => {
    // Set Position Array
    const positionArray = {
      TL: {
        left: 0,
        top: 0,
      },
      TR: {
        left: viewWidth - 20,
        top: 10,
      },
      BL: {
        left: 0,
        top: viewHeight - 20,
      },
      BR: {
        left: viewWidth - 20,
        top: viewHeight - 20,
      },
      CENTER: {
        left: viewWidth / 2 - 10,
        top: viewHeight / 2 - 10,
      },
    };

    console.log('Position ==> ', position);
    console.log('Position Array ==> ', positionArray[position]);
    console.log('Position viewWidth ==> ', viewWidth);
    // Moving Dot
    TRACK_EYES = false;
    Animated.timing(tXValue, {
      toValue: positionArray[position].left,
      duration: 300,
      useNativeDriver: true,
      easing: Easing.linear,
    }).start(() => {
      TRACK_EYES = true;
    });
    Animated.timing(tYValue, {
      toValue: positionArray[position].top,
      duration: 300,
      useNativeDriver: true,
      easing: Easing.linear,
    }).start();
  };

  const dotStyle = {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: BaseColors.primary,
    position: 'absolute',
    transform: [
      {
        scale: animatedValue.interpolate({
          inputRange: [0, 0.5, 1],
          outputRange: [1, 1.5, 1], // Adjust the values to change the dot's path
        }),
      },
      {
        translateX: tXValue,
      },
      {
        translateY: tYValue,
      },
    ],
  };

  return (
    <View
      style={[
        styles.main,
        {
          backgroundColor: caliStatus ? BaseColors.black : '#0005',
          paddingBottom: insets.bottom,
        },
      ]}
    >
      <StatusBar
        backgroundColor={'#0000'}
        barStyle="light-content"
        translucent={true}
      />
      <HeaderBar
        HeaderText={caliStatus ? 'Follow the Red Dot' : 'Set Your Face'}
        isTransperant
        HeaderCenter
        leftText="Cancel"
        leftBtnPress={() => {
          console.log('Back pressed');
          handleNavigation('back');
        }}
        LeftTextStyle={{ color: BaseColors?.white }}
        rightText="Restart"
        rightBtnPress={() => {
          setCaliStatus(false);
          Toast.show({
            text1: 'Calibration will restart in 2 seconds!',
            type: 'success',
          });
          setTimeout(() => {
            setCaliStatus(true);
          }, 2000);
        }}
        rightTextStyle={{ color: BaseColors?.white }}
        HeaderTextStyle={{ color: BaseColors?.white }}
      />
      <View style={styles.dotContainer} onLayout={onLayout}>
        {!caliStatus && (
          <View
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 50,
              }}
            >
              <View style={[styles?.squareBorder]}>
                <Image
                  resizeMode="contain"
                  style={{ width: 160 }}
                  source={Images?.eyeLine}
                />
                <Text style={styles?.plusStyle}>+</Text>
              </View>
              <View style={{ paddingHorizontal: 20 }}>
                <Text style={styles?.bigtext}>Set Your Face Properly</Text>
                <Text
                  style={[
                    styles?.smalltext,
                    { fontSize: 18, marginBottom: 10 },
                  ]}
                >
                  Make sure your Eyes are near to White Dots Shown Above
                </Text>
                <Text style={styles?.smalltext}>
                  After calibration, Keep your face and device still.
                </Text>
              </View>
            </View>
            <Button
              shape="round"
              onPress={() => {
                Toast.show({
                  text1: 'Calibration will start in 2 seconds!',
                  type: 'success',
                });
                setTimeout(() => {
                  setCaliStatus(true);
                }, 2000);
              }}
              title={'Start Calibration Now'}
              style={styles.requestBtn}
            />
          </View>
        )}

        {caliStatus && <Animated.View style={dotStyle} />}
        {dynamicDot && (
          <Animated.View
            style={{
              width: 20,
              height: 20,
              borderRadius: 10,
              backgroundColor: 'red',
              position: 'absolute',
              left: 0,
              top: 0,
              transform: [
                {
                  translateX: tXValue,
                },
                {
                  translateY: tYValue,
                },
              ],
            }}
          />
        )}
      </View>
    </View>
  );
}
