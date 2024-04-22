import React, { useState } from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../constants';

function ButtonBack({ title, show }) {
  const nav = useNavigation();

  const [info, setInfo] = useState(show);
  return (
    <View style={{ marginTop: 40, flexDirection: 'row', height: 25 }}>
      <TouchableOpacity style={{}} activeOpacity={0.8} onPress={() => nav.goBack()}>
        <Ionicons name={'arrow-back'} size={24} color="#fff" style={{ marginLeft: '3%' }} />
      </TouchableOpacity>
      <Text style={{ color: Colors.DEFAULT_WHITE, fontWeight: 'bold', fontSize: 16 }}>{title}</Text>
      {info !== false ? (
        <TouchableOpacity style={{ position: 'absolute', right: 7 }} activeOpacity={0.8} onPress={() => nav.navigate('VAPage')}>
          <View style={{}}>
            <Ionicons name="information-circle-outline" size={27} color={Colors.DEFAULT_WHITE}></Ionicons>
          </View>
        </TouchableOpacity>
      ) : null}
    </View>
  );
}

export default ButtonBack;
