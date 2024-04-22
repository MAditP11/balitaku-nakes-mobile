import { Colors, Images } from '../../../constants';
import { Dimensions, View, Text, SafeAreaView, TouchableOpacity, StyleSheet } from 'react-native';
const { height, width } = Dimensions.get('window');
import Normal from './status/Normal';
import Gejala from './status/Gejala';
import Stunting from './status/Stunting';

import React from 'react';

const listTab = [
  {
    status: 'Normal',
    id: 1,
  },
  {
    status: 'Gejala',
    id: 2,
  },
  {
    status: 'Stunting',
    id: 3,
  },
];

const Anakk = () => {
  const [status, setStatus] = React.useState('Normal');
  const setStatusFilter = (status) => {
    setStatus(status);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <View style={{ alignItems: 'center', backgroundColor: Colors.DEFAULT_WHITE, marginTop: 10 }}>
          <View width={width / 1.06} style={{ borderRadius: 2, elevation: 1 }}>
            <View width={width / 1.06} style={styles.conView}>
              {listTab.map((e) => (
                <TouchableOpacity key={e.id} style={[styles.btnTab, status === e.status && styles.btnActive]} onPress={() => setStatusFilter(e.status)}>
                  <Text style={[styles.btnText, status === e.status && styles.btnTextActive]}>{e.status}</Text>
                </TouchableOpacity>
              ))}
            </View>
            {status === 'Normal' ? <Normal /> : status === 'Gejala' ? <Gejala /> : status === 'Stunting' ? <Stunting /> : null}
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Anakk;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.DEFAULT_WHITE,
  },
  conView: {
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  btnTab: {
    width: width / 4,
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
