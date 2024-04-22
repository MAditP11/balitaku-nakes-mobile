import React from 'react';
import { Dimensions, Image, Text, View } from 'react-native';
import { Colors } from '../../../../constants';
const { height, width } = Dimensions.get('window');

import ImgVA from '../../../../components/ImgVA';

function AksesHPBot() {
  const [loading1, setLoading1] = React.useState(false);
  const [loading2, setLoading2] = React.useState(false);

  const Introduction = () => {
    setTimeout(() => {
      setLoading1(true);
      setTimeout(() => {
        setLoading2(true);
      }, 1000);
    }, 1000);
  };

  const scene1 = () => {
    return (
      <View style={{ marginBottom: 5, paddingVertical: 7, paddingHorizontal: 10, backgroundColor: Colors.PRIMARY_PURPLE, maxWidth: 290, borderRadius: 7 }}>
        <View style={{ marginBottom: 5 }}>
          <Text style={{ color: Colors.DEFAULT_WHITE, fontWeight: 'bold' }}>-- AKSES HALAMAN HASIL PEMERIKSAAN --</Text>
        </View>

        <Text style={{ color: Colors.DEFAULT_WHITE }}>
          Untuk mengakses halaman Hasil Pemeriksaan, pada halaman dashboard tekan button "<Text style={{ fontWeight: 'bold' }}>Data Ibu & Anak</Text>".
        </Text>

        <ImgVA source={require('../../../../images/chatbot/hp/akses1.jpeg')} width={width / 1.3} height={height / 2.55} />

        <Text style={{ color: Colors.DEFAULT_WHITE, marginTop: 20 }}>
          Kemudian tekan button navigasi "<Text style={{ fontWeight: 'bold' }}>Anak</Text>".
        </Text>

        <ImgVA source={require('../../../../images/chatbot/hp/akses2.jpeg')} width={width / 1.3} height={height / 2.55} />
      </View>
    );
  };

  const scene2 = () => {
    return (
      <View style={{ marginBottom: 5, paddingVertical: 7, paddingHorizontal: 10, backgroundColor: Colors.PRIMARY_PURPLE, maxWidth: 290, borderRadius: 7 }}>
        <Text style={{ color: Colors.DEFAULT_WHITE }}>
          Pada halaman tersebut akan menampilkan list nama anak-anak berdasarkan statusnya yaitu <Text style={{ fontWeight: 'bold' }}>Normal, Gejala (tergejala stunting), dan Stunting (terindikasi stunting)</Text>. Tekan salah satu nama
          anak untuk menampilkan detail datanya. Pada halaman detail tersebut, tekan button navigasi "<Text style={{ fontWeight: 'bold' }}>Hasil Pemeriksaan</Text>".
        </Text>

        <ImgVA source={require('../../../../images/chatbot/hp/akses3.jpeg')} width={width / 1.3} height={height / 2.3} />

        <Text style={{ color: Colors.DEFAULT_WHITE, marginTop: 20 }}>
          Pada halaman detail tersebut, tekan button navigasi "<Text style={{ fontWeight: 'bold' }}>Hasil Pemeriksaan</Text>".
        </Text>

        <ImgVA source={require('../../../../images/chatbot/hp/akses4.jpeg')} width={width / 1.3} height={height / 2.3} />
      </View>
    );
  };

  return (
    <View>
      {Introduction()}
      {loading1 !== false ? scene1() : null}
      {loading2 !== false ? scene2() : null}
    </View>
  );
}

export default AksesHPBot;
