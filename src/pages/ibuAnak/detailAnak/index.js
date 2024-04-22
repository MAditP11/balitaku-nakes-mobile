import React, { useState } from 'react';
import TopBar from '../../../components/TopBar';
import ButtonBack from '../../../components/ButtonBack';
import { View, Text, Dimensions, StyleSheet, StatusBar, Image, TouchableOpacity, SafeAreaView } from 'react-native';
import { Colors, Images } from '../../../constants';

import { Ionicons } from '@expo/vector-icons';
import axios from '../../../services/Axios';
const { height, width } = Dimensions.get('window');

import DataAnak from './DataAnak';
import HasilPemeriksaan from './HasilPemeriksaan';

const listTab = [
  {
    status: 'Data Anak',
    id: 1,
  },
  {
    status: 'Hasil Pemeriksaan',
    id: 2,
  },
];

const DetailAnak = ({ route }) => {
  const [status, setStatus] = React.useState('Data Anak');
  const setStatusFilter = (status) => {
    setStatus(status);
  };
  const { data } = route.params;
  const [photo, setPhoto] = useState('');

  const getUserImage = (value) => {
    if (value) {
      let uris = axios.defaults.baseURL + '/images/users/' + value;
      let uriss = uris.replace('api/', '');
      return <Image source={{ uri: uriss }} style={{ width: 44, height: 44, borderRadius: 100, borderWidth: 1, marginRight: 15 }} />;
    } else {
      return (
        <View style={{ width: 44, height: 44, borderRadius: 100, backgroundColor: Colors.info, marginRight: 15, alignItems: 'center', justifyContent: 'center' }}>
          <Ionicons name="person-outline" size={35} color={Colors.grey}></Ionicons>
        </View>
      );
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={'transparent'} translucent />
      <View height={height / 3.25} style={{ alignItems: 'center', backgroundColor: Colors.DEFAULT_WHITE }}>
        <TopBar height={height / 7} content={<ButtonBack title={'Data Ibu dan Anak'} />} />
        <View style={{ marginTop: 30, alignItems: 'center' }}>
          <View style={{ flexDirection: 'column' }}>
            <View width={width / 1.15} style={{ flexDirection: 'row', alignItems: 'center', marginHorizontal: 15 }}>
              {getUserImage(data ? data.user.photos : null)}
              <Text style={{ fontSize: 18, fontWeight: 'bold', textTransform: 'capitalize' }}>{data.user.name}</Text>
            </View>
            <View width={width / 1.15} style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 15, marginHorizontal: 15 }}>
              <Text style={{ fontSize: 14 }}>Data dari</Text>
              <Image style={{ height: 20, width: 20, marginHorizontal: 5 }} source={data.sex === 'laki-laki' ? Images.laki_laki : data.sex === 'perempuan' ? Images.perempuan : null}></Image>
              <Text style={{ fontSize: 14, fontWeight: 'bold', textTransform: 'capitalize' }}>{data.name}</Text>
            </View>
          </View>
        </View>
        <View style={{ alignItems: 'center' }}>
          <View width={width / 1.06} style={styles.conView}>
            {listTab.map((e) => (
              <TouchableOpacity key={e.id} style={[styles.btnTab, status === e.status && styles.btnActive]} onPress={() => setStatusFilter(e.status)}>
                <Text style={[styles.btnText, status === e.status && styles.btnTextActive]}>{e.status}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
        {status === 'Data Anak' ? <DataAnak data={data} /> : status === 'Hasil Pemeriksaan' ? <HasilPemeriksaan data={data} /> : null}
      </View>
    </SafeAreaView>
  );
};

export default DetailAnak;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.DEFAULT_WHITE,
  },
  conView: {
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  btnTab: {
    width: width / 2.15,
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 5,
  },
  btnText: {
    fontSize: 16,
    textAlign: 'center',
    textTransform: 'capitalize',
  },
  btnActive: {
    borderColor: Colors.PRIMARY_PURPLE,
    borderBottomWidth: 1,
  },
  btnTextActive: {
    fontWeight: 'bold',
  },
  titleText: {
    fontSize: 14,
    lineHeight: 24,
    fontWeight: 'bold',
  },
  box: {
    height: 150,
    width: 150,
    backgroundColor: 'blue',
    borderRadius: 5,
  },
});
