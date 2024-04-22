import React from 'react';
import { Dimensions, Image, View } from 'react-native';
import { Colors } from '../constants';

function ImgVA({ source, width, height }) {
  return (
    <View style={{ marginVertical: 5, paddingTop: 10, alignItems: 'center' }}>
      <Image source={source} style={{ width: width, height: height, borderRadius: 5, borderWidth: 4, borderColor: Colors.grey }} />
    </View>
  );
}

export default ImgVA;
