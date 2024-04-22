import { Ionicons } from '@expo/vector-icons';
import React, { useRef, useState } from 'react';
import { Dimensions, Image, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Background from '../components/Background';
import { Colors, Images } from '../constants';
const { height, width } = Dimensions.get('window');

const WelcomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={Colors.DEFAULT_WHITE} translucent />
      <Background height={height / 1.3} />
      <View style={styles.welcomeListContainer}>
        <View style={styles.containerContent}>
          <Text style={styles.contentText}>Halo!</Text>
          <Text style={styles.contentText}>Selamat datang di aplikasi Nakes</Text>
          <Image style={styles.image} source={Images.WELCOME1} resizeMode="contain" />
        </View>
      </View>
      <View style={styles.logContainer}>
        <TouchableOpacity style={styles.loginButton} activeOpacity={0.8} onPress={() => navigation.navigate('SlideScreen')}>
          <Text style={styles.loginButtonText}>Masuk</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.logoContainer}>
        <Image source={Images.diskominfo} style={{ width: '47%', height: '45%' }}></Image>
        <Image source={Images.metromatika} style={{ width: '32%', height: '45%' }}></Image>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  containerContent: {
    alignItems: 'center',
    width: width,
  },
  image: {
    marginTop: 20,
    height: height / 2.5,
    width: width / 1,
  },
  contentText: {
    fontSize: 24,
    fontFamily: 'Poppins_600SemiBold',
    textAlign: 'center',

    marginHorizontal: 15,
    color: Colors.PRIMARY_PURPLE,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  welcomeListContainer: {
    height: height,
    top: 120,
    position: 'absolute',
  },
  loginButton: {
    backgroundColor: Colors.PRIMARY_PURPLE,
    width: width / 1.1,
    height: height / 14,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
  },
  loginButtonText: {
    fontSize: 20,
    fontFamily: 'Poppins_700Bold',
    color: Colors.light,
  },
  logoContainer: {
    width: width,
    height: height / 10,
    paddingHorizontal: 60,
    bottom: 40,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
  },
  logContainer: {
    width: width,
    height: width / 2.5,
    bottom: 70,
    justifyContent: 'space-evenly',
    flexDirection: 'column',
    alignItems: 'center',
    position: 'absolute',
  },
});
export default WelcomeScreen;
