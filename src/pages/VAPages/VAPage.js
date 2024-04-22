import React, { useRef } from 'react';
import { Dimensions, ScrollView, StatusBar, TouchableOpacity, StyleSheet, Text, TextInput, View, Alert, Keyboard } from 'react-native';
import { Colors } from '../../constants';
import ButtonBack from '../../components/ButtonBack';
import ProfilBot from './chatbot/ProfilBot';
import AboutBot from './chatbot/AboutBot';
import HelpBot from './chatbot/HelpBot';
import NotFoundBot from './chatbot/NotFoundBot';
import LPBot from './chatbot/LPBot';
import PenangananBot from './chatbot/PenangananBot';
import HPBot from './chatbot/HPBot';
import TopBar from '../../components/TopBar';
const { height, width } = Dimensions.get('window');

function VAPage({ navigation }) {
  const scrollViewRef = useRef();

  const [text1, setText1] = React.useState(false);
  const [text2, setText2] = React.useState(false);
  const [text3, setText3] = React.useState([]);
  const [loading, setLoading] = React.useState([]);

  const [back, setBack] = React.useState(false);
  const [back1, setBack1] = React.useState(false);
  const [back2, setBack2] = React.useState(false);
  const [back3, setBack3] = React.useState(false);

  const [Comment, setComment] = React.useState([]);

  const Introduction = () => {
    setTimeout(() => {
      setText1(true);
      setTimeout(() => {
        setText2(true);
      }, 1000);
    }, 1000);
  };

  const bot1 = () => {
    return (
      <View style={{ marginTop: 5, marginBottom: 3, paddingVertical: 7, paddingHorizontal: 10, backgroundColor: Colors.PRIMARY_PURPLE, maxWidth: 270, borderRadius: 7 }}>
        <Text style={{ color: Colors.DEFAULT_WHITE }}>Selamat datang di halaman Chatbot Balitaku Nakes Mobile</Text>
      </View>
    );
  };
  const bot2 = () => {
    return (
      <View style={{ marginTop: 3, marginBottom: 5, paddingVertical: 7, paddingHorizontal: 10, backgroundColor: Colors.PRIMARY_PURPLE, maxWidth: 270, borderRadius: 7 }}>
        <Text style={{ color: Colors.DEFAULT_WHITE }}>
          Silahkan ketik keyword atau ketik "<Text style={{ fontWeight: 'bold' }}>help</Text>" jika anda perlu bantuan
        </Text>
      </View>
    );
  };

  const user1 = (i) => {
    return (
      <View style={{ width: width, alignItems: 'flex-end', paddingRight: 20 }}>
        <View style={{ marginVertical: 5, paddingVertical: 4, paddingHorizontal: 13, backgroundColor: Colors.SECONDARY_PURPLE, maxWidth: 250, borderRadius: 5 }}>
          <Text style={{ color: Colors.DEFAULT_WHITE }}>{text3[i].toLowerCase()}</Text>
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
      if (Comment.toLowerCase() === 'laporan' || Comment.toLowerCase() === 'lp') {
        setBack(true);
        setBack1(false);
        setBack2(false);
        setBack3(false);
      } else if (Comment.toLowerCase() === 'profil' || Comment.toLowerCase() === 'pro') {
        setBack1(true);
        setBack(false);
        setBack2(false);
        setBack3(false);
      } else if (Comment.toLowerCase() === 'penanganan' || Comment.toLowerCase() === 'pen') {
        setBack2(true);
        setBack(false);
        setBack1(false);
        setBack3(false);
      } else if (Comment.toLowerCase() === 'hp' || Comment.toLowerCase() === 'hasil' || Comment.toLowerCase() === 'pemeriksaan') {
        setBack3(true);
        setBack(false);
        setBack1(false);
        setBack2(false);
      } else {
        setBack(false);
        setBack1(false);
        setBack2(false);
        setBack3(false);
      }
      setComment('....');
      Keyboard.dismiss();
      setTimeout(() => {
        loading.push('true');
        setComment('');
      }, 2000);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={'transparent'} translucent />
      <TopBar height={height / 7} content={<ButtonBack title={'Virtual Asisten'} show={false} />} />
      <ScrollView height={height} width={width} ref={scrollViewRef} onContentSizeChange={() => scrollViewRef.current.scrollToEnd({ animated: true })} style={styles.scrollCon}>
        <View style={{ flex: 1, paddingHorizontal: 10 }}>
          {Introduction()}
          {text1 !== false ? bot1() : null}
          {text2 !== false ? bot2() : null}
          {text3[0] !== undefined ? user1(0) : null}
          {text3[0] === 'help' && loading[0] !== undefined ? (
            <HelpBot />
          ) : (text3[0] === 'laporan' || text3[0] === 'lp') && loading[0] !== undefined ? (
            <LPBot disabled={!back} />
          ) : (text3[0] === 'penanganan' || text3[0] === 'pen') && loading[0] !== undefined ? (
            <PenangananBot disabled={!back2} />
          ) : (text3[0] === 'hp' || text3[0] === 'hasil' || text3[0] === 'pemeriksaan') && loading[0] !== undefined ? (
            <HPBot disabled={!back3} />
          ) : (text3[0] === 'profil' || text3[0] === 'pro') && loading[0] !== undefined ? (
            <ProfilBot disabled={!back1} />
          ) : (text3[0] === 'about' || text3[0] === 'tentang') && loading[0] !== undefined ? (
            <AboutBot />
          ) : text3[0] !== undefined && loading[0] !== undefined ? (
            <NotFoundBot />
          ) : null}

          {text3[1] !== undefined ? user1(1) : null}
          {text3[1] === 'help' && loading[1] !== undefined ? (
            <HelpBot />
          ) : (text3[1] === 'laporan' || text3[1] === 'lp') && loading[1] !== undefined ? (
            <LPBot disabled={!back} />
          ) : (text3[1] === 'penanganan' || text3[1] === 'pen') && loading[1] !== undefined ? (
            <PenangananBot disabled={!back2} />
          ) : (text3[1] === 'hp' || text3[1] === 'hasil' || text3[1] === 'pemeriksaan') && loading[1] !== undefined ? (
            <HPBot disabled={!back3} />
          ) : (text3[1] === 'profil' || text3[1] === 'pro') && loading[1] !== undefined ? (
            <ProfilBot disabled={!back1} />
          ) : (text3[1] === 'about' || text3[1] === 'tentang') && loading[1] !== undefined ? (
            <AboutBot />
          ) : text3[1] !== undefined && loading[1] !== undefined ? (
            <NotFoundBot />
          ) : null}

          {text3[2] !== undefined ? user1(2) : null}
          {text3[2] === 'help' && loading[2] !== undefined ? (
            <HelpBot />
          ) : (text3[2] === 'laporan' || text3[2] === 'lp') && loading[2] !== undefined ? (
            <LPBot disabled={!back} />
          ) : (text3[2] === 'penanganan' || text3[2] === 'pen') && loading[2] !== undefined ? (
            <PenangananBot disabled={!back2} />
          ) : (text3[2] === 'hp' || text3[2] === 'hasil' || text3[2] === 'pemeriksaan') && loading[2] !== undefined ? (
            <HPBot disabled={!back3} />
          ) : (text3[2] === 'profil' || text3[2] === 'pro') && loading[2] !== undefined ? (
            <ProfilBot disabled={!back1} />
          ) : (text3[2] === 'about' || text3[2] === 'tentang') && loading[2] !== undefined ? (
            <AboutBot />
          ) : text3[2] !== undefined && loading[2] !== undefined ? (
            <NotFoundBot />
          ) : null}

          {text3[3] !== undefined ? user1(3) : null}
          {text3[3] === 'help' && loading[3] !== undefined ? (
            <HelpBot />
          ) : (text3[3] === 'laporan' || text3[3] === 'lp') && loading[3] !== undefined ? (
            <LPBot disabled={!back} />
          ) : (text3[3] === 'penanganan' || text3[3] === 'pen') && loading[3] !== undefined ? (
            <PenangananBot disabled={!back2} />
          ) : (text3[3] === 'hp' || text3[3] === 'hasil' || text3[3] === 'pemeriksaan') && loading[3] !== undefined ? (
            <HPBot disabled={!back3} />
          ) : (text3[3] === 'profil' || text3[3] === 'pro') && loading[3] !== undefined ? (
            <ProfilBot disabled={!back1} />
          ) : (text3[3] === 'about' || text3[3] === 'tentang') && loading[3] !== undefined ? (
            <AboutBot />
          ) : text3[3] !== undefined && loading[3] !== undefined ? (
            <NotFoundBot />
          ) : null}

          {text3[4] !== undefined ? user1(4) : null}
          {text3[4] === 'help' && loading[4] !== undefined ? (
            <HelpBot />
          ) : (text3[4] === 'laporan' || text3[4] === 'lp') && loading[4] !== undefined ? (
            <LPBot disabled={!back} />
          ) : (text3[4] === 'penanganan' || text3[4] === 'pen') && loading[4] !== undefined ? (
            <PenangananBot disabled={!back2} />
          ) : (text3[4] === 'hp' || text3[4] === 'hasil' || text3[4] === 'pemeriksaan') && loading[4] !== undefined ? (
            <HPBot disabled={!back3} />
          ) : (text3[4] === 'profil' || text3[4] === 'pro') && loading[4] !== undefined ? (
            <ProfilBot disabled={!back1} />
          ) : (text3[4] === 'about' || text3[4] === 'tentang') && loading[4] !== undefined ? (
            <AboutBot />
          ) : text3[4] !== undefined && loading[4] !== undefined ? (
            <NotFoundBot />
          ) : null}

          {text3[5] !== undefined ? user1(5) : null}
          {text3[5] === 'help' && loading[5] !== undefined ? (
            <HelpBot />
          ) : (text3[5] === 'laporan' || text3[5] === 'lp') && loading[5] !== undefined ? (
            <LPBot disabled={!back} />
          ) : (text3[5] === 'penanganan' || text3[5] === 'pen') && loading[5] !== undefined ? (
            <PenangananBot disabled={!back2} />
          ) : (text3[5] === 'hp' || text3[5] === 'hasil' || text3[5] === 'pemeriksaan') && loading[5] !== undefined ? (
            <HPBot disabled={!back3} />
          ) : (text3[5] === 'profil' || text3[5] === 'pro') && loading[5] !== undefined ? (
            <ProfilBot disabled={!back1} />
          ) : (text3[5] === 'about' || text3[5] === 'tentang') && loading[5] !== undefined ? (
            <AboutBot />
          ) : text3[5] !== undefined && loading[5] !== undefined ? (
            <NotFoundBot />
          ) : null}

          {text3[6] !== undefined ? user1(6) : null}
          {text3[6] === 'help' && loading[6] !== undefined ? (
            <HelpBot />
          ) : (text3[6] === 'laporan' || text3[6] === 'lp') && loading[6] !== undefined ? (
            <LPBot disabled={!back} />
          ) : (text3[6] === 'penanganan' || text3[6] === 'pen') && loading[6] !== undefined ? (
            <PenangananBot disabled={!back2} />
          ) : (text3[6] === 'hp' || text3[6] === 'hasil' || text3[6] === 'pemeriksaan') && loading[6] !== undefined ? (
            <HPBot disabled={!back3} />
          ) : (text3[6] === 'profil' || text3[6] === 'pro') && loading[6] !== undefined ? (
            <ProfilBot disabled={!back1} />
          ) : (text3[6] === 'about' || text3[6] === 'tentang') && loading[6] !== undefined ? (
            <AboutBot />
          ) : text3[6] !== undefined && loading[6] !== undefined ? (
            <NotFoundBot />
          ) : null}
        </View>
      </ScrollView>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 5, marginBottom: 7 }}>
        <TextInput placeholder="Masukkan Komentar" value={Comment} onChangeText={(text) => setComment(text)} style={{ width: '79%', borderWidth: 1, paddingHorizontal: 7, paddingVertical: 4, borderColor: Colors.grey, borderRadius: 10 }} />
        <TouchableOpacity
          style={{ width: '20%', backgroundColor: Colors.PRIMARY_PURPLE, paddingHorizontal: 5, paddingVertical: 5, borderRadius: 10, justifyContent: 'center', alignItems: 'center' }}
          activeOpacity={0.8}
          onPress={() => submit()}
        >
          <Text style={{ color: Colors.DEFAULT_WHITE }}>KIRIM</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.DEFAULT_WHITE,
  },
});

export default VAPage;
