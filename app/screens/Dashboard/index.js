import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import React from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import styles from './styles';
import { Image } from 'react-native';
import { Images } from '@config';
import { BaseColors } from '@config/theme';
import { useState } from 'react';
import HeaderBar from '@components/HeaderBar';
import BaseSetting from '@config/setting';
import { useSelector } from 'react-redux';

const Dashboard = () => {
  const { darkmode } = useSelector(state => state.auth);
  const [activeIndex, setActiveIndex] = useState(0);
  const data = [
    { color: BaseColors.secondary, name: 'None' },
    { color: BaseColors.mild, name: 'Mild' },
    { color: BaseColors.moderate, name: 'Moderate' },
    { color: BaseColors.Intense, name: 'Severe' },
    { color: BaseColors.Severe, name: 'Intense' },
  ];

  const planData = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
  const renderItem = ({ item }) => {
    return (
      <View style={styles.flatlistcontainer}>
        <View style={styles.flatlistmaincontainer}>
          <View
            style={[
              {
                backgroundColor: item.color,
              },
              styles.colorcontainer,
            ]}
          />
          <Text
            style={[
              styles.lighttext,
              { color: darkmode ? BaseColors.white : BaseColors.black90 },
            ]}
          >
            {item.name}
          </Text>
        </View>
      </View>
    );
  };
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: darkmode ? BaseColors.lightBlack : null,
      }}
    >
      <HeaderBar HeaderText={'Event Aug 3'} HeaderCenter leftText="Back" />
      <ScrollView
        contentContainerStyle={[
          styles.scrollcontainer,
          {
            backgroundColor: darkmode
              ? BaseColors.lightBlack
              : BaseColors.white,
          },
        ]}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.imageView}>
          <Image source={Images.emoji5} resizeMode="contain" />
          <Text
            style={[
              styles.headtext,
              { color: darkmode ? BaseColors.white : BaseColors.textColor },
            ]}
          >
            Headache
          </Text>
        </View>
        <View style={styles.subheaderContainer}>
          <View style={styles.subheaderContainerr}>
            <Text
              style={[
                styles.text,
                { color: darkmode ? BaseColors.white : BaseColors.textColor },
              ]}
            >
              Baseline
            </Text>
            <Text style={[styles.number, { color: BaseColors.secondary }]}>
              3
            </Text>
          </View>
          <View>
            <Text
              style={[
                styles.text,
                { color: darkmode ? BaseColors.white : BaseColors.textColor },
              ]}
            >
              Highest
            </Text>
            <Text style={[styles.number, { color: BaseColors.Severe }]}>5</Text>
          </View>
          <View>
            <Text
              style={[
                styles.text,
                { color: darkmode ? BaseColors.white : BaseColors.textColor },
              ]}
            >
              Recent
            </Text>
            <Text style={[styles.number, { color: BaseColors.Intense }]}>
              4
            </Text>
          </View>
        </View>

        <View style={styles.imageViewcenter}>
          <Image
            source={Images.graph}
            resizeMode="contain"
            style={{ width: '90%' }}
          />
        </View>
        <FlatList
          renderItem={renderItem}
          data={data}
          keyExtractor={item => item.index}
          contentContainerStyle={styles.listContainer}
          columnWrapperStyle={styles.columnwrapperstyle}
          numColumns={3}
          showsVerticalScrollIndicator={false}
        />

        <View style={styles.dotwithbordercontainer}>
          {planData.map((item, index) => {
            return (
              <TouchableOpacity
                activeOpacity={BaseSetting.buttonOpacity}
                onPress={() => {
                  setActiveIndex(index);
                }}
                style={[
                  {
                    borderColor:
                      activeIndex === index
                        ? BaseColors.primary
                        : BaseColors.black20,
                  },
                  styles.row,
                ]}
              >
                <View
                  onPress={() => {
                    setActiveIndex(index);
                  }}
                  style={[
                    {
                      borderWidth: activeIndex === index ? 1 : null,
                      borderColor:
                        activeIndex === index
                          ? BaseColors.primary
                          : BaseColors.black20,
                    },
                    styles.dot,
                  ]}
                >
                  <View
                    onPress={() => {
                      setActiveIndex(index);
                    }}
                    style={[
                      styles.round,
                      {
                        backgroundColor:
                          activeIndex === index
                            ? BaseColors.primary
                            : '#B6B7B9',
                      },
                    ]}
                  />
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
};

export default Dashboard;
