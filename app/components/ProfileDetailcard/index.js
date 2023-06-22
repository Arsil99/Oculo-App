/* eslint-disable react-native/no-inline-styles */
import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import styles from "./styles";
import Icon from "react-native-vector-icons/AntDesign";
import { Images } from "@config";
import BaseSetting from "@config/setting";
import { BaseColors } from "@config/theme";

const ProfileDetailcard = ({ navigation, maintitle, data }) => {
  const SettingItem = [
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

  return (
    <View style={styles.container}>
      <View
        style={{
          alignItems: "flex-start",
          marginHorizontal: 20,
        }}
      >
        <Text style={styles.titleText}>{maintitle}</Text>
      </View>

      <View style={styles.settigCon}>
        {data?.map((item, index) => {
          return (
            <TouchableOpacity
              key={item?.id}
              activeOpacity={0.7}
              style={[
                styles.settingItem,
                index === 0
                  ? { borderTopLeftRadius: 12, borderTopRightRadius: 12 }
                  : {
                      borderTopWidth: 0.7,
                      borderColor: BaseColors.borderColor,
                    },
                index === SettingItem.length - 1
                  ? {
                      borderBottomLeftRadius: 12,
                      borderBottomRightRadius: 12,
                    }
                  : null,
              ]}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <View
                  style={{
                    width: 20,
                    marginRight: 20,
                    alignItems: "center",
                  }}
                >
                  <Icon
                    name={item.leftIcon}
                    size={15}
                    color={BaseColors.black90}
                  />
                </View>
                <View>
                  <Text style={styles.settingItemText}>{item.title}</Text>
                </View>
              </View>

              <View>
                <Text style={styles.settingItemText}>{item.righttitle}</Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};
export default ProfileDetailcard;
