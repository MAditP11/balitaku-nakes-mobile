import React from 'react';
import { Dimensions, Image, Text, View } from 'react-native';
import { Colors } from '../../../../constants';
const { height, width } = Dimensions.get('window');

import ImgVA from '../../../../components/ImgVA';

function LPos2Bot() {
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
      <View style={{ marginVertical: 5, paddingVertical: 7, paddingHorizontal: 10, backgroundColor: Colors.PRIMARY_PURPLE, maxWidth: 290, borderRadius: 7 }}>
        <View style={{ marginBottom: 5 }}>
          <Text style={{ color: Colors.DEFAULT_WHITE, fontWeight: 'bold' }}>-- BUAT, EDIT, DAN HAPUS LAPORAN POSYANDU --</Text>
        </View>

        <Text style={{ color: Colors.DEFAULT_WHITE }}>
          Pada awal halaman laporan posyandu akan menampilkan seluruh list laporan yang telah dibuat oleh semua nakes, anda dapat membuat laporan yang baru dengan menekan button "<Text style={{ fontWeight: 'bold' }}>Tambah</Text>". Semua
          form wajib di isi secara lengkap.
        </Text>

        <ImgVA source={require('../../../../images/chatbot/lpos/buatlp.jpeg')} width={width / 1.3} height={height / 1.6} />
      </View>
    );
  };

  const scene2 = () => {
    return (
      <View style={{ marginBottom: 5, paddingVertical: 7, paddingHorizontal: 10, backgroundColor: Colors.PRIMARY_PURPLE, maxWidth: 290, borderRadius: 7 }}>
        <Text style={{ color: Colors.DEFAULT_WHITE }}>
          Selain itu anda dapat melihat detail laporan posyandu yang anda buat maupun nakes lain dengan menekan salah satu card laporan posyandu. Anda dapat menghapus ataupun mengedit data laporan yang sebelumnya telah dibuat.
        </Text>

        <ImgVA source={require('../../../../images/chatbot/lpos/ubahhapuslp.jpeg')} width={width / 1.3} height={height / 2.4} />
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

export default LPos2Bot;
