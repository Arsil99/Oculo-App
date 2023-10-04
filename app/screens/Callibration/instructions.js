import React, { useState } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import HeaderBar from '@components/HeaderBar';
import Swiper from 'react-native-swiper';
import { BaseColors } from '@config/theme';
import Button from '@components/Button';
import { Images } from '@config';
import styles from './styles';
import { useSelector } from 'react-redux';

const Instructions = ({ navigation }) => {
  const { darkmode } = useSelector(state => state.auth);
  const [activeIndex, setActiveIndex] = useState(0);

  const images = [
    {
      id: 1,
      path: Images?.slide1,
    },
    {
      id: 2,
      path: Images?.slide2,
    },
  ];

  return (
    <>
      <HeaderBar leftText="Cancel" />
      <View
        style={[
          styles.container,
          {
            backgroundColor: darkmode
              ? BaseColors.lightBlack
              : BaseColors.white,
          },
        ]}
      >
        <View style={styles.topIn}>
          <Text
            style={[
              styles.title,
              { color: darkmode ? BaseColors.white : BaseColors.textGrey },
            ]}
          >
            ASSESSMENT INSTRUCTIONS
          </Text>
          <Text
            style={[
              styles.miniTitle,
              { color: darkmode ? BaseColors.white : BaseColors.textGrey },
            ]}
          >
            Tips for Success
          </Text>
        </View>
        <View style={styles.swipeCover}>
          <Swiper
            dotColor={BaseColors.black40}
            activeDotColor={BaseColors.primary}
            showsPagination={true}
            loop={false}
            onIndexChanged={index => setActiveIndex(index)}
          >
            {images?.map(image => (
              <>
                <View key={image?.id} style={styles.slide}>
                  <Image source={image?.path} style={styles.img} />
                  {image?.id === 1 ? (
                    <View style={styles.post1}>
                      <Image source={Images?.post1_s1} />
                      <Image source={Images?.post2_s1} />
                    </View>
                  ) : (
                    <View style={styles.post2}>
                      <Image source={Images?.post1_s2} />
                    </View>
                  )}
                </View>
              </>
            ))}
          </Swiper>
        </View>
        <View style={styles.desc}>
          <Text
            style={[
              styles.miniTitle,
              { color: darkmode ? BaseColors.white : BaseColors.textGrey },
            ]}
          >
            {activeIndex
              ? 'Best to test indoors with good lighting - avoid intensely bright rooms or testing in the dark.   '
              : 'Remain seated for the test. Keep your face and head position still during testing.'}
          </Text>
          <Button
            title="Camera Set Up"
            disabled={!activeIndex ? true : false}
            style={styles.btnStyle}
            onPress={() => {
              navigation.navigate('Callibration');
            }}
          />
        </View>
      </View>
    </>
  );
};

export default Instructions;
