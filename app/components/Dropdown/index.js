import React, { useState } from 'react';
import DropDownPicker from 'react-native-dropdown-picker';

export default function Dropdown({ items, onValueChange }) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);

  const handleValueChange = itemValue => {
    setValue(itemValue);
    onValueChange(itemValue); // Call the callback function from props
  };

  return (
    <DropDownPicker
      open={open}
      value={value}
      items={items}
      setOpen={setOpen}
      setValue={handleValueChange}
    />
  );
}
