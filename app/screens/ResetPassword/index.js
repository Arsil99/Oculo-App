import { View, KeyboardAvoidingView, ScrollView, Image } from "react-native";
import React, { useEffect, useState } from "react";
import styles from "./styles";
import LabeledInput from "@components/LabeledInput";
import Button from "@components/Button";
import { Images } from "@config";

const ResetPassword = () => {
  const IOS = Platform.OS === "ios";
  const [setpassword, setSetpassword] = useState("");
  const [retypepassword, setRetypepassword] = useState("");
  const [passErrObj, setPassErrObj] = useState({ error: false, msg: "" });
  const [RetypepassErrObj, setRetypepassErrObj] = useState({
    error: false,
    msg: "",
  });
  const [btnLoader, setBtnLoader] = useState(false);

  useEffect(() => {
    setPassErrObj({ error: false, msg: "" });
    setRetypepassErrObj({ error: false, msg: "" });
  }, []);

  function validation() {
    let valid = true;

    // validate pass
    if (setpassword == "") {
      valid = false;
      setPassErrObj({
        error: true,
        msg: "Please enter password",
      });
    } else if (setpassword.length < 8) {
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

    // validate retypepassword
    if (retypepassword == "") {
      valid = false;
      setRetypepassErrObj({
        error: true,
        msg: "Please enter retype password",
      });
    } else if (retypepassword.length < 8) {
      valid = false;
      setRetypepassErrObj({
        error: true,
        msg: "Password length must be of 8-15",
      });
    } else if (retypepassword !== setpassword) {
      valid = false;
      setRetypepassErrObj({
        error: true,
        msg: "Retype password  must  same as setpassword ",
      });
    } else {
      setRetypepassErrObj({
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
            Label={"Set Password"}
            keyicon
            placeholder={"Enter Password"}
            eyePassword
            value={setpassword}
            onChangeText={(val) => {
              setSetpassword(val);
              setPassErrObj({ error: false, msg: "" });
            }}
            showError={passErrObj.error}
            errorText={passErrObj.msg}
          />

          <LabeledInput
            Label={"Retype Password"}
            LabledInputStyle={{ marginTop: 20 }}
            keyicon
            value={retypepassword}
            placeholder={"Retype Password"}
            eyePassword
            onChangeText={(val) => {
              setRetypepassword(val);
              setPassErrObj({ error: false, msg: "" });
            }}
            showError={RetypepassErrObj.error}
            errorText={RetypepassErrObj.msg}
          />

          <View style={styles.btnContainer}>
            <Button
              shape="round"
              title={"Save"}
              style={styles.save}
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
