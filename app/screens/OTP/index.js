import { View, Text, StyleSheet, Image } from "react-native";
import React, { useRef } from "react";
import OTPInputView from "@twotalltotems/react-native-otp-input";
import styles from "./styles";
import Button from "@components/Button";
import { Images } from "@config";
export default function OTP() {
  const renderInputField = (index, isSelected) => {
    const inputStyle = {
      color: "red",
      // Add other styles as needed
    };

    return (
      <TextInput
        key={`input-field-${index}`}
        style={inputStyle}
        // Other props
      />
    );
  };
  return (
    <View style={styles.main}>
      <View style={{ alignItems: "center" }}>
        <Image
          source={Images.logo}
          style={{ marginBottom: 25, marginTop: -5 }}
        />
        <Text style={{ fontSize: 18 }}>Code has sent to</Text>
        <Text style={{ fontSize: 18 }}>str**99@gmail.com</Text>
      </View>
      <View style={{ height: 100, marginVertical: 25 }}>
        <OTPInputView
          pinCount={6}
          editable
          // code={this.state.code} //You can supply this prop or not. The component will be used as a controlled / uncontrolled component respectively.
          // onCodeChanged = {code => { this.setState({code})}}
          autoFocusOnLoad
          codeInputFieldStyle={styles.underlineStyleBase}
          codeInputHighlightStyle={styles.underlineStyleHighLighted}
          onCodeFilled={(code) => {
            console.log(`Code is ${code}, you are good to go!`);
          }}
          inputTextStyle={{ color: "red" }}
          renderInputField={renderInputField}
        />
      </View>
      <Button
        shape="round"
        title={"Verify OTP"}
        style={styles.otpBtn}
        // onPress={validation}
        // loading={loader}
      />
    </View>
  );
}
