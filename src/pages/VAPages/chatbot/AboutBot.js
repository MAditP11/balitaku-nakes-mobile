import React from 'react';
import { Dimensions, Animated, ScrollView, Image, StatusBar, TouchableOpacity, StyleSheet, Text, TextInput, View, Alert, Keyboard } from 'react-native';
import { Colors, Images, WelcomeContent } from '../../../constants';
const { height, width } = Dimensions.get('window');

function AboutBot() {
  const [loading1, setLoading1] = React.useState(false);
  const [loading2, setLoading2] = React.useState(false);
  const [loading3, setLoading3] = React.useState(false);
  const [act, setAction] = React.useState(true);

  action = act;
  console.log(action);

  const Introduction = () => {
    setTimeout(() => {
      setLoading1(true);
      setTimeout(() => {
        setLoading2(true);
        setTimeout(() => {
          setLoading3(true);
        }, 1000);
      }, 1000);
    }, 1000);
  };

  const scene1 = () => {
    return (
      <View style={{ marginBottom: 2, paddingVertical: 7, paddingHorizontal: 10, backgroundColor: Colors.PRIMARY_PURPLE, maxWidth: 270, borderRadius: 7 }}>
        <View style={{ marginBottom: 3 }}>
          <Text style={{ color: Colors.DEFAULT_WHITE, fontWeight: 'bold' }}>-- BALITAKU NAKES MOBILE --</Text>
        </View>

        <Text style={{ color: Colors.DEFAULT_WHITE }}>
          Aplikasi Balitaku-Nakes Mobile merupakan salah satu aplikasi dari Balitaku. Aplikasi ini digunakan khusus nakes untuk menjadi media dalam memonitoring dan melakukan aksi penanganan terhadap anak-anak yang statusnya baik tergejala
          maupun terindikasi stunting di kota Medan.
        </Text>
      </View>
    );
  };

  const scene2 = () => {
    return (
      <View style={{ marginBottom: 2, paddingVertical: 7, paddingHorizontal: 10, backgroundColor: Colors.PRIMARY_PURPLE, maxWidth: 270, borderRadius: 7 }}>
        <View style={{ marginBottom: 3 }}>
          <Text style={{ color: Colors.DEFAULT_WHITE, fontWeight: 'bold' }}>-- CONTACT --</Text>
        </View>

        <Text style={{ color: Colors.DEFAULT_WHITE }}>Untuk bantuan lainnya atau informasi lebih lanjut, anda dapat menghubungi kontak di bawah ini:</Text>
        <Text style={{ color: Colors.DEFAULT_WHITE }}>No HP: 0812XXXXXXXX</Text>
        <Text style={{ color: Colors.DEFAULT_WHITE }}>No WA: 0812XXXXXXXX</Text>
        <Text style={{ color: Colors.DEFAULT_WHITE }}>Email: balitakunakes@gmail.com</Text>
      </View>
    );
  };

  //   const scene3 = () => {
  //     return (
  //       <View style={{ marginBottom: 2, paddingVertical: 7, paddingHorizontal: 10, backgroundColor: Colors.PRIMARY_PURPLE, maxWidth: 270, borderRadius: 7 }}>
  //         <View style={{ marginBottom: 3 }}>
  //           <Text style={{ color: Colors.DEFAULT_WHITE, fontWeight: 'bold' }}>-- KELUAR DAN HAPUS AKUN --</Text>
  //         </View>

  //         <Text style={{ color: Colors.DEFAULT_WHITE }}>
  //           Pada halaman Profil juga terdapat fitur <Text style={{ fontWeight: 'bold' }}>keluar</Text> dan <Text style={{ fontWeight: 'bold' }}>hapus</Text> akun. Untuk mengaksesnya tekan button titik tiga di atas kanan.
  //         </Text>
  //       </View>
  //     );
  //   };

  return (
    <View>
      {Introduction()}
      {loading1 !== false ? scene1() : null}
      {loading2 !== false ? scene2() : null}
      {/* {loading3 !== false ? scene3() : null} */}
    </View>
  );
}

export default AboutBot;
