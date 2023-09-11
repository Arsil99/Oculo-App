import Button from '@components/Button';
import HeaderBar from '@components/HeaderBar';
import { BaseColors, FontFamily } from '@config/theme';
import { Slider } from '@miblanchard/react-native-slider';
import React, { useEffect, useRef, useState } from 'react';
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
  BackHandler,
  Modal,
  ActivityIndicator,
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
import { getApiData } from '@utils/apiHelper';
import LabeledInput from '@components/LabeledInput';
import { isEmpty } from 'lodash';

let MOVE_DOT = true;
let currentIndexEyeTracking = [];
let currentIndexStartTime = null;
let currentIndexEndTime = null;

const baseUrl = 'https://eyetracking.oculo.app';

const Symptoms = ({ navigation, route }) => {
  const { darkmode } = useSelector(state => state.auth);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const eventId = route?.params?.event_id;
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
  const [tag, setTag] = useState([]);
  const [symptomArray, setSymptomArray] = useState([]);
  const [takeBoolean, setTakeBoolean] = useState(false);
  const flatListRef = useRef(null);
  const [meta, setMeta] = useState([]);
  const [patient_question, set_patient_question] = useState([]);
  const [boolQuestion, setBoolQuestion] = useState([]);
  const [inputQuestion, setInputQuestion] = useState([]);
  const [activeIndexes, setActiveIndexes] = useState([]);
  const [text, setText] = useState('');
  const [textErrObj, setTextErrObj] = useState({ error: false, msg: '' });
  const [validBool, setValidBool] = useState(true);
  const [physical, setPhysical] = useState(0);
  const [mental, setMental] = useState(0);
  const [percentage, setPercentage] = useState(0);
  const [head, setHead] = useState([]);
  const [pressureHead, setPressureHead] = useState([]);
  const [neckPain, setNeckPain] = useState([]);
  const [nauSea, setNausea] = useState([]);
  const [dizz, setDizz] = useState([]);
  const [blurred, setBlurred] = useState([]);
  const [balance, setBalance] = useState([]);
  const [sensitiveLight, setSensitiveLight] = useState([]);
  const [sensitiveNoise, setSensitiveNoise] = useState([]);
  const [feelingSlowed, setFeelingSlowed] = useState([]);
  const [feelingLike, setFeelingLike] = useState([]);
  const [feelRight, setFeelRight] = useState([]);
  const [difficultyCon, setDifficultyCon] = useState([]);
  const [difficultyRem, setDifficultyRem] = useState([]);
  const [low, setLow] = useState([]);
  const [confusion, setConfusion] = useState([]);
  const [draw, setDraw] = useState([]);
  const [emotional, setEmotional] = useState([]);
  const [irritable, setIrritable] = useState([]);
  const [sad, setSad] = useState([]);
  const [nervous, setNervous] = useState([]);
  const [trouble, setTrouble] = useState([]);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [loading, setLoading] = useState(true);
  const [next, setNext] = useState(0);
  const [validPhysical, setValidPhysical] = useState(false);
  const [vaildMental, setValidMental] = useState(false);
  const [timer, setTimer] = useState([0, 0, 0]);
  const stateArray = [
    head,
    pressureHead,
    neckPain,
    nauSea,
    dizz,
    blurred,
    balance,
    sensitiveLight,
    sensitiveNoise,
    feelingSlowed,
    feelingLike,
    feelRight,
    difficultyCon,
    difficultyRem,
    low,
    confusion,
    draw,
    emotional,
    irritable,
    sad,
    nervous,
    trouble,
  ];
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



    NEW TODO on 31st JULY
    TODO: 1 - Reduce the size of Calibration data. Try with 10 Seconds, 30 Seconds, 1 Minutes, 2 Minutes, 3 Minutes
    TODO: 2 - How are we rendering the correct sized static mobile screen?
    TODO: 3 - Documentation of Eye Tracking
  */

  const { userData } = useSelector(state => {
    return state.auth;
  });

  DeviceInfo.getDeviceName().then(dName => {
    setDeviceName(dName);
  });

  useEffect(() => {
    QuestionListAPI();
  }, []);

  const [prevTag, setPrevTag] = useState([]);
  // display the questions list
  const QuestionListAPI = async () => {
    const endPoint = `${BaseSetting.endpoints.questionList}?event_type=5&list=a&event_id=${eventId}`;
    try {
      const res = await getApiData(`${endPoint}`, 'GET');

      if (res?.status) {
        const questionsArray = [];
        const metaName = [];
        const p_question = [];
        const boolQue = [];
        const inputQue = [];
        const prevTagArray = [];
        for (let i = 0; i < res?.data.length; i++) {
          if (res?.data[i]?.type === '4') {
            // scale list
            questionsArray.push(res?.data[i]?.question);
            prevTagArray.push(res?.data[i]?.prev_key);
            metaName.push(res?.data[i]?.meta_name);
            p_question.push(res?.data[i]?.patient_question);
          }
          if (res?.data[i].type === '5') {
            // boolean questions stored
            boolQue.push(res?.data[i]?.question);
          }
          if (res?.data[i].type === '7') {
            // input questions stored
            inputQue.push(res?.data[i]?.question);
          }
        }
        setPrevTag(prevTagArray);
        setTag(questionsArray);
        setMeta(metaName);
        set_patient_question(p_question);
        setBoolQuestion(boolQue);
        setInputQuestion(inputQue);
        setLoading(false);
      }
    } catch (error) {
      console.log('📌 ⏩ file: index.js:24 ⏩ LangListAPI ⏩ error:', error);
    }
  };

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
        JSON.stringify({
          calibration,
          aoiXY,
          eyeData: currentIndexEyeTracking,
        }),
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

  const updateStateDynamically = (state, sliderObject) => {
    const existingIndex = state.findIndex(
      item => item.symptom === sliderObject.symptom,
    );

    if (existingIndex !== -1) {
      state[existingIndex] = {
        ...state[existingIndex],
        scoreChng: state[existingIndex].scoreChng + sliderObject.scoreChng,
        durScreen: state[existingIndex].durScreen + sliderObject.durScreen,
        pageRevisitInt:
          state[existingIndex].pageRevisitInt + sliderObject.pageRevisitInt,
        finalScore: sliderObject.finalScore,
      };
    } else {
      state.push(sliderObject);
    }

    return [...state];
  };
  const stateUpdater = (state, updatedState) => {
    if (state === head) {
      setHead(updatedState);
    } else if (state === pressureHead) {
      setPressureHead(updatedState);
    } else if (state === neckPain) {
      setNeckPain(updatedState);
    } else if (state === nauSea) {
      setNausea(updatedState);
    } else if (state === dizz) {
      setDizz(updatedState);
    } else if ((state = blurred)) {
      setBlurred(updatedState);
    } else if ((state = balance)) {
      setBalance(updatedState);
    } else if ((state = sensitiveLight)) {
      setSensitiveLight(updatedState);
    } else if ((state = sensitiveNoise)) {
      setSensitiveNoise(updatedState);
    } else if ((state = feelingSlowed)) {
      setFeelingSlowed(updatedState);
    } else if ((state = feelingLike)) {
      setFeelingLike(updatedState);
    } else if ((state = feelRight)) {
      setFeelRight(updatedState);
    } else if ((state = difficultyCon)) {
      setDifficultyCon(updatedState);
    } else if ((state = difficultyRem)) {
      setDifficultyRem(updatedState);
    } else if ((state = low)) {
      setLow(updatedState);
    } else if ((state = confusion)) {
      setConfusion(updatedState);
    } else if ((state = draw)) {
      setDraw(updatedState);
    } else if ((state = emotional)) {
      setEmotional(updatedState);
    } else if ((state = irritable)) {
      setIrritable(updatedState);
    } else if ((state = sad)) {
      setSad(updatedState);
    } else if ((state = nervous)) {
      setNervous(updatedState);
    } else if ((state = trouble)) {
      setTrouble(updatedState);
    }
  };

  // time count for each screen

  useEffect(() => {
    setRevisit(revisit => revisit + 1);
    const intervalId = setInterval(() => {
      setDuration(duration => duration + 1);
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  const [revisit, setRevisit] = useState(0);

  // Handle On Symptom Change
  const handleSymptomChange = index => {
    if (!count && index > activeButtonIndex) {
      Toast.show({
        text1: 'Please select any range.',
        type: 'error',
      });
    } else {
      const sliderObject = {
        symptom: meta[index - 1],
        initialScore: initValue,
        scoreChng: count,
        finalScore: lastValue,
        durScreen: duration,
        pageRevisitInt: revisit,
      };

      stateArray.forEach(state => {
        const updatedState = updateStateDynamically(state, sliderObject);
        stateUpdater(state, updatedState);
      });

      const updatedSymptomArray = [...symptomArray];
      if (updatedSymptomArray[index - 1]) {
        updatedSymptomArray[index - 1] = {
          ...updatedSymptomArray[index - 1],
          ...sliderObject,
        };
      } else {
        updatedSymptomArray.push(sliderObject);
      }

      setSymptomArray(updatedSymptomArray);
      if (tag[index]) {
        currentIndexEndTime = getDate();

        // Upload the Assessment Data to Server
        handleUploadAssessmentData();
        currentIndexEyeTracking = [];
        setActiveButtonIndex(index);
        flatListRef.current.scrollToIndex({ index, animated: true });
      } else {
        setTakeBoolean(true);
      }
      setDuration(0);
      ResetValues();
    }
  };

  useEffect(() => {
    const filteredArray = trouble.filter(item => item.symptom !== undefined);
    setSymptomArray(filteredArray);
  }, [activeButtonIndex]);

  const SubmitSymptom = () => {
    let valid = true;
    if (isEmpty(text)) {
      valid = false;
      setTextErrObj({
        error: true,
        msg: 'Please enter percentage',
      });
    }
    if (activeIndexes.length === checkValid) {
      setValidBool(true);
    } else {
      console.log('required =>', activeIndexes.length);
    }
    console.log(valid, validBool);
    if (valid && validBool) {
      createSymptom();
    } else {
      Toast.show({
        text1: 'Please fill all informations.',
        type: 'error',
      });
    }
  };
  // api integration for create call
  const createSymptom = async () => {
    const updatedSymptomArray = symptomArray.concat(lastThreeSymptoms);
    try {
      const response = await getApiData(
        BaseSetting.endpoints.symptom,
        'POST',
        {
          event_id: eventId,
          answers: JSON.stringify(updatedSymptomArray),
          created_from: 'app',
        },
        '',
        false,
      );
      if (response?.status) {
        navigation.navigate('Wordlist', { event_id: eventId });
        Toast.show({
          text1: response?.message.toString(),
          type: 'success',
        });
      } else {
        Toast.show({
          text1: response?.message,
          type: 'error',
        });
      }
    } catch (error) {
      console.log('error =======>>>', error);
    }
  };

  const ResetValues = () => {
    setCount(0);
    setInitValue(0);
    setMilliseconds(0);
    setLastValue(0);
    setSliderValue(1);
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
        } else {
          console.log('Sym Called ===> View Ref not found');
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

      console.log('Calibration in Redux => ', calibration);

      // Let's listen to Tracking Event
      subscription = DeviceEventEmitter.addListener(
        'eyeTrackingEvent',
        event => {
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
                eventData: event,
                screenX: newXValue,
                screenY: newYValue,
                actualX: event.centerEyeLookAtPoint.x,
                actualY: event.centerEyeLookAtPoint.y,
                time: new Date().getTime(),
                dateTime: getDate(),
              });
            }
          }
        },
      );
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

  // slider details state management
  const [count, setCount] = useState(0);
  const [duration, setDuration] = useState(0);
  const [initValue, setInitValue] = useState(0);
  const [milliseconds, setMilliseconds] = useState(0);
  const [lastValue, setLastValue] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setMilliseconds(prevMilliseconds => prevMilliseconds + 1);
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  // On Slider Change Value
  const handleValueChange = newValue => {
    setSliderValue(newValue);
    setLastValue(newValue - 2);
    setCount(count + 1);
  };

  useEffect(() => {
    if (count === 1) {
      setInitValue(sliderValue - 2);
    }
  }, [count]);

  useEffect(() => {
    setTextErrObj({ error: false, msg: '' });
  }, []);

  let checkValid = boolQuestion.length;

  const handleButtonPress = (item, bool, rowIndex, buttonIndex) => {
    console.log(rowIndex, buttonIndex);
    if (rowIndex === 0) {
      setPhysical(!buttonIndex);
      setValidPhysical(true);
    } else if (rowIndex === 1) {
      setValidMental(true);
      setMental(!buttonIndex);
    }
    const newActiveIndexes = [...activeIndexes];
    newActiveIndexes[rowIndex] = buttonIndex;
    setActiveIndexes(newActiveIndexes);
  };

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      handleBackPress,
    );

    return () => backHandler.remove();
  }, []);

  const handleBackPress = () => {
    setShowConfirmation(true);
    return true;
  };

  const handleCancel = () => {
    setShowConfirmation(false);
  };

  const handleConfirm = () => {
    navigation.navigate('Events');
  };

  const checkNext = () => {
    if (validPhysical) {
      setDuration(1);
      setNext(next + 1);
      setValidPhysical(false);
    } else if (vaildMental) {
      setDuration(1);
      setNext(next + 1);
    } else {
      Toast.show({
        text1: 'Select your answer',
        type: 'error',
      });
    }
  };

  // count timing for last three symptoms
  useEffect(() => {
    let interval;
    if (takeBoolean && next >= 0 && next <= 2) {
      interval = setInterval(() => {
        setTimer(prevTimer => {
          const updatedTimer = [...prevTimer];
          updatedTimer[next]++;
          return updatedTimer;
        });
      }, 1000);
    }

    return () => {
      clearInterval(interval);
    };
  }, [next, takeBoolean]);

  const lastThreeSymptoms = [
    {
      symptom: 'Physical_Activity',
      initialScore: false,
      scoreChng: 0,
      finalScore: physical,
      durScreen: timer[0],
      pageRevisitInt: 1,
    },
    {
      symptom: 'Mental_Activity',
      initialScore: false,
      scoreChng: 0,
      finalScore: mental,
      durScreen: timer[1],
      pageRevisitInt: 1,
    },
    {
      symptom: 'Feel_Perfect',
      initialScore: 1,
      scoreChng: 3,
      finalScore: percentage,
      durScreen: timer[2],
      pageRevisitInt: 1,
    },
  ];
  return (
    <View
      style={[
        styles.main,
        {
          backgroundColor: darkmode ? BaseColors.lightBlack : BaseColors.white,
        },
      ]}
    >
      <StatusBar barStyle="dark-content" translucent={true} />
      <HeaderBar
        HeaderText={'Symptoms'}
        HeaderCenter
        leftText="Cancel"
        leftBtnPress={() => {
          handleBackPress();
        }}
      />
      <ScrollView
        contentContainerStyle={[
          styles.scrollcontainer,
          {
            backgroundColor: darkmode ? BaseColors.black : BaseColors.white,
          },
        ]}
        showsVerticalScrollIndicator={false}
        ref={aoiRootView}
      >
        <>
          {loading ? (
            <View style={styles.loadingIndicator}>
              <ActivityIndicator size={'large'} />
            </View>
          ) : (
            <View>
              {!takeBoolean ? (
                <View>
                  <FlatList
                    data={tag}
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
                            {
                              width: item.length < 10 ? 131 : item.length * 12,
                            },
                          ]}
                          activeOpacity={BaseSetting.buttonOpacity}
                        >
                          <Text
                            style={[
                              {
                                color:
                                  activeButtonIndex === index
                                    ? BaseColors.white
                                    : BaseColors.textColor,
                              },
                              styles.btnText,
                            ]}
                          >
                            {item}
                          </Text>
                        </TouchableOpacity>
                      </View>
                    )}
                    keyExtractor={item => item.id}
                    ref={flatListRef}
                  />
                  <Text
                    style={[
                      styles.yesText,

                      {
                        color: darkmode ? BaseColors.white : BaseColors.black90,
                      },
                    ]}
                  >
                    Please select the severity level you can also see the
                    previous severity level.
                  </Text>
                  {tag?.map((item, index) => {
                    return (
                      index === activeButtonIndex && (
                        <>
                          <View
                            // onLayout={handleAOILayout}
                            ref={aoiRef}
                          >
                            <Text
                              style={[
                                styles.boldText,
                                {
                                  color: darkmode
                                    ? BaseColors.white
                                    : BaseColors.black90,
                                },
                              ]}
                            >
                              Report the severity level of:{' '}
                              {patient_question[index]}
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
                                {['', 0, 1, 2, 3, 4, 5, 6].map((marker, i) => (
                                  <View
                                    style={
                                      i === 0
                                        ? null
                                        : [
                                            styles.marker,
                                            {
                                              backgroundColor:
                                                prevTag[index] + 1 === i
                                                  ? BaseColors.secondary
                                                  : BaseColors.textGrey,
                                              fontWeight: 'bold',
                                            },
                                          ]
                                    }
                                    key={marker.toString()}
                                  />
                                ))}
                              </View>
                            </View>

                            <View style={styles.markerContainerNumber}>
                              {['', 0, 1, 2, 3, 4, 5, 6].map((label, i) =>
                                i === 0 ? (
                                  <Text key={label.toString()}>&nbsp;</Text>
                                ) : (
                                  <Text
                                    style={[
                                      styles.sliderLabel,
                                      {
                                        color:
                                          prevTag[index] + 1 === i
                                            ? BaseColors.secondary
                                            : BaseColors.textGrey,
                                        fontWeight: 'bold',
                                      },
                                    ]}
                                    key={label.toString()}
                                  >
                                    {label}
                                  </Text>
                                ),
                              )}
                            </View>

                            <View>
                              <View style={styles.lables}>
                                <Text
                                  style={{
                                    fontFamily: FontFamily?.light,
                                    color: darkmode
                                      ? BaseColors.white
                                      : BaseColors.black90,
                                  }}
                                >
                                  None
                                </Text>
                                <Text
                                  style={{
                                    fontFamily: FontFamily?.light,
                                    color: darkmode
                                      ? BaseColors.white
                                      : BaseColors.black90,
                                  }}
                                >
                                  Mild
                                </Text>
                                <Text
                                  style={{
                                    fontFamily: FontFamily?.light,
                                    color: darkmode
                                      ? BaseColors.white
                                      : BaseColors.black90,
                                  }}
                                >
                                  Moderate
                                </Text>
                                <Text
                                  style={{
                                    fontFamily: FontFamily?.light,
                                    color: darkmode
                                      ? BaseColors.white
                                      : BaseColors.black90,
                                  }}
                                >
                                  Sever
                                </Text>
                              </View>
                            </View>
                          </View>
                          <View style={styles.topBox}>
                            <View style={styles.outer}>
                              <View style={styles.inner} />
                              <Text
                                style={{
                                  fontFamily: FontFamily?.light,
                                  color: darkmode
                                    ? BaseColors.white
                                    : BaseColors.black90,
                                }}
                              >
                                Previous Assessment
                              </Text>
                            </View>
                            <View style={styles.assessmentHead}>
                              <View style={styles.assessmentData} />
                              <Text
                                style={{
                                  fontFamily: FontFamily?.light,
                                  color: darkmode
                                    ? BaseColors.white
                                    : BaseColors.black90,
                                }}
                              >
                                Current Assessment
                              </Text>
                            </View>
                          </View>
                        </>
                      )
                    );
                  })}
                </View>
              ) : (
                <View
                  style={{
                    height: BaseSetting.nHeight / 2,
                  }}
                >
                  {boolQuestion
                    ?.map((item, rowIndex) => {
                      const activeIndex = activeIndexes[rowIndex]; // Get the active index for this row

                      return (
                        <View key={rowIndex}>
                          <Text style={{ fontSize: 18, marginVertical: 5 }}>
                            {item}{' '}
                            <Text style={{ color: BaseColors.orange }}>*</Text>
                          </Text>
                          <View style={{ flexDirection: 'row' }}>
                            <TouchableOpacity
                              style={[
                                styles.btnStyle,
                                {
                                  backgroundColor:
                                    activeIndex === 0
                                      ? BaseColors.secondary
                                      : BaseColors.white,
                                },
                              ]}
                              onPress={() =>
                                handleButtonPress(item, true, rowIndex, 0)
                              }
                            >
                              <Text
                                style={{
                                  color:
                                    activeIndex === 0
                                      ? BaseColors.white
                                      : BaseColors.textColor,
                                }}
                              >
                                Yes
                              </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                              style={[
                                styles.btnStyle,
                                {
                                  backgroundColor:
                                    activeIndex === 1
                                      ? BaseColors.secondary
                                      : BaseColors.white,
                                },
                              ]}
                              onPress={() =>
                                handleButtonPress(item, false, rowIndex, 1)
                              }
                            >
                              <Text
                                style={{
                                  color:
                                    activeIndex === 1
                                      ? BaseColors.white
                                      : BaseColors.textColor,
                                }}
                              >
                                No
                              </Text>
                            </TouchableOpacity>
                          </View>
                        </View>
                      );
                    })
                    .slice(next, next + 1)}
                  {next === 2 && (
                    <View>
                      {inputQuestion?.map((item, index) => {
                        return (
                          <View>
                            <Text style={{ fontSize: 18 }}>{item}</Text>
                            <LabeledInput
                              keyboardType={'numeric'}
                              value={text}
                              onChangeText={e => {
                                setText(e <= 100 ? e : null);
                                setPercentage(e <= 100 ? e : null);
                                setTextErrObj({ error: false, msg: '' });
                              }}
                              showError={textErrObj.error}
                              errorText={textErrObj.msg}
                            />
                          </View>
                        );
                      })}
                    </View>
                  )}
                </View>
              )}
              <View style={styles.btnContainer}>
                {!takeBoolean ? (
                  <Button
                    shape="round"
                    title={'Next'}
                    style={styles.signinbutton}
                    onPress={() => {
                      handleSymptomChange(activeButtonIndex + 1);
                    }}
                  />
                ) : (
                  next !== 2 && (
                    <Button
                      shape="round"
                      title={'Next'}
                      style={styles.signinbutton}
                      onPress={() => {
                        // SubmitSymptom();
                        checkNext();
                      }}
                    />
                  )
                )}
                {next === 2 && (
                  <Button
                    shape="round"
                    title={'Submit'}
                    style={styles.signinbutton}
                    onPress={() => {
                      SubmitSymptom();
                    }}
                  />
                )}
              </View>
            </View>
          )}

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
        {showConfirmation && (
          <Modal
            animationType="slide"
            transparent={true}
            visible={showConfirmation}
            onRequestClose={handleCancel}
          >
            <View style={styles.confirmationModalCenteredView}>
              <View
                style={[
                  styles.confirmationModalView,
                  {
                    backgroundColor: darkmode
                      ? BaseColors.textColor
                      : BaseColors.white,
                  },
                ]}
              >
                <Text
                  style={[
                    styles.confirmationModalTitleText,
                    {
                      color: darkmode ? BaseColors.white : BaseColors.black,
                    },
                  ]}
                >
                  Are you sure?
                </Text>
                <Text
                  style={[
                    styles.confirmationModalText,
                    {
                      color: darkmode ? BaseColors.white : BaseColors.black,
                    },
                  ]}
                >
                  You want to leave this screen?
                </Text>
                <View style={styles.modalButtons}>
                  <TouchableOpacity
                    style={[styles.button, styles.confirmButton]}
                    onPress={handleConfirm}
                    // disabled={confirmLoading}
                  >
                    {confirmLoading ? (
                      <ActivityIndicator color="white" size="small" />
                    ) : (
                      <Text style={styles.buttonText}>Confirm</Text>
                    )}
                  </TouchableOpacity>
                  <TouchableOpacity
                    activeOpacity={0.7}
                    style={[styles.button, styles.cancelButton]}
                    onPress={handleCancel}
                  >
                    <Text style={styles.buttonText}>Cancel</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>
        )}
      </ScrollView>
    </View>
  );
};

export default Symptoms;
