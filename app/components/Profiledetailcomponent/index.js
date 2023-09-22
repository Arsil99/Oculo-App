import {
  View,
  Text,
  TouchableOpacity,
  Platform,
  Image,
  KeyboardAvoidingView,
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
import _, { isEmpty, isNull } from 'lodash';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import Dropdown from '@components/Dropdown';
import { useDispatch, useSelector } from 'react-redux';
import BaseSetting from '@config/setting';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import ImagePicker from 'react-native-image-crop-picker';
import Authentication from '@redux/reducers/auth/actions';
import Icon1 from 'react-native-vector-icons/Feather';
import { getApiDataProgress } from '@utils/apiHelper';
import { Images } from '@config';

const errObj = {
  firstNameErr: false,
  firstNameErrMsg: '',
  middleNameErr: false,
  middleNameErrMsg: '',
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
  const { setUserData } = Authentication;
  const dispatch = useDispatch();
  const { onSuccess } = props;
  const [open, setOpen] = useState(false);
  const [proopen, setProOpen] = useState(false);
  const [value, setValue] = useState(null);

  // Detail Tab related states
  const [ErrObj, setErrObj] = useState(errObj);
  const [firstName, setFirstName] = useState('');
  const [middleName, setMiddleName] = useState('');
  const [lastName, setLastName] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [patientPhone, setPatientPhone] = useState('');
  const [patientemail, setPatientEmail] = useState('');
  const [guardianPhone, setGuardianPhone] = useState('');
  const [guardianemail, setGuardianEmail] = useState('');
  const [selectedDropdownValue, setSelectedDropdownValue] = useState(null);
  const [sexOpen, setSexOpen] = useState(false);
  const [sexValue, setSexValue] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [tempRemove, setTempRemove] = useState(false);
  const [dateOfBirthErr, setDateOfBirthErr] = useState(false);
  const [dateOfBirthErrMsg, setDateOfBirthErrMsg] = useState('');
  const [sexErr, setSexErr] = useState(false);
  const [sexErrMsg, setSexErrMsg] = useState('');
  const IOS = Platform.OS === 'ios';
  const pInfo1 = useRef();
  const pInfo2 = useRef();
  const cInputRef1 = useRef();
  const cInputRef2 = useRef();
  const cInputRef3 = useRef();
  const cInputRef4 = useRef();
  const { userData, darkmode } = useSelector(state => state.auth);
  const emailRegex = BaseSetting?.emailRegex;
  console.log('======>>userData', userData);
  const sexData = [
    { label: 'Female', value: '0=Female' },
    { label: 'Male', value: '1=Male' },
    { label: 'Intersex', value: '2=Intersex' },
  ];

  const genderdata = [
    { label: 'Male', value: 'Male' },
    { label: 'Female', value: 'Female' },
    { label: 'Other', value: 'Other' },
  ];
  const dropdownItems = [
    { label: 'She/Her/Hers', value: '1=She/Her/Hers' },
    { label: 'He/Him/His', value: '2=He/Him/His' },
    { label: 'They/Them/Their', value: '3=They/Them/Their' },
    { label: 'Ze/Zir/Zirs', value: '4=Ze/Zir/Zirs' },
    { label: 'Ze/Hir/Hirs', value: '5=Ze/Hir/Hirs' },
  ];

  // Date time setup
  const [date, setDate] = useState(new Date());

  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);

  useEffect(() => {
    setFirstName(userData?.firstname);
    setMiddleName(userData?.middlename);
    setLastName(userData?.lastname);
    setPatientPhone(userData?.phone);
    setPatientEmail(userData?.email);
    setGuardianEmail(userData?.emergency_email);
    setGuardianPhone(userData?.emergency_phone);
    setBirthDate(moment(userData?.dob).format('MM-DD-YYYY'));
    setSexValue(
      userData?.sex == 0
        ? '0=Female'
        : userData?.sex == 1
        ? '1=Male'
        : userData?.sex == 2
        ? '2=Intersex'
        : null,
    );
    setSelectedDropdownValue(
      userData?.pronouns == 1
        ? '1=She/Her/Hers'
        : userData?.pronouns == 2
        ? '2=He/Him/His'
        : userData?.pronouns == 3
        ? '3=They/Them/Their'
        : userData?.pronouns == 4
        ? '4=Ze/Zir/Zirs'
        : userData?.pronouns == 5
        ? '5=Ze/Hir/Hirs'
        : null,
    );
    setValue(userData?.gender);
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
    if (event?.type === 'set') {
      setBirthDate(moment(currentDate).format('MM-DD-YYYY'));
    }

    // Reset the error state when a valid date is selected
    setDateOfBirthErr(false);
    setDateOfBirthErrMsg('');
  };

  const showMode = currentMode => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
    setShow(!show);
  };

  const HandleDetailUpdateBtn = () => {
    const error = { ...ErrObj };
    let Valid = true;

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
      error.p_phoneErrMsg = 'Enter phone number';
    } else if (patientPhone.length < 10) {
      Valid = false;
      error.p_phoneErr = true;
      error.p_phoneErrMsg = 'Enter valid phone number';
    }

    // guardian phone
    if (!isEmpty(guardianPhone) && guardianPhone.length < 10) {
      Valid = false;
      error.g_phoneErr = true;
      error.g_phoneErrMsg = 'Enter valid phone number';
    }
    if (isEmpty(birthDate) || isNull(birthDate)) {
      Valid = false;
      setDateOfBirthErr(true);
      setDateOfBirthErrMsg('Enter date of birth');
    } else {
      setDateOfBirthErr(false);
      setDateOfBirthErrMsg('');
    }
    if (isEmpty(sexValue) || isNull(sexValue)) {
      Valid = false;
      setSexErr(true);
      setSexErrMsg('Select sex');
    } else {
      setSexErr(false);
      setSexErrMsg('');
    }

    // patient email
    if (isEmpty(patientemail) || isNull(patientemail)) {
      Valid = false;
      error.p_emailErr = true;
      error.p_emailErrMsg = 'Enter patient email';
    } else if (!emailRegex.test(patientemail)) {
      Valid = false;
      error.p_emailErr = true;
      error.p_emailErrMsg = 'Please enter valid emaill';
    }

    // guardian email
    if (!isEmpty(guardianemail) && !emailRegex.test(guardianemail)) {
      Valid = false;
      error.g_emailErr = true;
      error.g_emailErrMsg = 'Please enter valid emaill';
    }

    if (
      isEmpty(firstName) ||
      isEmpty(lastName) ||
      isEmpty(birthDate) ||
      isEmpty(sexValue) ||
      isEmpty(patientPhone) ||
      isEmpty(patientemail)
    ) {
      Toast.show({
        text1: 'Please fill all required field',
        type: 'error',
      });
    }
    setErrObj(error);
    if (Valid) {
      onSuccess();
      dataToSend();
    }
  };

  const focusNextInput = ref => {
    if (ref.current) {
      ref.current.focus();
    }
  };

  const dataToSend = async () => {
    const selectedpronounsKey = selectedDropdownValue?.split('=')[0];

    const selectedsexKey = sexValue?.split('=')[0];

    let data = {
      first_name: firstName,
      middle_name: middleName ? middleName : '',
      last_name: lastName,
      dob: birthDate.replace(/\//g, '-'),
      phone: patientPhone,
      email: patientemail,
      user_id: userData?.id?.toString(),
      emergency_phone: guardianPhone ? guardianPhone : null,
      emergency_email: guardianemail ? guardianemail : null,
      gender: value,
      pronouns: selectedpronounsKey ? selectedpronounsKey : null,
      sex: selectedsexKey,
    };

    if (!_.isEmpty(selectedImage) && _.isObject(selectedImage)) {
      data.profile_pic = {
        uri: selectedImage?.path,
        name: selectedImage?.path.substr(
          selectedImage?.path.lastIndexOf('/') + 1,
        ),
        type: selectedImage?.mime,
      };
    } else if (tempRemove) {
      data.profile_pic = null;
    } else {
      data.profile_pic = userData?.profile_pic;
    }
    try {
      const response = await getApiDataProgress(
        BaseSetting.endpoints.updatePatient,
        'POST',
        data,
      );
      // Check the status of the response.
      if (response?.status) {
        dispatch(setUserData(response?.data));
        if (tempRemove && isNull(selectedImage)) {
          const newUserData = {
            ...userData,
            profile_pic: null,
          };
          dispatch(setUserData(newUserData));
        }
        // Display a success message.
        setTimeout(() => {
          Toast.show({
            text1: response?.message,
            type: 'success',
          });
        }, 2000);
      } else {
        // Display an error message.
        Toast.show({
          text1: response?.message,
          type: 'error',
        });
      }
    } catch (error) {
      // Log the error.
      console.log('CATCH ERROR =======>>>', error);
    }
  };

  const handleImagePicker = async () => {
    await ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
      cropperCircleOverlay: true,
      cropperToolbarTitle: 'Crop your profile picture',

      freeStyleCropEnabled: true,
    })
      .then(image => {
        setSelectedImage(image);
      })
      .catch(error => {
        console.log('ImagePicker Error: ', error);
      });
  };

  return (
    <View style={styles.alignSetup}>
      <View style={styles.settigCon}>
        <View style={styles.mainTitleStyle}>
          <Text
            style={[
              styles.titleText,
              { color: darkmode ? BaseColors.white : BaseColors.black },
            ]}
          >
            Patient Information
          </Text>
        </View>
        <View
          style={[
            styles.editContainer,
            {
              backgroundColor: darkmode
                ? BaseColors.lightBlack
                : BaseColors.white,
            },
          ]}
        >
          <View style={styles.topBar}>
            {selectedImage ? (
              <Image
                source={{
                  uri: selectedImage.path,
                }}
                resizeMode="cover"
                style={styles.profilePic}
              />
            ) : userData.profile_pic ? (
              <Image
                source={
                  !tempRemove
                    ? {
                        uri: userData.profile_pic,
                      }
                    : Images.avatar
                }
                resizeMode="cover"
                style={styles.profilePic}
              />
            ) : (
              <View style={styles.placeholderImage}>
                <Image
                  source={Images.avatar}
                  resizeMode="cover"
                  style={styles.userDp}
                />
              </View>
            )}
            <TouchableOpacity
              onPress={handleImagePicker}
              activeOpacity={BaseSetting.buttonOpacity}
              style={styles.imagePickerButton}
            >
              <Icon size={17} name="camera" color={BaseColors.white} />
            </TouchableOpacity>
            {(selectedImage || userData?.profile_pic) && (
              <TouchableOpacity
                style={{ marginTop: -25, marginBottom: 10 }}
                onPress={() => {
                  setTempRemove(true);
                  setSelectedImage(null);
                }}
              >
                {!(isNull(selectedImage) && tempRemove) && (
                  <Text
                    style={{
                      color: darkmode ? BaseColors.white : BaseColors.black90,
                    }}
                  >
                    Remove
                  </Text>
                )}
              </TouchableOpacity>
            )}
          </View>
          <LabeledInput
            Label={'First Name'}
            isRequired
            usericon
            placeholder={'Enter first name'}
            value={firstName}
            maxLength={20}
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
            onSubmitEditing={() => pInfo1.current.focus()}
          />
          <LabeledInput
            ref={pInfo1}
            Label={'Middle Name'}
            usericon
            placeholder={'Enter Middle name'}
            value={middleName}
            maxLength={20}
            onChangeText={val => {
              setMiddleName(val);
              setErrObj(old => {
                return {
                  ...old,
                  middleNameErr: false,
                  middleNameErrMsg: '',
                };
              });
            }}
            showError={ErrObj.middleNameErr}
            errorText={ErrObj.middleNameErrMsg}
            onSubmitEditing={() => pInfo2.current.focus()}
          />
          <LabeledInput
            ref={pInfo2}
            isRequired
            Label={'Last Name'}
            maxLength={20}
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
          <View>
            <View style={{ flexDirection: 'row' }}>
              <Text
                style={[
                  styles.dateTitle,
                  { color: darkmode ? BaseColors.white : BaseColors.black90 },
                ]}
              >
                Date of Birth
              </Text>
              <Text
                style={{
                  color: BaseColors.red,
                  marginTop: -5,
                  marginLeft: 2,
                }}
              >
                *
              </Text>
            </View>
            <TouchableOpacity
              activeOpacity={BaseSetting.buttonOpacity}
              onPress={showDatepicker}
              style={styles.dateBox}
            >
              <View style={{ marginRight: 20 }}>
                <Icon name="calendar" size={25} color={BaseColors.primary} />
              </View>
              <View>
                <Text style={{ color: BaseColors.black }}>{birthDate}</Text>
              </View>
            </TouchableOpacity>
          </View>
          {dateOfBirthErr && (
            <Text style={styles.errorTxt}>{dateOfBirthErrMsg}</Text>
          )}
          {show && (
            <DateTimePicker
              value={date}
              testID="dateTimePicker"
              timeZoneOffsetInMinutes={0}
              mode={mode}
              is24Hour={true}
              display={IOS ? 'spinner' : 'default'}
              onChange={onChange}
            />
          )}

          <Text
            style={[
              styles.genderTitle,
              { color: darkmode ? BaseColors.white : BaseColors.black90 },
            ]}
          >
            Gender
          </Text>

          <View style={[styles.genderBox, { zIndex: 50 }]}>
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

          <Text
            style={[
              styles.genderTitle,
              { color: darkmode ? BaseColors.white : BaseColors.black90 },
            ]}
          >
            Pronouns
          </Text>
          <View style={[styles.genderBox, { zIndex: open ? null : 50 }]}>
            <Dropdown
              items={dropdownItems}
              open={proopen}
              setOpen={setProOpen}
              placeholder="Please select an option"
              value={selectedDropdownValue}
              setValue={setSelectedDropdownValue}
            />
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text
              style={[
                styles.genderTitle,
                { color: darkmode ? BaseColors.white : BaseColors.black90 },
              ]}
            >
              Sex
            </Text>
            <Text
              style={{
                color: BaseColors.red,
                marginTop: -3,
                marginLeft: 2,
              }}
            >
              *
            </Text>
          </View>
          <View style={[styles.genderBox, { zIndex: proopen ? null : 50 }]}>
            <Dropdown
              items={sexData}
              open={sexOpen}
              setOpen={setSexOpen}
              placeholder="Select sex"
              value={sexValue}
              setValue={newValue => {
                // Reset the error state when a valid value is selected
                setSexValue(newValue);
                setSexErr(false);
                setSexErrMsg('');
              }}
            />
          </View>
          {sexErr && <Text style={styles.errorTxt}>{sexErrMsg}</Text>}
        </View>
      </View>
      <View style={[styles.settigCon, { zIndex: 1 }]}>
        <View style={styles.mainTitleStyle}>
          <Text
            style={[
              styles.titleText,
              { color: darkmode ? BaseColors.white : BaseColors.black },
            ]}
          >
            Contact Information
          </Text>
        </View>
        <View
          style={[
            styles.editContainer,
            {
              backgroundColor: darkmode
                ? BaseColors.lightBlack
                : BaseColors.white,
            },
          ]}
        >
          <LabeledInput
            isRequired
            ref={cInputRef1}
            Label={'Patient Phone'}
            phoneicon
            maxLength={10}
            keyboardType="numeric"
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
            isRequired
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
            maxLength={10}
            keyboardType="numeric"
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
