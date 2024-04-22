import React from 'react';
import { Dimensions, TouchableOpacity, Text, View } from 'react-native';
import { Colors } from '../../../constants';
import LPosBot from './lposbot/LPosBot';
import LPenBot from './lpenbot/LPenBot';
const { height, width } = Dimensions.get('window');

const lpOps = [
  {
    id: 1,
    name: 'Laporan Posyandu',
  },
  {
    id: 2,
    name: 'Laporan Penanganan',
  },
];

function LPBot({ disabled }) {
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

  const lpOpss = () => {
    return (
      <View style={{ marginVertical: 5, paddingVertical: 7, paddingHorizontal: 10, backgroundColor: Colors.PRIMARY_PURPLE, maxWidth: 250, borderRadius: 7 }}>
        <View style={{ marginBottom: 5 }}>
          <Text style={{ color: Colors.DEFAULT_WHITE, fontWeight: 'bold' }}>Tekan salah satu button di bawah ini :</Text>
        </View>

        {lpOps.map((ops) => (
          <TouchableOpacity
            key={ops.id}
            disabled={disabled}
            style={{ backgroundColor: Colors.info, paddingHorizontal: 5, paddingVertical: 7, maxWidth: 150, marginBottom: 5, borderRadius: 5 }}
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
                  }, 10000);
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
      {lpOpss()}
      {lp[0] !== undefined ? userlp(0) : null}
      {lp2[0] !== undefined && lp[0] === 'laporan posyandu' ? <LPosBot disabled={disabled} /> : lp2[0] !== undefined && lp[0] === 'laporan penanganan' ? <LPenBot disabled={disabled} /> : null}
      {lp3[0] !== undefined ? lpOpss() : null}

      {lp[1] !== undefined ? userlp(1) : null}
      {lp2[1] !== undefined && lp[1] === 'laporan posyandu' ? <LPosBot disabled={disabled} /> : lp2[1] !== undefined && lp[1] === 'laporan penanganan' ? <LPenBot disabled={disabled} /> : null}
      {lp3[1] !== undefined ? lpOpss() : null}

      {lp[2] !== undefined ? userlp(2) : null}
      {lp2[2] !== undefined && lp[2] === 'laporan posyandu' ? <LPosBot disabled={disabled} /> : lp2[2] !== undefined && lp[2] === 'laporan penanganan' ? <LPenBot disabled={disabled} /> : null}
      {lp3[2] !== undefined ? lpOpss() : null}

      {lp[3] !== undefined ? userlp(3) : null}
      {lp2[3] !== undefined && lp[3] === 'laporan posyandu' ? <LPosBot disabled={disabled} /> : lp2[3] !== undefined && lp[3] === 'laporan penanganan' ? <LPenBot disabled={disabled} /> : null}
      {lp3[3] !== undefined ? lpOpss() : null}
    </View>
  );
}

export default LPBot;
