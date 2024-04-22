import { Ionicons } from '@expo/vector-icons';
import React, { useRef, useState } from 'react';
import { Dimensions, FlatList, Image, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Background from '../components/Background';
import WelcomeCard from '../components/WelcomeCard';
import { Colors, Images, WelcomeContent } from '../constants';
const { height, width } = Dimensions.get('window');

const pageStyle = (isActive) => (isActive ? styles.page : { ...styles.page, backgroundColor: Colors.SECONDARY_PURPLE });

const Pagination = ({ index }) => {
  return <View style={styles.pageContainer}>{[...Array(WelcomeContent.WELCOME_CONTENTS.length).keys()].map((_, i) => (i === index ? <View style={pageStyle(true)} key={i} /> : <View style={pageStyle(false)} key={i} />))}</View>;
};

const SlideScreen = ({ navigation }) => {
  const [welcomeListIndex, setWelcomeListIndex] = useState(0);
  const welcomeList = useRef();
  const onViewRef = useRef(({ changed }) => {
    setWelcomeListIndex(changed[0].index);
  });
  const viewConfigRef = useRef({ viewAreaCoveragePercentThreshold: 50 });
  const pageScroll = () => {
    welcomeList.current.scrollToIndex({
      index: welcomeListIndex < 2 ? welcomeListIndex + 1 : welcomeListIndex,
    });
  };
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={Colors.DEFAULT_WHITE} translucent />
      <Background height={height / 1.3} />
      <View style={styles.welcomeListContainer}>
        <FlatList
          ref={welcomeList}
          data={WelcomeContent.WELCOME_CONTENTS}
          keyExtractor={(item) => item.content}
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          overScrollMode="never"
          viewabilityConfig={viewConfigRef.current}
          onViewableItemsChanged={onViewRef.current}
          horizontal
          renderItem={({ item }) => <WelcomeCard {...item} />}
        />
      </View>
      <Pagination index={welcomeListIndex} />
      {welcomeListIndex === 2 ? (
        <View style={styles.logContainer}>
          <TouchableOpacity style={styles.loginButton} activeOpacity={0.8} onPress={() => navigation.navigate('LoginScreen')}>
            <Text style={styles.loginButtonText}>Mulai</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.logContainer}>
          <TouchableOpacity style={styles.loginButton} activeOpacity={0.8} onPress={() => pageScroll()}>
            <Text style={styles.loginButtonText}>Selanjutnya</Text>
          </TouchableOpacity>
        </View>
      )}
      <View style={styles.logoContainer}>
        <Image source={Images.diskominfo} style={{ width: '47%', height: '45%' }}></Image>
        <Image source={Images.metromatika} style={{ width: '32%', height: '45%' }}></Image>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  welcomeListContainer: {
    height: height,
    top: 170,
    position: 'absolute',
  },
  pageContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    bottom: height / 20,
  },
  page: {
    height: 8,
    width: 10,
    backgroundColor: Colors.PRIMARY_PURPLE,
    borderRadius: 40,
    marginHorizontal: 5,
  },
  buttonText: {
    fontSize: 14,
    lineHeight: 16 * 1.4,
    fontFamily: 'Poppins_700Bold',
    color: Colors.light,
  },
  button: {
    backgroundColor: Colors.SECONDARY_PURPLE,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    marginRight: 15,
    borderRadius: 10,
    width: width / 2.5,
    height: height / 16,
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
export default SlideScreen;
