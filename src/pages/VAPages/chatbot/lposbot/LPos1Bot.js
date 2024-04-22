import React from 'react';
import { Dimensions, Image, Text, View } from 'react-native';
import { Colors } from '../../../../constants';
const { height, width } = Dimensions.get('window');

import ImgVA from '../../../../components/ImgVA';

function LPos1Bot() {
  const [loading1, setLoading1] = React.useState(false);

  const Introduction = () => {
    setTimeout(() => {
      setLoading1(true);
    }, 1000);
  };

  const scene1 = () => {
    return (
      <View style={{ marginVertical: 5, paddingVertical: 7, paddingHorizontal: 10, backgroundColor: Colors.PRIMARY_PURPLE, maxWidth: 290, borderRadius: 7 }}>
        <View style={{ marginBottom: 5 }}>
          <Text style={{ color: Colors.DEFAULT_WHITE, fontWeight: 'bold' }}>-- AKSES LAPORAN POSYANDU --</Text>
        </View>

        <Text style={{ color: Colors.DEFAULT_WHITE }}>
          Untuk mengakses halaman laporan posyandu, anda dapat menekan button "<Text style={{ fontWeight: 'bold' }}>Laporan Posyandu</Text>".
        </Text>

        <ImgVA source={require('../../../../images/chatbot/lpos/akses.jpeg')} width={width / 1.3} height={height / 2.55} />
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

export default LPos1Bot;
