import { View, Text, Switch, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import styles from './styles';
import HeaderBar from '@components/HeaderBar';
import ProfileDetailcard from '@components/ProfileDetailcard';
import TabSwitch from '@components/TabSwitch';
import Icon from 'react-native-vector-icons/AntDesign';
import { BaseColors } from '@config/theme';
import ProfileHistory from '@components/ProfileHistory';
import { logout } from '@utils/CommonFunction';
export default function Profile({ navigation }) {
  const switchOptions = [
    { id: 'detail', name: 'Detail' },
    { id: 'history', name: 'History' },
    { id: 'account', name: 'Account' },
  ];
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  const [activeTab, setActiveTab] = useState({
    id: 'detail',
    name: 'Detail',
  });
  const patientdata = [
    {
      id: '1',
      leftIcon: 'user',
      title: 'First Name',
      righttitle: 'Andy',
    },
    {
      id: '2',
      leftIcon: 'user',
      title: 'Last Name',
      righttitle: 'Anderson',
    },
    {
      id: '3',
      leftIcon: 'calendar',
      title: 'Date of Birth',
      righttitle: '27-04-1998',
    },
    {
      id: '4',
      leftIcon: 'man',
      title: 'Gender',
      righttitle: 'Male',
    },
  ];
  const contactdata = [
    {
      id: '1',
      leftIcon: 'phone',
      title: 'Patient Phone',
      righttitle: '(454) 334 - 3301',
    },
    {
      id: '2',
      leftIcon: 'mail',
      title: 'Patient Email',
      righttitle: 'Anderson@gmail.com',
    },
    {
      id: '3',
      leftIcon: 'phone',
      title: 'Guardian phone',
      righttitle: '(454) 334 - 3301',
    },
    {
      id: '4',
      leftIcon: 'mail',
      title: 'Guardian email',
      righttitle: 'demo@gmail.com',
    },
  ];

  const settings = [
    {
      id: '1',
      leftIcon: 'key',
      title: 'Change Password',
      righttitle: <Icon name="right" size={15} />,
      switch: false,
    },
    {
      id: '2',
      leftIcon: 'notification',
      title: 'Notifications settings',
      righttitle: <Icon name="right" size={15} />,
      switch: false,
    },
    {
      id: '3',
      leftIcon: 'calendar',
      title: 'Dark Theme',
      // righttitle: '',
      switch: true,
    },
    {
      id: '4',
      leftIcon: 'logout',
      title: 'Sign Out',
      righttitle: <Icon name="right" size={15} />,
      switch: false,
    },
  ];
  const legal = [
    {
      id: '1',
      leftIcon: 'key',
      title: 'Terms of Services',
      righttitle: <Icon name="right" size={15} />,
    },
    {
      id: '2',
      leftIcon: 'Privacy Policy',
      title: 'Notifications settings',
      righttitle: <Icon name="right" size={15} />,
    },
  ];
  const InfoCard = ({ data, mainTitle }) => {
    return (
      <View style={styles.settigCon}>
        <View style={styles.mainTitleStyle}>
          <Text style={styles.titleText}>{mainTitle}</Text>
        </View>
        {data?.map((item, index) => {
          return (
            <TouchableOpacity
              key={item?.id}
              activeOpacity={0.7}
              onPress={() =>
                item?.title === 'Sign Out' ? logout() : console.log(item)
              }
              style={[
                styles.settingItem,
                index === 0 ? styles.topBorder : styles.otherBorder,
                index === data.length - 1 ? styles.radiusDesign : null,
              ]}
            >
              <View style={styles.cardContainer}>
                <View style={styles.innerCard}>
                  <Icon
                    name={item.leftIcon}
                    size={15}
                    color={BaseColors.black90}
                  />
                </View>
                <View>
                  <Text style={styles.settingItemText}>{item.title}</Text>
                </View>
              </View>

              <View>
                <Text style={styles.righttitletext}>
                  {item?.switch ? (
                    <Switch
                      trackColor={{ false: '#767577', true: '#81b0ff' }}
                      thumbColor={
                        isEnabled ? BaseColors.primary : BaseColors.offWhite
                      }
                      ios_backgroundColor="#3e3e3e"
                      onValueChange={toggleSwitch}
                      value={isEnabled}
                    />
                  ) : (
                    item.righttitle
                  )}
                </Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  };
  return (
    <View style={styles.main}>
      <HeaderBar HeaderText={'Profile'} HeaderCenter />

      {/* SWITCH TAB */}

      <View style={styles.tabBox}>
        <TabSwitch
          threePack
          tabs={switchOptions}
          activeTab={activeTab}
          onTabChange={currentTab => {
            setActiveTab(currentTab);
          }}
        />
      </View>
      {activeTab?.id === 'detail' ? (
        <View style={styles.cardOuter}>
          <InfoCard data={patientdata} mainTitle={'Patient Information'} />
          <InfoCard data={contactdata} mainTitle={'Contact Information'} />
        </View>
      ) : activeTab?.id === 'history' ? (
        <ProfileHistory />
      ) : (
        <View style={styles.cardOuter}>
          <InfoCard data={settings} mainTitle={'Settings'} />
          <InfoCard data={legal} mainTitle={'Legal & Regulatory'} />
        </View>
      )}
    </View>
  );
}
