import React from 'react';
import { Dimensions, Image, StyleSheet, Text, View } from 'react-native';
import { Colors } from '../constants';
import Images from '../constants/Images';

const { height, width } = Dimensions.get('window');

const WelcomeCard = ({ image, content }) => {
  return (
    <View style={styles.container}>
      <Image style={styles.image} source={Images[image]} resizeMode="contain" />
      <Text style={styles.contentText}>{content}</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    width: width,
  },
  image: {
    height: height / 2.5,
    width: width / 1,
  },
  contentText: {
    fontSize: 14,
    fontFamily: 'Poppins_500Medium',
    textAlign: 'center',

    marginHorizontal: 10,
    color: Colors.PRIMARY_PURPLE,
  },
});
export default WelcomeCard;
