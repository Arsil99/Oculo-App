import { View, Text } from 'react-native';
import React from 'react';
import styles from './styles';
import HeaderBar from '@components/HeaderBar';
import Button from '@components/Button';
import { useSelector } from 'react-redux';
import { BaseColors } from '@config/theme';

const Assessment = ({ navigation, route }) => {
  const { darkmode } = useSelector(state => state.auth);
  const eventId = route?.params?.event_id;
  const data = route?.params?.otherData;

  const navigatetoscreen = () => {
    if (data.digit_recall === 0) {
      // Navigate to digit_recall screen
      navigation.navigate('ImmediateRecallmain', {
        event_id: data?.id,
        otherData: data,
      });
    } else if (data.digit_recall === 1) {
      null;
    } else if (data.digit_recall === null) {
      null;
    }

    if (data.immediate_recall === 0) {
      // Navigate to immediate_recall screen
      navigation.navigate('ImmediateRecall', {
        event_id: data?.id,
        otherData: data,
      });
    } else if (data.immediate_recall === 1) {
      navigation.navigate('ImmediateRecallmain', {
        event_id: data?.id,
        otherData: data,
      });
    } else if (data.immediate_recall === null) {
      navigation.navigate('ImmediateRecallmain', {
        event_id: data?.id,
        otherData: data,
      });
    }

    if (data.symptom_info === 0) {
      // Navigate to symptoms screen
      navigation.navigate('Symptom', {
        event_id: data?.id,
        otherData: data,
      });
    } else if (data.symptom_info === 1) {
      navigation.navigate('ImmediateRecall', {
        event_id: data?.id,
        otherData: data,
      });
    } else if (data.symptom_info === null) {
      navigation.navigate('ImmediateRecall', {
        event_id: data?.id,
        otherData: data,
      });
    }
    if (data.treatment_info === 0) {
      // Navigate to treatment_info screen
      navigation.navigate('ChangeInfo', {
        event_id: data?.id,
        otherData: data,
      });
    } else if (data.treatment_info === 1) {
      navigation.navigate('Symptom', {
        event_id: data?.id,
        otherData: data,
      });
    } else if (data.treatment_info === null) {
      navigation.navigate('Symptom', {
        event_id: data?.id,
        otherData: data,
      });
    }
  };
  return (
    <View
      style={[
        styles.main,
        {
          backgroundColor: darkmode ? BaseColors.lightBlack : BaseColors.white,
        },
      ]}
    >
      <HeaderBar
        HeaderText={
          data?.symptom_info +
            data?.immediate_recall +
            data?.digit_recall +
            data.treatment_info ===
          0
            ? 'Assessment 1'
            : data?.symptom_info +
                data?.immediate_recall +
                data?.digit_recall +
                data.treatment_info ===
              1
            ? 'Assessment 2'
            : data?.symptom_info +
                data?.immediate_recall +
                data?.digit_recall +
                data.treatment_info ===
              2
            ? 'Assessment 3'
            : 'Assessment 4'
        }
        HeaderCenter
        leftText="Back"
        leftBtnPress={() => {
          navigation.goBack();
        }}
      />
      <View
        style={{ borderBottomColor: BaseColors.white, borderBottomWidth: 0.3 }}
      ></View>

      <View style={{ flex: 1, marginHorizontal: 25 }}>
        <View
          style={{
            justifyContent: 'flex-end',
            marginTop: 20,
          }}
        >
          <Text
            style={[
              styles.titleText,
              {
                color: darkmode ? BaseColors.white : BaseColors.textColor,
              },
            ]}
          >
            Assessment Details
          </Text>
          <View>
            <Text
              style={[
                styles.titlesubText,
                {
                  color: darkmode ? BaseColors.white : BaseColors.textColor,
                },
              ]}
            >
              Event
            </Text>
            <Text
              style={[
                styles.titledetail,
                {
                  color: darkmode ? BaseColors.white : BaseColors.textColor,
                },
              ]}
            >
              {data?.createdAt}
            </Text>
          </View>
          <View>
            <Text
              style={[
                styles.titlesubText,
                {
                  color: darkmode ? BaseColors.white : BaseColors.textColor,
                },
              ]}
            >
              Provider
            </Text>
            <Text
              style={[
                styles.titledetail,
                {
                  color: darkmode ? BaseColors.white : BaseColors.textColor,
                },
              ]}
            >
              Seth Rollins
            </Text>
          </View>
          <View>
            <Text
              style={[
                styles.titlesubText,
                {
                  color: darkmode ? BaseColors.white : BaseColors.textColor,
                },
              ]}
            >
              Assessment Type
            </Text>
            <Text
              style={[
                styles.titledetail,
                {
                  color: darkmode ? BaseColors.white : BaseColors.textColor,
                },
              ]}
            >
              {data?.assmt_type}
            </Text>
          </View>
          <View>
            <Text
              style={[
                styles.titlesubText,
                {
                  color: darkmode ? BaseColors.white : BaseColors.textColor,
                },
              ]}
            >
              Instructions
            </Text>
            <Text
              style={[
                styles.titledetail,
                {
                  color: darkmode ? BaseColors.white : BaseColors.textColor,
                },
              ]}
            >
              Pellentesque metus neque, egestas id tincidunt et, porttitor quis
              libero. Suspendisse placerat sollicitudin finibus. Ut lorem quam,
              aliquam cursus diam fermentum, volutpat mollis enim. Sed eu dui
              eget lectus euismod pretium nec quis ipsum. Nam pretium nisl sed
              laoreet pulvinar. Etiam dolor nisi, pulvinar vitae justo in,
              consequat v
            </Text>
          </View>
        </View>
        <View style={styles.btnContainer}>
          <Button
            shape="round"
            title={'Begin Assessment'}
            style={styles.Assessment}
            onPress={navigatetoscreen}
          />
        </View>
      </View>
    </View>
  );
};

export default Assessment;
