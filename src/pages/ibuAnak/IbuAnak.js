const { height, width } = Dimensions.get('window');

import Ibu from './ibu';
import Anak from './anak';

import { Colors } from '../../constants';

import * as React from 'react';
import { Dimensions, View, Text, SafeAreaView, TouchableOpacity, StyleSheet, StatusBar } from 'react-native';

import TopBar from '../../components/TopBar';
import ButtonBack from '../../components/ButtonBack';

const listTab = [
  {
    status: 'Ibu',
    id: 1,
  },
  {
    status: 'Anak',
    id: 2,
  },
];

const IbuAnak = () => {
  const [status, setStatus] = React.useState('Ibu');
  const setStatusFilter = (status) => {
    setStatus(status);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <StatusBar barStyle="light-content" backgroundColor={'transparent'} translucent />
        <TopBar height={height / 7} content={<ButtonBack title={'Ibu dan Anak'} />} />
        <View style={{ alignItems: 'center' }}>
          <View width={width / 1.06} style={styles.conView}>
            {listTab.map((e) => (
              <TouchableOpacity key={e.id} style={[styles.btnTab, status === e.status && styles.btnActive]} onPress={() => setStatusFilter(e.status)}>
                <Text style={[styles.btnText, status === e.status && styles.btnTextActive]}>{e.status}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </View>
      {status === 'Ibu' ? <Ibu /> : status === 'Anak' ? <Anak /> : null}
    </SafeAreaView>
  );
};

export default IbuAnak;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.DEFAULT_WHITE,
  },
  conView: {
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  btnTab: {
    width: width / 3.35,
    flexDirection: 'row',
    borderWidth: 0.5,
    justifyContent: 'center',
    padding: 10,
    borderRadius: 10,
  },
  btnText: {
    fontSize: 16,
    textAlign: 'center',
    textTransform: 'capitalize',
  },
  btnActive: {
    backgroundColor: Colors.PRIMARY_PURPLE,
  },
  btnTextActive: {
    color: 'white',
  },
  titleText: {
    fontSize: 14,
    lineHeight: 24,
    fontWeight: 'bold',
  },
  box: {
    height: 150,
    width: 150,
    backgroundColor: 'blue',
    borderRadius: 5,
  },
});
