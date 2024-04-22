import React, { useState } from 'react';
import { View, Text, Dimensions, StyleSheet, StatusBar, Image, TouchableOpacity, ScrollView } from 'react-native';
import { Colors } from '../../../constants';
import { Ionicons } from '@expo/vector-icons';
const { height, width } = Dimensions.get('window');

const DataAnak = ({ data }) => {
  const dateReport = (value) => {
    const dates = new Date(value);
    const monthName = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
    const nowDate = dates.getDate();
    const monthIndex = dates.getMonth();
    const months = monthName[monthIndex];
    const year = dates.getFullYear();
    return `${nowDate} ${months} ${year}`;
  };
  return (
    <View style={{ alignItems: 'center', backgroundColor: Colors.DEFAULT_WHITE, marginTop: 20 }}>
      {/* Image anak */}
      <Image source={require('../../../images/imgArtikel.png')} style={{ position: 'absolute', width: 100, height: 100, borderRadius: 100, backgroundColor: 'blue', top: 10, zIndex: 3 }}></Image>
      <View width={width} style={{ flex: 1, marginTop: 70, alignItems: 'center' }}>
        <View width={width / 1.15} style={{ borderWidth: 1, borderColor: Colors.grey, paddingTop: 50, paddingBottom: 10, alignItems: 'center', borderRadius: 10 }}>
          {/* Nama */}
          <View width={width / 1.3} style={styles.containerProfile}>
            <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Nama Lengkap</Text>
            <Text style={{ fontSize: 16, fontWeight: 'bold', color: Colors.grey }}>{data ? data.name : '-'}</Text>
          </View>

          {/* Tempat lahir */}
          <View width={width / 1.3} style={styles.containerProfile}>
            <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Tempat Lahir</Text>
            <Text style={{ fontSize: 16, fontWeight: 'bold', color: Colors.grey }}>{data ? data.born_place : '-'}</Text>
          </View>

          {/* Tanggal lahir */}
          <View width={width / 1.3} style={styles.containerProfile}>
            <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Tanggal Lahir</Text>
            <Text style={{ fontSize: 16, fontWeight: 'bold', color: Colors.grey }}>{data ? dateReport(data.birth_date.substring(0, 10)) : '-'}</Text>
          </View>

          {/* Jenis kelamin */}
          <View width={width / 1.3} style={styles.containerProfile}>
            <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Jenis Kelamin</Text>
            <Text style={{ fontSize: 16, fontWeight: 'bold', color: Colors.grey }}>{data ? data.sex : '-'}</Text>
          </View>

          {/* Anak ke */}
          <View width={width / 1.3} style={styles.containerProfile}>
            <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Anak ke</Text>
            <Text style={{ fontSize: 16, fontWeight: 'bold', color: Colors.grey }}>{data ? data.born_place : '-'}</Text>
          </View>

          {/* Nama ayah */}
          <View width={width / 1.3} style={styles.containerProfile}>
            <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Nama Ayah</Text>
            <Text style={{ fontSize: 16, fontWeight: 'bold', color: Colors.grey }}>-</Text>
          </View>

          {/* Nama ibu */}
          <View width={width / 1.3} style={styles.containerProfile}>
            <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Nama Ibu</Text>
            <Text style={{ fontSize: 16, fontWeight: 'bold', color: Colors.grey, textTransform: 'capitalize' }}>{data ? data.user.name : '-'}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default DataAnak;

const styles = StyleSheet.create({
  containerProfile: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 5 },
  container: { flex: 1, backgroundColor: Colors.DEFAULT_WHITE, alignItems: 'center' },
  photoProfil: { borderRadius: 100, backgroundColor: Colors.info, position: 'absolute', top: 125, left: 30, height: 100, width: 100, elevation: 1, zIndex: 1, alignItems: 'center', paddingTop: 10 },
  editProfil: { marginTop: 70, paddingVertical: 20, paddingHorizontal: 10, borderRadius: 1.5, shadowOpacity: 0.1 },
  profilCon: { marginTop: 10, paddingHorizontal: 10, flexDirection: 'column' },
  dataProfil: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 },
});
