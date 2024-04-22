import React, { useState, useEffect } from 'react';
import { Dimensions, TouchableOpacity, ScrollView, StatusBar, StyleSheet, Text, TextInput, View, Modal } from 'react-native';
import { Colors, Images } from '../constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getUser } from '../apis/Nakes';
import { updateUser } from '../apis/Nakes';
import TopBar from '../components/TopBar';
import ButtonBack from '../components/ButtonBack';
const { height, width } = Dimensions.get('window');
import { Calendar, CalendarList } from 'react-native-calendars';
import { Ionicons } from '@expo/vector-icons';

function EditProfilScreen({ navigation }) {
  const [id, setID] = useState('');
  const [name, setName] = useState('');
  const [nik, setNIK] = useState('');
  // const [mode, setMode] = useState('date');
  // const [nip, setNIP] = useState('');
  const [noHP, setNoHP] = useState('');
  const [tglLahir, setTglLahir] = useState('');
  const [kec, setKec] = useState('');
  const [alamat, setAlamat] = useState('');
  const [puskesmas, setPuskesmas] = useState('');
  const [alamatPuskesmas, setAlamatPuskesmas] = useState('');

  const [viewModal, setViewModal] = useState(false);

  useEffect(() => {
    getNakesData();
  }, []);

  const getNakesData = async () => {
    await AsyncStorage.getItem('token').then(async (token) => {
      await getUser(token).then((res) => {
        setID(res.data.data.user_id);
        setName(res.data.data.user.name);
        setNIK(res.data.data.user.nik);
        setNoHP(res.data.data.user.phone);
        setTglLahir(new Date(res.data.data.user.birthDay).toISOString().substring(0, 10));
        setKec(res.data.data.user.district);
        setAlamat(res.data.data.user.address);
        setPuskesmas(res.data.data.puskesmas.name);
        setAlamatPuskesmas(res.data.data.puskesmas.address);
      });
    });
  };

  const submit = async () => {
    await AsyncStorage.getItem('token').then(async (token) => {
      let dataa = {
        id: id,
        name: name,
        phone: noHP,
        birthDay: tglLahir,
        district: kec,
        address: alamat,
        puskesmas_name: puskesmas,
        puskesmas_address: alamatPuskesmas,
      };

      await updateUser(token, dataa).then((res) => {
        console.log(res.data.data);
      });
    });
    navigation.goBack();
  };

  const setCloseModal = () => {
    setViewModal(false);
  };

  // modal for calendar
  const modalCalender = () => {
    return (
      <View
        style={{
          height: height,
          width: width,
          backgroundColor: 'rgba(0,0,0,0.7)',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <TouchableOpacity activeOpacity={0.8} onPress={() => setCloseModal(false)} style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0 }}></TouchableOpacity>
        <Calendar
          initialDate={tglLahir}
          onDayPress={(data) => {
            setTglLahir(data.dateString);
            setCloseModal(false);
          }}
        ></Calendar>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={'transparent'} translucent />
      {/* Top content */}
      <TopBar height={height / 7} content={<ButtonBack title={'Edit Profil'} />} />
      <ScrollView height={height} width={width / 1.15} style={styles.scrollCon}>
        {/* NIK */}
        <View style={{}}>
          <Text style={{ marginBottom: 5 }}>NIK</Text>
          <Text
            style={{
              paddingHorizontal: 10,
              borderRadius: 5,
              height: height / 20,
              fontSize: 14,
              fontFamily: 'Poppins_600SemiBold',
            }}
          >
            {nik}
          </Text>
        </View>

        {/* Name */}
        <View style={{}}>
          <Text style={{ marginBottom: 7 }}>Nama Lengkap</Text>
          <TextInput keyboardType="default" value={name} onChangeText={(text) => setName(text)} style={styles.textInput} />
        </View>

        {/* No HP */}
        <View style={{}}>
          <Text style={{ marginBottom: 7, marginTop: 10 }}>No. Hp</Text>
          <TextInput keyboardType="numeric" value={noHP} onChangeText={(text) => setNoHP(text)} style={styles.textInput} />
        </View>

        {/* Tanggal lahir */}
        <View style={{}}>
          <Text style={{ marginBottom: 7, marginTop: 20 }}>Tanggal Lahir</Text>
          <View style={{ height: height / 17, flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 10, alignItems: 'center', borderWidth: 2, borderRadius: 5 }}>
            <TextInput
              value={tglLahir}
              editable={false}
              width={'50%'}
              onChangeText={(text) => setTglLahir(text)}
              style={{
                fontSize: 14,
                fontFamily: 'Poppins_600SemiBold',
              }}
            />
            <TouchableOpacity activeOpacity={0.8} onPress={() => setViewModal(true)}>
              <Ionicons name="calendar-outline" size={20}></Ionicons>
            </TouchableOpacity>
          </View>
        </View>

        {/* Kecamatan */}
        <View style={{}}>
          <Text style={{ marginBottom: 7, marginTop: 20 }}>Kecamatan</Text>
          <TextInput keyboardType="default" value={kec} onChangeText={(text) => setKec(text)} style={styles.textInput} />
        </View>

        {/* Alamat */}
        <View style={{}}>
          <Text style={{ marginBottom: 7, marginTop: 20 }}>Alamat</Text>
          <TextInput keyboardType="default" value={alamat} onChangeText={(text) => setAlamat(text)} style={styles.textInput} />
        </View>

        {/* Nama Puskesmas */}
        <View style={{}}>
          <Text style={{ marginBottom: 7, marginTop: 20 }}>Nama Puskesmas</Text>
          <TextInput keyboardType="default" value={puskesmas} onChangeText={(text) => setPuskesmas(text)} style={styles.textInput} />
        </View>

        {/* Alamat Puskesmas */}
        <View style={{}}>
          <Text style={{ marginBottom: 7, marginTop: 20 }}>Alamat Puskesmas</Text>
          <TextInput keyboardType="default" value={alamatPuskesmas} onChangeText={(text) => setAlamatPuskesmas(text)} style={styles.textInput} />
        </View>

        {/* Button simpan */}
        <TouchableOpacity activeOpacity={0.8} onPress={() => submit()} style={styles.buttonCon}>
          <Text style={styles.buttonText}>Simpan</Text>
        </TouchableOpacity>
      </ScrollView>
      <Modal animationType="slide" transparent={true} visible={viewModal} onRequestClose={() => {}}>
        {modalCalender()}
      </Modal>
    </View>
  );
}

export default EditProfilScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', alignItems: 'center' },
  scrollCon: { backgroundColor: Colors.DEFAULT_WHITE, borderRadius: 5, elevation: 5, marginTop: 40, marginBottom: 20, padding: 15 },
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
