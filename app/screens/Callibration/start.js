/* eslint-disable */
import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  StatusBar,
  DeviceEventEmitter,
  Image,
  Text,
} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  Easing,
  interpolate,
  Extrapolation,
  runOnJS
} from 'react-native-reanimated';
import * as Animatable from 'react-native-animatable';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import EyeTracking from '@redux/reducers/eyeTracking/actions';
import { useDispatch, useSelector } from 'react-redux';
import styles from './styles';
import HeaderBar from '@components/HeaderBar';
import { BaseColors } from '@config/theme';
import {
  init,
  stopTracking,
  calculateAveragePosition,
  calculateScreenX,
  calculateScreenY,
  ET_DEFAULTS,
  validateLighting,
} from '@utils/eyeTracking';
import { Images } from '@config';
import Button from '@components/Button';

Animatable.initializeRegistryWithDefinitions({
  customPulse: {
    from: {
      transform: [{ scale: 1 } ],
      backgroundColor: BaseColors.primaryBlue,
    },
    to: {
      transform: [ {scale: 1.2 }],
      backgroundColor: BaseColors.black,
    },
  }
});

let positionArray = {};
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

let lastEyeTrackEvent = null;

export default function CalibrationStart() {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const { setCalibration, resetCalibration } = EyeTracking;
  const { calibrationTime } = useSelector(state => {
    return state.eyeTracking;
  });
  const dispatch = useDispatch();

  const animatedValue = useSharedValue(0);
  const tXValue = useSharedValue(0);
  const tYValue = useSharedValue(0);
  const [viewWidth, setViewWidth] = useState(0);
  const [viewHeight, setViewHeight] = useState(0);
  const [showingToast, setShowingToast] = useState(false);
  const [dynamicDot, setDynamicDot] = useState(false);
  const [lightsPassed, setLightsPassed] = useState(false);
  const [caliStatus, setCaliStatus] = useState(true);
  const [nativeTracking, setNativeTracking] = useState(true);
  let [calibrations, setCalibrations] = useState(emptyCalibrations);
  // /* AOI Code */
  // const { calibration } = useSelector(state => {
  //   return state.eyeTracking;
  // });
  
  useEffect(() => {
    console.log('Lignt Passed Changed to', lightsPassed);
    if (lightsPassed) {
      console.log('TRACK_EYES => YES');
      TRACK_EYES = true;
      startCalibration();
    }
  }, [lightsPassed, startCalibration])

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
  useFocusEffect(
    React.useCallback(() => {
      // Define Track Listener Function
      const trackListener = event => {
        lastEyeTrackEvent = event;
        // console.log('Track Listener Function: ==> ', TRACK_EYES, event);
        // EyeTrackingCmp.setDebugInfo(event);
        if (!caliStatus) {
          return;
        }

        // Let's log X and Y for Calibration
        if (TRACK_EYES) {
          // Adding Eye Gaze X and Y to the Array of Calibrated Data
          CALIBRATED_POSITIONS[lastPosition].x.push(event.centerEyeLookAtPoint.x);
          CALIBRATED_POSITIONS[lastPosition].y.push(event.centerEyeLookAtPoint.y);
        }

        // ADDED For TESTING PURPOSE: Let's move the dot using Eye Gaze.
        if (MOVE_DOT) {
          // console.log(
          //   'Moving Dot: ',
          //   event.centerEyeLookAtPoint.x,
          //   ViewWidth,
          //   'Y: ',
          //   event.centerEyeLookAtPoint.y,
          //   ViewHeight,
          //   CALIBRATED_POSITIONS
          // );
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
            tXValue.value = newXValue;
            tYValue.value = newYValue;
          }
        }
      };

      // Let's listen to Tracking Event
      const subscription = DeviceEventEmitter.addListener('eyeTrackingEvent', trackListener);

      return () => {
        subscription.remove();
      };
    }, [dispatch, tXValue, tYValue, caliStatus, startCalibration, lightsPassed, viewWidth, lastPosition, TRACK_EYES])
  );

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
        console.log('TRACK_EYES => YES');
        TRACK_EYES = true;
        startCalibration();
      }
    } else {
      console.log('TRACK_EYES => NO');
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
    console.log('nextCalibration => keys: ', keys);
    console.log('nextCalibration => keys Cals: ', calibrations);

    for (const key of keys) {
      if (calibrations[key] === null) {
        return key;
      }
    }

    if (lastPosition !== 'CENTER') {
      console.log('nextCalibration => TRACK_EYES => NO');
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
    console.log('startCalibration => started', lightsPassed);
    // First time let's check the lighting
    if (!lightsPassed) {
      if (!showingToast) {
        Toast.show({
          text1: ET_DEFAULTS.messages.ambientLightInfo,
          type: 'info',
          autoHide: false
        });
        setShowingToast(true);
      }
      if (lastEyeTrackEvent) {
        const lightValidation = validateLighting(lastEyeTrackEvent.light);
        console.log('startCalibration =>lightValidation ==> ', lightValidation);
        if (lightValidation && lightValidation.status === 'Moderate' || lightValidation.status == 'Good') {
          console.log('startCalibration =>Light Validation Passed ==> ');
          setLightsPassed(true);
          Toast.hide();
          Toast.show({
            text1: lightValidation.message,
            type: 'success',
          });
        } else {
          Toast.hide();
          Toast.show({
            text1: lightValidation.message,
            type: 'error',
          });
          timeoutVar = setTimeout(() => {
            startCalibration();
          }, 1000);
        }
      } else {
        timeoutVar = setTimeout(() => {
          startCalibration();
        }, 500);
      }
      return;
    }

    const nextCalibrationPosition = nextCalibration();
    console.log('startCalibration =>Next Calibration ==> ', nextCalibrationPosition);

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
      }, parseInt(calibrationTime) || 2000);
    } else {
      // Done! Let's go!
      // Navigate to the next screen
      console.log('startCalibration =>All Calibrations Done');
      console.log('startCalibration =>TRACK_EYES => NO');
      TRACK_EYES = false;
      console.log('startCalibration =>Final Calibrations are: ', CALIBRATED_POSITIONS);
      const keys = Object.keys(calibrations);
      for (const key of keys) {
        if (CALIBRATED_POSITIONS[key] !== null && positionArray[key] && positionArray[key].left) {
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
        console.log('startCalibration =>Navigating to other screen');
        setCaliStatus(false);
        handleNavigation('other');
        navigation?.navigate('Symptoms' , { event_id: 126 });
        // Toast.show({
        //   text1: 'Calibrations Done Successfully!',
        //   type: 'success',
        // });
      } else {
        // Moving dot is used for Testing
        MOVE_DOT = true;
        setDynamicDot(true);
      }

      console.log('startCalibration =>CALIBRATED_POSITIONS AVG', CALIBRATED_POSITIONS);
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
    console.log('TRACK_EYES => NO');
    TRACK_EYES = false;
    MOVE_DOT = false;
    calibrations = emptyCalibrations;
    // TODO: Fix setCalibration not working
    setCalibration(emptyCalibrations);
    tXValue.value = -10;
    tYValue.value = -10;
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

  const setTrackingTrue = () => {
    TRACK_EYES = true;
  }

  const moveDot = position => {
    // Set Position Array
    positionArray = {
      TL: {
        left: ET_DEFAULTS.pL,
        top: ET_DEFAULTS.pT,
      },
      TR: {
        left: viewWidth - (ET_DEFAULTS.dot_width + ET_DEFAULTS.pR),
        top: ET_DEFAULTS.pT,
      },
      BL: {
        left: ET_DEFAULTS.pL,
        top: viewHeight - ET_DEFAULTS.dot_height,
      },
      BR: {
        left: viewWidth - (ET_DEFAULTS.dot_width + ET_DEFAULTS.pR),
        top: viewHeight - ET_DEFAULTS.dot_height,
      },
      CENTER: {
        left: viewWidth / 2 - (ET_DEFAULTS.dot_width/2),
        top: viewHeight / 2 - (ET_DEFAULTS.dot_height/2),
      },
    }
    console.log('Position ==> ', position);
    if (!positionArray[position]) {
      Toast.show({
        text1: 'Dot Positions are nnot set correctly.',
        type: 'error',
      });
      return;
    }
    console.log('Position Array ==> ', positionArray[position]);
    console.log('Position viewWidth ==> ', viewWidth);
    console.log('T_DEFAULTS.width + ET_DEFAULTS.pL => ', (ET_DEFAULTS.dot_width + ET_DEFAULTS.pL))
    // Moving Dot
    console.log('TRACK_EYES => NO');
    TRACK_EYES = false;
    tXValue.value = withTiming(positionArray[position].left, {
      duration: 300,
      easing: Easing.linear,
    }, (finished) => {
      if (finished) {
        runOnJS(setTrackingTrue)();
      }
    });
    
    tYValue.value = withTiming(positionArray[position].top, {
      duration: 300,
      easing: Easing.linear,
    });
  };

  const blueDotStyle = {
      width: ET_DEFAULTS.cali.caliBigDotSize,
      height: ET_DEFAULTS.cali.caliBigDotSize,
      borderRadius: ET_DEFAULTS.cali.caliBigDotSize/2,
      backgroundColor: BaseColors.primary,
      alignItems: 'center',
      justifyContent: 'center',
      position: 'absolute',
  };

  const blueDotAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: interpolate(animatedValue.value, [0, 0.5, 1], [1, 1.5, 1], {
            extrapolateRight: Extrapolation.CLAMP,
          }
          ),
        },
        {
          translateX: tXValue.value,
        },
        {
          translateY: tYValue.value,
        },
      ],
    }
    });

  const dotAnimatedStyle = useAnimatedStyle(() =>  { 
    return {
      transform: [
        {
          translateX: tXValue.value,
        },
        {
          translateY: tYValue.value,
        },
      ],
    }
  });

  return (
    <View
      style={[
        styles.main,
        {
          // backgroundColor: caliStatus ? BaseColors.borderColor : '#0005',
          backgroundColor: '#0001',
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
        HeaderText={caliStatus ? 'Calibration' : 'Set Your Face'}
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

        {caliStatus && !dynamicDot && <Animated.View style={[blueDotStyle, blueDotAnimatedStyle]} >
            <Animatable.View
              style={styles.smallDotStyle}
              animation="customPulse"
              direction='alternate'
              easing="ease-in-out"
              iterationCount="infinite"
              duration={400}
            />
          </Animated.View>}
        {dynamicDot && (
          <Animated.View
            style={[{
              width: 20,
              height: 20,
              borderRadius: 10,
              backgroundColor: 'red',
              position: 'absolute',
              left: 0,
              top: 0,
            },
            dotAnimatedStyle
          ]}
          />
        )}
        {dynamicDot && positionArray.TL && positionArray.TL.left &&
        (<>
          <Animated.View style={[{ transform: [ {translateX: positionArray.TL.left},{translateY: positionArray.TL.top} ]}, blueDotStyle]} >
              <View
                style={styles.smallDotStyle}
              />
          </Animated.View>
          <Animated.View style={[blueDotStyle, { transform: [ {translateX: positionArray.TR.left},{translateY: positionArray.TR.top} ]}]} >
              <View
                style={styles.smallDotStyle}
              />
          </Animated.View>
          <Animated.View style={[blueDotStyle, { transform: [ {translateX: positionArray.BL.left},{translateY: positionArray.BL.top} ]}]} >
              <View
                style={styles.smallDotStyle}
              />
          </Animated.View>
          <Animated.View style={[blueDotStyle, { transform: [ {translateX: positionArray.BR.left},{translateY: positionArray.BR.top} ]}]} >
              <View
                style={styles.smallDotStyle}
              />
          </Animated.View>
        </>)}
      </View>
    </View>
  );
}
