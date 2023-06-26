import { View, Text } from 'react-native';
import React, { useState } from 'react';
import styles from './styles';
import HeaderBar from '@components/HeaderBar';
import ProfileDetailcard from '@components/ProfileDetailcard';
import TabSwitch from '@components/TabSwitch';
import Icon from 'react-native-vector-icons/AntDesign';
import { BaseColors } from '@config/theme';
import ProfileHistory from '@components/ProfileHistory';
export default function Profile({ navigation }) {
  const switchOptions = [
    { id: 'detail', name: 'Detail' },
    { id: 'history', name: 'History' },
    { id: 'account', name: 'Account' },
  ];

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
      righttitle: 'Andyanderson@gmail.com',
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
      righttitle: 'Parceyanderson@gmail.com',
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
  return (
    <View style={styles.main}>
      <HeaderBar HeaderText={'Profile'} HeaderCenter />

      {/* SWITCH TAB */}

      <View style={{ backgroundColor: BaseColors.white }}>
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
        <View style={{ width: '100%', alignItems: 'center' }}>
          <ProfileDetailcard
            maintitle={'Patient Information'}
            data={patientdata}
          />
          <ProfileDetailcard
            maintitle={'Contact Information'}
            data={contactdata}
          />
        </View>
      ) : activeTab?.id === 'history' ? (
        <ProfileHistory />
      ) : (
        <View style={{ alignItems: 'center', width: '100%' }}>
          <ProfileDetailcard
            maintitle={'Settings'}
            data={settings}
            onPress={item => console.log(item)}
          />
          <ProfileDetailcard
            maintitle={'Legal & Regulatory'}
            data={legal}
            onPress={item => console.log(item)}
          />
        </View>
      )}
    </View>
  );
}
