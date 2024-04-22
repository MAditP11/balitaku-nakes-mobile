import React, { useEffect, useState, useRef } from 'react';
import { Dimensions, Text, View } from 'react-native';
import { Colors } from '../../../constants';
const { height, width } = Dimensions.get('window');

function NotFoundBot() {
  return (
    <View style={{ marginVertical: 5, paddingVertical: 7, paddingHorizontal: 10, backgroundColor: Colors.PRIMARY_PURPLE, maxWidth: 250, borderRadius: 7 }}>
      <Text style={{ color: Colors.DEFAULT_WHITE }}>
        Maaf keyword tidak sesuai, untuk informasi bantuan, silahkan ketik "<Text style={{ fontWeight: 'bold' }}>Help</Text>" untuk menampilkan keyword yang tersedia
      </Text>
    </View>
  );
}

export default NotFoundBot;
