import { View, Text } from "react-native";
import React from "react";
import styles from "./styles";
import CardList from "@components/CardList";
import { Images } from "@config";
import HeaderBar from "@components/HeaderBar";

export default function Events({ navigation }) {
  return (
    <View style={styles.main}>
      <HeaderBar HeaderText={"Events"} HeaderCenter />
      <CardList
        image={Images.avatar}
        date={"March 30, 2000"}
        status={"Completed"}
        assessment={"Assessment 4/5"}
      />
    </View>
  );
}
