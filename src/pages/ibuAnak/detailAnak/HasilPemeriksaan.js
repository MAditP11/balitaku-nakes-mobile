import React, { useState } from 'react';
import { View, Text, Dimensions, StyleSheet, StatusBar, Image, TouchableOpacity, ScrollView } from 'react-native';
import { Colors, Images } from '../../../constants';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
const { height, width } = Dimensions.get('window');

const HasilPemeriksaan = ({ data }) => {
  const nav = useNavigation();

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
  console.log(data.checkup[0].aksi_penanganan[0]);

  const kidsAge = (value) => {
    const today = new Date();
    const birthDate = new Date(value);
    const age_now = today.getFullYear() - birthDate.getFullYear();
    const m = (today.getMonth() - birthDate.getMonth()) * 1;
    if (age_now === 0) {
      return `${m} Bulan`;
    } else {
      return `${age_now} Tahun ${m} Bulan`;
    }
  };

  return (
    <View style={{ backgroundColor: Colors.DEFAULT_WHITE, alignItems: 'center', marginTop: 20 }}>
      <View width={width / 1.15}>
        <View width={width / 1.15} style={{ borderWidth: 1, borderColor: Colors.grey, paddingTop: 80, alignItems: 'center', paddingBottom: 20, borderRadius: 10 }}>
          <View width={'100%'} style={{ paddingVertical: 5, alignItems: 'center', justifyContent: 'center', backgroundColor: Colors.gray, borderTopRightRadius: 7, borderTopLeftRadius: 7, position: 'absolute', top: 0 }}>
            <Text style={{ fontSize: 16, fontWeight: 'bold', color: Colors.DEFAULT_WHITE }}>{dateReport(data.checkup[0].updatedAt.substring(0, 10))}</Text>
          </View>

          {/* Button edit data anak */}
          <TouchableOpacity width={'30%'} style={{ position: 'absolute', top: 45, right: 10 }} activeOpacity={0.8} onPress={() => nav.navigate('EditDataAnak', { dataa: data })}>
            <View style={{ borderWidth: 1, borderColor: Colors.grey, paddingHorizontal: 10, paddingVertical: 5, borderRadius: 5, flexDirection: 'row', backgroundColor: Colors.info }}>
              <Text style={{ fontSize: 12 }}>Ubah Data</Text>
              <Ionicons name="create-outline" size={15} style={{ marginLeft: 5 }}></Ionicons>
            </View>
          </TouchableOpacity>

          {/* Umur */}
          <View width={width / 1.3} style={styles.containerProfile}>
            <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Umur</Text>
            <Text style={{ fontSize: 16, fontWeight: 'bold', color: Colors.grey }}>{kidsAge(data.birth_date)}</Text>
          </View>
          {/* Berat badan */}
          <View width={width / 1.3} style={styles.containerProfile}>
            <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Berat Badan</Text>
            <Text style={{ fontSize: 16, fontWeight: 'bold', color: Colors.grey }}>{data ? data.checkup[0].weight + ' kg' : '-'}</Text>
          </View>
          {/* Tinggi badan */}
          <View width={width / 1.3} style={styles.containerProfile}>
            <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Tinggi Badan</Text>
            <Text style={{ fontSize: 16, fontWeight: 'bold', color: Colors.grey }}>{data ? data.checkup[0].tall + ' cm' : '-'}</Text>
          </View>

          {/* Lingkar kepala */}
          <View width={width / 1.3} style={styles.containerProfile}>
            <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Lingkar Kepala</Text>
            <Text style={{ fontSize: 16, fontWeight: 'bold', color: Colors.grey }}>{data ? data.checkup[0].headCircumference + ' cm' : '-'}</Text>
          </View>

          {/* Lingkar lengan */}
          <View width={width / 1.3} style={styles.containerProfile}>
            <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Lingkar Lengan</Text>
            <Text style={{ fontSize: 16, fontWeight: 'bold', color: Colors.grey }}>{data ? data.checkup[0].armCircumference + ' cm' : '-'}</Text>
          </View>

          <View width={width / 1.3} style={{ flexDirection: 'column', marginBottom: 5 }}>
            <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Catatan</Text>
            <Text style={{ fontSize: 16, fontWeight: 'bold', color: Colors.grey, marginLeft: 15, textAlign: 'justify' }}>{data.checkup[0].note === null ? '-' : data.checkup[0].note}</Text>
          </View>
        </View>

        {/* Condition */}
        <View
          width={width / 1.15}
          height={height / 15}
          style={{
            borderWidth: 1,
            borderRadius: 10,
            marginTop: 10,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: data.checkup[0].status === 'normal' ? Colors.success : data.checkup[0].status === 'gejala' ? Colors.warning : Colors.danger,
          }}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            <Image source={data.checkup[0].status === 'normal' ? Images.normal : data.checkup[0].status === 'gejala' ? Images.gejala : Images.stunting} style={{ marginRight: 5, width: 15, height: 15 }}></Image>
            <Text style={{ color: Colors.DEFAULT_WHITE, fontSize: 16, textTransform: 'capitalize' }}>{data ? data.checkup[0].status : '-'}</Text>
          </View>
        </View>

        {/* Handled condition */}
        {data.checkup[0].status === 'normal' ? (
          <View></View>
        ) : data.checkup[0].aksi_penanganan[0] !== undefined ? (
          <View width={width / 1.15} height={height / 15} style={{ borderWidth: 1, borderRadius: 10, marginTop: 10, alignItems: 'center', justifyContent: 'center', backgroundColor: Colors.SECONDARY_PURPLE }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
              <Ionicons name="checkmark-circle-outline" size={18} color={Colors.DEFAULT_WHITE} style={{ marginRight: 5 }}></Ionicons>
              <Text style={{ color: Colors.DEFAULT_WHITE, fontSize: 16 }}>Ditangani</Text>
            </View>
          </View>
        ) : (
          <View></View>
        )}

        {/* Button aksi penanganan (gejala dan stunting) */}
        {data.checkup[0].status === 'normal' || data.checkup[0].aksi_penanganan[0] !== undefined ? (
          <View></View>
        ) : (
          <TouchableOpacity activeOpacity={0.8} onPress={() => nav.navigate('AksiPenanganan', { data: data.checkup[0] })} style={{ marginTop: 10 }}>
            <Text style={{ color: Colors.PRIMARY_PURPLE, textDecorationLine: 'underline', textAlign: 'center' }}>Lakukan Penanganan</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default HasilPemeriksaan;

const styles = StyleSheet.create({
  containerProfile: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 5 },
  container: { flex: 1, backgroundColor: Colors.DEFAULT_WHITE, alignItems: 'center' },
  photoProfil: { borderRadius: 100, backgroundColor: Colors.info, position: 'absolute', top: 125, left: 30, height: 100, width: 100, elevation: 1, zIndex: 1, alignItems: 'center', paddingTop: 10 },
  editProfil: { marginTop: 70, paddingVertical: 20, paddingHorizontal: 10, borderRadius: 1.5, shadowOpacity: 0.1 },
  profilCon: { marginTop: 10, paddingHorizontal: 10, flexDirection: 'column' },
  dataProfil: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 },
});
