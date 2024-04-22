import React from 'react';
import { Dimensions, Image, Text, View } from 'react-native';
import { Colors } from '../../../../constants';
const { height, width } = Dimensions.get('window');

import ImgVA from '../../../../components/ImgVA';

function EditHPBot() {
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
          <Text style={{ color: Colors.DEFAULT_WHITE, fontWeight: 'bold' }}>-- EDIT HASIL PEMERIKSAAN --</Text>
        </View>

        <Text style={{ color: Colors.DEFAULT_WHITE }}>
          Pada halaman data hasil pemeriksaan, untuk mengedit data hasil pemeriksaan, anda dapat menekan button "<Text style={{ fontWeight: 'bold' }}>Edit Data</Text>".
        </Text>

        <ImgVA source={require('../../../../images/chatbot/hp/edithp.jpeg')} width={width / 1.3} height={height / 2.55} />

        <Text style={{ color: Colors.DEFAULT_WHITE }}>
          Setelah anda mengedit data pada form, anda perlu menekan button "<Text style={{ fontWeight: 'bold' }}>Simpan</Text>" untuk menyimpan perubahan data.
        </Text>
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

export default EditHPBot;
