import {
  View,
  Image,
  Text,
  TouchableOpacity,
  Alert,
  Modal,
} from 'react-native';
import React from 'react';
import styles from './styles';
import Button from '@components/Button';
import { Images } from '@config';
import { BaseColors } from '@config/theme';
import Icon from 'react-native-vector-icons/AntDesign';
import BaseSetting from '@config/setting';
import Dropdown from '@components/Dropdown';
import { useState } from 'react';
import { items } from '@config/staticData';

const TwofactorEnabled = ({}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [value, setValue] = useState(null);
  const [open, setOpen] = useState(false);
  return (
    <View style={styles.container}>
      <View style={styles.logoView}>
        <Image source={Images.logo} resizeMode="contain" style={styles.img} />
      </View>
      <View style={styles.imgContainer}>
        <Icon name="lock" size={50} color={BaseColors.primary} />
      </View>
      <View style={styles.btnContainer}>
        <Button
          shape="round"
          title={'Two Factor Enabled'}
          style={styles.button}
          onPress={() => {
            setModalVisible(!modalVisible);
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
                />
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </View>
  );
};

export default TwofactorEnabled;
