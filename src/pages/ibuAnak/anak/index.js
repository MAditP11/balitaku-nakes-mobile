import FadeInView from '../../../components/FadeInView';
const { height, width } = Dimensions.get('window');

import * as Animatable from 'react-native-animatable';

import * as React from 'react';
import { Dimensions, View, Text, SafeAreaView, TouchableOpacity, StyleSheet } from 'react-native';
import Anakk from './Anak';

const Anak = ({ navigation }) => {
  return (
    <FadeInView>
      <Anakk />
    </FadeInView>
  );
};

export default Anak;
