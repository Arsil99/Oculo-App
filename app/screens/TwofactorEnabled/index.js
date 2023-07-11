import { View, Image, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import styles from './styles';
import Button from '@components/Button';
import { Images } from '@config';
import BaseSetting from '@config/setting';
import Dropdown from '@components/Dropdown';
import { useState } from 'react';
import { items } from '@config/staticData';

const TwofactorEnabled = ({}) => {
  const [value, setValue] = useState(null);
  const [open, setOpen] = useState(false);

  return (
    <View style={styles.container}>
      <View style={styles.logoView}>
        <Image source={Images.logo} resizeMode="contain" style={styles.img} />
      </View>
      <View style={styles.imgContainer}>
        <Image
          source={Images.twofa}
          resizeMode="contain"
          style={styles.imgStyle}
        />
      </View>
      <View style={styles.dropdownContainer}>
        <Text style={styles.genderTitle}>2FA</Text>
        <View style={styles.genderBox}>
          <Dropdown
            items={items}
            open={open}
            setOpen={setOpen}
            placeholder="Please select validation type"
            value={value}
            setValue={setValue}
          />
        </View>
        <View style={styles.btnContainer}>
          <Button
            shape="round"
            title={'Two Factor Enabled'}
            style={styles.button}
          />
          <TouchableOpacity activeOpacity={BaseSetting.buttonOpacity}>
            <Text style={styles.skip}>Skip</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default TwofactorEnabled;
