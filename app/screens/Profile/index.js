import {
  View,
  Text,
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
import Icon from 'react-native-vector-icons/AntDesign';
import { BaseColors } from '@config/theme';
import ProfilehistoryButton from '@components/ProfilehistoryButton';
import { logout } from '@utils/CommonFunction';
import { useDispatch, useSelector } from 'react-redux';
import Authentication from '@redux/reducers/auth/actions';
import Dropdown from '@components/Dropdown';
import Profiledetailcomponent from '@components/Profiledetailcomponent';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import ReactNativeBiometrics, { BiometryTypes } from 'react-native-biometrics';
import BaseSetting from '@config/setting';
import InfoCard from '@components/InfoCard';
import {
  contactdata,
  items,
  legal,
  patientdata,
  settings,
  switchOptions,
} from '@config/staticData';

export default function Profile({ navigation }) {
  const { setEditProfiles, setSaveEdit, setDarkmode, setBiometric } =
    Authentication;
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [isClick, setIsClick] = useState(false);
  const [editHistory, setEditHistory] = useState(false);
  const [rightHistoryText, setRightHistoryText] = useState('Edit');

  const { editProfiles, saveEdit, isBiometric } = useSelector(state => {
    return state.auth;
  });

  const [activeTab, setActiveTab] = useState({
    id: 'detail',
    name: 'Detail',
  });

  let epochTimeSeconds = Math.round(new Date().getTime() / 1000).toString();
  let payload = epochTimeSeconds + 'some message';

  const rnBiometrics = new ReactNativeBiometrics({
    allowDeviceCredentials: true,
  });

  useEffect(() => {
    dispatch(setEditProfiles(false));
  }, []);

  useEffect(() => {
    if (activeTab?.id === 'history') {
      dispatch(setEditProfiles(false));
      dispatch(setSaveEdit('Edit'));
    } else if (activeTab?.id === 'detail') {
      setEditHistory(false);
      dispatch(setSaveEdit('Edit'));
    } else if (activeTab?.id === 'account') {
      dispatch(setEditProfiles(false));
      dispatch(setSaveEdit('Edit'));
      setEditHistory(false);
      setRightHistoryText('Edit');
    }
    return () => {
      dispatch(setEditProfiles(false));
      dispatch(setSaveEdit('Edit'));
      setEditHistory(false);
      setRightHistoryText('Edit');
    };
  }, [activeTab]);

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
          console.log('resultObject ==key exists or not===>>> ', resultObject);
          if (keysExist) {
            checkSignature();
          } else {
            rnBiometrics
              .createKeys()
              .then(resultObject => {
                console.log('resultObject ==create keys===>>> ', resultObject);
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
        console.log('resultObject ===check signature==>>> ', resultObject);
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

  const HandleHistoryUpdateBtn = () => {
    setEditHistory(!editHistory);
    setRightHistoryText(rightHistoryText === 'Edit' ? 'Save' : 'Edit');
  };

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
              activeOpacity={BaseSetting.buttonOpacity}
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
              activeOpacity={BaseSetting.buttonOpacity}
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
          ) : (
            <Text> </Text>
          )
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
          subTabSize={BaseSetting.nWidth * 0.3}
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
          <InfoCard
            data={settings}
            mainTitle={'Settings'}
            SwitchChange={(item, v) => {
              item.slug === 'dark_theme'
                ? dispatch(setDarkmode(v))
                : item.slug === 'dark_theme' && v
                ? checkBiometrics()
                : dispatch(setBiometric(v));
            }}
            tabPress={item => {
              item?.slug === 'sign_out'
                ? logout()
                : item?.slug === 'two_fa'
                ? setModalVisible(!modalVisible)
                : console.log(item.title);
            }}
          />
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
                    activeOpacity={BaseSetting.buttonOpacity}
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
