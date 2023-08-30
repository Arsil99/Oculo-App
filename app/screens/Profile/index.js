import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Modal,
  Alert,
  Platform,
  ActivityIndicator,
  KeyboardAvoidingView,
} from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import styles from './styles';
import HeaderBar from '@components/HeaderBar';
import TabSwitch from '@components/TabSwitch';
import Icon from 'react-native-vector-icons/AntDesign';
import { BaseColors } from '@config/theme';
import ProfilehistoryButton from '@components/ProfilehistoryButton';
import { logout } from '@utils/CommonFunction';
import { useDispatch, useSelector } from 'react-redux';
import Authentication from '@redux/reducers/auth/actions';
import Dropdown from '@components/Dropdown';
import Profiledetailcomponent from '@components/Profiledetailcomponent';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import { useIsFocused } from '@react-navigation/native';
import ReactNativeBiometrics, { BiometryTypes } from 'react-native-biometrics';
import BaseSetting from '@config/setting';
import InfoCard from '@components/InfoCard';
import { items, legal, settings, switchOptions } from '@config/staticData';
import moment from 'moment';

export default function Profile({ navigation }) {
  const [showSignOutConfirmation, setShowSignOutConfirmation] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const { setDarkmode, setBiometric } = Authentication;
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [editHistory, setEditHistory] = useState(false);
  const [rightHistoryText, setRightHistoryText] = useState('Edit');
  const profileRef = useRef();
  const historyRef = useRef();

  const { isBiometric, userData, darkmode } = useSelector(state => {
    return state.auth;
  });
  const IOS = Platform.OS === 'ios';
  const [activeTab, setActiveTab] = useState({
    id: 'detail',
    name: 'Details',
  });

  let epochTimeSeconds = Math.round(new Date().getTime() / 1000).toString();
  let payload = epochTimeSeconds + 'some message';

  const rnBiometrics = new ReactNativeBiometrics({
    allowDeviceCredentials: true,
  });

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
      title: 'Middle Name',
      righttitle: userData?.middlename,
    },
    {
      id: '7',
      leftIcon: 'user',
      title: 'Last Name',
      righttitle: userData?.lastname,
    },
    {
      id: '3',
      leftIcon: 'calendar',
      title: 'Date of Birth',
      righttitle: moment(userData?.dob).format('DD-MM-YYYY'),
    },
    {
      id: '4',
      leftIcon: 'man',
      title: 'Gender',
      righttitle: userData?.gender ? userData.gender : '_',
    },
    {
      id: '5',
      leftIcon: 'man',
      title: 'Pronouns',
      righttitle:
        userData?.sex === '0'
          ? 'She/Her/Hers'
          : userData?.sex === '1'
          ? 'He/Him/His'
          : userData?.sex === '2'
          ? 'They/Them/Their'
          : userData?.sex === '3'
          ? 'Ze/Zir/Zirs:Ze/Hir/Hirs'
          : '_',
    },
    {
      id: '6',
      leftIcon: 'man',
      title: 'Sex',
      righttitle:
        userData?.sex === '0'
          ? 'female'
          : userData?.sex === '1'
          ? 'male'
          : userData?.sex === '2'
          ? 'Intersex'
          : '_',
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
      righttitle: userData?.emergency_phone ? userData?.emergency_phone : '_',
    },
    {
      id: '4',
      leftIcon: 'mail',
      title: 'Guardian email',
      righttitle: userData?.emergency_email ? userData?.emergency_email : '_',
    },
  ];

  useEffect(() => {
    setValue(userData?.two_factor_type);
  }, [isFocused]);

  useEffect(() => {
    setEditHistory(false);
    setRightHistoryText('Edit');
  }, [activeTab, isFocused]);

  const checkBiometrics = async () => {
    try {
      rnBiometrics.isSensorAvailable().then(resultObject => {
        const { available, biometryType } = resultObject;

        if (available && biometryType === BiometryTypes.TouchID) {
          console.log('TouchID is supported');
          authenticate();
        } else if (available && biometryType === BiometryTypes.FaceID) {
          console.log('FaceID is supported');
          authenticate();
        } else if (available && biometryType === BiometryTypes.Biometrics) {
          console.log('Biometrics is supported');
          authenticate();
        } else {
          console.log('Biometrics not supported');
          authenticate();
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  const authenticate = async () => {
    try {
      rnBiometrics
        .biometricKeysExist()
        .then(resultObject => {
          const { keysExist } = resultObject;
          if (keysExist) {
            checkSignature();
          } else {
            rnBiometrics
              .createKeys()
              .then(resultObject => {
                const { publicKey } = resultObject;
                if (publicKey) {
                  setTimeout(() => {
                    // checkSignature();
                  }, 400);
                }
              })
              .catch(error => {
                // moveToParticularPage();
                console.log('Create keys error-----', error);
              });
          }
        })
        .catch(err => {
          Toast.show({
            type: 'error',
            text1: 'Please turn on and add your device fingerprint',
          });
          console.log('Authentic error--', err);
          // moveToParticularPage();
        });
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Please turn on and add your device fingerprint',
      });
      console.log(error);
      // moveToParticularPage();
    }
  };

  const checkSignature = () => {
    rnBiometrics
      .createSignature({
        promptMessage: 'Sign in',
        payload: payload,
      })
      .then(resultObject => {
        const { success, signature } = resultObject;

        if (success) {
          dispatch(setBiometric(!isBiometric));
        } else {
          setTimeout(() => {
            checkSignature();
          }, 3000);
        }
      })
      .catch(err => {
        console.log('Err----', err);
        if (Platform.OS === 'ios') {
          Toast.show({
            type: 'error',
            text1: 'Please try again by reopen the app',
          });
        } else {
          // moveToParticularPage();
        }
      });
  };

  return (
    <View
      style={[
        styles.main,
        {
          backgroundColor: darkmode
            ? BaseColors.lightBlack
            : BaseColors.lightBg,
        },
      ]}
    >
      <HeaderBar
        HeaderText={'Profile'}
        HeaderCenter
        leftText={editHistory ? 'Close' : ''}
        leftBtnPress={() => {
          setEditHistory(false);
          setRightHistoryText('Edit');
        }}
        rightComponent={
          activeTab?.id === 'detail' || activeTab?.id === 'history' ? (
            <TouchableOpacity
              activeOpacity={BaseSetting.buttonOpacity}
              onPress={() => {
                if (rightHistoryText === 'Edit') {
                  setEditHistory(true);
                  setRightHistoryText('Save');
                } else if (activeTab?.id === 'detail') {
                  profileRef?.current?.HandleDetailUpdateBtn();
                } else {
                  historyRef?.current?.HandleDetailUpdateBtn();
                }
              }}
            >
              <Text
                style={{
                  color: darkmode ? BaseColors.white : BaseColors.black90,
                }}
              >
                {rightHistoryText}
              </Text>
            </TouchableOpacity>
          ) : (
            <Text> </Text>
          )
        }
      />

      {/* SWITCH TAB */}

      <View
        style={[
          styles.tabBox,
          {
            backgroundColor: darkmode
              ? BaseColors.lightBlack
              : BaseColors.white,
          },
        ]}
      >
        <TabSwitch
          threePack
          tabs={switchOptions}
          activeTab={activeTab}
          onTabChange={currentTab => {
            setActiveTab(currentTab);
          }}
          subTabSize={BaseSetting.nWidth * 0.3}
        />
      </View>

      <KeyboardAvoidingView
        behavior={IOS ? 'padding' : 'height'}
        style={{
          flex: 1,
        }}
      >
        {activeTab?.id === 'detail' ? (
          rightHistoryText === 'Wait...' ? (
            <View
              style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <ActivityIndicator size={'large'} />
            </View>
          ) : (
            <ScrollView
              showsVerticalScrollIndicator={false}
              keyboardShouldPersistTaps="handled"
              contentContainerStyle={{
                flexGrow: 1,
                paddingBottom: 10,
              }}
            >
              <View style={styles.cardOuter}>
                {editHistory === true ? (
                  <Profiledetailcomponent
                    ref={profileRef}
                    onPress={editHistory}
                    onSuccess={() => {
                      setEditHistory(false);
                      setRightHistoryText(
                        rightHistoryText !== 'Edit' && 'Wait...',
                      );
                      setTimeout(() => {
                        setRightHistoryText(
                          rightHistoryText === 'Edit' ? 'Save' : 'Edit',
                        );
                      }, 2000);
                    }}
                  />
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
          )
        ) : activeTab?.id === 'history' ? (
          <ProfilehistoryButton
            ref={historyRef}
            editHistory={editHistory}
            handleSuccess={() => {
              setEditHistory(false);
              setRightHistoryText('Edit');
            }}
          />
        ) : (
          <ScrollView showsHorizontalScrollIndicator={false}>
            <View style={styles.cardOuter}>
              <InfoCard
                data={IOS ? settings : settings.slice(1)}
                mainTitle={'Settings'}
                SwitchChange={(item, v) => {
                  item.slug === 'dark_theme'
                    ? dispatch(setDarkmode(v))
                    : item.slug === 'face_id' && v
                    ? checkBiometrics()
                    : dispatch(setBiometric(v));
                }}
                tabPress={item => {
                  if (item?.slug === 'dark_theme' || item.slug === 'face_id') {
                    return null;
                  } else if (item?.slug === 'sign_out') {
                    setShowSignOutConfirmation(true); // Show the confirmation modal
                  } else if (item?.slug === 'two_fa') {
                    setModalVisible(!modalVisible);
                  } else {
                    if (item.navto === 'ResetPassword') {
                      navigation.navigate(item.navto, { from: 'profile' });
                    } else {
                      navigation.navigate(item.navto);
                    }
                  }
                }}
              />
              <InfoCard
                data={legal}
                mainTitle={'Legal & Regulatory'}
                tabPress={item => {
                  navigation.navigate(item.navto);
                }}
              />
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
                        activeOpacity={BaseSetting.buttonOpacity}
                        onPress={() => {
                          setModalVisible(!modalVisible);
                        }}
                        style={styles.closeicon}
                      >
                        <Icon
                          name="close"
                          size={20}
                          color={BaseColors.primary}
                        />
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

              <Modal
                animationType="slide"
                transparent={true}
                visible={showSignOutConfirmation}
                onRequestClose={() => {
                  setShowSignOutConfirmation(false);
                }}
              >
                <View style={styles.confirmmmodalcenteredView}>
                  <View style={styles.confirmmmodalView}>
                    <Text style={styles.confirmmodaltitleText}>
                      Are u sure?
                    </Text>
                    <Text style={styles.confirmmodalText}>
                      You want to sign out?
                    </Text>
                    <View style={styles.modalButtons}>
                      <TouchableOpacity
                        style={[styles.button, styles.confirmButton]}
                        onPress={async () => {
                          setConfirmLoading(true); // Start loading

                          // Perform asynchronous actions (e.g., logout)
                          try {
                            await logout(); // Assuming logout is an asynchronous function
                            setShowSignOutConfirmation(false);
                          } catch (error) {
                            console.error(error);
                          }

                          setConfirmLoading(false); // Stop loading
                        }}
                        disabled={confirmLoading} // Disable button while loading
                      >
                        {confirmLoading ? (
                          <ActivityIndicator color="white" size="small" />
                        ) : (
                          <Text style={styles.buttonText}>Confirm</Text>
                        )}
                      </TouchableOpacity>

                      <TouchableOpacity
                        activeOpacity={BaseSetting.buttonOpacity}
                        style={[styles.button, styles.cancelButton]}
                        onPress={() => {
                          setShowSignOutConfirmation(false);
                        }}
                      >
                        <Text style={styles.buttonText}>Cancel</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </Modal>
            </View>
          </ScrollView>
        )}
      </KeyboardAvoidingView>
    </View>
  );
}
