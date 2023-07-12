import {
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, { useState } from 'react';
import styles from './styles';
import HeaderBar from '@components/HeaderBar';
import { Image } from 'react-native';
import { Images } from '@config';
import { BaseColors } from '@config/theme';
import BaseSetting from '@config/setting';
import Button from '@components/Button';

const screens = [
  {
    image: Images.rememberword,
  },
  {
    image: Images.speech,
  },
  {
    image: Images.typetobox,
  },
];

const ImmediateRecall = ({ navigation }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const { image } = screens[activeIndex];

  const dotCount = 3;

  const isLastScreen = activeIndex === screens.length - 1;

  return (
    <View style={styles.main}>
      <StatusBar
        barStyle="dark-content"
        translucent={false}
        backgroundColor={'#0000'}
      />
      <HeaderBar
        HeaderText={'Immediate Recall'}
        HeaderCenter
        rightComponent={
          !isLastScreen && (
            <TouchableOpacity activeOpacity={BaseSetting.buttonOpacity}>
              <Text>Skip</Text>
            </TouchableOpacity>
          )
        }
        leftText={'Cancel'}
        leftBtnPress={() => {
          navigation.goBack();
        }}
      />

      <ScrollView
        contentContainerStyle={styles.topcontainer}
        showsVerticalScrollIndicator={false}
      >
        <View>
          <Text style={styles.titlesubText}>
            Thank you for adding your symptoms’{'\n'} severity.
          </Text>
          <Text style={styles.titleText}>Instructions</Text>
          <Text style={styles.titlesubText}>
            This task will assess how well you can remember a word list. When
            the test begins, you will see a list of words appear on the screen.
            Remember these words. Once the response box appears on the screen,
            do your best to report as many words as you can remember. You will
            repeat the same word list three times.
          </Text>
          <Text style={styles.example}>Example:</Text>
        </View>

        <View style={styles.imgcontainer}>
          <Image source={image} resizeMode="contain" style={styles.img2} />
          <View style={styles.dotwithbordercontainer}>
            {Array.from({ length: dotCount }, (_, index) => (
              <TouchableOpacity
                key={index}
                activeOpacity={BaseSetting.buttonOpacity}
                onPress={() => {
                  setActiveIndex(index);
                }}
                style={[
                  {
                    borderColor:
                      activeIndex === index
                        ? BaseColors.primary
                        : BaseColors.black20,
                  },
                  styles.row,
                ]}
              >
                <View
                  onPress={() => {
                    setActiveIndex(index);
                  }}
                  style={[
                    {
                      borderWidth: activeIndex === index ? 1 : null,
                      borderColor:
                        activeIndex === index
                          ? BaseColors.primary
                          : BaseColors.black20,
                    },
                    styles.dot,
                  ]}
                >
                  <View
                    onPress={() => {
                      setActiveIndex(index);
                    }}
                    style={[
                      styles.round,
                      {
                        backgroundColor:
                          activeIndex === index
                            ? BaseColors.primary
                            : '#B6B7B9',
                      },
                    ]}
                  />
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>
        {isLastScreen ? (
          <View style={styles.btnContainer}>
            <Button shape="round" title={'Continue'} style={styles.button} />
          </View>
        ) : null}
      </ScrollView>
    </View>
  );
};

export default ImmediateRecall;
