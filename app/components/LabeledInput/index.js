import { View, Text } from "react-native";
import React from "react";
import { BaseColors } from "@config/theme";
import { isEmpty } from "lodash";
import CInput from "@components/CInput";
import styles from "./styles";

const LabeledInput = (props) => {
  const {
    Label = "",
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
        selectionColor={BaseColors.primary}
        returnKeyType={"next"}
        keyboardType={"default"}
        {...props}
      />
    </View>
  );
};

export default LabeledInput;
