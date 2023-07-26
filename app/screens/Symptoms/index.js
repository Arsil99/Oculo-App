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
import { captureScreen } from 'react-native-view-shot';
import SocketIOClient from 'socket.io-client';
import styles from './styles';
import BaseSetting from '@config/setting';
import Symptom from '@components/Symptom';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { calculateScreenX, calculateScreenY } from '@utils/eyeTracking';
import { useSelector } from 'react-redux';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import axios from 'axios';

let MOVE_DOT = false;
let currentIndexEyeTracking = [];
let currentIndexStartTime = null;
let currentIndexEndTime = null;
const socket = SocketIOClient('http://krunal.local:4000');

const Symptoms = ({ navigation }) => {
  const [activeButtonIndex, setActiveButtonIndex] = useState(0);

  const buttons = [
    { id: 1, label: 'Headache', value: 1 },
    { id: 2, label: 'Neck Pain', value: 1 },
    { id: 2, label: 'Nausea', value: 1 },
  ];

  const handleSymptomChange = index => {
    if (buttons[index]) {
      currentIndexEndTime = new Date().toLocaleString('en-GB', {
        timeZone: 'asia/calcutta',
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        fractionalSecondDigits: 3,
      });

      console.log('Button Index Change: Eye Data ', currentIndexEyeTracking);
      console.log(
        'Button Index Change: Eye Data ',
        currentIndexEndTime,
        currentIndexStartTime,
      );
      socket.emit('trackingData', currentIndexEyeTracking);
      console.log('Button Index Change: AOI ', aoiXY);
      currentIndexEyeTracking = [];
      setActiveButtonIndex(index);
    } else {
      Toast.show({
        text1: 'Assessment Completed.',
        type: 'success',
      });
    }
  };

  const [sliderValue, setSliderValue] = useState(1);

  /* AOI Code */
  const { calibration } = useSelector(state => {
    return state.eyeTracking;
  });
  const [dynamicDot, setDynamicDot] = useState(true);
  const tXValue = useSharedValue(-10);
  const tYValue = useSharedValue(-10);
  const [aoiXY, setAOIXY] = useState([]);
  const aoiRootView = useRef(null);
  const aoiRef = useRef(null);
  const aoiAnalytics = useState([]);
  const eyeTrackingPoints = useState([]);

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

  useEffect(() => {
    console.log('Symptoms useEffect => Init');
    const onConnect = () => {
      console.log('SOCKET ==> Connected to server');
      socket.emit('calibration', calibration);
      socket.emit('deviceSize', Dimensions.get('window'));
    };

    const onDisconnect = () => {
      console.log('SOCKET ==> Disconnected from server');
    };

    socket.on('connect', onConnect);

    socket.on('disconnect', onDisconnect);

    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
    };
  }, [calibration, dynamicDot, tXValue, tYValue]);

  useEffect(() => {
    console.log('AOI XY Updated ==> ', aoiXY);
    socket.emit('aoiXY', aoiXY);
  }, [aoiXY]);

  useEffect(() => {
    console.log('Sym Called ===>');

    const captureSS = async () => {
      return new Promise((resolve, reject) => {
        console.log('Sym Called ===> Capture SS');
        captureScreen({
          format: 'jpg',
          quality: 0.7,
        }).then(
          uri => {
            console.log('Sym Called ===> Capture SS Done');
            // console.log('AOI XY Updated Image saved to', uri);
            const formData = new FormData();
            formData.append('image', {
              uri: uri,
              name: 'image.jpg',
              type: 'image/jpeg',
            });

            axios
              .post('http://krunal.local:4000/bg', formData, {
                headers: {
                  'Content-Type': 'multipart/form-data',
                },
              })
              .then(response => {
                console.log('Sym Called ===> Capture SS Uploaded');
                // Handle success
                setTimeout(() => {
                  resolve(true);
                }, 100);
              })
              .catch(error => {
                // Handle error
                reject(error);
                console.log('Sym Called ===> Capture SS Error');
              });
          },
          error =>
            console.error('AOI XY Updated Image Oops, snapshot failed', error),
        );
      });
    };

    const getViewMeasurements = async () => {
      return new Promise((resolve, reject) => {
        console.log('Sym Called ===> AOI XY Updated Component => ', aoiRef);
        if (aoiRef.current) {
          aoiRootView.current.measure(
            (rx, ry, rwidth, rheight, rpageX, rpageY) => {
              // console.log(
              //   'AOI XY Updated RootView X:',
              //   'Page X: ',
              //   rpageX,
              //   ' Page Y: ',
              //   rpageY,
              //   'rheight: ',
              //   rheight,
              //   'rwidth: ',
              //   rwidth,
              // );
              aoiRef.current.measure((x, y, width, height, pageX, pageY) => {
                // console.log(
                //   'AOI XY Updated Component X:',
                //   'Width: ',
                //   width,
                //   'Height: ',
                //   height,
                //   'Page X: ',
                //   pageX,
                //   ' Page Y: ',
                //   pageY,
                // );
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
      // InteractionManager.runAfterInteractions(async () => {
      //   await captureSS();
      // });
      console.log('Sym Called ===> Start 1');
      await InteractionManager.runAfterInteractions(async () => {
        return Promise(async (resolve, reject) => {
          await getViewMeasurements();
          resolve(true);
        });
      });
      console.log('Sym Called ===> Start 2');

      // Setup Emitter based on Device OS
      const emitter =
        Platform.OS === 'ios'
          ? new NativeEventEmitter(NativeModules.EyeTrackingEventEmitter)
          : DeviceEventEmitter;

      console.log('Calibration in Redux => ', calibration);

      // Let's listen to Tracking Event
      subscription = emitter.addListener('tracking', event => {
        console.log('Sym Called ==> Event Received');
        // Let's log X and Y for Calibration
        // if (TRACK_EYES) {
        //   // Adding Eye Gaze X and Y to the Array of Calibrated Data
        //   CALIBRATED_POSITIONS[lastPosition].x.push(event.centerEyeLookAtPoint.x);
        //   CALIBRATED_POSITIONS[lastPosition].y.push(event.centerEyeLookAtPoint.y);
        // }

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
              currentIndexStartTime = new Date().toLocaleString('en-GB', {
                timeZone: 'asia/calcutta',
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                fractionalSecondDigits: 3,
              });
            }
            currentIndexEyeTracking.push({
              // ...event,
              screenX: newXValue,
              screenY: newYValue,
              time: new Date().getTime(),
              dateTime: new Date()
                .toLocaleString('en-GB', {
                  timeZone: 'asia/calcutta',
                  day: '2-digit',
                  month: '2-digit',
                  year: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                  second: '2-digit',
                  fractionalSecondDigits: 3,
                })
                .replace(',', ''),
            });
          }
        }
      });
      MOVE_DOT = true;
    };

    const unsubscribe = navigation.addListener('focus', () => {
      setTimeout(() => {
        handleAOILayout();
      }, 1000);
    });

    return () => {
      subscription?.remove();
      unsubscribe();
    };
  }, [navigation]);

  // Let's clear data before going back
  React.useEffect(() => {
    const unsubscribe = navigation.addListener('beforeRemove', e => {
      MOVE_DOT = false;
      currentIndexEyeTracking = [];
      currentIndexStartTime = null;
      currentIndexEndTime = null;
    });
    return () => {
      unsubscribe();
    };
  }, [navigation]);

  const handleValueChange = newValue => {
    setSliderValue(newValue);
  };
  const [showContent, setShowContent] = useState(false);

  const handleNextPress = () => {
    setShowContent(true);
  };

  return (
    <View style={styles.main}>
      <StatusBar barStyle="dark-content" translucent={false} />
      <HeaderBar
        HeaderText={'Symptoms'}
        HeaderCenter
        leftText={showContent ? 'Cancel' : 'Back'}
        leftBtnPress={() => {
          navigation.goBack();
        }}
      />

      {showContent ? (
        <ScrollView
          contentContainerStyle={styles.scrollcontainer}
          showsVerticalScrollIndicator={false}
          ref={aoiRootView}
        >
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
              />
            </View>
          </View>
        </ScrollView>
      ) : (
        <Symptom handleNextPress={handleNextPress} />
      )}
    </View>
  );
};

export default Symptoms;
