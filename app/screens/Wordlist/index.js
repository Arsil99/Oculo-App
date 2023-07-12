import Button from '@components/Button';
import HeaderBar from '@components/HeaderBar';
import { Images } from '@config';
import BaseSetting from '@config/setting';
import { BaseColors } from '@config/theme';
import React, { useEffect, useState } from 'react';
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
  const IOS = Platform.OS === 'ios';

  const onNextButtonPress = () => {
    setShowImage(true);
  };
  const onTextInputChange = text => {
    setTextInputValue(text);
  };
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
          <View style={{ flex: showImage ? 0.1 : 0.2 }}>
            {showImage ? (
              <Text style={styles.subtitleText}>
                Enter words list from previous screen
              </Text>
            ) : (
              <Text style={styles.subtitleText}>
                Please memorize the word list and enter it on the next screen
              </Text>
            )}
          </View>
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
          {showImage ? (
            <TouchableOpacity
              style={styles.wordcontainer}
              activeOpacity={BaseSetting.buttonOpacity}
            >
              <Image
                source={Images.speechtotext}
                resizeMode="contain"
                style={styles.img}
              />
            </TouchableOpacity>
          ) : (
            <View style={styles.wordcontainer}>
              <Text style={styles.titleText}>
                Jacket Arrow Pepper Cotton Movie
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
