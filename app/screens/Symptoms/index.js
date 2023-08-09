import Button from '@components/Button';
import HeaderBar from '@components/HeaderBar';
import { BaseColors, FontFamily } from '@config/theme';
import { Slider } from '@miblanchard/react-native-slider';
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  Platform,
  NativeEventEmitter,
  NativeModules,
  DeviceEventEmitter,
  Dimensions,
  InteractionManager,
} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import { FlatList } from 'react-native-gesture-handler';
import DeviceInfo from 'react-native-device-info';
import { captureScreen } from 'react-native-view-shot';
import styles from './styles';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { calculateScreenX, calculateScreenY, init } from '@utils/eyeTracking';
import { useSelector } from 'react-redux';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import axios from 'axios';
import { getDate } from '@utils/CommonFunction';
import BaseSetting from '@config/setting';

let MOVE_DOT = false;
let currentIndexEyeTracking = [];
let currentIndexStartTime = null;
let currentIndexEndTime = null;

const baseUrl = 'https://eyetracking.oculo.app';

const Symptoms = ({ navigation }) => {
  const [activeButtonIndex, setActiveButtonIndex] = useState(0);

  const [sliderValue, setSliderValue] = useState(1);

  /* AOI Code */
  const { calibration } = useSelector(state => {
    return state.eyeTracking;
  });
  const [dynamicDot, setDynamicDot] = useState(false);
  const tXValue = useSharedValue(-10);
  const tYValue = useSharedValue(-10);
  const [aoiXY, setAOIXY] = useState([]);
  const aoiRootView = useRef(null);
  const aoiRef = useRef(null);
  const aoiAnalytics = useState([]);
  const eyeTrackingPoints = useState([]);
  const [deviceName, setDeviceName] = useState(null);
  const [bgImageURI, setBgImageURI] = useState(null);

  /*
    TODO: 1 - Calculate and Push the Analytics
fixAOI	      = Total # of fixations b/w 200-500ms duration within AOI
Question: What if user looks at AOI for 5 Seconds? Will it consider 10 Fixation of 500ms? or 0 Fixation?
Currenly it's considering only if Fixation is b/w 200-500ms


viewed	      = fixAOI > = 2
fixDurAOI	    = Average total fixation duration within AOI
fixScreen	    = Total # of fixations @ 150 to 300 msec duration on screen
totalFixDur	  = Sum fixDurScreen
fixDurScreen	= t	Average fixation duration on screen


    TODO: 2 - Heatmap generation: In React JS
    TODO: 3 - Generating Sequence
    DONE: 4 - Playing Recording
            - Done: But just had delay in Replaying
  */

  const { userData } = useSelector(state => {
    return state.auth;
  });

  DeviceInfo.getDeviceName().then(dName => {
    setDeviceName(dName);
  });

  const buttons = [
    { id: 1, label: 'Headache', value: 1 },
    { id: 2, label: 'Neck Pain', value: 1 },
    { id: 2, label: 'Nausea', value: 1 },
  ];

  // Uploading Assessment Data to Server
  const handleUploadAssessmentData = async () => {
    console.log('Handle Assessment: Uploading');
    try {
      const apiUrl = `${baseUrl}/store-assessment`; // Replace with your API endpoint

      // Sample data to be uploaded (modify as needed)
      const formData = new FormData();
      formData.append('deviceBackgroundImage', {
        uri: bgImageURI,
        name: 'image.jpg',
        type: 'image/jpeg',
      });
      formData.append('assessmentId', Math.random().toString(36).substr(2, 10));
      formData.append(
        'userName',
        `${userData?.firstname} ${userData?.lastname}`,
      );
      formData.append('deviceModel', DeviceInfo.getModel());
      formData.append('deviceName', deviceName);
      formData.append('deviceSize', JSON.stringify(Dimensions.get('window')));
      formData.append(
        'aoiJson',
        JSON.stringify({ aoiXY, eyeData: currentIndexEyeTracking }),
      );
      formData.append('dateTime', getDate());

      console.log('Handle Assessment: Data', formData);

      // Make the POST request using Axios
      const response = await axios.post(apiUrl, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      // Handle the response from the server
      console.log('Handle Assessment: Response from server:', response.data);
    } catch (error) {
      // Handle any errors that occurred during the request
      console.error('Handle Assessment: Error uploading data:', error.message);
    }
  };

  // Handle On Symptom Change
  const handleSymptomChange = index => {
    if (buttons[index]) {
      currentIndexEndTime = getDate();

      // Upload the Assessment Data to Server
      handleUploadAssessmentData();
      currentIndexEyeTracking = [];
      setActiveButtonIndex(index);
    } else {
      Toast.show({
        text1: 'Assessment Completed.',
        type: 'success',
      });
    }
  };

  useEffect(() => {
    if (bgImageURI && !dynamicDot) {
      setDynamicDot(true);
    }
  }, [bgImageURI, dynamicDot]);

  // Let's call functions one by one
  useEffect(() => {
    const captureSS = () => {
      return new Promise((resolve, reject) => {
        console.log('Sym Called ===> Capture SS');
        captureScreen({
          format: 'jpg',
          quality: 0.7,
        }).then(
          uri => {
            console.log('Sym Called ===> Capture SS Done');
            // console.log('AOI XY Updated Image saved to', uri);
            setBgImageURI(uri);
            resolve(true);
          },
          error => {
            console.error('AOI XY Updated Image Oops, snapshot failed', error);
            resolve(false);
          },
        );
      });
    };

    const getViewMeasurements = async () => {
      return new Promise((resolve, reject) => {
        console.log('Sym Called ===> AOI XY Updated Component => ', aoiRef);
        if (aoiRef.current) {
          aoiRootView.current.measure(
            (rx, ry, rwidth, rheight, rpageX, rpageY) => {
              aoiRef.current.measure((x, y, width, height, pageX, pageY) => {
                console.log('Sym Called ===> XY Found');
                setAOIXY([
                  ...aoiXY,
                  {
                    index: activeButtonIndex,
                    x: {
                      rootStart: pageX - rpageX,
                      rootEnd: pageX - rpageX + width,
                      start: pageX,
                      end: pageX + width,
                      width: width,
                    },
                    y: {
                      rootStart: pageY - rpageY,
                      rootEnd: pageY - rpageY + height,
                      start: pageY,
                      end: pageY + height,
                      height: height,
                    },
                    screen: Dimensions.get('window'),
                    rootY: rpageY,
                  },
                ]);
                resolve(true);
              });
            },
          );
        }
      });
    };

    let subscription;

    const handleAOILayout = async () => {
      console.log('Sym Called ===> Start');
      await captureSS();

      console.log('Sym Called ===> Start 1');
      // Let's Init Eye Tracking
      await init();
      console.log('Sym Called ===> Start 2');
      await getViewMeasurements();
      console.log('Sym Called ===> Start 3');

      // Setup Emitter based on Device OS
      const emitter =
        Platform.OS === 'ios'
          ? new NativeEventEmitter(NativeModules.EyeTrackingEventEmitter)
          : DeviceEventEmitter;

      console.log('Calibration in Redux => ', calibration);

      // Let's listen to Tracking Event
      subscription = emitter.addListener('tracking', event => {
        console.log('Sym Called ==> Event Received');

        // ADDED For TESTING PURPOSE: Let's move the dot using Eye Gaze.
        if (MOVE_DOT) {
          const newXValue = calculateScreenX(
            event.centerEyeLookAtPoint.x,
            calibration,
            calibration.viewWidth,
          );
          const newYValue = calculateScreenY(
            event.centerEyeLookAtPoint.y,
            calibration,
            calibration.viewHeight,
          );

          // Let's move a fake red circle to test if Eye Tracking works or not
          if (!isNaN(newXValue) && !isNaN(newYValue)) {
            tXValue.value = newXValue;
            tYValue.value = newYValue;
            if (currentIndexStartTime == null) {
              currentIndexStartTime = getDate();
            }
            currentIndexEyeTracking.push({
              // ...event,
              screenX: newXValue,
              screenY: newYValue,
              time: new Date().getTime(),
              dateTime: getDate(),
            });
          }
        }
      });
      MOVE_DOT = true;
    };

    const focusSubscribe = navigation.addListener('focus', () => {
      // Waiting 1 Second to complete Screen Transitioning Animation
      setTimeout(() => {
        handleAOILayout();
      }, 1000);
    });

    // Let's clear all the data before going back
    const brSubscribe = navigation.addListener('beforeRemove', e => {
      MOVE_DOT = false;
      currentIndexEyeTracking = [];
      currentIndexStartTime = null;
      currentIndexEndTime = null;
    });

    return () => {
      subscription?.remove();
      focusSubscribe();
      brSubscribe();
    };
  }, [navigation]);

  // On Slider Change Value
  const handleValueChange = newValue => {
    setSliderValue(newValue);
  };

  return (
    <View style={styles.main}>
      <StatusBar barStyle="dark-content" translucent={true} />
      <HeaderBar
        HeaderText={'Symptoms'}
        HeaderCenter
        leftText="Cancel"
        leftBtnPress={() => {
          navigation.goBack();
        }}
      />
      <ScrollView
        contentContainerStyle={styles.scrollcontainer}
        showsVerticalScrollIndicator={false}
        ref={aoiRootView}
      >
        <>
          <View>
            <View>
              <FlatList
                data={buttons}
                horizontal
                showsHorizontalScrollIndicator={false}
                renderItem={({ item, index }) => (
                  <View style={styles.buttoncontainer}>
                    <TouchableOpacity
                      onPress={() => handleSymptomChange(index)}
                      style={[
                        {
                          backgroundColor:
                            activeButtonIndex === index
                              ? BaseColors.secondary
                              : BaseColors.inactive,
                        },
                        styles.yesbutton,
                      ]}
                      activeOpacity={BaseSetting.buttonOpacity}
                    >
                      <Text
                        style={{
                          color:
                            activeButtonIndex === index
                              ? BaseColors.white
                              : BaseColors.textColor,
                        }}
                      >
                        {item.label}
                      </Text>
                    </TouchableOpacity>
                  </View>
                )}
                keyExtractor={item => item.id}
              />
              <Text style={styles.yesText}>
                Please select the severity level you can also see the previous
                severity level.
              </Text>
              {buttons?.map((item, index) => {
                return (
                  index === activeButtonIndex && (
                    <>
                      <View
                        // onLayout={handleAOILayout}
                        ref={aoiRef}
                      >
                        <Text style={styles.boldText}>
                          Report the severity level of {buttons[index].label}:
                        </Text>
                        <View style={styles.sliderMarker}>
                          <Slider
                            value={sliderValue}
                            onValueChange={handleValueChange}
                            minimumValue={1}
                            maximumValue={8}
                            thumbStyle={styles.thumbStyle}
                            trackStyle={styles.trackStyle}
                            minimumTrackTintColor={BaseColors.primary}
                            maximumTrackTintColor={BaseColors.tabinActive}
                            thumbTintColor={BaseColors.white}
                            style={styles.slider}
                            step={1}
                          />
                          {/* Marker Vertical Lines */}
                          <View style={styles.markerContainer}>
                            {['', 0, 1, 2, 3, 4, 5, 6].map((marker, index) => (
                              <View
                                style={index === 0 ? null : styles.marker}
                                key={marker.toString()}
                              />
                            ))}
                          </View>
                        </View>

                        <View style={styles.markerContainerNumber}>
                          {['', 0, 1, 2, 3, 4, 5, 6].map((label, index) =>
                            index === 0 ? (
                              <Text key={label.toString()}>&nbsp;</Text>
                            ) : (
                              <Text
                                style={styles.sliderLabel}
                                key={label.toString()}
                              >
                                {label}
                              </Text>
                            ),
                          )}
                        </View>

                        <View>
                          <View style={styles.lables}>
                            <Text style={{ fontFamily: FontFamily?.light }}>
                              None
                            </Text>
                            <Text style={{ fontFamily: FontFamily?.light }}>
                              Mild
                            </Text>
                            <Text style={{ fontFamily: FontFamily?.light }}>
                              Moderate
                            </Text>
                            <Text style={{ fontFamily: FontFamily?.light }}>
                              Sever
                            </Text>
                          </View>
                        </View>
                      </View>
                      <View style={styles.topBox}>
                        <View style={styles.outer}>
                          <View style={styles.inner} />
                          <Text>Previous Assessment</Text>
                        </View>
                        <View style={styles.assessmentHead}>
                          <View style={styles.assessmentData} />
                          <Text>Current Assessment</Text>
                        </View>
                      </View>
                    </>
                  )
                );
              })}
            </View>
            <View style={styles.btnContainer}>
              <Button
                shape="round"
                title={'Next'}
                style={styles.signinbutton}
                onPress={() => {
                  handleSymptomChange(activeButtonIndex + 1);
                }}
              />
            </View>
          </View>

          <Animated.View
            style={useAnimatedStyle(() => {
              return {
                width: dynamicDot ? 20 : 0,
                height: dynamicDot ? 20 : 0,
                borderRadius: 10,
                backgroundColor: 'red',
                position: 'absolute',
                left: -20,
                top: -20,
                transform: [
                  {
                    translateX: tXValue.value,
                  },
                  {
                    translateY: tYValue.value,
                  },
                ],
              };
            })}
          />
        </>
      </ScrollView>
    </View>
  );
};

export default Symptoms;
