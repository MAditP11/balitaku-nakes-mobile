import React, { useState, useEffect, useCallback } from 'react';
import { Dimensions, TouchableOpacity, Image, ScrollView, RefreshControl, StatusBar, StyleSheet, Text, View } from 'react-native';
import { Colors, Images } from '../../constants';
import axios from '../../services/Axios';
import { getUser } from '../../apis/Nakes';
import { Ionicons } from '@expo/vector-icons';
import { getChildren } from '../../apis/Children';
import { LinearGradient } from 'expo-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
const { height, width } = Dimensions.get('window');

const HomeScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [nik, setNIK] = useState('');
  const [normal, setNormal] = useState('');
  const [gejala, setGejala] = useState('');
  const [stunting, setStunting] = useState('');
  const [photo, setPhoto] = useState('');

  useEffect(() => {
    getUserData();
    getChildrenData();
  }, []);

  const getUserData = async () => {
    await AsyncStorage.getItem('token').then(async (token) => {
      await getUser(token).then((res) => {
        setName(res.data.data.user.name);
        setNIK(res.data.data.user.nik);
        setPhoto(res.data.data.user.photos);
      });
    });
  };

  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await getUserData();
    setRefreshing(false);
  }, []);

  const getUserImage = (value) => {
    if (value) {
      let uris = axios.defaults.baseURL + '/images/users/' + value;
      let uriss = uris.replace('api/', '');
      return <Image source={{ uri: uriss }} style={styles.photoProfil} />;
    } else {
      return (
        <View style={styles.photoProfil}>
          <Ionicons name="person-outline" size={35} color={Colors.grey}></Ionicons>
        </View>
      );
    }
  };

  const getChildrenData = async () => {
    AsyncStorage.getItem('token').then((token) => {
      getChildren(token).then((res) => {
        let normal = res.data.data.normal.length;
        let gejala = res.data.data.gejala.length;
        let stunting = res.data.data.stunting.length;
        setNormal(normal);
        setGejala(gejala);
        setStunting(stunting);
      });
    });
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={'transparent'} translucent />

      {/* TopBar */}
      <View height={height / 6.5} width={width * 1.2} style={styles.profilBar}>
        {getUserImage(photo ? photo : null)}
        <View style={styles.dataProfil}>
          <Text style={{ color: Colors.DEFAULT_WHITE, fontSize: 18, fontWeight: '600', textTransform: 'capitalize' }}>{name}</Text>
          <Text style={{ color: Colors.DEFAULT_WHITE, fontSize: 12, fontWeight: '600' }}>{nik}</Text>
        </View>

        <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate('VAPage')} style={styles.info}>
          <Ionicons name="information-circle-outline" size={27} color={Colors.DEFAULT_WHITE}></Ionicons>
        </TouchableOpacity>
      </View>

      {/* Konten utama */}
      <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />} width={width} style={{ flex: 1 }}>
        <LinearGradient colors={['#473E97', '#EBF5F6']} style={{ justifyContent: 'center', alignItems: 'center' }}>
          {/* Banner */}
          <Image source={Images.banner} style={styles.bannerBar} />

          {/* Condition Card */}
          {/* <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate('GrafikDataScreen', { normal: normal, gejala: gejala, stunting: stunting })}> */}
          <View height={height / 9} width={width / 1.1} style={styles.conditionBar}>
            <View>
              <View style={{ backgroundColor: Colors.danger, alignItems: 'center', marginBottom: 5, borderRadius: 5, flexDirection: 'row', padding: 5 }}>
                <Image style={{ marginRight: 5, width: 15, height: 15 }} source={Images.stunting} />
                <Text style={{ color: Colors.DEFAULT_WHITE }}>Stunting</Text>
              </View>
              <Text style={{ textAlign: 'center', fontSize: 16, fontWeight: '400', lineHeight: 20, color: Colors.gray }}>{stunting}</Text>
            </View>
            <View>
              <View style={{ backgroundColor: Colors.warning, alignItems: 'center', marginHorizontal: 10, marginBottom: 5, borderRadius: 5, flexDirection: 'row', padding: 5 }}>
                <Image source={Images.gejala} style={{ marginRight: 5, width: 15, height: 15 }} />
                <Text style={{ color: Colors.DEFAULT_WHITE }}>Gejala</Text>
              </View>
              <Text style={{ textAlign: 'center', fontSize: 16, fontWeight: '400', lineHeight: 20, color: Colors.gray }}>{gejala}</Text>
            </View>
            <View>
              <View style={{ backgroundColor: Colors.success, alignItems: 'center', borderRadius: 5, marginBottom: 5, flexDirection: 'row', padding: 5 }}>
                <Image style={{ marginRight: 5, width: 15, height: 15 }} source={Images.normal} />
                <Text style={{ color: Colors.DEFAULT_WHITE }}>Normal</Text>
              </View>
              <Text style={{ textAlign: 'center', fontSize: 16, fontWeight: '400', lineHeight: 20, color: Colors.gray }}>{normal}</Text>
            </View>
          </View>
          {/* </TouchableOpacity> */}

          {/* Button Card */}
          <View height={height / 7} width={width / 1.25} style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            {/* Ibu dan Anak Card */}
            <View style={{ width: 75 }}>
              <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate('IbuDanAnak')} style={styles.cardButton}>
                <View style={styles.imgCard}>
                  <Image source={Images.ibuAnak} style={{ height: 60, width: 60 }} />
                </View>
              </TouchableOpacity>
              <Text style={{ textAlign: 'center', color: Colors.PRIMARY_PURPLE, fontSize: 12, fontWeight: '400', lineHeight: 15 }}>Data Ibu & Anak</Text>
            </View>

            {/* Laporan Posyandu */}
            <View style={{ width: 75 }}>
              <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate('LaporanPosyandu')} style={styles.cardButton}>
                <View style={styles.imgCard}>
                  <Image source={Images.posyandu} style={{ height: 60, width: 60 }} />
                </View>
              </TouchableOpacity>
              <Text style={{ textAlign: 'center', color: Colors.PRIMARY_PURPLE, fontSize: 12, fontWeight: '400', lineHeight: 15 }}>Laporan Posyandu</Text>
            </View>

            {/* Laporan Penanganan */}
            <View style={{ width: 75 }}>
              <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate('LaporanPenanganan')} style={styles.cardButton}>
                <View style={styles.imgCard}>
                  <Image source={Images.penanganan} style={{ height: 60, width: 60 }} />
                </View>
              </TouchableOpacity>
              <Text style={{ textAlign: 'center', color: Colors.PRIMARY_PURPLE, fontSize: 12, fontWeight: '400', lineHeight: 15 }}>Laporan Penanganan</Text>
            </View>
          </View>

          {/* Artikel Konten */}
          <View width={width / 1.06} style={{ paddingVertical: 10 }}>
            <Text style={{ marginBottom: 10, color: Colors.PRIMARY_PURPLE, fontWeight: '400', fontSize: 15, lineHeight: 19 }}>Artikel</Text>

            <View style={{ flexDirection: 'column' }}>
              {/* Artikel Card */}
              {/* <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate('ArtikelScreen')}>
                <View height={height / 8} width={width / 1.06} style={styles.logAct}>
                  <Image source={require('../../assets/images/imgArtikel.png')} style={{ width: 80, height: 60, borderRadius: 10 }} />
                  <View width={width / 2} style={{ marginHorizontal: 10, height: 60 }}>
                    <Text style={{ color: Colors.PRIMARY_PURPLE, marginBottom: 10, fontWeight: '600', fontSize: 15, lineHeight: 18 }}>Artikel 1</Text>
                    <Text style={{ fontWeight: '400', fontSize: 14, lineHeight: 18, color: '#888888' }}>Lihat info selengkapnya</Text>
                  </View>
                  <Ionicons name="chevron-forward-circle-outline" size={20} color={'#909090'}></Ionicons>
                </View>
              </TouchableOpacity> */}
              <View height={height / 6} width={width / 1.06} style={styles.logAct}>
                <Text style={{ color: Colors.grey, fontSize: 16, textAlign: 'center' }}>Untuk saat ini konten artikel belum tersedia</Text>
              </View>
            </View>
          </View>
        </LinearGradient>
      </ScrollView>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.DEFAULT_WHITE,
  },
  profilBar: { backgroundColor: '#473E97', flexDirection: 'row', paddingVertical: 50, paddingLeft: 55 },
  photoProfil: { width: 44, height: 44, backgroundColor: Colors.info, borderRadius: 100, alignItems: 'center', paddingTop: 3 },
  dataProfil: { marginLeft: 7, width: 200, height: 50, marginTop: 5 },
  info: { bottom: -15, right: -45, height: 50 },
  bannerBar: { justifyContent: 'center', alignItems: 'center', marginVertical: 10, width: width / 1.1, height: height / 3.75 },
  conditionBar: { backgroundColor: Colors.DEFAULT_WHITE, flexDirection: 'row', borderRadius: 10, padding: 10, justifyContent: 'space-around', alignItems: 'center', marginBottom: 10, elevation: 10 },
  conditionButton: { flexDirection: 'row', paddingHorizontal: 10, paddingVertical: 3 },
  cardButton: { backgroundColor: Colors.DEFAULT_WHITE, borderRadius: 5, marginBottom: 5, elevation: 5 },
  imgCard: { flexDirection: 'row', paddingHorizontal: 10, paddingVertical: 5 },
  // logAct: { backgroundColor: Colors.info, flexDirection: 'row', borderRadius: 10, paddingHorizontal: 20, alignItems: 'center', justifyContent: 'space-between', marginBottom: 10, elevation: 5 },
  logAct: { backgroundColor: Colors.info, borderRadius: 10, paddingHorizontal: 20, alignItems: 'center', justifyContent: 'center', marginBottom: 10, elevation: 5 },
});
