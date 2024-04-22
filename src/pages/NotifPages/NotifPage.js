import React, { useEffect, useState, useRef } from 'react';
import { Dimensions, Animated, ScrollView, Image, StatusBar, TouchableOpacity, StyleSheet, Text, TextInput, View, Alert, Keyboard } from 'react-native';
import { Colors, Images } from '../../constants';
import TopBar from '../../components/TopBar';
const { height, width } = Dimensions.get('window');

// Laporan Penanganan, Laporan Posyandu, Profil, Aksi Penanganan, No Hp

function NotifPage({ navigation }) {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={'transparent'} translucent />
      <TopBar
        height={height / 7}
        content={
          <View style={{ marginTop: 40, height: 25, marginLeft: 10 }}>
            <Text style={{ color: Colors.DEFAULT_WHITE, fontWeight: '700', fontSize: 18 }}>Notifikasi</Text>
          </View>
        }
      />
      <View style={{ flex: 1, backgroundColor: Colors.info, paddingHorizontal: 20, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ fontSize: 22, fontWeight: 'bold', textAlign: 'center', color: Colors.grey }}>Maaf untuk saat ini fitur notifikasi belum tersedia</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.DEFAULT_WHITE,
  },
});

export default NotifPage;
