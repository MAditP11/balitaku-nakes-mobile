import FadeInView from '../../../components/FadeInView';
const { height, width } = Dimensions.get('window');
import { Colors } from '../../../constants';
import Ibuu from './Ibu';

import * as Animatable from 'react-native-animatable';

import * as React from 'react';
import { Dimensions, View, Text, SafeAreaView, TouchableOpacity, StyleSheet } from 'react-native';

const Ibu = ({ navigation }) => {
  return (
    <FadeInView>
      <View style={{ alignItems: 'center' }}>
        <View width={width / 1.06}>
          <Ibuu />
        </View>
      </View>
    </FadeInView>
  );
};

export default Ibu;
