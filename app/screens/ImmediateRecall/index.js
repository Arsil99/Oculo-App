import { View, Text, StatusBar, TouchableOpacity } from 'react-native';
import React from 'react';
import styles from './styles';
import HeaderBar from '@components/HeaderBar';
import Button from '@components/Button';
import { Image } from 'react-native';
import { Images } from '@config';
import { BaseColors } from '@config/theme';
import BaseSetting from '@config/setting';
import { useState } from 'react';

const ImmediateRecall = ({ navigation }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const planData = [1, 1, 1];
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
          <TouchableOpacity activeOpacity={BaseSetting.buttonOpacity}>
            <Text>Skip</Text>
          </TouchableOpacity>
        }
        leftText={'Cancel'}
        leftBtnPress={() => {
          navigation.goBack();
        }}
      />
      <View
        style={{
          paddingTop: 30,
          flex: 1,
          paddingHorizontal: 30,
          marginTop: 2,
          backgroundColor: BaseColors.white,
        }}
      >
        <View style={{ flex: 0.65 }}>
          <Text style={styles.titlesubText}>
            Thank you for adding your symptoms’{'\n'} severeity.
          </Text>
          <Text style={styles.titleText}>Instructions</Text>
          <Text style={styles.titlesubText}>
            This task will assess how well you can remember a word list. When
            the test begins, you will see a list of word appear on the screen.
            Remember these words. Once the response box appears on the screen,
            do your best to report as many words as you can remember. You will
            repeat the same word list three times.
          </Text>
        </View>
        <Text style={styles.example}>Example:</Text>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 30,
          }}
        >
          <Image
            source={Images.rememberword}
            resizeMode="contain"
            style={styles.img2}
          />
          <View style={styles.dotwithbordercontainer}>
            {planData.map((item, index) => {
              return (
                <TouchableOpacity
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
              );
            })}
          </View>
        </View>
      </View>
    </View>
  );
};

export default ImmediateRecall;
