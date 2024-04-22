import React from 'react';
import { Dimensions, TouchableOpacity, Text, View } from 'react-native';
import { Colors } from '../../../../constants';
const { height, width } = Dimensions.get('window');
import LPos1Bot from './LPos1Bot';
import LPos2Bot from './LPos2Bot';

const lposOps = [
  {
    id: 1,
    name: 'Akses Laporan Posyandu',
  },
  {
    id: 2,
    name: 'Buat, Ubah, dan Hapus Laporan Posyandu',
  },
];

function LPosBot({ disabled }) {
  const [lp, setLp] = React.useState([]);
  const [lp2, setLp2] = React.useState([]);
  const [lp3, setLp3] = React.useState([]);
  const [comment, setComment] = React.useState('');

  const userlp = (i) => {
    return (
      <View>
        <View style={{ width: width, alignItems: 'flex-end', paddingRight: 20 }}>
          <View style={{ marginVertical: 5, paddingVertical: 7, paddingHorizontal: 10, backgroundColor: Colors.SECONDARY_PURPLE, maxWidth: 250, borderRadius: 7 }}>
            <Text style={{ color: Colors.DEFAULT_WHITE }}>{lp[i]}</Text>
          </View>
        </View>
      </View>
    );
  };

  const lposOpss = () => {
    return (
      <View style={{ marginVertical: 5, paddingVertical: 7, paddingHorizontal: 10, backgroundColor: Colors.PRIMARY_PURPLE, maxWidth: 250, borderRadius: 7 }}>
        <View style={{ marginBottom: 5 }}>
          <View style={{ marginBottom: 7 }}>
            <Text style={{ color: Colors.DEFAULT_WHITE, fontWeight: 'bold' }}>Laporan posyandu merupakan laporan yang wajib dibuat oleh nakes setelah melakukan kegiatan posyandu.</Text>
          </View>
          <Text style={{ color: Colors.DEFAULT_WHITE, fontWeight: 'bold' }}>Tekan salah satu button di bawah ini :</Text>
        </View>

        {lposOps.map((ops) => (
          <TouchableOpacity
            key={ops.id}
            disabled={disabled}
            style={{ backgroundColor: Colors.info, paddingHorizontal: 7, paddingVertical: 7, maxWidth: 200, marginBottom: 5, borderRadius: 5 }}
            activeOpacity={0.8}
            onPress={() => {
              if (ops.name.toLocaleLowerCase() === 'kembali') {
                lp.push(ops.name.toLocaleLowerCase());
                setComment('');
              } else {
                lp.push(ops.name.toLocaleLowerCase());
                setComment('..');
                setTimeout(() => {
                  lp2.push(1);
                  setComment('...');
                  setTimeout(() => {
                    lp3.push(1);
                    setComment('');
                  }, 4000);
                }, 1000);
              }
            }}
          >
            <Text style={{ color: Colors.dark }}>{ops.name}</Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  return (
    <View>
      {lposOpss()}
      {lp[0] !== undefined ? userlp(0) : null}
      {lp2[0] !== undefined && lp[0] === 'akses laporan posyandu' ? <LPos1Bot /> : lp2[0] !== undefined && lp[0] === 'buat, ubah, dan hapus laporan posyandu' ? <LPos2Bot /> : null}
    </View>
  );
}

export default LPosBot;
