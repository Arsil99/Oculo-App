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
    leftIcon: 'aperture',
    title: 'Login With Face Id',
    slug: 'face_id',
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
