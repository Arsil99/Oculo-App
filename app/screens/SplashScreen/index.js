import React, { useEffect } from "react";
import styles from "./styles";
import { StatusBar, View, Text, Image } from "react-native";
import { Images } from "@config";
import * as Animatable from "react-native-animatable";
import { useSelector } from "react-redux";

const SplashScreen = ({ navigation }) => {
  const { userData } = useSelector((state) => state.auth);

  useEffect(() => {
    setTimeout(() => {
      if (userData) {
        navigation.replace("Home");
      } else {
        navigation.replace("Login");
      }
    }, 3000);
  }, []);

  return (
    <>
      <StatusBar
        backgroundColor={"#0000"}
        translucent
        barStyle="dark-content"
      />
      <View style={styles.container}>
        <Image source={Images.logo} height={100} width={100} />
      </View>
    </>
  );
};

export default SplashScreen;
