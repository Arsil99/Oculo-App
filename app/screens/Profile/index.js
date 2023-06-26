import {
  View,
  Text,
  Switch,
  TouchableOpacity,
  Platform,
  ScrollView,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import styles from './styles';
import HeaderBar from '@components/HeaderBar';
import TabSwitch from '@components/TabSwitch';
import Icon from 'react-native-vector-icons/AntDesign';
import { BaseColors } from '@config/theme';
import ProfileHistory from '@components/ProfileHistory';
import ProfilehistoryButton from '@components/ProfilehistoryButton';
import { logout } from '@utils/CommonFunction';
import LabeledInput from '@components/LabeledInput';
import { isEmpty, isNull } from 'lodash';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import { Picker } from '@react-native-picker/picker';
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
  const [editProfile, setEditProfile] = useState(false);
  const [editHistory, setEditHistory] = useState(false);
  const [rightText, setRightText] = useState('Edit');
  const [rightHistoryText, setRightHistoryText] = useState('Edit');

  const errObj = {
    firstNameErr: false,
    firstNameErrMsg: '',
    lastNameErr: false,
    lastNameErrMsg: '',
    dateOfBirthErr: false,
    dateOfBirthErrMsg: '',
    genderErr: false,
    genderErrMsg: '',
    p_phoneErr: false,
    p_phoneErrMsg: '',
    p_emailErr: false,
    p_emailErrMsg: '',
    g_phoneErr: false,
    g_phoneErrMsg: '',
    g_emailErr: false,
    g_emailErrMsg: '',
  };

  // Detail Tab related states
  const [ErrObj, setErrObj] = useState(errObj);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [gender, setGender] = useState('');
  const [patientPhone, setPatientPhone] = useState('');
  const [patientemail, setPatientEmail] = useState('');
  const [guardianPhone, setGuardianPhone] = useState('');
  const [guardianemail, setGuardianEmail] = useState('');

  useEffect(() => {
    if (activeTab?.id === 'history') {
      setEditProfile(false);
      setRightText('Edit');
    } else if (activeTab?.id === 'detail') {
      setEditHistory(false);
      setRightHistoryText('Edit');
    } else if (activeTab?.id === 'account') {
      setEditProfile(false);
      setRightText('Edit');
      setEditHistory(false);
      setRightHistoryText('Edit');
    }
    return () => {
      setEditProfile(false);
      setRightText('Edit');
      setEditHistory(false);
      setRightHistoryText('Edit');
    };
  }, [activeTab]);

  // Date time setup
  const [date, setDate] = useState(new Date(1598051730000));
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
    setBirthDate(moment(selectedDate).format('DD-MM-YYYY'));
  };

  const showMode = currentMode => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const HandleDetailUpdateBtn = () => {
    const error = { ...ErrObj };
    let Valid = true;
    // setEdit(!edit), setRightText(rightText === 'Edit' ? 'Save' : 'Edit');
    // first name
    if (isEmpty(firstName) || isNull(firstName)) {
      Valid = false;
      error.firstNameErr = true;
      error.firstNameErrMsg = 'Enter first name';
    }

    // last name
    if (isEmpty(lastName) || isNull(lastName)) {
      Valid = false;
      error.lastNameErr = true;
      error.lastNameErrMsg = 'Enter last name';
    }

    // patient phone
    if (isEmpty(patientPhone) || isNull(patientPhone)) {
      Valid = false;
      error.p_phoneErr = true;
      error.p_phoneErrMsg = 'Enter patient phone number';
    }

    // patient email
    if (isEmpty(patientemail) || isNull(patientemail)) {
      Valid = false;
      error.p_emailErr = true;
      error.p_emailErrMsg = 'Enter patient email';
    }

    // guardian phone
    if (isEmpty(guardianPhone) || isNull(guardianPhone)) {
      Valid = false;
      error.g_phoneErr = true;
      error.g_phoneErrMsg = 'Enter guardian phone number';
    }

    // guardian email
    if (isEmpty(guardianemail) || isNull(guardianemail)) {
      Valid = false;
      error.g_emailErr = true;
      error.g_emailErrMsg = 'Enter guardian email';
    }
    setErrObj(error);
    if (Valid) {
      setEditProfile(!editProfile),
        setRightText(rightText === 'Edit' ? 'Save' : 'Edit');
    }
  };

  const HandleHistoryUpdateBtn = () => {
    setEditHistory(!editHistory),
      setRightHistoryText(rightHistoryText === 'Edit' ? 'Save' : 'Edit');
  };
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
                item?.title === 'Sign Out'
                  ? logout()
                  : item?.title === 'Change Password'
                  ? navigation.navigate('ResetPassword')
                  : console.log(item)
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
      <HeaderBar
        HeaderText={'Profile'}
        HeaderCenter
        backPress
        rightComponent={
          activeTab?.id === 'detail' ? (
            <TouchableOpacity
              onPress={() =>
                rightText === 'Edit'
                  ? (setEditProfile(!editProfile),
                    setRightText(rightText === 'Edit' ? 'Save' : 'Edit'))
                  : HandleDetailUpdateBtn()
              }
            >
              <Text>{rightText}</Text>
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
            {editProfile ? (
              <View style={styles.alignSetup}>
                <View style={styles.settigCon}>
                  <View style={styles.mainTitleStyle}>
                    <Text style={styles.titleText}>Patient Information</Text>
                  </View>
                  <View style={styles.editContainer}>
                    <LabeledInput
                      Label={'First Name'}
                      usericon
                      placeholder={'Enter first name'}
                      value={firstName}
                      onChangeText={val => {
                        setFirstName(val);
                        setErrObj(old => {
                          return {
                            ...old,
                            firstNameErr: false,
                            firstNameErrMsg: '',
                          };
                        });
                      }}
                      showError={ErrObj.firstNameErr}
                      errorText={ErrObj.firstNameErrMsg}
                    />
                    <LabeledInput
                      Label={'Last Name'}
                      usericon
                      placeholder={'Enter last name'}
                      value={lastName}
                      onChangeText={val => {
                        setLastName(val);
                        setErrObj(old => {
                          return {
                            ...old,
                            lastNameErr: false,
                            lastNameErrMsg: '',
                          };
                        });
                      }}
                      showError={ErrObj.lastNameErr}
                      errorText={ErrObj.lastNameErrMsg}
                    />
                    <TouchableOpacity onPress={showDatepicker}>
                      <Text style={styles.dateTitle}>Date of Birth</Text>
                      <View style={styles.dateBox}>
                        <View style={{ marginRight: 20 }}>
                          <Icon
                            name="calendar"
                            size={25}
                            color={BaseColors.primary}
                          />
                        </View>
                        <View>
                          <Text style={{ color: BaseColors.black }}>
                            {birthDate}
                          </Text>
                        </View>
                      </View>
                    </TouchableOpacity>

                    {show && (
                      <DateTimePicker
                        testID="dateTimePicker"
                        timeZoneOffsetInMinutes={0}
                        value={date}
                        mode={mode}
                        is24Hour={true}
                        display="default"
                        onChange={onChange}
                      />
                    )}
                    <Text style={styles.genderTitle}>Gender</Text>
                    <View style={styles.genderBox}>
                      <View style={styles.genderIcon}>
                        <Icon name="man" size={25} color={BaseColors.primary} />
                      </View>
                      <View style={styles.customGender}>
                        <Picker
                          selectedValue={gender}
                          onValueChange={(value, index) => setGender(value)}
                          mode="dropdown" // Android only
                          style={styles.picker}
                        >
                          <Picker.Item label="Select Gender" value="Unknown" />
                          <Picker.Item label="Male" value="Male" />
                          <Picker.Item label="Female" value="Female" />
                          <Picker.Item label="Not Willing" value="NA" />
                        </Picker>
                      </View>
                    </View>
                  </View>
                </View>
                <View style={styles.settigCon}>
                  <View style={styles.mainTitleStyle}>
                    <Text style={styles.titleText}>Contact Information</Text>
                  </View>
                  <View style={styles.editContainer}>
                    <LabeledInput
                      Label={'Patient Phone'}
                      phoneicon
                      placeholder={'Enter Patient Phone'}
                      value={patientPhone}
                      onChangeText={val => {
                        setPatientPhone(val);
                        setErrObj(old => {
                          return {
                            ...old,
                            p_phoneErr: false,
                            p_phoneErrMsg: '',
                          };
                        });
                      }}
                      showError={ErrObj.p_phoneErr}
                      errorText={ErrObj.p_phoneErrMsg}
                    />
                    <LabeledInput
                      Label={'Patient Email'}
                      mailicon
                      placeholder={'Enter Patient Email'}
                      value={patientemail}
                      onChangeText={val => {
                        setPatientEmail(val);
                        setErrObj(old => {
                          return {
                            ...old,
                            p_emailErr: false,
                            p_emailErrMsg: '',
                          };
                        });
                      }}
                      showError={ErrObj.p_emailErr}
                      errorText={ErrObj.p_emailErrMsg}
                    />
                    <LabeledInput
                      Label={'Guardian Phone'}
                      phoneicon
                      placeholder={'Enter Guardian phone'}
                      value={guardianPhone}
                      onChangeText={val => {
                        setGuardianPhone(val);
                        setErrObj(old => {
                          return {
                            ...old,
                            g_phoneErr: false,
                            g_phoneErrMsg: '',
                          };
                        });
                      }}
                      showError={ErrObj.g_phoneErr}
                      errorText={ErrObj.g_phoneErrMsg}
                    />
                    <LabeledInput
                      Label={'Guardian Email'}
                      mailicon
                      placeholder={'Enter Guardian email'}
                      value={guardianemail}
                      onChangeText={val => {
                        setGuardianEmail(val);
                        setErrObj(old => {
                          return {
                            ...old,
                            g_emailErr: false,
                            g_emailErrMsg: '',
                          };
                        });
                      }}
                      showError={ErrObj.g_emailErr}
                      errorText={ErrObj.g_emailErrMsg}
                    />
                  </View>
                </View>
              </View>
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
        editHistory ? (
          <ProfilehistoryButton />
        ) : (
          <ProfileHistory />
        )
      ) : (
        <View style={styles.cardOuter}>
          <InfoCard data={settings} mainTitle={'Settings'} />
          <InfoCard data={legal} mainTitle={'Legal & Regulatory'} />
        </View>
      )}
    </View>
  );
}
