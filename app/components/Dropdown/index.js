/* eslint-disable react-native/no-inline-styles */
import { BaseColors, FontFamily } from '@config/theme';
import React from 'react';
import DropDownPicker from 'react-native-dropdown-picker';

export default function Dropdown(props) {
  const {
    open = false,
    setOpen = () => null,
    value = null,
    setValue = () => null,
    onOpen = () => null,
    items = [],
    placeholder = '',
  } = props;

  return (
    <DropDownPicker
      open={open}
      value={value}
      items={items}
      placeholder={placeholder}
      setOpen={setOpen}
      setValue={setValue}
      itemSeparator={true}
      showTickIcon={false}
      onOpen={() => {
        onOpen();
      }}
      placeholderStyle={{
        fontFamily: FontFamily.regular,
        fontSize: 14,
        textTransform: 'capitalize',
        marginRight: 3,
        color: BaseColors.black60,
      }}
      style={{
        borderWidth: 0,
      }}
      containerStyle={{
        shadowColor: BaseColors.black,
        // marginLeft: 50,
      }}
      dropDownContainerStyle={{
        borderColor: BaseColors.black50,
      }}
      itemSeparatorStyle={{
        backgroundColor: BaseColors.black50,
      }}
      selectedItemLabelStyle={{
        fontWeight: 'bold',
        color: BaseColors.white,
      }}
      selectedItemContainerStyle={{
        backgroundColor: BaseColors.primary,
      }}
    />
  );
}
