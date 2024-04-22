import React, { useEffect, useState, useRef } from 'react';
import { Dimensions, Animated, ScrollView, Image, StatusBar, TouchableOpacity, StyleSheet, Text, TextInput, View, Alert, Keyboard } from 'react-native';
import { Colors, Images } from '../../constants';
import ProfilBot from './chatbot/ProfilBot';
import AboutBot from './chatbot/AboutBot';
import HelpBot from './chatbot/HelpBot';
import LPBot from './chatbot/LPBot';
import TopBar from '../../components/TopBar';
const { height, width } = Dimensions.get('window');

// Laporan Penanganan, Laporan Posyandu, Profil, Aksi Penanganan, No Hp

const dbFAQ = [
  {
    id: 1,
    kw: 'lp1',
    ops: ['1'],
    jwb: 'lp1 merupakan ....',
  },
  {
    id: 2,
    kw: 'lp2',
    ops: ['2'],
    jwb: 'lp2 merupakan ....',
  },
  {
    id: 3,
    kw: 'none',
    ops: ['3'],
    jwb: 'Maaf keyword tidak ada yang cocok',
  },
];

function NotifPage({ navigation }) {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const scrollViewRef = useRef();

  const [text1, setText1] = React.useState([]);
  const [text2, setText2] = React.useState([]);
  const [text3, setText3] = React.useState([]);
  const [loading, setLoading] = React.useState([]);
  const [filter, setFilter] = React.useState([]);

  const [back, setBack] = React.useState(false);

  const [ires, setIres] = React.useState(0);

  const [Comment, setComment] = React.useState([]);

  const Introduction = () => {
    setTimeout(() => {
      setText1('SELAMAT DATANG DI CHATBOT BALITAKU NAKES');
      setTimeout(() => {
        setText2('Silahkan ketik keyword atau ketik "help" jika anda perlu bantuan');
      }, 1000);
    }, 1000);
  };

  const bot1 = () => {
    Animated.spring(fadeAnim, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
    return (
      <Animated.View style={{ opacity: fadeAnim, marginVertical: 5, paddingVertical: 7, paddingHorizontal: 10, backgroundColor: Colors.PRIMARY_PURPLE, maxWidth: 270, borderRadius: 7 }}>
        <Text style={{ color: Colors.DEFAULT_WHITE }}>{text1}</Text>
      </Animated.View>
    );
  };
  const bot2 = () => {
    return (
      <View style={{ marginVertical: 5, paddingVertical: 7, paddingHorizontal: 10, backgroundColor: Colors.PRIMARY_PURPLE, maxWidth: 270, borderRadius: 7 }}>
        <Text style={{ color: Colors.DEFAULT_WHITE }}>{text2}</Text>
      </View>
    );
  };

  const user1 = (i) => {
    return (
      <View style={{ width: width, alignItems: 'flex-end', paddingRight: 20 }}>
        <View style={{ marginVertical: 5, paddingVertical: 7, paddingHorizontal: 10, backgroundColor: Colors.SECONDARY_PURPLE, maxWidth: 250, borderRadius: 7 }}>
          <Text style={{ color: Colors.DEFAULT_WHITE }}>{text3[i]}</Text>
        </View>
      </View>
    );
  };

  const submit = async () => {
    if (!Comment.trim()) {
      Alert.alert('Maaf, keyword masih kosong');
      return;
    } else {
      text3.push(Comment.toLowerCase());
      if (Comment.toLowerCase() === 'lpp') {
        setBack(true);
      } else {
        setBack(false);
      }

      setComment('....');
      const k = ires;
      if (ires < k + 1) {
        botFilter(ires);
        setIres(ires + 1);
      }
      Keyboard.dismiss();
      setTimeout(() => {
        loading.push('true');
        setComment('');
      }, 2000);
    }
  };

  console.log(back);

  // console.log(text3);

  const botFilter = (i) => {
    let ress = [];
    dbFAQ.filter((kw) => {
      if (text3[i].toLowerCase() === kw.kw || text3[i].toLowerCase() === kw.ops[0]) {
        ress.push(kw);
      }
    });
    let r = ress[0];
    filter.push(r);
  };

  const bot3 = (i) => {
    return (
      <View style={{ marginVertical: 5, paddingVertical: 7, paddingHorizontal: 10, backgroundColor: Colors.PRIMARY_PURPLE, maxWidth: 250, borderRadius: 7 }}>
        {filter[i] === undefined && loading[i] !== undefined ? (
          <Text style={{ color: Colors.DEFAULT_WHITE }}>
            Maaf keyword tidak sesuai, untuk informasi bantuan, silahkan ketik "<Text style={{ fontWeight: 'bold' }}>Help</Text>" untuk menampilkan keyword yang tersedia
          </Text>
        ) : filter[i] === 'help' ? (
          <HelpBot />
        ) : (
          <Text style={{ color: Colors.DEFAULT_WHITE }}>{filter[i].jwb}</Text>
        )}
      </View>
    );
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
          {text1[0] !== undefined ? bot1() : null}
          {text2[0] !== undefined ? bot2() : null}
          {text3[0] !== undefined ? user1(0) : null}
          {text3[0] === 'help' && loading[0] !== undefined ? (
            <HelpBot />
          ) : text3[0] === 'lp' && loading[0] !== undefined ? (
            <LPBot disabled={!back} />
          ) : (text3[0] === 'profil' || text3[0] === 'pro') && loading[0] !== undefined ? (
            <ProfilBot />
          ) : (text3[0] === 'about' || text3[0] === 'tentang') && loading[0] !== undefined ? (
            <ProfilBot />
          ) : text3[0] !== undefined && loading[0] !== undefined ? (
            bot3(0)
          ) : null}

          {text3[1] !== undefined ? user1(1) : null}
          {text3[1] === 'help' && loading[1] !== undefined ? <HelpBot /> : text3[1] === 'lpp' && loading[1] !== undefined ? <LPBot disabled={!back} /> : text3[1] !== undefined && loading[1] !== undefined ? bot3(1) : null}

          {text3[2] !== undefined ? user1(2) : null}
          {text3[2] === 'help' && loading[2] !== undefined ? <HelpBot /> : text3[2] !== undefined && loading[2] !== undefined ? bot3(2) : null}

          {text3[3] !== undefined ? user1(3) : null}
          {text3[3] === 'help' && loading[3] !== undefined ? <HelpBot /> : text3[3] !== undefined && loading[3] !== undefined ? bot3(3) : null}

          {text3[4] !== undefined ? user1(4) : null}
          {text3[4] === 'help' && loading[4] !== undefined ? <HelpBot /> : text3[4] !== undefined && loading[4] !== undefined ? bot3(4) : null}
        </View>
      </ScrollView>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 5 }}>
        <TextInput placeholder="Masukkan Komentar" value={Comment} onChangeText={(text) => setComment(text)} style={{ width: '79%', borderWidth: 1, paddingHorizontal: 7, paddingVertical: 4, borderColor: Colors.grey }} />
        <TouchableOpacity
          style={{ width: '20%', backgroundColor: Colors.PRIMARY_PURPLE, paddingHorizontal: 5, paddingVertical: 5, borderRadius: 5, justifyContent: 'center', alignItems: 'center' }}
          activeOpacity={0.8}
          onPress={() => submit()}
        >
          <Text style={{ color: Colors.DEFAULT_WHITE }}>KIRIM</Text>
        </TouchableOpacity>
      </View>
      {/* {back === true ? (
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 5 }}>
          <TextInput editable={false} placeholder="Masukkan Komentar" value={Comment} onChangeText={(text) => setComment(text)} style={{ width: '79%', borderWidth: 1, paddingHorizontal: 7, paddingVertical: 4, borderColor: Colors.grey }} />
          <TouchableOpacity
            disabled
            style={{ width: '20%', backgroundColor: Colors.grey, paddingHorizontal: 5, paddingVertical: 5, borderRadius: 5, justifyContent: 'center', alignItems: 'center' }}
            activeOpacity={0.8}
            onPress={() => submit()}
          >
            <Text style={{ color: Colors.DEFAULT_WHITE }}>KIRIM</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 5 }}>
          <TextInput placeholder="Masukkan Komentar" value={Comment} onChangeText={(text) => setComment(text)} style={{ width: '79%', borderWidth: 1, paddingHorizontal: 7, paddingVertical: 4, borderColor: Colors.grey }} />
          <TouchableOpacity
            style={{ width: '20%', backgroundColor: Colors.PRIMARY_PURPLE, paddingHorizontal: 5, paddingVertical: 5, borderRadius: 5, justifyContent: 'center', alignItems: 'center' }}
            activeOpacity={0.8}
            onPress={() => submit()}
          >
            <Text style={{ color: Colors.DEFAULT_WHITE }}>KIRIM</Text>
          </TouchableOpacity>
        </View>
      )} */}
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
