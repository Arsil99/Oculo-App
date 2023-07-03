import React, { useState } from 'react';
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
    selectedItemContainerStyle = {},
    selectedItemLabelStyle = {},
    showTickIcon = true,
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
      showTickIcon={showTickIcon}
      onOpen={() => {
        onOpen();
      }}
      placeholderStyle={{
        color: 'grey',
      }}
      selectedItemLabelStyle={[
        selectedItemLabelStyle,
        {
          fontWeight: 'bold',
        },
      ]}
      selectedItemContainerStyle={selectedItemContainerStyle}
    />
  );
}
