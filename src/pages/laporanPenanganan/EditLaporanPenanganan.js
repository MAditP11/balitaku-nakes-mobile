import React, { useState } from 'react';
import axios from '../../services/Axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Dimensions, TouchableOpacity, ScrollView, StatusBar, StyleSheet, Text, TextInput, View } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Ionicons } from '@expo/vector-icons';
import { updateReport } from '../../apis/ReportPuskesmas';
import { Colors } from '../../constants';
import TopBar from '../../components/TopBar';
import * as ImagePicker from 'expo-image-picker';
import ButtonBack from '../../components/ButtonBack';
const { height, width } = Dimensions.get('window');

function EditLaporanPenanganan({ navigation, route }) {
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);

  const { dataa } = route.params;
  const [cName, setName] = useState(dataa.name_activity);
  const [ctotalAnak, setTotalAnak] = useState(dataa.total_anak);
  const [textDate, setTextDate] = useState(new Date());
  const [cKet, setKet] = useState(dataa.ket);
  const [cReportImage, setReportImage] = useState(dataa.photos);
  const [cPenanganan, setPenanganan] = useState(dataa.penanganan);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;

    if (Platform.OS === 'android') {
      setShow(false);
    }
    if (event.type === 'neutralButtonPressed') {
      setDate(new Date(0));
    } else {
      setDate(currentDate);
    }
    setTextDate(new Date(currentDate));
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const showTimepicker = () => {
    showMode('time');
  };

  const submit = async () => {
    await AsyncStorage.getItem('token').then(async (token) => {
      let dataaa = {
        id: dataa.id,
        name_activity: cName,
        start_time: textDate.toLocaleString(),
        finish_time: textDate.toLocaleString(),
        total_anak: ctotalAnak,
        penanganan: cPenanganan,
        ket: cKet,
      };
      await updateReport(token, dataaa).then((res) => {
        console.log(res.data.data);
      });
    });
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={'transparent'} translucent />
      <TopBar height={height / 7} content={<ButtonBack title={'Tambah Laporan Penanganan'} />} />
      <ScrollView height={height} width={width / 1.15} style={styles.scrollCon}>
        {/* Nama kegiatan */}
        <View>
          <Text style={{ marginBottom: 7 }}>Nama Kegiatan</Text>
          <TextInput placeholder="Masukkkan Nama Kegiatan" value={cName} onChangeText={(text) => setName(text)} style={styles.textInput} />
        </View>

        {/* Tanggal kegiatan */}
        <View>
          <Text style={{ marginBottom: 7, marginTop: 10 }}>Tanggal Kegiatan</Text>
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              borderWidth: 1,
              paddingVertical: 6,
              borderRadius: 5,
            }}
            onPress={() => showDatepicker()}
          >
            <TextInput
              editable={false}
              placeholder="Tgl/Bln/Thn"
              style={{
                width: '80%',
                fontSize: 14,
                paddingHorizontal: 10,
              }}
              value={new Date(textDate).toISOString().substring(0, 10).split('-').reverse().join('-')}
            />
            <View
              style={{
                width: '20%',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Ionicons name="calendar" size={20} color="#C2BABA" />
            </View>
          </TouchableOpacity>
        </View>

        {/* Jadwal kegiatan */}
        <View>
          <Text style={{ marginBottom: 7, marginTop: 20 }}>Waktu Kegiatan</Text>
          <TouchableOpacity onPress={() => showTimepicker()} style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            <TextInput
              placeholder={'selected:  ' + textDate.toLocaleString().substring(11, 16)}
              editable={false}
              style={{ paddingHorizontal: 10, borderRadius: 5, height: height / 17, width: '45%', fontSize: 14, fontFamily: 'Poppins_600SemiBold', borderWidth: 1 }}
            />
          </TouchableOpacity>
        </View>

        {/* Penanganan yang dilakukan */}
        <View style={{}}>
          <Text style={{ marginBottom: 7, marginTop: 20 }}>Penanganan yang dilakukan</Text>
          <TextInput height={height / 7} multiline={true} value={cPenanganan} placeholder="Masukkkan penanganan yang dilakukan" onChangeText={(text) => setPenanganan(text)} style={styles.detailInput} />
        </View>

        {/* Jumlah balita */}
        <View style={{}}>
          <Text style={{ marginBottom: 7, marginTop: 20 }}>Masukkan jumlah balita yang ditangani</Text>
          <TextInput keyboardType="numeric" value={ctotalAnak} placeholder="Masukkan jumlah balita yang ditangani" onChangeText={(text) => setTotalAnak(text)} style={styles.textInput} />
        </View>

        {/* Keterangan */}
        <View style={{}}>
          <Text style={{ marginBottom: 7, marginTop: 20 }}>Keterangan</Text>
          <TextInput height={height / 5} multiline={true} value={cKet} placeholder="Masukkan keterangan kegiatan" onChangeText={(text) => setKet(text)} style={styles.detailInput} />
        </View>

        {/* Dokumentasi */}
        {/* <View style={{ marginBottom: 20 }}>
          <Text style={{ marginBottom: 7, marginTop: 20 }}>Dokumentasi Kegiatan</Text>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderRadius: 10, paddingHorizontal: 1 }}>
            <TouchableOpacity onPress={() => uploadImage()} style={{ backgroundColor: Colors.PRIMARY_PURPLE, height: 40, width: 90, justifyContent: 'center', alignItems: 'center', borderRadius: 10 }}>
              <Text style={{ color: Colors.DEFAULT_WHITE }}>Choose File</Text>
            </TouchableOpacity>
            <View style={{ width: '50%' }}>
              <Text style={{ fontSize: 10, color: Colors.gray }}>{cReportImage}</Text>
            </View>
          </View>
          <Text style={{ fontSize: 10 }}>ukuran fille maksimal 5mb</Text>
        </View> */}

        {/* Button simpan */}
        <TouchableOpacity activeOpacity={0.8} onPress={() => submit()} style={styles.buttonCon}>
          <Text style={styles.buttonText}>Simpan</Text>
        </TouchableOpacity>
      </ScrollView>

      {show && <DateTimePicker testID="dateTimePicker" value={date} mode={mode} is24Hour={true} display="default" onChange={onChange} />}
    </View>
  );
}

export default EditLaporanPenanganan;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', alignItems: 'center' },
  scrollCon: { backgroundColor: Colors.DEFAULT_WHITE, borderWidth: 1, borderRadius: 5, marginTop: 30, marginBottom: 30, padding: 15 },
  textInput: {
    paddingHorizontal: 10,
    borderRadius: 5,
    height: height / 17,
    fontSize: 14,
    fontFamily: 'Poppins_600SemiBold',
    borderWidth: 1,
  },
  uploadInput: {
    paddingHorizontal: 20,
    alignItems: 'flex-end',
    width: 186,
    borderRadius: 10,
    height: height / 17,
    fontSize: 14,
    fontFamily: 'Poppins_600SemiBold',
  },
  detailInput: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    width: '100%',
    textAlignVertical: 'top',
    fontSize: 14,
    fontFamily: 'Poppins_600SemiBold',
    borderWidth: 1,
  },
  dateInput: {
    paddingHorizontal: 5,
    borderRadius: 5,
    height: height / 17,
    fontSize: 14,
    fontFamily: 'Poppins_600SemiBold',
    borderWidth: 1,
  },
  buttonCon: { backgroundColor: Colors.PRIMARY_PURPLE, marginTop: 10, marginBottom: 25, height: height / 14, borderRadius: 8, justifyContent: 'center', alignItems: 'center', elevation: 2 },
  buttonText: { fontSize: 20, fontFamily: 'Poppins_700Bold', color: Colors.DEFAULT_WHITE },
});
