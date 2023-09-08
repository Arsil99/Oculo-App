import Button from '@components/Button';
import HeaderBar from '@components/HeaderBar';
import { BaseColors } from '@config/theme';
import React, { useState } from 'react';
import { View, Text, Switch } from 'react-native';
import { useSelector } from 'react-redux';
import styles from './styles';

const NewEvent = () => {
  const { darkmode } = useSelector(state => state.auth);
  const [isSwitchOn, setIsSwitchOn] = useState(false);

  const getCurrentDate = () => {
    const date = new Date();
    const options = { month: 'short', day: '2-digit' };
    return date.toLocaleDateString(undefined, options);
  };
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: darkmode ? BaseColors.lightBlack : BaseColors.white,
      }}
    >
      <HeaderBar HeaderText={'Create New Event '} HeaderCenter />
      <View
        style={{ borderBottomColor: BaseColors.white, borderBottomWidth: 0.5 }}
      ></View>

      <View style={{ flex: 0.9, marginHorizontal: 20 }}>
        <Text
          style={[
            styles.genderTitle,
            {
              color: darkmode ? BaseColors.white : BaseColors.black90,
              marginTop: 20,
            },
          ]}
        >
          Event Title:
        </Text>
        <View style={[styles.genderBox]}>
          <Text
            style={[
              styles.genderTitle,
              { color: darkmode ? BaseColors.white : BaseColors.black90 },
            ]}
          >
            {getCurrentDate()}
          </Text>
        </View>

        <Text
          style={[
            styles.genderTitle,
            {
              color: darkmode ? BaseColors.white : BaseColors.black90,
              marginTop: 20,
            },
          ]}
        >
          Eye Tracking:{'\n'}
        </Text>
        <View
          style={{
            alignItems: 'flex-start',
            justifyContent: 'center',
            marginHorizontal: 20,
          }}
        >
          <Switch
            value={isSwitchOn}
            onValueChange={value => setIsSwitchOn(value)}
          />
        </View>

        <Text
          style={[
            styles.genderTitle,
            {
              color: darkmode ? BaseColors.white : BaseColors.black90,
              marginTop: 20,
            },
          ]}
        >
          Event Type:
        </Text>

        <View style={[styles.genderBox]}>
          <Text
            style={[
              styles.genderTitle,
              { color: darkmode ? BaseColors.white : BaseColors.black90 },
            ]}
          >
            Baseline
          </Text>
        </View>
      </View>
      <View style={{ flex: 0.1, marginHorizontal: 20 }}>
        <Button
          shape="round"
          title="Submit"
          // onPress={handlePostData}
        />
      </View>
    </View>
  );
};

export default NewEvent;
