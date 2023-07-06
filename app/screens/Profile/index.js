import {
  View,
  Text,
  Switch,
  TouchableOpacity,
  ScrollView,
  Modal,
  Alert,
  Platform,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import styles from './styles';
import HeaderBar from '@components/HeaderBar';
import TabSwitch from '@components/TabSwitch';
import Icon1 from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/AntDesign';
import { BaseColors } from '@config/theme';
import ProfilehistoryButton from '@components/ProfilehistoryButton';
import { logout } from '@utils/CommonFunction';
import { useDispatch, useSelector } from 'react-redux';
import Authentication from '@redux/reducers/auth/actions';
import Dropdown from '@components/Dropdown';
import Profiledetailcomponent from '@components/Profiledetailcomponent';

const IOS = Platform.OS === 'ios';

export default function Profile({ navigation }) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const items = [
    { label: 'Email', value: 'Email' },
    { label: 'Phone', value: 'Phone' },
  ];
  const dispatch = useDispatch();
  const { setEditProfiles, setSaveEdit } = Authentication;

  const [modalVisible, setModalVisible] = useState(false);
  const { userData, editProfiles, saveEdit } = useSelector(state => {
    return state.auth;
  });

  const switchOptions = [
    { id: 'detail', name: 'Detail' },
    { id: 'history', name: 'History' },
    { id: 'account', name: 'Account' },
  ];
  const [isEnabledfaceid, setIsEnabledfaceid] = useState(false);
  const [isEnabled, setIsEnabled] = useState(false);

  useEffect(() => {
    dispatch(setEditProfiles(false));
  }, []);
  const toggleSwitchfaceid = () =>
    setIsEnabledfaceid(previousState => !previousState);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  const [activeTab, setActiveTab] = useState({
    id: 'detail',
    name: 'Detail',
  });
  console.log('🚀 ~ file: index.js:30 ~ Profile ~ userData:', userData);
  const patientdata = [
    {
      id: '1',
      leftIcon: 'user',
      title: 'First Name',
      righttitle: userData?.firstname,
    },
    {
      id: '2',
      leftIcon: 'user',
      title: 'Last Name',
      righttitle: userData?.lastname,
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
      righttitle: userData?.phone,
    },
    {
      id: '2',
      leftIcon: 'mail',
      title: 'Patient Email',
      righttitle: userData?.email,
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
      leftIcon: IOS ? 'Meh' : 'finger-print-outline',
      title: IOS ? 'Login With Face Id' : 'Login With Touch Id',
      switch: true,
    },
    {
      id: '2',
      leftIcon: 'unlock',
      title: 'Two Factor Enabled',
      righttitle: <Icon name="right" size={15} />,
      switch: false,
    },
    {
      id: '3',
      leftIcon: 'key',
      title: 'Change Password',
      righttitle: <Icon name="right" size={15} />,
      switch: false,
      navto: 'ResetPassword',
    },
    {
      id: '4',
      leftIcon: 'notification',
      title: 'Notifications settings',
      righttitle: <Icon name="right" size={15} />,
      switch: false,
      navto: 'NotificationSettings',
    },
    {
      id: '5',
      leftIcon: 'calendar',
      title: 'Dark Theme',
      // righttitle: '',
      switch: true,
    },
    {
      id: '6',
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
      navto: 'TermsofServices',
    },
    {
      id: '2',
      leftIcon: 'unknowfile1',
      title: 'Privacy Policy',
      righttitle: <Icon name="right" size={15} />,
      navto: 'PrivacyPolicy',
    },
  ];
  const [editProfile, setEditProfile] = useState(false);
  const [editHistory, setEditHistory] = useState(false);
  const [rightText, setRightText] = useState('Edit');
  const [rightHistoryText, setRightHistoryText] = useState('Edit');

  useEffect(() => {
    if (activeTab?.id === 'history') {
      setEditProfile(false);
      dispatch(setEditProfiles(false));
      dispatch(setSaveEdit('Edit'));
    } else if (activeTab?.id === 'detail') {
      setEditHistory(false);
      dispatch(setSaveEdit('Edit'));
    } else if (activeTab?.id === 'account') {
      setEditProfile(false);
      dispatch(setEditProfiles(false));
      dispatch(setSaveEdit('Edit'));
      setEditHistory(false);
      setRightHistoryText('Edit');
    }
    return () => {
      setEditProfile(false);
      dispatch(setEditProfiles(false));
      dispatch(setSaveEdit('Edit'));
      setEditHistory(false);
      setRightHistoryText('Edit');
    };
  }, [activeTab]);

  const HandleHistoryUpdateBtn = () => {
    setEditHistory(!editHistory);
    setRightHistoryText(rightHistoryText === 'Edit' ? 'Save' : 'Edit');
  };

  const InfoCard = ({ data, mainTitle }) => {
    return (
      <View style={styles.settigCon}>
        <View style={styles.mainTitleStyle}>
          <Text style={styles.titleText}>{mainTitle}</Text>
        </View>
        <View style={styles.infoshadow}>
          {data?.map((item, index) => {
            return (
              <TouchableOpacity
                key={item?.id}
                activeOpacity={0.7}
                onPress={() =>
                  item?.title === 'Sign Out'
                    ? logout()
                    : item?.title === 'Two Factor Enabled'
                    ? setModalVisible(!modalVisible)
                    : console.log(item.title)
                }
                style={[
                  styles.settingItem,
                  index === 0 ? styles.topBorder : styles.otherBorder,
                  index === data.length - 1 ? styles.radiusDesign : null,
                ]}
              >
                <View style={styles.cardContainer}>
                  <View style={styles.innerCard}>
                    {item?.title === 'Login With Touch Id' ? (
                      <Icon1
                        name={item.leftIcon}
                        size={15}
                        color={BaseColors.black90}
                      />
                    ) : (
                      <Icon
                        name={item.leftIcon}
                        size={15}
                        color={BaseColors.black90}
                      />
                    )}
                  </View>
                  <View>
                    <Text style={styles.settingItemText}>{item.title}</Text>
                  </View>
                </View>

                <View>
                  <Text style={styles.righttitletext}>
                    {item?.switch ? (
                      <Switch
                        // trackColor={{ false: '#767577', true: '#81b0ff' }}
                        // thumbColor={{
                        //   false: BaseColors.primary,
                        //   true: BaseColors.offWhite,
                        // }}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={
                          item.title === 'Dark Theme'
                            ? toggleSwitch
                            : toggleSwitchfaceid
                        }
                        value={
                          item.title === 'Dark Theme'
                            ? isEnabled
                            : isEnabledfaceid
                        }
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
      </View>
    );
  };

  const [isClick, setIsClick] = useState(false);

  return (
    <View style={styles.main}>
      <HeaderBar
        HeaderText={'Profile'}
        HeaderCenter
        leftText={editProfiles ? 'Close' : ''}
        leftBtnPress={() => {
          dispatch(setSaveEdit('Edit'));
          dispatch(setEditProfiles(false));
        }}
        rightComponent={
          activeTab?.id === 'detail' ? (
            <TouchableOpacity
              onPress={() =>
                saveEdit === 'Edit'
                  ? (dispatch(setEditProfiles(true)),
                    dispatch(
                      setSaveEdit(saveEdit === 'Edit' ? 'Save' : 'Edit'),
                    ))
                  : setIsClick(prevState => !prevState)
              }
            >
              <Text>{saveEdit}</Text>
            </TouchableOpacity>
          ) : activeTab?.id === 'history' ? (
            <TouchableOpacity
              onPress={() =>
                rightHistoryText === 'Edit'
                  ? (setEditHistory(!editHistory),
                    setRightHistoryText(
                      rightHistoryText === 'Edit' ? 'Save' : 'Edit',
                    ))
                  : HandleHistoryUpdateBtn()
              }
            >
              <Text>{rightHistoryText}</Text>
            </TouchableOpacity>
          ) : null
        }
      />

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
        <ScrollView style={{ width: '100%' }}>
          <View style={styles.cardOuter}>
            {editProfiles === true ? (
              <Profiledetailcomponent onPress={isClick} />
            ) : (
              <View style={styles.alignSetup}>
                <InfoCard
                  data={patientdata}
                  mainTitle={'Patient Information'}
                />
                <InfoCard
                  data={contactdata}
                  mainTitle={'Contact Information'}
                />
              </View>
            )}
          </View>
        </ScrollView>
      ) : activeTab?.id === 'history' ? (
        <ProfilehistoryButton editHistory={editHistory} />
      ) : (
        <View style={styles.cardOuter}>
          <InfoCard data={settings} mainTitle={'Settings'} />
          <InfoCard data={legal} mainTitle={'Legal & Regulatory'} />

          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              Alert.alert('Modal has been closed.');
              setModalVisible(!modalVisible);
            }}
          >
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <View style={styles.modalHead}>
                  <Text style={styles.titleText}>Select Option</Text>
                  <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={() => {
                      setModalVisible(!modalVisible);
                    }}
                    style={styles.closeicon}
                  >
                    <Icon name="close" size={20} color={BaseColors.primary} />
                  </TouchableOpacity>
                </View>
                <View style={styles.dropdownContainer}>
                  <Dropdown
                    items={items}
                    open={open}
                    setOpen={setOpen}
                    placeholder="Please select validation type"
                    value={value}
                    setValue={setValue}
                    // onValueChange={handleDropdownChange}
                  />
                </View>
              </View>
            </View>
          </Modal>
        </View>
      )}
    </View>
  );
}
