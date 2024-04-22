import { React, useState } from 'react';
import { Dimensions, TouchableOpacity, StatusBar, StyleSheet, Modal, Text, TextInput, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { updateChildren } from '../../../apis/Children';
import { Colors } from '../../../constants';
import TopBar from '../../../components/TopBar';
import ButtonBack from '../../../components/ButtonBack';
const { height, width } = Dimensions.get('window');

function EditHasilPemeriksaan({ navigation, route }) {
  const { dataa } = route.params;
  // const [birthDay, setBirthday] = useState('');
  const [cWeight, setChangeWeight] = useState(String(dataa.checkup[0].weight));
  const [cHeight, setChangeHeight] = useState(String(dataa.checkup[0].tall));
  const [cHead, setChangeHead] = useState(String(dataa.checkup[0].headCircumference));
  const [cArm, setChangeArm] = useState(String(dataa.checkup[0].armCircumference));
  // const incrementCounter = () => setCounter(changeWeight + 1);
  // const decrementCounter = () => setCounter(changeWeight - 1);
  // // if (changeWeight <= 0) {
  // //   decrementCounter = () => setChangeWeight(1);
  // // }

  // const [viewModal, setViewModal] = useState(false);

  // const setCloseModal = () => {
  //   setViewModal(false);
  // };

  // const modalCalender = () => {
  //   return (
  //     <View
  //       style={{
  //         height: height,
  //         width: width,
  //         backgroundColor: 'rgba(0,0,0,0.7)',
  //         justifyContent: 'center',
  //         alignItems: 'center',
  //       }}
  //     >
  //       <TouchableOpacity activeOpacity={0.8} onPress={() => setCloseModal(false)} style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0 }}></TouchableOpacity>
  //       <Calendar
  //         initialDate="2022-10-20"
  //         onDayPress={(dataa) => {
  //           setBirthday(dataa.dateString);
  //           setCloseModal(false);
  //         }}
  //       ></Calendar>
  //     </View>
  //   );
  // };

  const submit = async () => {
    await AsyncStorage.getItem('token').then(async (token) => {
      let dataaa = {
        id: dataa.checkup[0].id,
        tall: cHeight,
        weight: cWeight,
        headCircumference: cHead,
        armCircumference: cArm,
      };
      await updateChildren(token, dataaa).then((res) => {
        console.log(res.data.data);
      });
    });
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={'transparent'} translucent />
      <TopBar height={height / 7} content={<ButtonBack title={'Ubah Data Anak'} />} />
      <View height={height / 1.3} width={width / 1.15} style={styles.scrollCon}>
        {/* Berat bedan */}
        <View style={{}}>
          <Text style={{ marginBottom: 7, marginTop: 10 }}>Berat Badan (kg)</Text>
          <TextInput value={cWeight} keyboardType="decimal-pad" placeholder="Masukkan data berat badan" onChangeText={(text) => setChangeWeight(text)} style={styles.textInput} />
        </View>

        {/* tinggi badan */}
        <View style={{}}>
          <Text style={{ marginBottom: 7, marginTop: 20 }}>Tinggi Badan (cm)</Text>
          <TextInput value={cHeight} keyboardType="decimal-pad" placeholder="Masukkan data tinggi badan" onChangeText={(text) => setChangeHeight(text)} style={styles.textInput} />
        </View>

        {/* Lingkar kepala */}
        <View style={{}}>
          <Text style={{ marginBottom: 7, marginTop: 20 }}>Lingkar Kepala (cm)</Text>
          <TextInput value={cHead} keyboardType="numeric" placeholder="Masukkan data lingkar kepala" onChangeText={(text) => setChangeHead(text)} style={styles.textInput} />
        </View>

        {/* Lingkar lengan */}
        <View style={{}}>
          <Text style={{ marginBottom: 7, marginTop: 20 }}>Lingkar Lengan (cm)</Text>
          <TextInput value={cArm} keyboardType="numeric" placeholder="Masukkan data lingkar lengan" onChangeText={(text) => setChangeArm(text)} style={styles.textInput} />
        </View>

        {/* Simpan */}
        <TouchableOpacity activeOpacity={0.8} onPress={() => submit()} style={styles.buttonCon}>
          <Text style={styles.buttonText}>Simpan</Text>
        </TouchableOpacity>
      </View>
      {/* <Modal animationType="slide" transparent={true} visible={viewModal} onRequestClose={() => {}}>
        {modalCalender()}
      </Modal> */}
    </View>
  );
}

export default EditHasilPemeriksaan;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', alignItems: 'center' },
  scrollCon: { backgroundColor: Colors.DEFAULT_WHITE, borderRadius: 5, elevation: 5, marginTop: 40, paddingHorizontal: 15, paddingVertical: 10 },
  textInput: {
    paddingHorizontal: 10,
    borderRadius: 5,
    height: height / 17,
    fontSize: 14,
    fontFamily: 'Poppins_600SemiBold',
    borderWidth: 2,
  },
  buttonCon: { backgroundColor: Colors.PRIMARY_PURPLE, marginVertical: 25, height: height / 14, borderRadius: 8, justifyContent: 'center', alignItems: 'center', elevation: 2 },
  buttonText: { fontSize: 20, fontFamily: 'Poppins_700Bold', color: Colors.DEFAULT_WHITE },
});
