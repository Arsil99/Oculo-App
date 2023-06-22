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

const Login = ({ navigation }) => {
  const IOS = Platform.OS === "ios";
  const [email, setEmail] = useState();
  const [password, setPassword] = useState("");
  const [emailErrObj, setEmailErrObj] = useState({ error: false, msg: "" });
  const [passErrObj, setPassErrObj] = useState({ error: false, msg: "" });
  const [btnLoader, setBtnLoader] = useState(false);

  useEffect(() => {
    setEmailErrObj({ error: false, msg: "" });
    setPassErrObj({ error: false, msg: "" });
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
    if (password == "") {
      valid = false;
      setPassErrObj({
        error: true,
        msg: "Please enter password",
      });
    } else if (password.length < 8) {
      valid = false;
      setPassErrObj({
        error: true,
        msg: "Password length must be of 8-15",
      });
    } else {
      setPassErrObj({
        error: false,
        msg: "",
      });
    }
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
          <Image source={Images.logo} resizeMode="contain" style={styles.img} />
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

          <LabeledInput
            LabledInputStyle={{ marginTop: 20 }}
            Label={"Password"}
            keyicon
            value={password}
            placeholder={"Enter Password"}
            eyePassword
            onChangeText={(val) => {
              setPassword(val);
              setPassErrObj({ error: false, msg: "" });
            }}
            showError={passErrObj.error}
            errorText={passErrObj.msg}
          />

          <View
            style={{
              marginTop: 6,
              alignItems: "flex-end",
            }}
          >
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => navigation.navigate("ForgetPassword")}
            >
              <Text style={styles.forgotPasswordTextStyle}>
                Forget password?
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.btnContainer}>
            <Button
              shape="round"
              title={"Login"}
              style={styles.signinbutton}
              onPress={validation}
              // loading={loader}
            />
            {Platform.OS === "ios" ? (
              <TouchableOpacity activeOpacity={0.7}>
                <Image source={Images.faceid} resizeMode="contain" />
              </TouchableOpacity>
            ) : null}
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Login;
