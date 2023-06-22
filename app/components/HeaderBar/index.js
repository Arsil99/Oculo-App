import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import styles from "./styles";
import { Images } from "@config";
import { isEmpty } from "lodash";
import BaseSetting from "@config/setting";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { CustomIcon } from "@config/LoadIcons";
import { BaseColors } from "@config/theme";

const HeaderBar = ({
  HeaderText,
  HeaderTextStyle,
  userProfile,
  HeaderCenter,
  Greatings,
  rightComponent,
  containerStyle,
  arrowPress,
}) => {
  const { userData } = useSelector((state) => {
    return state.auth;
  });
  const navigation = useNavigation();
  return (
    <View style={[styles.main, containerStyle]}>
      <View style={styles.contentBox}>
        {Greatings ? (
          <View style={styles.GreatingCon}>
            <Text style={styles.GreatingsText}>{"hello"}!</Text>
            <Text style={styles.GreatingsText}>
              {userData.nick_name}&nbsp;👋
            </Text>
          </View>
        ) : (
          <TouchableOpacity
            activeOpacity={BaseSetting.buttonOpacity}
            style={styles.imageCon}
            onPress={() => (arrowPress ? arrowPress() : navigation.goBack())}
          >
            {/* <CustomIcon size={21} name="arrow" color={BaseColors.secondary} /> */}
          </TouchableOpacity>
        )}
        {!isEmpty(HeaderText) && (
          <View
            style={[
              styles.headerTextCon,
              HeaderCenter && styles.headerTextCenter,
              HeaderTextStyle,
            ]}
          >
            <Text
              style={[
                styles.headerText,
                {
                  textTransform: `${
                    HeaderText === "VISITORS" || HeaderText === "WINKS"
                      ? "uppercase"
                      : "capitalize"
                  }`,
                },
              ]}
              numberOfLines={1}
            >
              {HeaderText}
            </Text>
          </View>
        )}

        {userProfile && (
          <TouchableOpacity
            activeOpacity={BaseSetting.buttonOpacity}
            style={styles.userImgCon}
            onPress={() =>
              navigation.navigate("Profile", {
                from: "Personal",
                id: userData?.id,
              })
            }
          >
            <Image
              source={
                userData?.profile_photo
                  ? {
                      uri: userData.profile_photo,
                    }
                  : Images.blankImage
              }
              resizeMode="cover"
              style={{ height: "100%", width: "100%", borderRadius: 50 }}
            />
          </TouchableOpacity>
        )}
        {rightComponent}
      </View>
    </View>
  );
};

export default HeaderBar;
