import moment from 'moment';
import Icon from 'react-native-vector-icons/AntDesign';
import { store } from '../redux/store/configureStore';
const authState = store?.getState() || {};
const { userData } = authState?.auth || '';

export const items = [
  { label: 'Email', value: 'email' },
  { label: 'Phone', value: 'phone' },
];

export const switchOptions = [
  { id: 'detail', name: 'Details' },
  { id: 'history', name: 'History' },
  { id: 'account', name: 'Account' },
];

export const settings = [
  {
    id: '1',
    leftIcon: 'Meh',
    title: 'Login With Face Id',
    slug: 'face_id',
    switch: true,
  },
  {
    id: '2',
    leftIcon: 'unlock',
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
    leftIcon: 'calendar',
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
    leftIcon: 'key',
    title: 'Terms of Services',
    righttitle: <Icon name="right" size={15} />,
    navto: 'TermsofServices',
  },
  {
    id: '2',
    leftIcon: 'file',
    title: 'Privacy Policy',
    righttitle: <Icon name="right" size={15} />,
    navto: 'PrivacyPolicy',
  },
];
