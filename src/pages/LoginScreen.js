import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Dimensions, Image, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View, StatusBar } from 'react-native';
import { CountryDialCode } from '../components/countryCode';
import { Colors, Images } from '../constants';
import axios from '../services/Axios';
import { otp } from '../apis/Auth';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const LoginScreen = ({ navigation }) => {
  const [phoneNumber, setPhoneNumber] = useState('');

  const login = async () => {
    let phonee = phoneNumber;
    await otp(phonee[0] === '0' ? phonee.replace(phonee[0], '+62') : phonee).then((result) => {
      if (result.status === 200 && result.data.data[0].level === 'nakes') {
        navigation.navigate('OtpScreen', { phone: result.data.data[0].phone });
      } else {
        console.log('maaf tidak bisa login');
      }
    });
  };

  // Modal option for no hp
  // const modalView = () => {
  //   return (
  //     <View
  //       style={{
  //         height: height,
  //         width: width,
  //         backgroundColor: 'rgba(0,0,0,0.7)',
  //       }}
  //     >
  //       <View
  //         style={{
  //           position: 'absolute',
  //           bottom: 0,
  //           left: 0,
  //           width: width,
  //           height: '40%',
  //         }}
  //       >
  //         <View style={{ alignItems: 'flex-end' }}>
  //           <TouchableOpacity onPress={() => setViewModal(false)}>
  //             <Image source={require('../assets/images/close.png')} />
  //           </TouchableOpacity>
  //         </View>
  //         <View
  //           style={{
  //             backgroundColor: '#fff',
  //             borderTopStartRadius: 20,
  //             borderTopEndRadius: 20,
  //             padding: 15,
  //             flex: 1,
  //           }}
  //         >
  //           <ScrollView>
  //             {CountryDialCode.map((item, index) => {
  //               return (
  //                 <TouchableOpacity
  //                   style={{
  //                     justifyContent: 'space-between',
  //                     flexDirection: 'row',
  //                     padding: 5,
  //                     borderBottomWidth: 1,
  //                   }}
  //                   key={index}
  //                   onPress={() => setCloseModal(item.dial_code)}
  //                 >
  //                   <Text style={{ fontSize: 18, fontFamily: 'Poppins_500Medium' }}>{item.dial_code}</Text>
  //                   <Text style={{ fontSize: 18, fontFamily: 'Poppins_500Medium' }}>{item.name}</Text>
  //                 </TouchableOpacity>
  //               );
  //             })}
  //           </ScrollView>
  //         </View>
  //       </View>
  //     </View>
  //   );
  // };
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.PRIMARY_PURPLE} translucent />
      {/* Jumbotron */}

      <View style={styles.topBar}>
        <Image source={Images.logoOTP} style={{ width: width / 1.75, height: height / 7 }} />
      </View>
      <ScrollView>
        <View style={styles.content}>
          {/* Content */}
          <View style={styles.textCon}>
            <Text style={styles.text}>Masukkan nomor handphone anda yang aktif untuk masuk ke aplikasi Nakes</Text>
          </View>
          <View
            style={{
              width: width,
              marginTop: 20,
            }}
          ></View>

          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 20,
            }}
          >
            {/* Input no hp */}
            <View style={styles.inputCon}>
              <View style={{ width: '20%', backgroundColor: '#EBF5F6', alignItems: 'center', justifyContent: 'center', borderRadius: 5 }}>
                <Ionicons name="logo-whatsapp" size={30} color={Colors.gray}></Ionicons>
              </View>
              <View
                style={{
                  width: '80%',
                  justifyContent: 'center',
                }}
              >
                <TextInput
                  keyboardType="numeric"
                  placeholder="0812XXXXXXXX"
                  onChangeText={(text) => setPhoneNumber(text)}
                  style={{
                    color: Colors.gray,
                    paddingHorizontal: 10,
                    paddingTop: 5,
                    borderRadius: 5,
                    height: height / 13,
                    fontSize: 20,
                    fontFamily: 'Poppins_600SemiBold',
                  }}
                />
              </View>
            </View>
          </View>
          {/* Button for login */}
          <View style={styles.buttonLogContainer}>
            <TouchableOpacity style={styles.loginButton} activeOpacity={0.8} onPress={() => navigation.navigate('OtpScreen', { phone: phoneNumber })}>
              <Text style={styles.loginButtonText}>Lanjut</Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              width: width,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          ></View>
          {/* <Modal animationType="slide" transparent={true} visible={viewModal} onRequestClose={() => {}}>
          {modalView()}
        </Modal> */}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.PRIMARY_PURPLE,
  },
  topBar: { backgroundColor: Colors.PRIMARY_PURPLE, height: height / 2.5, justifyContent: 'center', alignItems: 'center' },
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
    fontSize: 26,
  },
  inputCon: {
    position: 'absolute',
    borderWidth: 1,
    borderColor: Colors.PRIMARY_PURPLE,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: width / 1.15,
    borderRadius: 5,
  },
  content: { height: height / 1.5, borderTopStartRadius: 30, borderTopEndRadius: 30, backgroundColor: Colors.DEFAULT_WHITE, flex: 1 },
  loginButton: {
    backgroundColor: Colors.PRIMARY_PURPLE,
    marginVertical: 25,
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
    marginVertical: height / 15,
  },
});
export default LoginScreen;
