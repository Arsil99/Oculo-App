import {
  View,
  Text,
  TouchableOpacity,
  Platform,
  Modal,
  Alert,
} from 'react-native';
import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import styles from './styles';
import Icon from 'react-native-vector-icons/AntDesign';
import { BaseColors } from '@config/theme';

import LabeledInput from '@components/LabeledInput';
import { isEmpty, isNull } from 'lodash';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import Dropdown from '@components/Dropdown';

import BaseSetting from '@config/setting';

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

const Profiledetailcomponent = (props, ref) => {
  const { onSuccess } = props;
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);

  const genderdata = [
    { label: 'Male', value: 'Male' },
    { label: 'Female', value: 'Female' },
  ];
  const [modalVisible, setModalVisible] = useState(false);

  const cInputRef = useRef();
  const cInputRef1 = useRef();
  const cInputRef2 = useRef();
  const cInputRef3 = useRef();
  const cInputRef4 = useRef();

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

  // Date time setup
  const [date, setDate] = useState(new Date(1598051730000));
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);

  useEffect(() => {
    return () => {
      setErrObj(errObj);
    };
  }, []);

  useImperativeHandle(ref, () => ({
    HandleDetailUpdateBtn: () => {
      HandleDetailUpdateBtn();
    },
  }));

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
      onSuccess();
    }
  };

  const focusNextInput = ref => {
    if (ref.current) {
      ref.current.focus();
    }
  };
  return (
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
            onSubmitEditing={() => cInputRef.current.focus()}
          />

          <LabeledInput
            ref={cInputRef}
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
                <Icon name="calendar" size={25} color={BaseColors.primary} />
              </View>
              <View>
                <Text style={{ color: BaseColors.black }}>{birthDate}</Text>
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
            <TouchableOpacity
              onPress={() => {
                setModalVisible(!modalVisible);
              }}
              style={styles.genderIcon}
            >
              <Icon name="man" size={25} color={BaseColors.primary} />
              <View>
                <Text style={{ color: BaseColors.black, marginLeft: 20 }}>
                  {value}
                </Text>
              </View>
            </TouchableOpacity>
            <View>
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
                        items={genderdata}
                        open={open}
                        setOpen={setOpen}
                        placeholder="Please select gender type"
                        value={value}
                        setValue={setValue}
                        // onValueChange={handleDropdownChange}
                      />
                    </View>
                  </View>
                </View>
              </Modal>
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
            ref={cInputRef1}
            Label={'Patient Phone'}
            phoneicon
            placeholder={'Enter Patient Phone'}
            value={patientPhone}
            returnKeyType="next"
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
            onSubmitEditing={() => focusNextInput(cInputRef2)}
          />

          <LabeledInput
            Label={'Patient Email'}
            mailicon
            placeholder={'Enter Patient Email'}
            value={patientemail}
            returnKeyType="next"
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
            ref={cInputRef2}
            onSubmitEditing={() => focusNextInput(cInputRef3)}
          />
          <LabeledInput
            Label={'Guardian Phone'}
            phoneicon
            placeholder={'Enter Guardian phone'}
            returnKeyType="next"
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
            ref={cInputRef3}
            onSubmitEditing={() => focusNextInput(cInputRef4)}
          />
          <LabeledInput
            ref={cInputRef4}
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
  );
};

export default forwardRef(Profiledetailcomponent);
