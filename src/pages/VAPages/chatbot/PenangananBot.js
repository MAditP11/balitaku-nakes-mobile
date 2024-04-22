import React from 'react';
import { Dimensions, TouchableOpacity, Text, View } from 'react-native';
import { Colors } from '../../../constants';
import AksesPenBot from './penangananbot/AksesPenBot';
import DitanganiBot from './penangananbot/DitanganiBot';
const { height, width } = Dimensions.get('window');

const lpOps = [
  {
    id: 1,
    name: 'Akses Halaman Penanganan',
  },
  {
    id: 2,
    name: 'Perbedaan anak yang telah ditangani dan belum',
  },
];

function PenangananBot({ disabled }) {
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
        <View style={{ marginBottom: 7 }}>
          <Text style={{ color: Colors.DEFAULT_WHITE, fontWeight: 'bold' }}>Penanganan merupakan salah satu tugas yang wajib dilakukan oleh nakes terhadap anak-anak yang tergejala maupun terindikasi stunting.</Text>
        </View>

        <View style={{ marginBottom: 5 }}>
          <Text style={{ color: Colors.DEFAULT_WHITE, fontWeight: 'bold' }}>Tekan salah satu button di bawah ini :</Text>
        </View>

        {lpOps.map((ops) => (
          <TouchableOpacity
            key={ops.id}
            disabled={disabled}
            style={{ backgroundColor: Colors.info, paddingHorizontal: 5, paddingVertical: 7, maxWidth: 200, marginBottom: 5, borderRadius: 5 }}
            activeOpacity={0.8}
            onPress={() => {
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
      {lp2[0] !== undefined && lp[0] === 'akses halaman penanganan' ? <AksesPenBot /> : lp2[0] !== undefined && lp[0] === 'perbedaan anak yang telah ditangani dan belum' ? <DitanganiBot /> : null}
      {lp3[0] !== undefined ? lpOpss() : null}

      {lp[1] !== undefined ? userlp(1) : null}
      {lp2[1] !== undefined && lp[1] === 'akses halaman penanganan' ? <AksesPenBot /> : lp2[1] !== undefined && lp[1] === 'perbedaan anak yang telah ditangani dan belum' ? <DitanganiBot /> : null}
      {lp3[1] !== undefined ? lpOpss() : null}

      {lp[2] !== undefined ? userlp(2) : null}
      {lp2[2] !== undefined && lp[2] === 'akses halaman penanganan' ? <AksesPenBot /> : lp2[2] !== undefined && lp[2] === 'perbedaan anak yang telah ditangani dan belum' ? <DitanganiBot /> : null}
      {lp3[2] !== undefined ? lpOpss() : null}

      {lp[3] !== undefined ? userlp(3) : null}
      {lp2[3] !== undefined && lp[3] === 'akses halaman penanganan' ? <AksesPenBot /> : lp2[3] !== undefined && lp[3] === 'perbedaan anak yang telah ditangani dan belum' ? <DitanganiBot /> : null}
      {lp3[3] !== undefined ? lpOpss() : null}
    </View>
  );
}

export default PenangananBot;
