import { View, Text } from "react-native";
import React from "react";
import styles from "./styles";
import HeaderBar from "@components/HeaderBar";
import ProfileDetailcard from "@components/ProfileDetailcard";
export default function Profile({ navigation }) {
  const patientdata = [
    {
      id: "1",
      leftIcon: "user",
      title: "First Name",
      righttitle: "Andy",
    },
    {
      id: "2",
      leftIcon: "user",
      title: "Last Name",
      righttitle: "Anderson",
    },
    {
      id: "3",
      leftIcon: "calendar",
      title: "Date of Birth",
      righttitle: "27-04-1998",
    },
    {
      id: "4",
      leftIcon: "man",
      title: "Gender",
      righttitle: "Male",
    },
  ];
  const contactdata = [
    {
      id: "1",
      leftIcon: "phone",
      title: "Patient Phone",
      righttitle: "(454) 334 - 3301",
    },
    {
      id: "2",
      leftIcon: "mail",
      title: "Patient Email",
      righttitle: "Andyanderson@gmail.com",
    },
    {
      id: "3",
      leftIcon: "phone",
      title: "Guardian phone",
      righttitle: "(454) 334 - 3301",
    },
    {
      id: "4",
      leftIcon: "mail",
      title: "Guardian email",
      righttitle: "Parceyanderson@gmail.com",
    },
  ];
  return (
    <View style={styles.main}>
      <HeaderBar HeaderText={"Profile"} HeaderCenter />
      <ProfileDetailcard maintitle={"Patient Information"} data={patientdata} />
      <ProfileDetailcard maintitle={"Contact Information"} data={contactdata} />
    </View>
  );
}
