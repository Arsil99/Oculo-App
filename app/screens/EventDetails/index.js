import { View, Text } from 'react-native';
import React, { useState } from 'react';
import styles from './style';
import HeaderBar from '@components/HeaderBar';
import TabSwitch from '@components/TabSwitch';
import { BaseColors } from '@config/theme';
import Milestones from '@components/Milestones';
import { Images } from '@config';
import CardList from '@components/CardList';
import { useSelector } from 'react-redux';
export default function EventDetails() {
  const { darkmode } = useSelector(state => state.auth);
  // OUTER TABS
  const switchOptions = [
    { id: 'report', name: 'Report' },
    { id: 'assessments', name: 'Assessments' },
  ];

  const [activeTab, setActiveTab] = useState({
    id: 'report',
    name: 'Report',
  });

  // INNER TABS
  const switchInOptions = [
    { id: 'summary', name: 'Summary' },
    { id: 'details', name: 'Details' },
  ];

  const [activeInTab, setActiveInTab] = useState({
    id: 'summary',
    name: 'Summary',
  });
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
        HeaderText={'Event Report (Aug 03)'}
        HeaderCenter
        leftText="Back"
      />
      {/* SWITCH TAB */}

      <TabSwitch
        tabs={switchOptions}
        activeTab={activeTab}
        onTabChange={currentTab => {
          setActiveTab(currentTab);
        }}
      />

      {activeTab?.id === 'report' ? (
        <View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingHorizontal: 25,
              marginVertical: 20,
            }}
          >
            <View>
              <Text
                style={{
                  fontSize: 16,
                  color: darkmode ? BaseColors.white : BaseColors.black90,
                }}
              >
                Event Type:{' '}
              </Text>
              <Text
                style={{
                  color: darkmode ? BaseColors.white : BaseColors.black90,
                }}
              >
                Intial Visit
              </Text>
            </View>
            <View>
              <Text
                style={{
                  fontSize: 16,
                  color: darkmode ? BaseColors.white : BaseColors.black90,
                }}
              >
                RTA Phase:{' '}
              </Text>
              <Text
                style={{
                  color: darkmode ? BaseColors.white : BaseColors.black90,
                }}
              >
                Symptom Limited Activity
              </Text>
            </View>
          </View>
          <TabSwitch
            insideTab
            tabs={switchInOptions}
            activeTab={activeInTab}
            onTabChange={currentTab => {
              setActiveInTab(currentTab);
            }}
          />
          {activeInTab.id === 'summary' ? (
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Text
                style={{
                  marginVertical: 25,
                  color: darkmode ? BaseColors.white : BaseColors.black90,
                }}
              >
                Coming Soon ...
              </Text>
            </View>
          ) : (
            <View style={styles.detailsArea}>
              <Milestones />
            </View>
          )}
        </View>
      ) : (
        <View
          style={{
            backgroundColor: darkmode
              ? BaseColors.lightBlack
              : BaseColors.white,
            flex: 1,
          }}
        >
          <View style={{ paddingHorizontal: 15 }}>
            <Text
              style={{
                fontSize: 18,
                marginVertical: 5,
                color: darkmode ? BaseColors.white : BaseColors.black90,
              }}
            >
              Open Events
            </Text>
            <CardList
              image={Images.emoji1}
              data={'March 30, 2000'}
              status={'Completed'}
              assessment={'Assessment 4/5'}
            />
          </View>
        </View>
      )}
    </View>
  );
}
