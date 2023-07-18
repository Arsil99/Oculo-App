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
  const [recognizedPhrase, setRecognizedPhrase] = useState('');
  const [textInputValue, setTextInputValue] = useState('');
  const [isRecognizing, setIsRecognizing] = useState(false);
  const IOS = Platform.OS === 'ios';
  const startRecognizing = async () => {
    try {
      await Voice.start('en-US');
      setIsRecognizing(true);
      setRecognizedPhrase('');
    } catch (e) {
      console.error(e);
    }
  };
  const stopRecognizing = async () => {
    try {
      await Voice.stop();
      setIsRecognizing(false);
    } catch (e) {
      console.error(e);
    }
  };

  const onNextButtonPress = () => {
    setShowImage(true);
  };

  const handleValueChange = text => {
    setRecognizedPhrase(text);
  };

  useEffect(() => {
    Voice.onSpeechResults = e => {
      const phrases = e.value;
      setRecognizedPhrase(phrases[phrases.length - 1]);
    };

    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

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
                  value={recognizedPhrase.split(' ').join('\n')}
                  onChangeText={handleValueChange}
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
              onPress={!isRecognizing ? startRecognizing : stopRecognizing}
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
