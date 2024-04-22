import React, { useState } from 'react';
import axios from '../../services/Axios';
import { setReport } from '../../apis/ReportPuskesmas';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Dimensions, TouchableOpacity, ScrollView, Modal, StatusBar, StyleSheet, Image, Text, TextInput, View, Alert } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../constants';
import TopBar from '../../components/TopBar';
import * as ImagePicker from 'expo-image-picker';
import ButtonBack from '../../components/ButtonBack';
const { height, width } = Dimensions.get('window');

function AddLaporanPenanganan({ navigation }) {
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);

  const [name, setName] = useState('');
  const [textDate, setTextDate] = useState(new Date());
  const [totalAnak, setTotalAnak] = useState('');
  const [penanganan, setPenanganan] = useState('');
  const [ket, setKet] = useState('');
  let [reportImage, setReportImage] = useState([]);
  const [photo, setPhoto] = useState([]);

  const [viewModal, setViewModal] = useState(false);

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

  const getImageGalerry = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    photo.push(result.assets[0].uri.substring(75));
    setViewModal(false);
    if (result) {
      return reportImage.push(result);
    } else {
      return null;
    }
  };

  // Function upload image from galery
  const uploadImage = async (img, id) => {
    await AsyncStorage.getItem('token').then(async (token) => {
      img.forEach(async (element) => {
        let config = {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        };
        const data = new FormData();
        data.append('image', {
          uri: element.uri,
          name: 'image.jpg',
          type: 'image/jpg',
        });

        const url = axios.defaults.baseURL;
        const link = `${url}/nakes/penanganan/upload/${id}`;

        await fetch(link, {
          method: 'POST',
          body: data,
          headers: config,
        });
      });
    });
  };

  const submit = async () => {
    if (!name.trim()) {
      Alert.alert('Maaf, mohon isi data dengan lengkap');
      return;
    } else if (!totalAnak.trim()) {
      Alert.alert('Maaf, mohon isi data dengan lengkap');
      return;
    } else if (!penanganan.trim()) {
      Alert.alert('Maaf, mohon isi data dengan lengkap');
      return;
    } else if (!ket.trim()) {
      Alert.alert('Maaf, mohon isi data dengan lengkap');
      return;
    } else if (photo[0] === undefined) {
      Alert.alert('Maaf, mohon isi data dengan lengkap');
      return;
    }
    await AsyncStorage.getItem('token').then(async (token) => {
      let dataa = {
        name_activity: name,
        start_time: textDate.toLocaleString(),
        finish_time: textDate.toLocaleString(),
        total_anak: totalAnak,
        penanganan: penanganan,
        ket: ket,
      };
      await setReport(token, dataa).then(async (res) => {
        await uploadImage(reportImage, res.data.data.id);
      });
    });
    navigation.navigate('LaporanPenanganan');
  };

  const modalView = () => {
    return (
      <View
        style={{
          height: height,
          width: width,
          backgroundColor: 'rgba(0,0,0,0.7)',
        }}
      >
        <View
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            width: width,
            height: '40%',
          }}
        >
          <View style={{ alignItems: 'flex-end' }}>
            <TouchableOpacity onPress={() => setViewModal(false)}>
              <Image source={require('../../images/close.png')} />
            </TouchableOpacity>
          </View>
          <View
            style={{
              backgroundColor: '#fff',
              borderTopStartRadius: 20,
              borderTopEndRadius: 20,
              padding: 15,
              flex: 1,
              justifyContent: 'center',
            }}
          >
            <TouchableOpacity activeOpacity={0.8} onPress={async () => await getImageGalerry()}>
              <View style={{ alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
                <Ionicons name="folder-open-outline" size={60}></Ionicons>
                <Text style={{ marginTop: 3, fontSize: 18 }}>Tambah Dokumentasi</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={'transparent'} translucent />
      <TopBar height={height / 7} content={<ButtonBack title={'Tambah Laporan Penanganan'} />} />
      <ScrollView height={height} width={width / 1.15} style={styles.scrollCon}>
        {/* Nama kegiatan */}
        <View>
          <Text style={{ marginBottom: 7 }}>Nama Kegiatan</Text>
          <TextInput placeholder="Masukkkan Nama Kegiatan" onChangeText={(text) => setName(text)} style={styles.textInput} />
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
          <TextInput height={height / 10} multiline={true} placeholder="Masukkkan penanganan yang dilakukan" onChangeText={(text) => setPenanganan(text)} style={styles.detailInput} />
        </View>

        {/* Jumlah balita */}
        <View style={{}}>
          <Text style={{ marginBottom: 7, marginTop: 20 }}>Masukkan jumlah balita yang ditangani</Text>
          <TextInput keyboardType="numeric" placeholder="Masukkan jumlah balita yang ditangani" onChangeText={(text) => setTotalAnak(text)} style={styles.textInput} />
        </View>

        {/* Keterangan */}
        <View style={{}}>
          <Text style={{ marginBottom: 7, marginTop: 20 }}>Keterangan</Text>
          <TextInput height={height / 5} multiline={true} placeholder="Masukkan keterangan kegiatan" onChangeText={(text) => setKet(text)} style={styles.detailInput} />
        </View>

        {/* Dokumentasi */}
        <View style={{ marginBottom: 20 }}>
          <Text style={{ marginBottom: 7, marginTop: 20 }}>Dokumentasi Kegiatan</Text>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <View style={{ flexDirection: 'column', width: '50%' }}>
              <TouchableOpacity onPress={() => setViewModal(true)} style={{ backgroundColor: Colors.PRIMARY_PURPLE, height: 40, width: 90, justifyContent: 'center', alignItems: 'center', borderRadius: 10 }}>
                <Text style={{ color: Colors.DEFAULT_WHITE }}>Choose File</Text>
              </TouchableOpacity>
              <Text style={{ fontSize: 10 }}>ukuran file max 5 mb</Text>
            </View>
            {photo[0] === undefined ? (
              <Text style={{ marginVertical: 5, color: Colors.grey }}>Belum ada foto</Text>
            ) : (
              <View style={{ flexDirection: 'column', width: '50%', alignItems: 'flex-end' }}>
                {photo.map((item, key) => {
                  return (
                    <View key={key}>
                      <Text style={{ fontSize: 12, color: Colors.PRIMARY_PURPLE }}>{item}</Text>
                    </View>
                  );
                })}
              </View>
            )}
          </View>
        </View>

        {/* Button simpan */}
        <TouchableOpacity activeOpacity={0.8} onPress={() => submit()} style={styles.buttonCon}>
          <Text style={styles.buttonText}>Simpan</Text>
        </TouchableOpacity>
      </ScrollView>

      {show && <DateTimePicker testID="dateTimePicker" value={date} mode={mode} is24Hour={true} display="default" onChange={onChange} />}

      <Modal animationType="slide" transparent={true} visible={viewModal} onRequestClose={() => {}}>
        {modalView()}
      </Modal>
    </View>
  );
}

export default AddLaporanPenanganan;

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
