import Button from '@components/Button';
import HeaderBar from '@components/HeaderBar';
import { BaseColors } from '@config/theme';
import { Slider } from '@miblanchard/react-native-slider';
import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import styles from './styles';

const Symptoms = () => {
  const [activeButtonIndex, setActiveButtonIndex] = useState(0);

  const buttons = [
    { id: 1, label: 'Headache' },
    { id: 2, label: 'Neck Pain' },
    { id: 2, label: 'Nausea' },
  ];

  const handleButtonPress = index => {
    setActiveButtonIndex(index);
  };

  const [sliderValue, setSliderValue] = useState(0);

  const handleValueChange = newValue => {
    setSliderValue(newValue);
  };
  return (
    <View style={styles.main}>
      <HeaderBar HeaderText={'Symptoms'} HeaderCenter backPress />
      <ScrollView
        style={styles.scrollcontainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={{ flex: 1 }}>
          <View style={{}}>
            <FlatList
              data={buttons}
              horizontal
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
                    activeOpacity={0.7}
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

            <Text style={styles.boldText}>
              Report the severity level of Headache:
            </Text>

            <Slider
              value={sliderValue}
              onValueChange={handleValueChange}
              minimumValue={1}
              maximumValue={6}
              minimumTrackTintColor={BaseColors.primary}
              maximumTrackTintColor={BaseColors.tabinActive}
              thumbTintColor={BaseColors.white}
              style={styles.slider}
              step={1}
              thumbStyle={styles.thumbstyle}
            />

            <View style={styles.sliderLabelsContainer}>
              {[0, 1, 2, 3, 4, 5, 6].map(label => (
                <Text style={styles.sliderLabel} key={label.toString()}>
                  {label}
                </Text>
              ))}
            </View>

            <View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  paddingVertical: 15,
                }}
              >
                <Text style={styles.lighttext}>None</Text>
                <Text style={styles.lighttext}>Mild</Text>
                <Text style={styles.lighttext}>Moderate</Text>
                <Text style={styles.lighttext}>Sever</Text>
              </View>
            </View>

            <View style={styles.assesmentmaincontainer}>
              <View style={styles.assesmentcontainer}>
                <View style={styles.previousassesment} />
                <Text>Previous Assessment</Text>
              </View>
              <View style={styles.assesmentcontainer}>
                <View style={styles.currentassesment} />
                <Text>Current Assessment</Text>
              </View>
            </View>
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
