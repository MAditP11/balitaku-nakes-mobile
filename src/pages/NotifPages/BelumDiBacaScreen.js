import React from 'react';
import { Dimensions, ScrollView, StatusBar, StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { Colors, Images, WelcomeContent } from '../../constants';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { LineChart } from 'react-native-chart-kit';
const { height, width } = Dimensions.get('window');

const BelumDibacaScreen = ({ navigation }) => {
  const nav = useNavigation();
  return (
    <View style={{ flex: 1, alignItems: 'center', backgroundColor: Colors.DEFAULT_WHITE }}>
      <ScrollView width={width} style={{ flex: 1 }}>
        <View style={{ alignItems: 'center' }}>
          <View height={height / 3} style={{ marginTop: 30, width: '100%', alignItems: 'center' }}>
            <View style={{ flexDirection: 'column' }}>
              <TouchableOpacity activeOpacity={0.8} onPress={() => nav.navigate('ArtikelScreen')}>
                <View
                  height={height / 8}
                  width={width / 1.06}
                  style={{ backgroundColor: Colors.DEFAULT_WHITE, flexDirection: 'row', borderRadius: 10, paddingHorizontal: 10, alignItems: 'center', justifyContent: 'flex-start', marginBottom: 10, elevation: 5 }}
                >
                  <Image source={require('../../assets/images/imgArtikel.png')} style={{ width: 80, height: 60, borderRadius: 10 }} />
                  <View width={width / 2} style={{ marginHorizontal: 10, height: 60 }}>
                    <Text style={{ color: Colors.PRIMARY_PURPLE, marginBottom: 5 }}>Artikel 1</Text>
                    <Text>Lihat info selengkapnya asjdhbas sakjdb</Text>
                  </View>
                  <View style={{ position: 'absolute', top: 5, right: 5 }}>
                    <Text style={{ color: Colors.grey }}>Sekarang</Text>
                  </View>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default BelumDibacaScreen;

const styles = StyleSheet.create({
  titleCon: { fontSize: 18, fontWeight: 'bold', color: Colors.SECONDARY_PURPLE },
  grafikData: {
    marginVertical: 8,
    borderRadius: 20,
    borderColor: 'grey',
    borderWidth: 1,
    width: width / 1.14,
  },
  titleKet: { fontSize: 16, color: '#626161', marginBottom: 10 },
  cardCon: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderWidth: 1, borderRadius: 10, marginBottom: 10 },
  conStartText: { alignItems: 'flex-start', paddingLeft: 10, flexDirection: 'row', alignItems: 'center' },
  conEndText: { alignItems: 'flex-end', paddingRight: 10 },
});
