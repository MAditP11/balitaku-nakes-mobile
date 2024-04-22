import React from 'react';
import { Dimensions, Text, View } from 'react-native';
import { Colors } from '../../../../constants';
const { height, width } = Dimensions.get('window');

import ImgVA from '../../../../components/ImgVA';

function AksesProfilBot() {
  const [loading1, setLoading1] = React.useState(false);

  const Introduction = () => {
    setTimeout(() => {
      setLoading1(true);
    }, 1000);
  };

  const scene1 = () => {
    return (
      <View style={{ marginBottom: 2, marginTop: 5, paddingVertical: 7, paddingHorizontal: 10, backgroundColor: Colors.PRIMARY_PURPLE, maxWidth: 290, borderRadius: 7 }}>
        <View style={{ marginBottom: 3 }}>
          <Text style={{ color: Colors.DEFAULT_WHITE, fontWeight: 'bold' }}>-- AKSES PROFILE PAGE --</Text>
        </View>

        <Text style={{ color: Colors.DEFAULT_WHITE }}>
          Setiap nakes yang telah terdaftar dalam aplikasi balitaku-nakes mobile akan memiliki data diri yang terdapat pada halaman profil. Untuk mengakses halaman profil, tekan button navigasi dengan nama{' '}
          <Text style={{ fontWeight: 'bold' }}>'Profil'</Text>.
        </Text>

        <ImgVA source={require('../../../../images/chatbot/profil/akses.jpeg')} width={width / 1.3} height={height / 2.55} />
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

export default AksesProfilBot;
