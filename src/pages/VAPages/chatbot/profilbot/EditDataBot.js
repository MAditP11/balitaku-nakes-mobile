import React from 'react';
import { Dimensions, Image, Text, View } from 'react-native';
import { Colors } from '../../../../constants';
const { height, width } = Dimensions.get('window');

import ImgVA from '../../../../components/ImgVA';

function EditDataBot({ action }) {
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
      <View style={{ marginVertical: 5, paddingVertical: 10, paddingHorizontal: 10, backgroundColor: Colors.PRIMARY_PURPLE, maxWidth: 290, borderRadius: 7 }}>
        <View style={{ marginBottom: 5 }}>
          <Text style={{ color: Colors.DEFAULT_WHITE, fontWeight: 'bold' }}>-- EDIT DATA DIRI --</Text>
        </View>

        <Text style={{ color: Colors.DEFAULT_WHITE }}>
          Anda dapat mengubah data diri seperti <Text style={{ fontWeight: 'bold' }}> nama, tanggal lahir, kecamatan, alamat rumah, nama puskesmas</Text> dan juga <Text style={{ fontWeight: 'bold' }}>alamat puskesmas</Text>. Tekan button
          pena untuk masuk ke halaman edit data diri.
        </Text>

        <ImgVA source={require('../../../../images/chatbot/profil/editdatadiri.jpeg')} width={width / 1.3} height={height / 2.55} />

        <Text style={{ color: Colors.DEFAULT_WHITE }}>
          Namun untuk mengubah data <Text style={{ fontWeight: 'bold' }}>No WA</Text> dan <Text style={{ fontWeight: 'bold' }}>NIK</Text>, anda perlu mengkonfimasi kepada kader posyandu.
        </Text>
      </View>
    );
  };

  const scene2 = () => {
    return (
      <View style={{ marginBottom: 2, paddingVertical: 7, paddingHorizontal: 10, backgroundColor: Colors.PRIMARY_PURPLE, maxWidth: 290, borderRadius: 7 }}>
        <Text style={{ color: Colors.DEFAULT_WHITE }}>
          Selain itu anda juga dapat menambahkan <Text style={{ fontWeight: 'bold' }}>foto profil</Text> dari kamera ataupun galeri perangkat handphone.
        </Text>

        <ImgVA source={require('../../../../images/chatbot/profil/potoprofil.jpeg')} width={width / 1.3} height={height / 2.55} />
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

export default EditDataBot;
