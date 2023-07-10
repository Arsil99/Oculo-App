import Button from '@components/Button';
import HeaderBar from '@components/HeaderBar';
import { BaseColors, FontFamily } from '@config/theme';
import { Slider } from '@miblanchard/react-native-slider';
import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import styles from './styles';
import BaseSetting from '@config/setting';

const Symptoms = ({ navigation }) => {
  const [activeButtonIndex, setActiveButtonIndex] = useState(0);

  const buttons = [
    { id: 1, label: 'Headache', value: 1 },
    { id: 2, label: 'Neck Pain', value: 1 },
    { id: 2, label: 'Nausea', value: 1 },
  ];

  const handleButtonPress = index => {
    setActiveButtonIndex(index);
  };

  const [sliderValue, setSliderValue] = useState(1);

  const handleValueChange = newValue => {
    setSliderValue(newValue);
  };
  return (
    <View style={styles.main}>
      <StatusBar barStyle="dark-content" translucent={true} />
      <HeaderBar
        HeaderText={'Symptoms'}
        HeaderCenter
        leftText="Cancel"
        leftBtnPress={() => {
          navigation.goBack();
        }}
      />
      <ScrollView
        contentContainerStyle={styles.scrollcontainer}
        showsVerticalScrollIndicator={false}
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
                    onPress={() => handleButtonPress(index)}
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
                    <Text style={styles.boldText}>
                      Report the severity level of Headache:
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
            <Button shape="round" title={'Next'} style={styles.signinbutton} />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default Symptoms;
