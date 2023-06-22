/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Animated, TouchableOpacity, Text, View } from "react-native";
import { BaseColors } from "@config/theme";
import { useSelector } from "react-redux";
import { styles } from "./styles";
import BaseSetting from "@config/setting";

/**
 * Component for TabSwitch
 * @function TabSwitch
 */
export default function TabSwitch(props) {
  const {
    tabSize,
    subTabSize,
    tabs,
    onTabChange,
    activeTab,
    isRTL = false,
  } = props;

  const { darkmode } = useSelector((state) => state.auth);

  const activeTabIndex = props.tabs.findIndex(
    (tab) => tab.id === props.activeTab.id
  );

  const [translateValue] = useState(
    new Animated.Value((isRTL ? -1 : 1) * (1 + activeTabIndex * tabSize + 20))
  );

  const setspring = (index) => {
    Animated.spring(translateValue, {
      toValue: (isRTL ? -1 : 1) * (1 + index * subTabSize),
      velocity: 10,
      useNativeDriver: true,
    }).start();
  };

  useEffect(() => {
    // if (!fromDrawer) {
    setspring(activeTabIndex);
    // }
  }, [activeTab]);

  const renderTabData = () => {
    return (
      <View style={{ ...styles.wrapper, width: tabSize }}>
        <Animated.View
          style={[
            styles.slider,
            {
              transform: [
                {
                  translateX: translateValue,
                },
              ],
              // backgroundColor: activeTab && BaseColors.secondary,
              marginLeft: -5,
              width: subTabSize,
              borderBottomWidth: 4,
              borderBottomColor: BaseColors.secondary,
            },
          ]}
        />
        {tabs.map((obj, index) => (
          <TouchableOpacity
            key={`${index + 1}`}
            activeOpacity={0.8}
            onPress={() => {
              onTabChange(obj);
              // if (fromDrawer) {
              //   setspring(index);
              // }
              // console.log('===> ~ onPress', obj);
              // return obj;
            }}
            style={{
              ...styles.tab,
              width: subTabSize,
              // borderBottomColor: from && BaseColors.primary,
              // borderBottomWidth: from && 1,
            }}
          >
            <Text
              style={[
                styles.tabText,
                {
                  color:
                    activeTabIndex === index
                      ? BaseColors.secondary
                      : BaseColors.msgColor,
                },
              ]}
            >
              {obj.name}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  return renderTabData();
}

TabSwitch.propTypes = {
  tabs: PropTypes.array,
  onTabChange: PropTypes.func,
  tabSize: PropTypes.number,
  subTabSize: PropTypes.number,
  activeTab: PropTypes.object,
};

TabSwitch.defaultProps = {
  tabs: [
    { id: "1", name: "tab 1" },
    { id: "2", name: "tab 2" },
  ],
  onTabChange: () => {},
  tabSize: BaseSetting.nWidth - 40,
  subTabSize: BaseSetting.nWidth * 0.47,
  activeTab: {},
};
