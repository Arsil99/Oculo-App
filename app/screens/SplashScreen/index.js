import React, { useEffect } from "react";
import { StatusBar, View, Text, Image } from "react-native";
import styles from "./styles";
import { Images } from "@config";

const SplashScreen = ({ navigation }) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.replace("Home");
    }, 2000);
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
