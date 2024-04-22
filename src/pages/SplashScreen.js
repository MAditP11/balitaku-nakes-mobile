import React, { useEffect } from 'react';
import { Dimensions, Image, StyleSheet, View } from 'react-native';
import Images from '../constants/Images';

const { height, width } = Dimensions.get('window');

const SplashScreen = ({ navigation }) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.navigate('WelcomeScreen');
    }, 1500);
  });
  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image source={Images.logo} style={styles.image} resizeMode="contain" />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F3F3',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoContainer: {
    flexDirection: 'column',
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: width / 1.75,
    height: height / 1.75,
  },
  imageText: {
    height: height / 10,
    width: width / 3,
  },
});
export default SplashScreen;
