import React, { useEffect, useState, useRef } from 'react';
import { Dimensions, Animated, ScrollView, Image, StatusBar, TouchableOpacity, StyleSheet, Text, TextInput, View, Alert } from 'react-native';
import { Colors, Images, WelcomeContent } from '../../constants';
import Navigation from './Navigation';
import TopBar from '../../components/TopBar';
const { height, width } = Dimensions.get('window');

function NotifPage({ navigation }) {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const scrollViewRef = useRef();

  const [text1, setText1] = React.useState([]);
  const [text2, setText2] = React.useState([]);
  const [text3, setText3] = React.useState([]);
  const [text4, setText4] = React.useState([]);
  const [text5, setText5] = React.useState([]);
  const [text6, setText6] = React.useState([]);
  const [text7, setText7] = React.useState([]);
  const [text8, setText8] = React.useState([]);
  const [text9, setText9] = React.useState([]);
  const [text10, setText10] = React.useState([]);
  const [text11, setText11] = React.useState([]);
  const [textOption, setTextOption] = React.useState(null);

  const [Comment, setComment] = React.useState(null);

  const Introduction = () => {
    setTimeout(() => {
      setText1('Halooo SELAMAT DATANG DI CHATBOT BALITAKU NAKES');
      setTimeout(() => {
        setText2('APA YANG INGIN ANDA TANYAKAN?');
        setTimeout(() => {
          setText3('LANJUT?');
        }, 1000);
      }, 1000);
    }, 1000);
  };

  const first = () => {
    Animated.spring(fadeAnim, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
    return (
      <Animated.View style={{ opacity: fadeAnim, marginVertical: 5, paddingVertical: 7, paddingHorizontal: 10, backgroundColor: Colors.PRIMARY_PURPLE, maxWidth: 250, borderRadius: 7 }}>
        <Text style={{ color: Colors.DEFAULT_WHITE }}>{text1}</Text>
      </Animated.View>
    );
  };
  const second = () => {
    return (
      <View style={{ marginVertical: 5, paddingVertical: 7, paddingHorizontal: 10, backgroundColor: Colors.PRIMARY_PURPLE, maxWidth: 250, borderRadius: 7 }}>
        <Text style={{ color: Colors.DEFAULT_WHITE }}>{text2}</Text>
      </View>
    );
  };

  const send1 = () => {
    setText4('Cara membuat laporan penanganan');
    setTimeout(() => {
      setText5('Cara membuat laporan penanganan yaitu....');
      setTimeout(() => {
        setText9('Apakah Masih Ada yang ingin ditanyakan?');
      }, 1000);
    }, 1000);
  };
  const send2 = () => {
    setText4('Cara membuat laporan posyandu');
    setTimeout(() => {
      setText5('Cara membuat laporan posyandu yaitu....');
      setTimeout(() => {
        setText9('Apakah Masih Ada yang ingin ditanyakan?');
      }, 1000);
    }, 1000);
  };

  const send3 = () => {
    setText4('Pertanyaan Lainnya');
    setTimeout(() => {
      setText5('Silahkan Masukkan Pertanyaan lainnya');
      setTextOption('1');
    }, 1000);
  };

  const third = () => {
    if (text5[0] === undefined) {
      return (
        <View style={{ marginVertical: 5, paddingVertical: 7, paddingHorizontal: 10, backgroundColor: Colors.PRIMARY_PURPLE, maxWidth: 250, borderRadius: 7 }}>
          <TouchableOpacity style={{ backgroundColor: 'red', paddingHorizontal: 5, paddingVertical: 5, marginBottom: 5, borderRadius: 5 }} activeOpacity={0.8} onPress={() => send1()}>
            <Text style={{ color: Colors.DEFAULT_WHITE }}>Cara Membuat Laporan Penanganan</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{ backgroundColor: 'red', paddingHorizontal: 5, paddingVertical: 5, marginBottom: 5, borderRadius: 5 }} activeOpacity={0.8} onPress={() => send2()}>
            <Text style={{ color: Colors.DEFAULT_WHITE }}>Cara Membuat Laporan Posyandu</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{ backgroundColor: 'red', paddingHorizontal: 5, paddingVertical: 5, marginBottom: 5, borderRadius: 5 }} activeOpacity={0.8} onPress={() => send3()}>
            <Text style={{ color: Colors.DEFAULT_WHITE }}>Pertanyaan Lainnya</Text>
          </TouchableOpacity>
        </View>
      );
    } else {
      return (
        <View style={{ marginVertical: 5, paddingVertical: 7, paddingHorizontal: 10, backgroundColor: Colors.PRIMARY_PURPLE, maxWidth: 250, borderRadius: 7 }}>
          <TouchableOpacity disabled style={{ backgroundColor: 'red', paddingHorizontal: 5, paddingVertical: 5, marginBottom: 5, borderRadius: 5 }} activeOpacity={0.8} onPress={() => send1()}>
            <Text style={{ color: Colors.DEFAULT_WHITE }}>Cara Membuat Laporan Penanganan</Text>
          </TouchableOpacity>
          <TouchableOpacity disabled style={{ backgroundColor: 'red', paddingHorizontal: 5, paddingVertical: 5, marginBottom: 5, borderRadius: 5 }} activeOpacity={0.8} onPress={() => send2()}>
            <Text style={{ color: Colors.DEFAULT_WHITE }}>Cara Membuat Laporan Posyandu</Text>
          </TouchableOpacity>
          <TouchableOpacity disabled style={{ backgroundColor: 'red', paddingHorizontal: 5, paddingVertical: 5, borderRadius: 5 }} activeOpacity={0.8} onPress={() => send3()}>
            <Text style={{ color: Colors.DEFAULT_WHITE }}>Pertanyaan Lainnya</Text>
          </TouchableOpacity>
        </View>
      );
    }
  };
  const fourth = () => {
    return (
      <View style={{ width: width, alignItems: 'flex-end', paddingRight: 20 }}>
        <View style={{ marginVertical: 5, paddingVertical: 7, paddingHorizontal: 10, backgroundColor: Colors.SECONDARY_PURPLE, maxWidth: 250, borderRadius: 7 }}>
          <Text style={{ color: Colors.DEFAULT_WHITE }}>{text4}</Text>
        </View>
      </View>
    );
  };

  const fifth = () => {
    return (
      <View style={{ marginVertical: 5, paddingVertical: 7, paddingHorizontal: 10, backgroundColor: Colors.PRIMARY_PURPLE, maxWidth: 250, borderRadius: 7 }}>
        <Text style={{ color: Colors.DEFAULT_WHITE }}>{text5}</Text>
      </View>
    );
  };

  const six = () => {
    return (
      <View style={{ width: width, alignItems: 'flex-end', paddingRight: 20 }}>
        <View style={{ marginVertical: 5, paddingVertical: 7, paddingHorizontal: 10, backgroundColor: Colors.SECONDARY_PURPLE, maxWidth: 250, borderRadius: 7 }}>
          <Text style={{ color: Colors.DEFAULT_WHITE }}>{text6}</Text>
        </View>
      </View>
    );
  };
  const seven = () => {
    return (
      <View style={{ marginVertical: 5, paddingVertical: 7, paddingHorizontal: 10, backgroundColor: Colors.PRIMARY_PURPLE, maxWidth: 250, borderRadius: 7 }}>
        <Text style={{ color: Colors.DEFAULT_WHITE }}>{text7}</Text>
      </View>
    );
  };

  const eight = () => {
    return (
      <View style={{ marginVertical: 5, paddingVertical: 7, paddingHorizontal: 10, backgroundColor: Colors.PRIMARY_PURPLE, maxWidth: 250, borderRadius: 7 }}>
        <Text style={{ color: Colors.DEFAULT_WHITE }}>{text8}</Text>
      </View>
    );
  };

  const nine = () => {
    if (text10[0] === undefined) {
      return (
        <View style={{ marginVertical: 5, paddingVertical: 7, paddingHorizontal: 10, backgroundColor: Colors.PRIMARY_PURPLE, maxWidth: 250, borderRadius: 7 }}>
          <Text style={{ color: Colors.DEFAULT_WHITE }}>{text9}</Text>
          <View style={{ flexDirection: 'row', marginTop: 7 }}>
            <TouchableOpacity
              onPress={() => setText10('IYA')}
              style={{ backgroundColor: 'green', width: 70, paddingHorizontal: 10, paddingVertical: 7, justifyContent: 'center', alignItems: 'center', marginLeft: 5, marginRight: 10, borderRadius: 5 }}
            >
              <Text style={{ color: Colors.DEFAULT_WHITE }}>IYA</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setText10('TIDAK');
                setTimeout(() => {
                  setText11('Baik Terimakasih, silahkan klik tombol refresh di bawah ini untuk bertanya lagi');
                }, 1000);
              }}
              style={{ backgroundColor: 'red', width: 70, paddingHorizontal: 10, paddingVertical: 7, justifyContent: 'center', alignItems: 'center', borderRadius: 5 }}
            >
              <Text style={{ color: Colors.DEFAULT_WHITE }}>TIDAK</Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    } else {
      return (
        <View style={{ marginVertical: 5, paddingVertical: 7, paddingHorizontal: 10, backgroundColor: Colors.PRIMARY_PURPLE, maxWidth: 250, borderRadius: 7 }}>
          <Text style={{ color: Colors.DEFAULT_WHITE }}>{text9}</Text>
          <View style={{ flexDirection: 'row', marginTop: 7 }}>
            <TouchableOpacity disabled style={{ backgroundColor: 'green', width: 70, paddingHorizontal: 10, paddingVertical: 7, justifyContent: 'center', alignItems: 'center', marginLeft: 5, marginRight: 10, borderRadius: 5 }}>
              <Text style={{ color: Colors.DEFAULT_WHITE }}>IYA</Text>
            </TouchableOpacity>
            <TouchableOpacity disabled style={{ backgroundColor: 'red', width: 70, paddingHorizontal: 10, paddingVertical: 7, justifyContent: 'center', alignItems: 'center', borderRadius: 5 }}>
              <Text style={{ color: Colors.DEFAULT_WHITE }}>TIDAK</Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    }
  };

  const ten = () => {
    return (
      <View style={{ width: width, alignItems: 'flex-end', paddingRight: 20 }}>
        <View style={{ marginVertical: 5, paddingVertical: 7, paddingHorizontal: 10, backgroundColor: Colors.SECONDARY_PURPLE, maxWidth: 250, borderRadius: 7 }}>
          <Text style={{ color: Colors.DEFAULT_WHITE }}>{text10}</Text>
        </View>
      </View>
    );
  };

  const eleven = () => {
    return (
      <View style={{ marginVertical: 5, paddingVertical: 7, paddingHorizontal: 10, backgroundColor: Colors.PRIMARY_PURPLE, maxWidth: 250, borderRadius: 7 }}>
        <Text style={{ color: Colors.DEFAULT_WHITE }}>{text11}</Text>
      </View>
    );
  };

  const submit = async () => {
    if (!Comment.trim()) {
      Alert.alert('Maaf, mohon isi data dengan lengkap');
      return;
    } else {
      setText6(Comment);
      setComment('');
      setTimeout(() => {
        setText7('Tunggu Sebentar ya :) Kami akan mencari jawaban yang sesuai dengan pertanyaan anda');
        setTimeout(() => {
          setText8('Maaf Jawaban untuk pertanyaan Anda belum tersedia, Terimakasih atas pertanyaannya, kami akan segera mengupdate jawabannya');
          setTimeout(() => {
            setText9('Apakah masih ada yang ingin anda tanyakan?');
          }, 1000);
        }, 2000);
      }, 2000);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={'transparent'} translucent />
      <TopBar
        height={height / 7}
        content={
          <View style={{ marginTop: 40, height: 25, marginLeft: 10 }}>
            <Text style={{ color: Colors.DEFAULT_WHITE, fontWeight: '700', fontSize: 18 }}>FAQ</Text>
          </View>
        }
      />
      <ScrollView height={height} width={width} ref={scrollViewRef} onContentSizeChange={() => scrollViewRef.current.scrollToEnd({ animated: true })} style={styles.scrollCon}>
        <View style={{ flex: 1, paddingHorizontal: 10 }}>
          {Introduction()}
          {text1[0] !== undefined ? first() : null}
          {text2[0] !== undefined ? second() : null}
          {text3[0] !== undefined ? third() : null}
          {text4[0] !== undefined ? fourth() : null}
          {text5[0] !== undefined ? fifth() : null}
          {text6[0] !== undefined ? six() : null}
          {text7[0] !== undefined ? seven() : null}
          {text8[0] !== undefined ? eight() : null}
          {text9[0] !== undefined ? nine() : null}
          {text10[0] !== undefined ? ten() : null}
          {text11[0] !== undefined ? eleven() : null}
        </View>
      </ScrollView>
      {textOption === null || text7[1] !== undefined ? (
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 5 }}>
          <TextInput editable={false} placeholder="Masukkan Komentar" onChangeText={(text) => setComment(text)} style={{ width: '79%', borderWidth: 1, paddingHorizontal: 7, paddingVertical: 4, borderColor: Colors.grey }} />
          <TouchableOpacity
            disabled
            style={{ width: '20%', backgroundColor: Colors.grey, paddingHorizontal: 5, paddingVertical: 5, borderRadius: 5, justifyContent: 'center', alignItems: 'center' }}
            activeOpacity={0.8}
            onPress={() => send2()}
          >
            <Text style={{ color: Colors.DEFAULT_WHITE }}>KIRIM</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 5 }}>
          <TextInput placeholder="Masukkan Komentar" onChangeText={(text) => setComment(text)} style={{ width: '79%', borderWidth: 1, paddingHorizontal: 7, paddingVertical: 4, borderColor: Colors.grey }} />
          <TouchableOpacity
            style={{ width: '20%', backgroundColor: Colors.PRIMARY_PURPLE, paddingHorizontal: 5, paddingVertical: 5, borderRadius: 5, justifyContent: 'center', alignItems: 'center' }}
            activeOpacity={0.8}
            onPress={() => submit()}
          >
            <Text style={{ color: Colors.DEFAULT_WHITE }}>KIRIM</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.DEFAULT_WHITE,
  },
});

export default NotifPage;
