import React, { forwardRef } from 'react';
import { View, Text } from 'react-native';
import { BaseColors } from '@config/theme';
import { isEmpty } from 'lodash';
import CInput from '@components/CInput';
import styles from './styles';

const LabeledInput = (props, ref) => {
  const {
    Label = '',
    isRequired = false,
    LabledInputStyle = {},
    LabledTextStyle = {},
  } = props;
  return (
    <View style={[styles.main, LabledInputStyle]}>
      {!isEmpty(Label) && (
        <View style={styles.labelCon}>
          <Text style={[styles.labelTxt, LabledTextStyle]}>{Label}</Text>
          {isRequired && <Text style={styles.astrick}>*</Text>}
        </View>
      )}

      <CInput
        ref={ref}
        selectionColor={BaseColors.primary}
        returnKeyType={'next'}
        keyboardType={'default'}
        {...props}
      />
    </View>
  );
};

export default forwardRef(LabeledInput);
