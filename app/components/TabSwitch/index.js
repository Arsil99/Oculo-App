/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Animated, TouchableOpacity, Text, View } from 'react-native';
import { BaseColors } from '@config/theme';
import { styles } from './styles';
import BaseSetting from '@config/setting';

/**
 * Component for TabSwitch
 * @function TabSwitch
 */
export default function TabSwitch(props) {
  const {
    insideTab,
    threePack,
    tabSize,
    subTabSize,
    tabs,
    onTabChange,
    activeTab,
    isRTL = false,
  } = props;

  const activeTabIndex = props.tabs.findIndex(
    tab => tab.id === props.activeTab.id,
  );

  const [translateValue] = useState(
    new Animated.Value((isRTL ? -1 : 1) * (1 + activeTabIndex * tabSize + 20)),
  );

  const setspring = index => {
    Animated.spring(translateValue, {
      toValue: (isRTL ? -1 : 1) * (1 + index * (threePack ? 125 : subTabSize)),
      velocity: 10,
      useNativeDriver: true,
    }).start();
  };

  useEffect(() => {
    setspring(activeTabIndex);
  }, [activeTab]);

  const renderTabData = () => {
    return (
      <View
        style={[
          { ...styles.wrapper, width: tabSize },
          {
            borderRadius: insideTab ? 50 : 0,

            backgroundColor: insideTab ? BaseColors.lightBg : null,
          },
        ]}
      >
        <Animated.View
          style={[
            styles.slider,
            {
              transform: [
                {
                  translateX: translateValue,
                },
              ],
              marginLeft: threePack ? 0 : -5,
              width: threePack ? 120 : subTabSize,
              borderBottomWidth: !insideTab ? 4 : 0,
              borderRadius: insideTab ? 50 : 0,
              borderBottomColor: insideTab
                ? BaseColors.orange
                : BaseColors.secondary,
              backgroundColor: insideTab ? BaseColors.orange : null,
            },
          ]}
        />
        {tabs.map((obj, index) => (
          <TouchableOpacity
            key={`${index + 1}`}
            activeOpacity={0.8}
            onPress={() => {
              onTabChange(obj);
            }}
            style={{
              ...styles.tab,
              width: threePack ? 130 : subTabSize,
            }}
          >
            <Text
              style={[
                styles.tabText,
                {
                  color:
                    activeTabIndex === index
                      ? insideTab
                        ? BaseColors.white
                        : BaseColors.secondary
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
  insideTab: PropTypes.bool,
};

TabSwitch.defaultProps = {
  tabs: [
    { id: '1', name: 'tab 1' },
    { id: '2', name: 'tab 2' },
  ],
  onTabChange: () => {},
  tabSize: BaseSetting.nWidth - 40,
  subTabSize: BaseSetting.nWidth * 0.47,
  activeTab: {},
  insideTab: false,
};
