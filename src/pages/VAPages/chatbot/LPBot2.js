import React from 'react';
import { Dimensions, Animated, ScrollView, Image, StatusBar, TouchableOpacity, StyleSheet, Text, TextInput, View, Alert, Keyboard } from 'react-native';
import { Colors, Images, WelcomeContent } from '../../../constants';
const { height, width } = Dimensions.get('window');

function LPBot() {
  const [loading1, setLoading1] = React.useState(false);
  const [loading2, setLoading2] = React.useState(false);
  const [text2, setText2] = React.useState([]);
  const [text3, setText3] = React.useState([]);

  const Introduction = () => {
    setTimeout(() => {
      setLoading1(true);
      setTimeout(() => {
        setLoading2(true);
      }, 1000);
    }, 1000);
  };

  const scene2 = () => {
    return (
      <View style={{ marginBottom: 2, justifyContent: 'center', alignItems: 'center', borderColor: Colors.PRIMARY_PURPLE, borderWidth: 2, maxWidth: 270, borderRadius: 7 }}>
        <Image source={require('../../../images/ex.jpeg')} style={{ width: width / 1.5, height: height / 1.5, borderRadius: 10 }} />
      </View>
    );
  };

  const scene3 = () => {
    return (
      <View style={{ marginBottom: 2, paddingVertical: 7, paddingHorizontal: 10, backgroundColor: Colors.PRIMARY_PURPLE, maxWidth: 270, borderRadius: 7 }}>
        <Text style={{ color: Colors.DEFAULT_WHITE }}>Terima Kasih</Text>
      </View>
    );
  };

  return (
    <View>
      <View style={{ marginVertical: 5, paddingVertical: 7, paddingHorizontal: 10, backgroundColor: Colors.PRIMARY_PURPLE, maxWidth: 270, borderRadius: 7 }}>
        <Text style={{ color: Colors.DEFAULT_WHITE }}>LP</Text>
      </View>
      {Introduction()}
      {loading1 !== false ? scene2() : null}
      {loading2 !== false ? scene3() : null}
    </View>
  );
}

export default LPBot;
