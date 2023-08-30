import {
  View,
  Text,
  Image,
  StatusBar,
  Platform,
  NativeEventEmitter,
  NativeModules,
  DeviceEventEmitter,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import Animated, {
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
} from 'react-native-reanimated';
import styles from './styles';
import { Images } from '@config';
import HeaderBar from '@components/HeaderBar';
import { BaseColors } from '@config/theme';
import Button from '@components/Button';
import {
  ET_DEFAULTS,
  startEyePosTracking,
  stopEyePosTracking,
} from '@utils/eyeTracking';
import { EyeTracking } from '@components/EyeTracking';

const { Value } = Animated;

export default function Callibration({ navigation }) {
  const cameraInitialized = useSharedValue(0); // 0 = No, 1 = Yes
  const eyePosition = useSharedValue(0); // -1 = above, 0 = inline, 1 = below
  const [isValidPosition, setValidPosition] = useState(false); // Instruction Text for user
  const [Instruction, setInstruction] = useState(ET_DEFAULTS.cali.DEF_MSG); // Instruction Text for user
  const [whiteLineY, setWhiteLineY] = React.useState(null); // To store White Line Y
  const whiteLineRef = React.useRef(null);
  const [leftCirclePosition, setLeftCirclePosition] = React.useState(null);
  const [rightCirclePosition, setRightCirclePosition] = React.useState(null);
  const leftCircleRef = React.useRef(null);
  const rightCircleRef = React.useRef(null);

  const leftEyeX = useSharedValue(0); // Initial X position for left eye
  const leftEyeY = useSharedValue(0); // Initial Y position for left eye
  const rightEyeX = useSharedValue(0); // Initial X position for right eye
  const rightEyeY = useSharedValue(0); // Initial Y position for right eye
  const leftEyeAnimation = useSharedValue(0);
  const rightEyeAnimation = useSharedValue(0);

  // Use these values to animate eye circle border color
  const mainBGColor = useDerivedValue(() => {
    if (cameraInitialized.value === 0) {
      return BaseColors.black;
    }
    return BaseColors.transparent;
  });

  // Use these values to animate eye circle border color
  const borderColor = useDerivedValue(() => {
    if (eyePosition.value === 1) {
      return ET_DEFAULTS.cali.userEyeBorderValidColor;
    }
    return ET_DEFAULTS.cali.userEyeBorderInvalidColor;
  });

  const animatePulse = animationValue => {
    return useDerivedValue(() => {
      return (animationValue.value =
        Math.sin(new Date().getTime() * 0.005) * 0.5 + 0.5);
    });
  };
  const leftEyePulse = animatePulse(leftEyeAnimation);
  const rightEyePulse = animatePulse(rightEyeAnimation);

  const animatedLeftEyeStyle = useAnimatedStyle(() => {
    return {
      width: ET_DEFAULTS.cali.systemEyeCircleSize,
      height: ET_DEFAULTS.cali.systemEyeCircleSize,
      borderWidth: ET_DEFAULTS.cali.userEyeBorder,
      borderColor: borderColor.value,
      borderRadius: ET_DEFAULTS.cali.systemEyeCircleSize,
      transform: [
        {
          scale: 0.9 + leftEyePulse.value * 0.1,
        },
      ],
    };
  });

  const animatedRightEyeStyle = useAnimatedStyle(() => {
    return {
      width: ET_DEFAULTS.cali.systemEyeCircleSize,
      height: ET_DEFAULTS.cali.systemEyeCircleSize,
      borderWidth: ET_DEFAULTS.cali.userEyeBorder,
      borderColor: borderColor.value,
      borderRadius: ET_DEFAULTS.cali.systemEyeCircleSize,
      transform: [
        {
          scale: 0.9 + rightEyePulse.value * 0.1,
        },
      ],
    };
  });

  const leftEyeStyle = useAnimatedStyle(() => {
    return {
      width: ET_DEFAULTS.cali.userEyeSize,
      height: ET_DEFAULTS.cali.userEyeSize,
      borderRadius: ET_DEFAULTS.cali.userEyeSize / 2,
      borderWidth: ET_DEFAULTS.cali.userEyeBorder,
      borderColor: borderColor.value,
      position: 'absolute',
      top: leftEyeY.value,
      left: leftEyeX.value,
    };
  });

  const rightEyeStyle = useAnimatedStyle(() => {
    return {
      width: ET_DEFAULTS.cali.userEyeSize,
      height: ET_DEFAULTS.cali.userEyeSize,
      borderRadius: ET_DEFAULTS.cali.userEyeSize / 2,
      borderWidth: ET_DEFAULTS.cali.userEyeBorder,
      borderColor: borderColor.value,
      position: 'absolute',
      top: rightEyeY.value,
      left: rightEyeX.value,
    };
  });

  const mainBGStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: mainBGColor.value,
    };
  });

  const handleCircleLayout = event => {
    console.log('Handle Circle Layout Called ===>');
    const margin = ET_DEFAULTS.cali.userEyeSize / 2;
    leftCircleRef.current.measureInWindow((x, y, width, height) => {
      console.log(
        'setLeftCirclePosition Circle Layout Called ===>',
        x,
        y,
        width,
        height,
      );
      setLeftCirclePosition({ x: x + margin, y: y + margin, width, height });
    });
    rightCircleRef.current.measureInWindow((x, y, width, height) => {
      console.log(
        'rightCircleRef Circle Layout Called ===>',
        x,
        y,
        width,
        height,
      );
      setRightCirclePosition({ x: x + margin, y: y + margin, width, height });
    });
  };

  useEffect(() => {
    const trackListener = event => {
      const { leCenter, reCenter } = event;

      let isValid = false;

      // Assuming the Y value determines the position
      const avgEyeY = (leCenter.y + reCenter.y) / 2;
      const eyesDistance = Math.abs(reCenter.x - leCenter.x);

      leftEyeX.value = event.leCenter.x - ET_DEFAULTS.cali.userEyeSize / 2;
      leftEyeY.value = event.leCenter.y - ET_DEFAULTS.cali.userEyeSize / 2;
      rightEyeX.value = event.reCenter.x - ET_DEFAULTS.cali.userEyeSize / 2;
      rightEyeY.value = event.reCenter.y - ET_DEFAULTS.cali.userEyeSize / 2;

      // Pseudocode
      if (avgEyeY > whiteLineY + ET_DEFAULTS.cali.dot_height / 2) {
        setInstruction('Move your head up');
      } else if (avgEyeY < whiteLineY - +(ET_DEFAULTS.cali.dot_height / 2)) {
        setInstruction('Move your head down');
      }

      // Check if eyes are within the circle views
      else if (leftCirclePosition && rightCirclePosition) {
        const isLeftEyeInside =
          leCenter.x > leftCirclePosition.x &&
          leCenter.x < leftCirclePosition.x + leftCirclePosition.width &&
          leCenter.y > leftCirclePosition.y &&
          leCenter.y < leftCirclePosition.y + leftCirclePosition.height;

        const isRightEyeInside =
          reCenter.x > rightCirclePosition.x &&
          reCenter.x < rightCirclePosition.x + rightCirclePosition.width &&
          reCenter.y > rightCirclePosition.y &&
          reCenter.y < rightCirclePosition.y + rightCirclePosition.height;

        if (!isLeftEyeInside) {
          setInstruction('Align your left eye with the circle.');
        } else if (!isRightEyeInside) {
          setInstruction('Align your right eye with the circle.');
        } else {
          // Check distance between eyes and adjust user's position
          const circleDistance = Math.abs(
            rightCirclePosition.x - leftCirclePosition.x,
          );

          console.log(
            'Track Listener Distance => ',
            circleDistance,
            eyesDistance,
            rightCirclePosition.x,
            leftCirclePosition.x,
            reCenter.x,
            leCenter.x,
          );
          if (eyesDistance < circleDistance + ET_DEFAULTS.cali.dot_height / 2) {
            setInstruction('Move a bit closer to the device.');
          } else if (
            eyesDistance >
            circleDistance - ET_DEFAULTS.cali.dot_height / 2
          ) {
            setInstruction('Move a bit away from the device.');
          } else {
            isValid = true;
            setInstruction('Perfect! Stay still.');
          }
        }
        eyePosition.value = isValid ? 1 : 0;
        leftEyeAnimation.value = isValid ? 0 : 1;
        rightEyeAnimation.value = isValid ? 0 : 1;
        if (isValid !== isValidPosition) {
          setValidPosition(isValid);
        }
      }
    };
    // Setup Emitter based on Device OS
    const emitter =
      Platform.OS === 'ios'
        ? new NativeEventEmitter(NativeModules.EyeTrackingEventEmitter)
        : DeviceEventEmitter;

    // Let's listen to Tracking Event
    const subscription = emitter.addListener('tracking_eye_pos', trackListener);

    return () => {
      subscription.remove();
    };
  }, [
    eyePosition,
    whiteLineY,
    setInstruction,
    leftEyeX,
    leftEyeY,
    rightEyeX,
    rightEyeY,
    leftCirclePosition,
    rightCirclePosition,
    leftEyeAnimation,
    rightEyeAnimation,
    isValidPosition,
  ]);

  // Let's stop Native Eye Tracking when user navigates back
  React.useEffect(() => {
    const focusSubscribe = navigation.addListener('focus', () => {
      // Waiting 1 Second to complete Screen Transitioning Animation
      setTimeout(() => {
        console.log('On Cal Init Screen Init ===>');
        EyeTracking.showDebug(true);
        startEyePosTracking();
        cameraInitialized.value = 1;
        handleCircleLayout();
      }, 1000);
    });

    const unsubscribe = navigation.addListener('beforeRemove', e => {
      console.log('On Cal Init Screen Gone ===>');
      stopEyePosTracking();
      EyeTracking.showDebug(false);
    });
    return () => {
      focusSubscribe();
      unsubscribe();
    };
  }, [navigation, cameraInitialized]);

  useEffect(() => {
    console.log('Button ===> is Valid ==> ', isValidPosition);
  }, [isValidPosition]);

  return (
    <Animated.View style={[styles.main, mainBGStyle]}>
      <StatusBar
        backgroundColor={'#0000'}
        barStyle="light-content"
        translucent={true}
      />
      {/* <Image source={Images?.callibrateImg} style={styles.imgStyle} /> */}

      <HeaderBar
        HeaderText={'Callibration'}
        isTransperant
        HeaderCenter
        leftText="Cancel"
        leftBtnPress={() => {
          navigation.goBack();
        }}
        LeftTextStyle={{ color: BaseColors?.white }}
        HeaderTextStyle={{ color: BaseColors?.white }}
      />

      <View
        style={[
          styles.main,
          {
            alignItems: 'center',
            justifyContent: 'space-around',
          },
        ]}
      >
        <View
          style={{
            top: 0,
            bottom: 0,
            marginHorizontal: 10,
            width: '100%',
            height: '90%',
            alignItems: 'center',
            justifyContent: 'space-around',
            position: 'absolute',
          }}
        >
          <Image
            source={Images?.faceposition}
            resizeMode="contain"
            style={styles.imgStylee}
          />
        </View>
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <View style={styles?.squareBorder}>
            {/* White line to let user know where he needs to align their eyes */}
            <View
              ref={whiteLineRef}
              onLayout={() => {
                whiteLineRef.current.measureInWindow((x, y, width, height) => {
                  setWhiteLineY(y);
                });
              }}
              style={{
                width: '100%',
                height: 2,
                backgroundColor: BaseColors.white,
                position: 'relative',
                top: ET_DEFAULTS.cali.systemEyeCircleSize / 2 - 1,
              }}
            />
            <View
              style={{
                flexDirection: 'row',
                width: ET_DEFAULTS.cali.eyesDistance,
                justifyContent: 'space-between',
              }}
            >
              {/* Left Eye Circle */}
              <View>
                <Animated.View
                  ref={leftCircleRef}
                  style={animatedLeftEyeStyle}
                />
                <Image
                  resizeMode="contain"
                  style={{
                    position: 'absolute',
                    right: ET_DEFAULTS.cali.systemEyeCircleSize / 2 - 4,
                    top: ET_DEFAULTS.cali.systemEyeCircleSize / 2 - 4,
                  }}
                  source={Images?.arrowr}
                />
              </View>
              {/* Right Eye Circle */}
              <View>
                <Animated.View
                  ref={rightCircleRef}
                  style={animatedRightEyeStyle}
                />
                <Image
                  resizeMode="contain"
                  style={{
                    position: 'absolute',
                    left: ET_DEFAULTS.cali.systemEyeCircleSize / 2 - 3,
                    top: ET_DEFAULTS.cali.systemEyeCircleSize / 2 - 3,
                  }}
                  source={Images?.arrowleft}
                />
              </View>
            </View>
          </View>
          <View style={{ width: '50%', flex: 0.5, justifyContent: 'flex-end' }}>
            <Text style={styles?.bigtext}>{Instruction}</Text>
          </View>
        </View>
        <Button
          shape="round"
          onPress={() => {
            if (isValidPosition) {
              stopEyePosTracking();
              // EyeTracking.showDebug(false);
              navigation?.navigate('CallibrationStart');
            }
          }}
          title={'Get Started'}
          style={styles.requestBtn}
          disabled={!isValidPosition}
        />
      </View>
      {/* Left and Right Eye Animated Views */}
      <Animated.View style={leftEyeStyle} />
      <Animated.View style={rightEyeStyle} />
    </Animated.View>
  );
}
