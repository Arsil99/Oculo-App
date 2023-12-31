import { Platform } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';

export const items = [
  { label: 'Email', value: 'Email' },
  { label: 'Phone', value: 'Phone' },
];

export const switchOptions = [
  { id: 'detail', name: 'Details' },
  { id: 'history', name: 'History' },
  { id: 'account', name: 'Account' },
];

export const settings = [
  {
    id: '1',
    leftIcon: Platform.OS === 'ios' ? 'smile-o' : 'finger-print',
    title: `Login With ${Platform.OS === 'ios' ? 'Face ID' : 'Fingerprint'}`,
    slug: Platform.OS === 'ios' ? 'face_id' : 'touch_id',
    switch: true,
  },
  {
    id: '2',
    leftIcon: 'shield',
    slug: 'two_fa',
    title: 'Two Factor Authentication',
    righttitle: <Icon name="right" size={15} />,
    switch: false,
    navto: 'AuthenticationFactor',
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
    leftIcon: 'bell-o',
    title: 'Notifications Settings',
    righttitle: <Icon name="right" size={15} />,
    switch: false,
    navto: 'NotificationSettings',
  },
  {
    id: '5',
    leftIcon: 'moon-o',
    title: 'Dark Theme',
    slug: 'dark_theme',
    // righttitle: '',
    switch: true,
  },

  {
    id: '6',
    leftIcon: 'sign-out',
    slug: 'sign_out',
    title: 'Sign Out',
    righttitle: <Icon name="right" size={15} />,
    switch: false,
  },
];

export const legal = [
  {
    id: '1',
    leftIcon: 'wpforms',
    title: 'Terms of Services',
    righttitle: <Icon name="right" size={15} />,
    navto: 'TermsofServices',
  },
  {
    id: '2',
    leftIcon: 'handshake-o',
    title: 'Privacy Policy',
    righttitle: <Icon name="right" size={15} />,
    navto: 'PrivacyPolicy',
  },
];
export const staticGraph = [
  {
    Balance: 2,
    Confused: 1,
    Diff_Concen: null,
    Diff_Rem: null,
    Dizziness: null,
    Drowsy: null,
    Emotional: null,
    Fatigue: null,
    Feel_Perfect: null,
    Foggy: null,
    Headache: null,
    Irritable: null,
    Mental_Activity: null,
    Nausea: null,
    Neck_Pain: null,
    Nerv_Anx: 9,
    Not_Right: null,
    Physical_Activity: null,
    Press_Head: null,
    SadDep: null,
    Sens_Light: null,
    Sens_Noise: null,
    Slow: null,
    Trouble_Sleep: null,
    Vis_Prob: null,
    assessment_id: 65,
    date: '21-Aug',
  },
  {
    Balance: 1,
    Confused: 1,
    Diff_Concen: null,
    Diff_Rem: 2,
    Dizziness: 2,
    Drowsy: 2,
    Emotional: null,
    Fatigue: null,
    Feel_Perfect: null,
    Foggy: null,
    Headache: null,
    Irritable: 5,
    Mental_Activity: null,
    Nausea: null,
    Neck_Pain: 2,
    Nerv_Anx: null,
    Not_Right: null,
    Physical_Activity: null,
    Press_Head: null,
    SadDep: null,
    Sens_Light: 3,
    Sens_Noise: null,
    Slow: null,
    Trouble_Sleep: null,
    Vis_Prob: null,
    assessment_id: 65,
    date: '29-Aug',
  },
  {
    Balance: 3,
    Confused: 1,
    Diff_Concen: 4,
    Diff_Rem: null,
    Dizziness: null,
    Drowsy: null,
    Emotional: null,
    Fatigue: null,
    Feel_Perfect: null,
    Foggy: null,
    Headache: null,
    Irritable: null,
    Mental_Activity: null,
    Nausea: null,
    Neck_Pain: 1,
    Nerv_Anx: 2,
    Not_Right: null,
    Physical_Activity: null,
    Press_Head: null,
    SadDep: null,
    Sens_Light: null,
    Sens_Noise: null,
    Slow: null,
    Trouble_Sleep: null,
    Vis_Prob: null,
    assessment_id: 65,
    date: '30-Aug',
  },
  {
    Balance: 2,
    Confused: 1,
    Diff_Concen: null,
    Diff_Rem: null,
    Dizziness: null,
    Drowsy: null,
    Emotional: 3,
    Fatigue: null,
    Feel_Perfect: null,
    Foggy: null,
    Headache: null,
    Irritable: null,
    Mental_Activity: null,
    Nausea: null,
    Neck_Pain: null,
    Nerv_Anx: null,
    Not_Right: null,
    Physical_Activity: null,
    Press_Head: null,
    SadDep: null,
    Sens_Light: null,
    Sens_Noise: null,
    Slow: null,
    Trouble_Sleep: null,
    Vis_Prob: null,
    assessment_id: 65,
    date: '01-Sep',
  },
  {
    Balance: 4,
    Confused: 1,
    Diff_Concen: null,
    Diff_Rem: null,
    Dizziness: 6,
    Drowsy: null,
    Emotional: null,
    Fatigue: null,
    Feel_Perfect: null,
    Foggy: 3,
    Headache: null,
    Irritable: 4,
    Mental_Activity: null,
    Nausea: 5,
    Neck_Pain: 6,
    Nerv_Anx: null,
    Not_Right: null,
    Physical_Activity: null,
    Press_Head: null,
    SadDep: null,
    Sens_Light: null,
    Sens_Noise: null,
    Slow: null,
    Trouble_Sleep: null,
    Vis_Prob: null,
    assessment_id: 65,
    date: '02-Sep',
  },
  {
    Balance: 1,
    Confused: null,
    Diff_Concen: null,
    Diff_Rem: null,
    Dizziness: null,
    Drowsy: null,
    Emotional: null,
    Fatigue: null,
    Feel_Perfect: null,
    Foggy: null,
    Headache: 3,
    Irritable: null,
    Mental_Activity: null,
    Nausea: null,
    Neck_Pain: null,
    Nerv_Anx: null,
    Not_Right: null,
    Physical_Activity: null,
    Press_Head: 1,
    SadDep: null,
    Sens_Light: null,
    Sens_Noise: null,
    Slow: null,
    Trouble_Sleep: null,
    Vis_Prob: null,
    assessment_id: 65,
    date: '03-Sep',
  },
];
