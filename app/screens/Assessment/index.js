import { View, Text, StatusBar } from 'react-native';
import React from 'react';
import styles from './styles';
import HeaderBar from '@components/HeaderBar';
import Button from '@components/Button';

const Assessment = ({ navigation, route }) => {
  const eventId = route?.params?.event_id;
  const data = route?.params?.otherData;
  return (
    <View style={styles.main}>
      <StatusBar
        barStyle="dark-content"
        translucent={true}
        backgroundColor={'#0000'}
      />

      <HeaderBar
        HeaderText={'Assessment 2'}
        HeaderCenter
        leftText="Back"
        leftBtnPress={() => {
          navigation.goBack();
        }}
      />

      <View style={{ flex: 1, marginHorizontal: 25 }}>
        <View
          style={{
            justifyContent: 'flex-end',
            marginTop: 20,
          }}
        >
          <Text style={styles.titleText}>Assessment Details</Text>
          <View>
            <Text style={styles.titlesubText}>Event</Text>
            <Text style={styles.titledetail}>{data?.createdAt}</Text>
          </View>
          <View>
            <Text style={styles.titlesubText}>Provider</Text>
            <Text style={styles.titledetail}>Seth Rollins</Text>
          </View>
          <View>
            <Text style={styles.titlesubText}>Assessment Type</Text>
            <Text style={styles.titledetail}>{data?.assmt_type}</Text>
          </View>
          <View>
            <Text style={styles.titlesubText}>Instructions</Text>
            <Text style={styles.titledetail}>
              Pellentesque metus neque, egestas id tincidunt et, porttitor quis
              libero. Suspendisse placerat sollicitudin finibus. Ut lorem quam,
              aliquam cursus diam fermentum, volutpat mollis enim. Sed eu dui
              eget lectus euismod pretium nec quis ipsum. Nam pretium nisl sed
              laoreet pulvinar. Etiam dolor nisi, pulvinar vitae justo in,
              consequat v
            </Text>
          </View>
        </View>
        <View style={styles.btnContainer}>
          <Button
            shape="round"
            title={'Begin Assessment'}
            style={styles.Assessment}
            onPress={() => {
              navigation?.navigate('ChangeInfo', { event_id: eventId });
            }}
          />
        </View>
      </View>
    </View>
  );
};

export default Assessment;
