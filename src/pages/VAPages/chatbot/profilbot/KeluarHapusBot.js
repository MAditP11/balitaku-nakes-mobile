import React from 'react';
import { Dimensions, Text, View } from 'react-native';
import { Colors } from '../../../../constants';
const { height, width } = Dimensions.get('window');

import ImgVA from '../../../../components/ImgVA';

function KeluarHapusBot() {
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
          <Text style={{ color: Colors.DEFAULT_WHITE, fontWeight: 'bold' }}>-- KELUAR DAN HAPUS AKUN --</Text>
        </View>

        <Text style={{ color: Colors.DEFAULT_WHITE }}>
          Pada halaman Profil juga terdapat fitur <Text style={{ fontWeight: 'bold' }}>keluar</Text> dan <Text style={{ fontWeight: 'bold' }}>hapus</Text> akun. Untuk mengaksesnya tekan button titik tiga di atas pojok kanan.
        </Text>

        <ImgVA source={require('../../../../images/chatbot/profil/keluarhapusakun.jpeg')} width={width / 1.3} height={height / 2.4} />
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

export default KeluarHapusBot;
