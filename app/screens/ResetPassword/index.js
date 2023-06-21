import {
  View,
  Text,
  KeyboardAvoidingView,
  ScrollView,
  Image,
  Keyboard,
} from "react-native";
import React, { useEffect, useState } from "react";
import styles from "./styles";
import LabeledInput from "@components/LabeledInput";
import Button from "@components/Button";
import { Images } from "@config";
import { TouchableOpacity } from "react-native-gesture-handler";
import BaseSetting from "@config/setting";
import { Platform } from "react-native";

const ResetPassword = ({ navigation }) => {
  const IOS = Platform.OS === "ios";
  const [email, setEmail] = useState();
  const [emailErrObj, setEmailErrObj] = useState({ error: false, msg: "" });
  const [btnLoader, setBtnLoader] = useState(false);

  useEffect(() => {
    setEmailErrObj({ error: false, msg: "" });
  }, []);
  let emailRegex = BaseSetting?.emailRegex;
  function validation() {
    let valid = true;

    // validate email
    if (email == "") {
      valid = false;
      setEmailErrObj({
        error: true,
        msg: "Please enter email",
      });
    } else if (!emailRegex.test(email)) {
      valid = false;
      setEmailErrObj({
        error: true,
        msg: "Please enter valid email",
      });
    } else {
      setEmailErrObj({
        error: false,
        msg: "",
      });
    }

    // validate password
  }
  return (
    <KeyboardAvoidingView
      behavior={IOS ? "padding" : "height"}
      style={styles.container}
    >
      <ScrollView
        contentContainerStyle={{ flex: 1 }}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.contentView}>
          <Image
            source={Images.oculo}
            resizeMode="contain"
            style={styles.img}
          />
        </View>
        <View style={styles.inputcontainer}>
          <LabeledInput
            Label={"EMAIL"}
            mailicon
            placeholder={"Enter Email"}
            value={email}
            onChangeText={(val) => {
              setEmail(val);
              setEmailErrObj({ error: false, msg: "" });
            }}
            showError={emailErrObj.error}
            errorText={emailErrObj.msg}
          />

          <TouchableOpacity
            style={{ alignItems: "flex-end" }}
            activeOpacity={0.7}
          >
            <Text
              style={styles.forgotPasswordTextStyle}
              onPress={() => navigation.navigate("ForgetPassword")}
            >
              Forget Password?
            </Text>
          </TouchableOpacity>
          <View style={styles.btnContainer}>
            <Button
              shape="round"
              title={"Send Email"}
              style={styles.sendemail}
              onPress={validation}
              // loading={loader}
            />
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default ResetPassword;
