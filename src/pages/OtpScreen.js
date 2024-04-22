import React, { useRef, useState, useEffect } from 'react';
import { Dimensions, Image, Modal, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View, StatusBar, ScrollView } from 'react-native';
import { Colors, Images } from '../constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoadingPage from '../components/LoadingPage';
import { authenticate } from '../apis/Auth';
import { Ionicons } from '@expo/vector-icons';
import CountDown from 'react-native-countdown-component';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const OtpScreen = ({ route, navigation }) => {
  const { phone } = route.params;
  const [disable, setDisable] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [firstCode, setFirstCode] = useState('');
  const [secondCode, setSecondCode] = useState('');
  const [thirdCode, setThirdCode] = useState('');
  const [fourthCode, setFourthCode] = useState('');

  useEffect(() => {
    setInterval(() => {
      setTimeout(() => setDisable(!disable));
    }, 120000);
  }, []);

  const firstInput = (text) => {
    setFirstCode(text);
    if (text.length === 1) {
      second.current.focus();
    }
  };

  const secondInput = (text) => {
    setSecondCode(text);
    if (text.length === 1) {
      third.current.focus();
    }
  };

  const thirdInput = (text) => {
    setThirdCode(text);
    if (text.length === 1) {
      fourth.current.focus();
    }
  };

  const fourthInput = (text) => {
    setFourthCode(text);
    if (text.length < 1) {
      third.current.focus();
    }
  };

  const first = useRef();
  const second = useRef();
  const third = useRef();
  const fourth = useRef();

  const submit = async () => {
    let code = firstCode + secondCode + thirdCode + fourthCode;
    await authenticate(code, phone).then(async (res) => {
      if (res.status === 200) {
        await AsyncStorage.setItem('token', res.data.token).then(async () => {
          await AsyncStorage.setItem('user', JSON.stringify(res.data.data)).then(() => {
            navigation.navigate('MainContainer');
          });
        });
      } else {
        navigation.navigate('LoginScreen', { phoneNumber });
      }
    });
    setIsLoading(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.PRIMARY_PURPLE} translucent />
      {/* Jumbotron */}
      <View style={{ backgroundColor: Colors.PRIMARY_PURPLE, height: height / 2.5, justifyContent: 'center', alignItems: 'center' }}>
        <Image source={Images.logoOTP} style={{ width: width / 1.75, height: height / 7 }} />
      </View>
      <ScrollView>
        {/* Container content */}
        <View style={{ borderTopStartRadius: 30, borderTopEndRadius: 30, backgroundColor: Colors.DEFAULT_WHITE, height: height / 1.5 }}>
          <View style={styles.textCon}>
            <Text style={styles.text}>Masukkan kode verifikasi yang dikirimkan melalui WhatsApp</Text>
          </View>

          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              marginVertical: 10,
            }}
          >
            <View
              style={{
                width: width,
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              {/* Input otp number */}
              <TextInput style={styles.inputOtp} maxLength={1} keyboardType={'numeric'} onChangeText={(text) => firstInput(text)} ref={first} />
              <TextInput
                style={styles.inputOtp}
                keyboardType={'numeric'}
                ref={second}
                onChangeText={(text) => secondInput(text)}
                onKeyPress={({ nativeEvent }) => {
                  if (nativeEvent.key === 'Backspace') {
                    first.current.focus();
                  }
                }}
              />
              <TextInput
                style={styles.inputOtp}
                maxLength={1}
                keyboardType={'numeric'}
                ref={third}
                onChangeText={(text) => thirdInput(text)}
                onKeyPress={({ nativeEvent }) => {
                  if (nativeEvent.key === 'Backspace') {
                    second.current.focus();
                  }
                }}
              />
              <TextInput
                style={styles.inputOtp}
                maxLength={1}
                keyboardType={'numeric'}
                ref={fourth}
                onChangeText={(text) => fourthInput(text)}
                onKeyPress={({ nativeEvent }) => {
                  if (nativeEvent.key === 'Backspace') {
                    third.current.focus();
                  }
                }}
              />
            </View>
          </View>
          {/* time for acces otp */}
          <View style={{ justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
            <View style={{ justifyContent: 'center', height: 26, width: 15 }}>
              <Ionicons name="time-outline" size={15}></Ionicons>
            </View>
            <CountDown size={15} until={120} digitTxtStyle={{ color: Colors.gray }} digitStyle={{ padding: 2 }} timeLabelStyle={{ color: Colors.gray }} timeLabels={{ m: null, s: null }} timeToShow={['M', 'S']} showSeparator />
            {/* <Text style={{ fontSize: 15, fontFamily: 'Poppins_500Medium' }}>01:59</Text> */}
          </View>
          {/* button for verify */}
          <View style={styles.buttonLogContainer}>
            <TouchableOpacity style={styles.loginButton} activeOpacity={0.8} onPress={() => submit()}>
              <Text style={styles.loginButtonText}>Kirim</Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              width: width,
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'column',
            }}
          >
            <View style={{ flexDirection: 'row' }}>
              <Text
                style={{
                  fontSize: 15,
                  fontFamily: 'Poppins_400Regular',
                }}
              >
                Belum Menerima Kode?
              </Text>
              <TouchableOpacity disabled={disable} style={{ marginLeft: 5 }} onPress={() => navigation.navigate('LoginScreen')}>
                <Text style={{ fontSize: 15, fontFamily: 'Poppins_400Regular', color: disable ? Colors.grey : Colors.PRIMARY_PURPLE, textDecorationLine: 'underline' }}>Kirim Ulang</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>

      <LoadingPage show={isLoading} />
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.PRIMARY_PURPLE,
  },

  textCon: {
    width: width,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: height / 10,
  },
  text: {
    textAlign: 'center',
    fontFamily: 'Poppins_400Regular',
    marginHorizontal: 10,
    fontSize: 18,
    color: Colors.PRIMARY_PURPLE,
    marginBottom: 25,
  },
  title: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 15,
  },
  inputCon: {
    borderWidth: 1,
    borderColor: Colors.PRIMARY_PURPLE,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: 5,
  },
  loginButton: {
    backgroundColor: Colors.PRIMARY_PURPLE,
    width: width / 1.15,
    height: height / 14,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
  },
  loginButtonText: {
    fontSize: 20,
    lineHeight: 20 * 1.4,
    fontFamily: 'Poppins_700Bold',
    color: Colors.DEFAULT_WHITE,
  },
  buttonLogContainer: {
    width: width,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: width / 12,
    marginBottom: width / 15,
  },
  inputOtp: {
    width: width / 8,
    height: height / 16,
    borderWidth: 1,
    backgroundColor: '#fff',
    borderRadius: 6,
    borderColor: Colors.PRIMARY_PURPLE,
    textAlign: 'center',
    fontSize: 24,
    fontWeight: '700',
    marginHorizontal: 5,
    color: Colors.gray,
  },
});
export default OtpScreen;
