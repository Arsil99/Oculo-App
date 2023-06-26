import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import React from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import styles from './styles';
import { Image } from 'react-native';
import { Images } from '@config';
import { BaseColors } from '@config/theme';
import { useState } from 'react';
import HeaderBar from '@components/HeaderBar';

const Dashboard = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const data = [1, 1, 1, 1, 1];

  const planData = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
  const renderItem = ({ item }) => {
    return (
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-around',
          marginHorizontal: 20,
          marginTop: 10,
        }}
      >
        <View
          style={{
            width: 80,
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <View
            style={[
              {
                backgroundColor: BaseColors.secondary,
                width: 10,
                height: 10,
                borderRadius: 5,
              },
            ]}
          ></View>
          <Text style={styles.lighttext}>None</Text>
        </View>
      </View>
    );
  };
  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      showsVerticalScrollIndicator={false}
    >
      <HeaderBar HeaderText={'Event Aug 3'} HeaderCenter backPress />
      <View style={styles.imageView}>
        <Image source={Images.emoji5} resizeMode="contain" />
        <Text style={styles.headtext}>Headache</Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-around',
          marginHorizontal: 20,
          marginTop: 30,
        }}
      >
        <View>
          <Text style={styles.text}>Baseline</Text>
          <Text style={[styles.number, { color: BaseColors.secondary }]}>
            3
          </Text>
        </View>
        <View>
          <Text style={styles.text}>Highest</Text>
          <Text style={[styles.number, { color: '#CE3932' }]}>5</Text>
        </View>
        <View>
          <Text style={styles.text}>Recent</Text>
          <Text style={[styles.number, { color: '#EE6A49' }]}>4</Text>
        </View>
      </View>

      <View style={styles.imageView}>
        <Image source={Images.graph} resizeMode="contain" />
      </View>
      <FlatList
        renderItem={renderItem}
        data={data}
        keyExtractor={item => item.index}
        contentContainerStyle={styles.listContainer}
        columnWrapperStyle={{
          width: '100%',
        }}
        numColumns={3}
        showsVerticalScrollIndicator={false}
      />

      <View
        style={{
          flex: 2,
          flexDirection: 'row',
          width: '80%',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          alignSelf: 'center',
        }}
      >
        {planData.map((item, index) => {
          return (
            <TouchableOpacity
              activeOpacity={0.7}
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
                  styles.month,
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
                        activeIndex === index ? BaseColors.primary : '#B6B7B9',
                    },
                  ]}
                />
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    </ScrollView>
  );
};

export default Dashboard;
