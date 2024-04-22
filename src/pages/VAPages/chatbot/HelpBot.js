import React, { useEffect, useState, useRef } from 'react';
import { Dimensions, Text, View } from 'react-native';
import { Colors } from '../../../constants';
const { height, width } = Dimensions.get('window');

function HelpBot() {
  return (
    <View style={{ marginVertical: 5, paddingVertical: 7, paddingHorizontal: 10, backgroundColor: Colors.PRIMARY_PURPLE, maxWidth: 270, borderRadius: 7 }}>
      <View style={{ marginBottom: 7 }}>
        <Text style={{ color: Colors.DEFAULT_WHITE, fontWeight: 'bold' }}>Masukkan salah satu keyword berikut ini:</Text>
      </View>

      <View style={{ marginVertical: 5, paddingVertical: 5, paddingHorizontal: 5, borderColor: Colors.DEFAULT_WHITE, borderRadius: 5, borderWidth: 1 }}>
        <Text style={{ color: Colors.DEFAULT_WHITE }}>
          "<Text style={{ fontWeight: 'bold' }}>profil</Text>" / "<Text style={{ fontWeight: 'bold' }}>pro</Text>" - untuk menampilkan informasi terkait profil atau data diri user
        </Text>
      </View>
      <View style={{ marginVertical: 5, paddingVertical: 5, paddingHorizontal: 5, borderColor: Colors.DEFAULT_WHITE, borderRadius: 5, borderWidth: 1 }}>
        <Text style={{ color: Colors.DEFAULT_WHITE }}>
          "<Text style={{ fontWeight: 'bold' }}>about</Text>" / "<Text style={{ fontWeight: 'bold' }}>tentang</Text>" - untuk menampilkan informasi umum terkait aplikasi balitaku-nakes mobile
        </Text>
      </View>
      <View style={{ marginTop: 10, marginBottom: 5, paddingVertical: 5, paddingHorizontal: 5, borderColor: Colors.DEFAULT_WHITE, borderRadius: 5, borderWidth: 1 }}>
        <Text style={{ color: Colors.DEFAULT_WHITE }}>
          "<Text style={{ fontWeight: 'bold' }}>laporan</Text>" / "<Text style={{ fontWeight: 'bold' }}>lp</Text>" - untuk menampilkan informasi terkait laporan posyandu dan laporan penanganan
        </Text>
      </View>
      <View style={{ marginTop: 10, marginBottom: 5, paddingVertical: 5, paddingHorizontal: 5, borderColor: Colors.DEFAULT_WHITE, borderRadius: 5, borderWidth: 1 }}>
        <Text style={{ color: Colors.DEFAULT_WHITE }}>
          "<Text style={{ fontWeight: 'bold' }}>hasil</Text>" / "<Text style={{ fontWeight: 'bold' }}>pemeriksaan</Text>" / "<Text style={{ fontWeight: 'bold' }}>hp</Text>" - untuk menampilkan informasi terkait data hasil pemeriksaan
        </Text>
      </View>
      <View style={{ marginTop: 10, marginBottom: 5, paddingVertical: 5, paddingHorizontal: 5, borderColor: Colors.DEFAULT_WHITE, borderRadius: 5, borderWidth: 1 }}>
        <Text style={{ color: Colors.DEFAULT_WHITE }}>
          "<Text style={{ fontWeight: 'bold' }}>penanganan</Text>" / "<Text style={{ fontWeight: 'bold' }}>pen</Text>" - untuk menampilkan informasi terkait aksi penanganan
        </Text>
      </View>
    </View>
  );
}

export default HelpBot;
