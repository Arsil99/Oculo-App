import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  Text,
  View,
  Image,
  TouchableHighlight,
  ScrollView,
} from 'react-native';
import Voice from 'react-native-voice';
import { BaseColors } from '@config/theme';
import HeaderBar from '@components/HeaderBar';
import styles from './styles';
const VoiceInput = () => {
  const [pitch, setPitch] = useState('');
  const [error, setError] = useState('');
  const [end, setEnd] = useState('');
  const [started, setStarted] = useState('');
  const [results, setResults] = useState([]);
  const [partialResults, setPartialResults] = useState([]);
  const [on, setOn] = useState(false);

  useEffect(() => {
    setOn(true); // Enable speech recognition

    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  useEffect(() => {
    if (on) {
      Voice.onSpeechStart = onSpeechStart;
      Voice.onSpeechEnd = onSpeechEnd;
      Voice.onSpeechError = onSpeechError;
      Voice.onSpeechResults = onSpeechResults;
      Voice.onSpeechPartialResults = onSpeechPartialResults;
      Voice.onSpeechVolumeChanged = onSpeechVolumeChanged;
    }
  }, [on]);

  const onSpeechStart = e => {
    console.log('onSpeechStart: ', e);
    setStarted('√');
  };

  const onSpeechEnd = e => {
    console.log('onSpeechEnd: ', e);
    setEnd('√');
  };

  const onSpeechError = e => {
    console.log('onSpeechError: ', e);
    setError(JSON.stringify(e.error));
  };

  const onSpeechResults = e => {
    console.log('onSpeechResults: ', e);
    setResults(e.value);
  };

  const onSpeechPartialResults = e => {
    console.log('onSpeechPartialResults: ', e);
    setPartialResults(e.value);
  };

  const onSpeechVolumeChanged = e => {
    console.log('onSpeechVolumeChanged: ', e);
    setPitch(e.value);
  };

  // ===== Note :- don't remove this function. May be this will useful in future. =====

  //   const requestMicrophonePermission = async () => {
  //     try {
  //       const result =
  //         Platform.OS === 'android'
  //           ? await request(PERMISSIONS.ANDROID.RECORD_AUDIO)
  //           : await request(PERMISSIONS.IOS.MICROPHONE);
  //       if (result === 'granted') {
  //         startRecognizing();
  //       } else {
  //         console.log('Microphone permission denied');
  //       }
  //     } catch (error) {
  //       console.error('Error occurred while requesting permission: ', error);
  //     }
  //   };

  const startRecognizing = async () => {
    try {
      await Voice.start('en-US');
      setPitch('');
      setError('');
      setStarted('');
      setResults([]);
      setPartialResults([]);
      setEnd('');
    } catch (e) {
      console.error(e);
    }
  };

  const stopRecognizing = async () => {
    try {
      await Voice.stop();
    } catch (e) {
      console.error(e);
    }
  };

  const cancelRecognizing = async () => {
    try {
      await Voice.cancel();
    } catch (e) {
      console.error(e);
    }
  };

  const destroyRecognizer = async () => {
    try {
      await Voice.destroy();
      setPitch('');
      setError('');
      setStarted('');
      setResults([]);
      setPartialResults([]);
      setEnd('');
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <View style={styles.main}>
      <HeaderBar HeaderText={'Voice Input'} HeaderCenter leftText="Back" />
      <SafeAreaView style={styles.container}>
        <View style={styles.container}>
          <Text style={styles.titleText}>
            Speech to Text Conversion in React Native | Voice Recognition
          </Text>
          <Text style={styles.textStyle}>
            Press the microphone to start recognition
          </Text>
          <View style={styles.headerContainer}>
            <Text
              style={styles.textWithSpaceStyle}
            >{`Started: ${started}`}</Text>
            <Text style={styles.textWithSpaceStyle}>{`End: ${end}`}</Text>
          </View>
          <View style={styles.headerContainer}>
            <Text
              style={styles.textWithSpaceStyle}
            >{`Pitch: \n ${pitch}`}</Text>
            <Text
              style={styles.textWithSpaceStyle}
            >{`Error: \n ${error}`}</Text>
          </View>
          <TouchableHighlight onPress={startRecognizing}>
            <Image
              style={styles.imageButton}
              source={{
                uri: 'https://raw.githubusercontent.com/AboutReact/sampleresource/master/microphone.png',
              }}
            />
          </TouchableHighlight>
          <Text style={styles.textStyle}>Partial Results</Text>
          <ScrollView>
            {partialResults.map((result, index) => (
              <Text key={`partial-result-${index}`} style={styles.textStyle}>
                {result}
              </Text>
            ))}
          </ScrollView>
          <Text style={styles.textStyle}>Results</Text>
          <ScrollView style={{ marginBottom: 42 }}>
            {results.map((result, index) => (
              <Text key={`result-${index}`} style={styles.textStyle}>
                {result}
              </Text>
            ))}
          </ScrollView>
          <View style={styles.horizontalView}>
            <TouchableHighlight
              onPress={stopRecognizing}
              style={styles.buttonStyle}
            >
              <Text style={styles.buttonTextStyle}>Stop</Text>
            </TouchableHighlight>
            <TouchableHighlight
              onPress={cancelRecognizing}
              style={styles.buttonStyle}
            >
              <Text style={styles.buttonTextStyle}>Cancel</Text>
            </TouchableHighlight>
            <TouchableHighlight
              onPress={destroyRecognizer}
              style={styles.buttonStyle}
            >
              <Text style={styles.buttonTextStyle}>Destroy</Text>
            </TouchableHighlight>
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
};

export default VoiceInput;
