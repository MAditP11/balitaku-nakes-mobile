import React, { useState, useEffect, useCallback } from 'react';
import axios from '../../services/Axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Dimensions, ScrollView, Image, StatusBar, TouchableOpacity, StyleSheet, Text, TextInput, View, FlatList, RefreshControl } from 'react-native';
import { Colors } from '../../constants';
import { getReport } from '../../apis/ReportPuskesmas';
import TopBar from '../../components/TopBar';
import ButtonBack from '../../components/ButtonBack';
import { Ionicons } from '@expo/vector-icons';
const { height, width } = Dimensions.get('window');

function LaporanPenanganan({ navigation }) {
  const [report, setReport] = useState([]);
  const [re, setRe] = useState([]);

  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await getReports();
    setRefreshing(false);
  }, []);

  useEffect(() => {
    getReports();
  }, []);

  const getReports = async () => {
    await AsyncStorage.getItem('token').then(async (token) => {
      await getReport(token).then((res) => {
        setReport(res.data.data);
        setRe(res.data.data);
      });
    });
  };

  const dateReport = (value) => {
    const dates = new Date(value);
    const monthName = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agust', 'Sep', 'Okt', 'Nov', 'Des'];
    const nowDate = dates.getDate();
    const monthIndex = dates.getMonth();
    const months = monthName[monthIndex];
    const year = dates.getFullYear();
    return `${nowDate} ${months} ${year}`;
  };

  const getReportImage = (value) => {
    // console.log(value);
    if (value) {
      let uris = axios.defaults.baseURL + '/images/report/nakes/penanganan/' + value;
      let uriss = uris.replace('api/', '');
      return (
        <Image
          style={{
            width: 60,
            height: 60,
            borderRadius: 10,
          }}
          source={{ uri: uriss }}
        />
      );
    } else {
      return <Ionicons name="medkit" size={30}></Ionicons>;
    }
  };

  const setFlatSearch = (key) => {
    if (key === '') {
      return setReport(re);
    } else {
      let tempReportPosyandu = [];
      report.filter((val) => {
        let name = val.name_activity;
        if (name.toLowerCase().includes(key.toLowerCase())) {
          tempReportPosyandu.push(val);
        }
      });
      setReport(tempReportPosyandu);
    }
  };

  return (
    <View style={{ flex: 1, alignItems: 'center' }}>
      <StatusBar barStyle="light-content" backgroundColor={'transparent'} translucent />
      <TopBar height={height / 7} content={<ButtonBack show={true} title={'Laporan Penanganan'} />} />

      {/* Search Container */}
      <View height={height / 17} style={{ flexDirection: 'row', borderWidth: 1, borderRadius: 10, marginBottom: 10, marginTop: 20 }}>
        <View width={width / 9} style={{ alignItems: 'center', justifyContent: 'center' }}>
          <Ionicons name="search-outline" size={24} color={Colors.grey}></Ionicons>
        </View>
        <TextInput keyboardType="default" placeholder="Cari" width={width / 1.39} onChangeText={(text) => setFlatSearch(text)} style={{ paddingHorizontal: 10, fontSize: 16 }}></TextInput>
      </View>

      {/* Button add */}
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => navigation.navigate('AddLaporanPenanganan')}
        style={{
          paddingHorizontal: 20,
          paddingVertical: 15,
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          borderWidth: 1,
          borderRadius: 10,
          zIndex: 3,
          position: 'absolute',
          right: 20,
          bottom: 100,
          backgroundColor: Colors.DEFAULT_WHITE,
        }}
      >
        <Ionicons name="create-outline" size={20}></Ionicons>
        <Text style={{ fontSize: 14, marginLeft: 5 }}>Tambah</Text>
      </TouchableOpacity>
      <View height={height * 1} style={{ alignItems: 'center' }}>
        {report[0] === undefined ? (
          <View style={{ paddingTop: 200, alignItems: 'center' }} height={height / 1.25} width={width / 1.15}>
            <Text style={{ color: Colors.gray, fontSize: 20, textAlign: 'center' }}>Maaf laporan tidak tersedia atau belum dibuat</Text>
          </View>
        ) : (
          <View height={height / 1.25} width={width / 1.15}>
            <FlatList
              data={report}
              refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
              renderItem={(item) => {
                return (
                  <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate('DetailLaporanPenanganan', { data: item.item })} style={{ flexDirection: 'row', marginVertical: 10 }}>
                    <View width={width / 7} style={{ alignItems: 'center', justifyContent: 'center', width: '20%' }}>
                      {getReportImage(item.item.image_penanganan[0].uri)}
                    </View>
                    <View style={{ flexDirection: 'column', width: '80%' }}>
                      <Text style={{ paddingHorizontal: 10, fontSize: 15, fontWeight: 'bold', height: 20, marginTop: 17 }}>{item.item.name_activity}</Text>
                      <Text style={{ paddingHorizontal: 10, fontSize: 13, height: 18 }}>{item.item.ket}</Text>
                    </View>
                    <View style={{ position: 'absolute', top: 0, right: 0 }}>
                      <Text style={{ fontSize: 12 }}>{dateReport(item.item.updatedAt.substring(0, 10))}</Text>
                    </View>
                  </TouchableOpacity>
                );
              }}
              keyExtractor={(item, index) => item.id}
            />
          </View>
        )}
      </View>
    </View>
  );
}

export default LaporanPenanganan;
