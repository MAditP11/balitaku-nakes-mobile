import React from 'react';
import { Dimensions, Text, View } from 'react-native';
import { Colors } from '../../../../constants';
const { height, width } = Dimensions.get('window');

import ImgVA from '../../../../components/ImgVA';

function DitanganiBot() {
  const [loading1, setLoading1] = React.useState(false);

  const Introduction = () => {
    setTimeout(() => {
      setLoading1(true);
    }, 1000);
  };

  const scene1 = () => {
    return (
      <View style={{ marginBottom: 5, paddingVertical: 7, paddingHorizontal: 10, backgroundColor: Colors.PRIMARY_PURPLE, maxWidth: 290, borderRadius: 7 }}>
        <View style={{ marginBottom: 5 }}>
          <Text style={{ color: Colors.DEFAULT_WHITE, fontWeight: 'bold' }}>-- Anak Yang Telah Ditangani --</Text>
        </View>

        <Text style={{ color: Colors.DEFAULT_WHITE }}>
          Setelah anak yang berstatus gejala maupun terindikasi stunting telah ditangani, maka otomatis sistem akan memberikan tanda centang (✓) dan bertuliskan "<Text style={{ fontWeight: 'bold' }}>Ditangani</Text>" pada halaman anak dan
          halaman data hasil pemeriksaan.
        </Text>

        <ImgVA source={require('../../../../images/chatbot/penanganan/ditangani2.jpeg')} width={width / 1.3} height={height / 2.4} />

        <ImgVA source={require('../../../../images/chatbot/penanganan/ditangani1.jpeg')} width={width / 1.3} height={height / 1.7} />
      </View>
    );
  };

  return (
    <View>
      {Introduction()}
      {loading1 !== false ? scene1() : null}
    </View>
  );
}

export default DitanganiBot;
