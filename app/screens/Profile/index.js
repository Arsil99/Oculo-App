import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Modal,
  Alert,
  Platform,
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
import {
  contactdata,
  items,
  legal,
  patientdata,
  settings,
  switchOptions,
} from '@config/staticData';

export default function Profile({ navigation }) {
  const { setDarkmode, setBiometric } = Authentication;
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [editHistory, setEditHistory] = useState(false);
  const [rightHistoryText, setRightHistoryText] = useState('Edit');
  const profileRef = useRef();
  const { isBiometric, userData } = useSelector(state => {
    return state.auth;
  });
  const IOS = Platform.OS === 'ios';
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
    setValue(userData?.two_factor_type);
    setActiveTab({
      id: 'detail',
      name: 'Detail',
    });
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

  return (
    <View style={styles.main}>
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
                } else {
                  profileRef?.current?.HandleDetailUpdateBtn();
                }
              }}
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
            {editHistory === true ? (
              <Profiledetailcomponent
                ref={profileRef}
                onPress={editHistory}
                onSuccess={() => {
                  setEditHistory(false);
                  setRightHistoryText(
                    rightHistoryText === 'Edit' ? 'Save' : 'Edit',
                  );
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
      ) : activeTab?.id === 'history' ? (
        <ProfilehistoryButton editHistory={editHistory} />
      ) : (
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
              item?.slug === 'sign_out'
                ? logout()
                : item?.slug === 'two_fa'
                ? setModalVisible(!modalVisible)
                : navigation.navigate(item.navto);
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
