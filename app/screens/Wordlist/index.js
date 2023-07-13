import Button from '@components/Button';
import HeaderBar from '@components/HeaderBar';
import { Images } from '@config';
import BaseSetting from '@config/setting';
import { BaseColors } from '@config/theme';
import React, { useEffect, useState } from 'react';
import Voice from 'react-native-voice';
import {
  View,
  StatusBar,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
} from 'react-native';
import styles from './styles';

export default function Wordlist({ navigation }) {
  const [showImage, setShowImage] = useState(false);
  const [textInputValue, setTextInputValue] = useState('');
  const [pitch, setPitch] = useState('');
  const [error, setError] = useState('');
  const [end, setEnd] = useState('');
  const [started, setStarted] = useState('');
  const [results, setResults] = useState([]);
  const [isRecognizing, setIsRecognizing] = useState(false);
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

  const IOS = Platform.OS === 'ios';

  const onNextButtonPress = () => {
    setShowImage(true);
  };
  const onTextInputChange = text => {
    setTextInputValue(text);
  };
  const startRecognizing = async () => {
    try {
      await Voice.start('en-US');
      setIsRecognizing(true);
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
      setTimeout(() => {
        setIsRecognizing(false);
      }, 500); // Adjust the delay time as needed
    } catch (e) {
      console.error(e);
    }
  };

  const onSpeechImagePress = () => {
    if (isRecognizing) {
      stopRecognizing();
    } else {
      startRecognizing();
    }
  };
  useEffect(() => {
    const displayArrayValues = array => {
      return array.map(word => word + '\n').join('');
    };

    setTextInputValue(displayArrayValues(results));
  }, [results]);

  return (
    <KeyboardAvoidingView
      behavior={IOS ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <StatusBar barStyle="dark-content" backgroundColor={BaseColors.white} />

        <HeaderBar
          HeaderText={'Word List'}
          HeaderCenter
          leftText={'Cancel'}
          leftBtnPress={() => {
            navigation.goBack();
          }}
        />

        <View style={styles.mainDiv}>
          <View style={{ flex: showImage ? 0.1 : 0.3 }}>
            {showImage ? (
              <Text style={styles.subtitleText}>
                Enter words list from previous screen
              </Text>
            ) : (
              <Text style={styles.subtitleText}>
                Please memorize the word list and enter it on the next screen
              </Text>
            )}

            {showImage ? (
              <View style={styles.textInputContainer}>
                <TextInput
                  multiline
                  placeholder="Type or speak here ..."
                  value={textInputValue}
                  onChangeText={onTextInputChange}
                  style={styles.textInput}
                  textAlignVertical="top"
                  underlineColorAndroid="transparent"
                />
              </View>
            ) : null}
          </View>
          {showImage ? (
            <TouchableOpacity
              style={styles.wordcontainer}
              onPress={onSpeechImagePress}
              activeOpacity={BaseSetting.buttonOpacity}
            >
              {!isRecognizing ? (
                <Image source={Images.speechtotext} resizeMode="contain" />
              ) : (
                <View>
                  <Image
                    source={Images.stopspeech}
                    resizeMode="contain"
                    style={styles.stopimg}
                  />
                  <Text style={styles.stop}>Stop Speech to text</Text>
                </View>
              )}
            </TouchableOpacity>
          ) : (
            <View style={styles.wordcontainer}>
              <Text style={styles.titleText}>
                Jacket{'\n'} Arrow{'\n'} Pepper {'\n'}Cotton{'\n'} Movie
              </Text>
            </View>
          )}
          <View
            style={[styles.buttoncontainer, { flex: showImage ? 0.5 : 0.3 }]}
          >
            {!showImage ? (
              <Button
                shape="round"
                title={'Next'}
                onPress={onNextButtonPress}
              />
            ) : (
              <Button shape="round" title={'Next'} />
            )}
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
