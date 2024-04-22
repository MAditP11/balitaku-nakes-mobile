import React, { useState, useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Dimensions, TouchableOpacity, Image, RefreshControl, StatusBar, StyleSheet, Text, View, ScrollView } from 'react-native';
import { deleteReport } from '../../apis/ReportPuskesmas';
import { getUser } from '../../apis/Nakes';
import axios from '../../services/Axios';
import { Colors } from '../../constants';
import TopBar from '../../components/TopBar';
import ButtonBack from '../../components/ButtonBack';
const { height, width } = Dimensions.get('window');

function DetailLaporanPenanganan({ navigation, route }) {
  const { data } = route.params;
  const [me, setMe] = useState([]);

  const getUsers = async () => {
    await AsyncStorage.getItem('token').then(async (token) => {
      await getUser(token).then((res) => {
        setMe(res.data.data);
      });
    });
  };
  useEffect(() => {
    getUsers();
  }, []);

  const getReportImage = (value) => {
    if (value) {
      let uris = axios.defaults.baseURL + '/images/report/nakes/penanganan/' + value;
      let uriss = uris.replace('api/', '');
      return (
        <Image
          style={{
            width: 280,
            height: 180,
            borderRadius: 5,
          }}
          source={{ uri: uriss }}
        />
      );
    } else {
      return <View></View>;
    }
  };

  const dateReport = (value) => {
    const dates = new Date(value);
    const monthName = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
    const dayName = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', "Jum'at", 'Sabtu'];
    const nowDate = dates.getDate();
    const monthIndex = dates.getMonth();
    const months = monthName[monthIndex];
    const year = dates.getFullYear();
    const dayNow = dayName[dates.getDay()];
    return `${dayNow}, ${nowDate} ${months} ${year}`;
  };

  const submit = async () => {
    await AsyncStorage.getItem('token').then(async (token) => {
      await deleteReport(token, data.id).then((res) => {});
    });
    navigation.goBack();
  };

  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await getUsers();
    setRefreshing(false);
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={'transparent'} translucent />
      <TopBar height={height / 7} content={<ButtonBack title={'Detail Laporan Penanganan'} />} />

      <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />} height={height * 2} width={width}>
        <View style={{ alignItems: 'center' }}>
          <View width={width / 1.1} style={styles.editProfil}>
            {/* Top content */}
            <View style={{ alignItems: 'center', borderBottomColor: Colors.grey, borderBottomWidth: 1, borderStyle: 'dashed' }}>
              <Text style={{ fontSize: 16, fontWeight: 'bold' }}>{data.name_activity}</Text>
              <Text style={{ marginBottom: 20 }}>{me.puskesmas ? 'Kec. ' + me.puskesmas.district : '-'}</Text>
            </View>
            <View style={styles.profilCon}>
              {/* Tanggal kegiatan */}
              <View style={styles.dataProfil}>
                <Text>Tanggal Kegiatan</Text>
                <Text>{dateReport(data.start_time.substring(0, 10))}</Text>
              </View>

              {/* Jadwal kegiatan */}
              <View style={styles.dataProfil}>
                <Text>Jadwal Kegiatan</Text>
                <Text>{data.start_time.substring(11, 16) + ' WIB'}</Text>
              </View>

              {/* Imunisasi */}
              <View style={styles.dataProfil}>
                <Text>Imunisasi</Text>
                <Text>-</Text>
              </View>

              {/* jumlah wanita */}
              <View style={styles.dataProfil}>
                <Text>Jumlah Balita</Text>
                <Text>{data.total_anak ? data.total_anak : '-'}</Text>
              </View>

              {/* Keterangan */}
              <View style={{ marginTop: 15 }}>
                <Text>Keterangan Kegiatan:</Text>
                <View style={{ marginLeft: 15 }}>
                  <Text style={{ textAlign: 'justify', marginTop: 5 }}>{data.ket ? data.ket : '-'}</Text>
                </View>
              </View>

              {/* Dokumentasi */}
              <View>
                <Text style={{ marginTop: 20, marginBottom: 10 }}>Dokumentasi Kegiatan</Text>
                {data.image_penanganan ? (
                  data.image_penanganan.map((item, key) => {
                    return (
                      <View style={{ marginVertical: 5 }} key={key}>
                        {getReportImage(item.uri)}
                      </View>
                    );
                  })
                ) : (
                  <Text>Belum Ada dokumentasi foto</Text>
                )}
              </View>
            </View>
          </View>

          {/* Button hapus dan ubah */}
          <View width={width / 1.15} style={{ marginVertical: 20, flexDirection: 'row', justifyContent: 'space-around' }}>
            <TouchableOpacity activeOpacity={0.8} onPress={() => submit()} style={{ borderWidth: 1, borderColor: Colors.danger, borderRadius: 10, paddingHorizontal: 45, paddingVertical: 7 }}>
              <Text style={{ fontSize: 20, color: Colors.danger, fontWeight: 'bold' }}>Hapus</Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => navigation.navigate('EditLaporanPenanganan', { dataa: data })}
              style={{ borderWidth: 1, borderColor: Colors.PRIMARY_PURPLE, borderRadius: 10, paddingHorizontal: 45, paddingVertical: 7 }}
            >
              <Text style={{ fontSize: 20, color: Colors.PRIMARY_PURPLE, fontWeight: 'bold' }}>Ubah</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

export default DetailLaporanPenanganan;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', alignItems: 'center' },
  photoProfil: { borderRadius: 100, backgroundColor: Colors.PRIMARY_PURPLE, position: 'absolute', top: 125, left: 17, zIndex: 3, height: 100, width: 100 },
  editProfil: { borderWidth: 1, borderRadius: 10, marginTop: 20, paddingVertical: 20, paddingHorizontal: 10 },
  profilCon: { marginTop: 10, paddingHorizontal: 10, flexDirection: 'column' },
  dataProfil: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 },
});
