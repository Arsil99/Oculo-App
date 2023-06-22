import { View, Text } from "react-native";
import React from "react";
import styles from "./styles";
import HeaderBar from "@components/HeaderBar";
export default function Notification({ navigation }) {
  return (
    <View style={styles.main}>
      <HeaderBar
        HeaderText={"Notification"}
        HeaderCenter
      />
    </View>
  );
}
