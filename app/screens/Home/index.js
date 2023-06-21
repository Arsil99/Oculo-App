import { View, Text } from "react-native";
import React from "react";
import { BaseColors } from "@config/theme";
import styles from "./styles";
export default function Home({ navigation }) {
  return (
    <View style={styles.main}>
      <Text onPress={() => navigation.navigate("Home")}>Home</Text>
    </View>
  );
}
