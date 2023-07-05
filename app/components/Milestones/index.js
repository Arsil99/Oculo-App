import React from 'react';
import { View, FlatList } from 'react-native';
import { BaseColors } from '@config/theme';
import styles from './styles';
import _ from 'lodash';
import { Images } from '@config';
import Details from '@components/Details';

const Milestones = ({ navigation, route }) => {
  const data = [
    {
      id: '1',
      image: Images.content,
      text: 'Headache',
      number: '4',
      color: BaseColors.checkcircle,
    },
    {
      id: '2',
      image: Images.contentpending,
      text: 'Sensitivity to Noise',
      number: '6',
      color: BaseColors.primary,
      imagecolor: BaseColors.primary,
    },
    {
      id: '3',
      image: Images.content,
      text: 'Ongoing',
      number: '2',
      color: BaseColors.checkcircle,
      imagecolor: BaseColors.yellowStarColor,
    },
    {
      id: '4',
      image: Images.content,
      text: 'New Milestones',
      number: '4',
      color: BaseColors.yellowStarColor,
    },
    {
      id: '5',
      image: Images.content,
      text: 'Not Started',
      number: '6',
      color: BaseColors.secondary,
      imagecolor: BaseColors.cardDescColor,
    },
    {
      id: '6',
      image: Images.content,
      text: 'Cancelled',
      number: '2',
      color: BaseColors.darkorang,
      imagecolor: BaseColors.darkorang,
    },
    {
      id: '1',
      image: Images.content,
      text: 'Headache',
      number: '4',
      color: BaseColors.checkcircle,
    },
    {
      id: '2',
      image: Images.contentpending,
      text: 'Sensitivity to Noise',
      number: '6',
      color: BaseColors.primary,
      imagecolor: BaseColors.primary,
    },
    {
      id: '3',
      image: Images.content,
      text: 'Ongoing',
      number: '2',
      color: BaseColors.checkcircle,
      imagecolor: BaseColors.yellowStarColor,
    },
    {
      id: '4',
      image: Images.content,
      text: 'New Milestones',
      number: '4',
      color: BaseColors.yellowStarColor,
    },
  ];

  const renderItem = ({ item }) => {
    return (
      <View style={{}}>
        <Details
          text={item.text}
          number={item.number}
          imageSource={item.image}
          style={styles.img}
          numberColor={item.color}
          imageColor={item.imagecolor}
        />
      </View>
    );
  };
  return (
    <View style={styles.maincontainer}>
      <FlatList
        renderItem={renderItem}
        data={data}
        keyExtractor={item => item.index}
        contentContainerStyle={styles.listContainer}
        columnWrapperStyle={{
          justifyContent: 'space-between',
          width: '100%',
        }}
        numColumns={2}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default Milestones;
