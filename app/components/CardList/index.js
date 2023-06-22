import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import Icon from "react-native-vector-icons/AntDesign";
import PropTypes from "prop-types";
import styles from "./styles";
export default function CardList({ image, date, status, assessment }) {
  return (
    <TouchableOpacity style={styles.main}>
      <View style={styles.container}>
        <View style={styles.insideBox}>
          <View>
            <Image source={image} style={styles.imgStyle} />
          </View>
          <View style={{ marginHorizontal: 10 }}>
            <Text style={{ fontSize: 17 }}>{date}</Text>
            <View style={styles.statusBox}>
              <TouchableOpacity style={styles.chipBox}>
                <Text>{status}</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.chipBox}>
                <Text>{assessment}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View>
          <Icon name="right" size={15} />
        </View>
      </View>
    </TouchableOpacity>
  );
}

CardList.propTypes = {
  image: PropTypes.string,
  date: PropTypes.string,
  status: PropTypes.string,
  assessment: PropTypes.string,
};
CardList.defaultProps = {
  assessment: "",
  status: "",
  image: "",
  onPress: () => {},
  date: "",
};
