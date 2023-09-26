import { View, Text, Image, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import styles from './styles';
import { Images } from '@config';
import TabSwitch from '@components/TabSwitch';
import Button from '@components/Button';
import Milestones from '@components/Milestones';
import { useSelector } from 'react-redux';
import { BaseColors } from '@config/theme';
import Animated, { FadeIn } from 'react-native-reanimated';
import SpiderWebChart from '@components/SpiderWebChart';
import { getApiData } from '@utils/apiHelper';
import BaseSetting from '@config/setting';
import { Toast } from 'react-native-toast-message/lib/src/Toast';

export default function Home({ navigation }) {
  const switchOptions = [
    { id: 'summary', name: 'Summary' },
    { id: 'details', name: 'Details' },
  ];

  const [activeTab, setActiveTab] = useState({
    id: 'summary',
    name: 'Summary',
  });

  const { userData, darkmode } = useSelector(state => state.auth);
  console.log('🚀 ~ file: index.js:23 ~ Home ~ userData:', userData);

  async function handlegetData() {
    const endPoint = BaseSetting.endpoints.createRequest;
    try {
      const response = await getApiData(`${endPoint}`, 'GET');
      if (response?.status) {
        Toast.show({
          text1: response?.message.toString(),
          type: 'success',
        });
      } else {
        Toast.show({
          text1: response?.message,
          type: 'error',
        });
      }
    } catch (error) {
      console.log('error =======>>>', error);
    }
  }
  return (
    // MAIN CONTAINER
    <View
      style={[
        styles.main,
        {
          backgroundColor: darkmode ? BaseColors.lightBlack : BaseColors.white,
        },
      ]}
    >
      {/* TOP HEADER  */}
      <View style={styles.topBar}>
        <View>
          <Image
            source={
              userData?.profile_pic
                ? { uri: userData?.profile_pic }
                : Images.avatar
            }
            resizeMode="cover"
            style={{ height: 60, width: 60, borderRadius: 30, borderWidth: 1 }}
          />
        </View>
        <View style={styles.title}>
          <Text style={styles.name}>
            Hi,{' '}
            {userData?.firstname?.length > 15
              ? userData?.firstname?.substring(0, 15) + '.....'
              : userData?.firstname}
          </Text>
          <Text
            style={[
              styles.welcomeText,
              { color: darkmode ? BaseColors.white : BaseColors.black90 },
            ]}
          >
            Welcome to Oculo
          </Text>
        </View>
      </View>

      {/* SWITCH TAB */}
      <TabSwitch
        tabs={switchOptions}
        activeTab={activeTab}
        onTabChange={currentTab => {
          setActiveTab(currentTab);
        }}
      />

      {/* ACTIVE TAB AREA */}
      {activeTab?.id === 'summary' ? (
        <View
          style={[
            styles.summaryArea,
            {
              backgroundColor: darkmode ? BaseColors.white20 : BaseColors.white,
            },
          ]}
        >
          <View style={styles.container}>
            <SpiderWebChart />
            <View style={styles.summaryText}>
              <Text
                style={[
                  styles.descText,
                  {
                    marginTop: 15,
                    color: darkmode ? BaseColors.white : BaseColors.black90,
                  },
                ]}
              >
                Baseline
              </Text>
              <Text
                style={[
                  styles.descText,
                  { color: darkmode ? BaseColors.white : BaseColors.black90 },
                ]}
              >
                Comparision requires other assessments to compare with the
                baseline
              </Text>
            </View>
          </View>
          <Animated.View entering={FadeIn} style={styles.requestBtn}>
            <Button
              onPress={handlegetData}
              shape="round"
              title={'Request Another Baseline'}
              // onPress={validation}
              // loading={loader}
            />
          </Animated.View>
        </View>
      ) : (
        <View style={styles.detailsArea}>
          <Milestones />
        </View>
      )}
    </View>
  );
}
