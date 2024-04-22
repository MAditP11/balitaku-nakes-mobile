import { React, useState, useEffect, useRef } from 'react';
import axios from '../../../services/Axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Dimensions, TouchableOpacity, StatusBar, ScrollView, Modal, Text, TextInput, View, Image, Alert } from 'react-native';
import Checkbox from 'expo-checkbox';
import { setPenanganan } from '../../../apis/AksiPenanganan';
import { Colors } from '../../../constants';
import TopBar from '../../../components/TopBar';
import ButtonBack from '../../../components/ButtonBack';
import { Ionicons } from '@expo/vector-icons';
import { Camera, Constants } from 'expo-camera';
const { height, width } = Dimensions.get('window');

const pasokanState = {
  tablet_tambah_darah: false,
  suplemen_gizi_mikro_Taburia: false,
  suplemen_gizi_makro_PMT: false,
  obat_cacing: false,
  vitamin_a: false,
  makanan_tambahan: false,
  obat_sirup_paracetamol: false,
};
const sosialisasiState = {
  asi_eksklusif: false,
  mpasi: false,
  makanan_dan_garam_beryodium: false,
  kurang_gizi: false,
  jaminan_kesehatan_nasional: false,
};
const sanitasiState = {
  lingkungan: false,
  air: false,
};

function AksiPenanganan({ navigation, route }) {
  const { data } = route.params;
  const [statePasokan, setStatePasokan] = useState(pasokanState);
  const [stateSosialisasi, setStateSosialisasi] = useState(sosialisasiState);
  const [stateSanitasi, setStateSanitasi] = useState(sanitasiState);
  const [pasokanLain, setPasokanLain] = useState('');
  const [sosialisasiLain, setSosialisasiLain] = useState('');
  const [penangananLain, setPenangananLain] = useState('');
  let [penangananImage, setPenangananImage] = useState([]);

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
        const link = `${url}/nakes/aksi_penanganan/upload/${id}`;

        await fetch(link, {
          method: 'POST',
          body: data,
          headers: config,
        });
      });
    });
  };

  const submit = async () => {
    let pasokann = [];
    Object.entries(statePasokan).map(([key, value]) => {
      if (value === true) {
        pasokann.push(key);
      }
    });

    let sosialisasii = [];
    Object.entries(stateSosialisasi).map(([key, value]) => {
      if (value === true) {
        sosialisasii.push(key);
      }
    });

    let sanitasii = [];
    Object.entries(stateSanitasi).map(([key, value]) => {
      if (value === true) {
        sanitasii.push(key);
      }
    });

    await AsyncStorage.getItem('token').then(async (token) => {
      let dataa = {
        checkup_id: data.id,
        pasokan: pasokann.join(', '),
        pasokan_lainnya: pasokanLain,
        sosialisasi: sosialisasii.join(', '),
        sosialisasi_lainnya: sosialisasiLain,
        sanitasi: sanitasii.join(', '),
        penanganan_lainnya: penangananLain,
      };
      await setPenanganan(token, dataa).then(async (res) => {
        await uploadImage(penangananImage, res.data.data.id);
      });
    });
    navigation.navigate('IbuDanAnak');
  };

  const [photo, setTakePhoto] = useState([]);
  const [permission, requestPermission] = Camera.useCameraPermissions();

  const cameraRef = useRef(null);

  const [viewModal, setViewModal] = useState(false);
  const [viewModal2, setViewModal2] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      requestPermission(status === 'granted');
    })();
  }, []);

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: 'center' }}>We need your permission to show the camera</Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  const takePhoto = async () => {
    const result = await cameraRef.current.takePictureAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    photo.push(result.uri);
    setViewModal2(false);
    setViewModal(false);
    if (result) {
      return penangananImage.push(result);
    } else {
      return null;
    }
  };

  // Modal for camera
  const modalCameraView = () => {
    return (
      <View
        style={{
          height: height,
          width: width,
          backgroundColor: 'rgba(0,0,0,0.7)',
        }}
      >
        <Camera autoFocus={Constants.AutoFocus.on} style={{ flex: 1, width: width }} ref={cameraRef}>
          <View
            style={{
              position: 'absolute',
              bottom: 0,
              flexDirection: 'row',
              flex: 1,
              width: '100%',
              padding: 20,
              justifyContent: 'space-between',
            }}
          >
            <View
              style={{
                alignSelf: 'center',
                flex: 1,
                alignItems: 'center',
              }}
            >
              <TouchableOpacity
                onPress={async () => {
                  await takePhoto();
                }}
                style={{
                  width: 70,
                  height: 70,
                  bottom: 0,
                  borderRadius: 50,
                  backgroundColor: '#fff',
                }}
              />
            </View>
          </View>
        </Camera>
      </View>
    );
  };

  // Modal option camera
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
              <Image source={require('../../../images/close.png')} />
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
            <TouchableOpacity activeOpacity={0.8} onPress={() => setViewModal2(true)}>
              <View style={{ alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
                <Ionicons name="camera-outline" size={40}></Ionicons>
                <Text style={{ fontSize: 20 }}>Ambil Foto</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
        <Modal animationType="slide" transparent={true} visible={viewModal2} onRequestClose={() => {}}>
          {modalCameraView()}
        </Modal>
      </View>
    );
  };

  return (
    <View style={{ alignItems: 'center', flex: 1 }}>
      <StatusBar barStyle="light-content" backgroundColor={'transparent'} translucent />
      <TopBar height={height / 7} content={<ButtonBack title={'Aksi Penanganan'} />} />
      <ScrollView width={width}>
        <View style={{ alignItems: 'center' }}>
          <View width={width / 1.2} style={{ marginVertical: 20 }}>
            <Text>Beri tanda centang untuk penanganan yang sudah anda lakukan</Text>
            {/* Pasokan */}
            <Text style={{ marginTop: 10 }}>Pasokan</Text>
            <View>
              <View style={{ justifyContent: 'flex-start', alignItems: 'center', flexDirection: 'row', marginTop: 5, marginHorizontal: 5 }}>
                <Checkbox
                  value={statePasokan.tablet_tambah_darah}
                  onValueChange={(value) =>
                    setStatePasokan({
                      ...statePasokan,
                      tablet_tambah_darah: value,
                    })
                  }
                />
                <Text style={{ fontSize: 16, color: '#000', marginLeft: 5 }}>Tablet Tambah Darah</Text>
              </View>
              <View style={{ justifyContent: 'flex-start', alignItems: 'center', flexDirection: 'row', marginTop: 5, marginHorizontal: 5 }}>
                <Checkbox
                  value={statePasokan.obat_cacing}
                  onValueChange={(value) =>
                    setStatePasokan({
                      ...statePasokan,
                      obat_cacing: value,
                    })
                  }
                />
                <Text style={{ fontSize: 16, color: '#000', marginLeft: 5 }}>Obat Cacing</Text>
              </View>
              <View style={{ justifyContent: 'flex-start', alignItems: 'center', flexDirection: 'row', marginTop: 5, marginHorizontal: 5 }}>
                <Checkbox
                  value={statePasokan.makanan_tambahan}
                  onValueChange={(value) =>
                    setStatePasokan({
                      ...statePasokan,
                      makanan_tambahan: value,
                    })
                  }
                />
                <Text style={{ fontSize: 16, color: '#000', marginLeft: 5 }}>Obat Cacing</Text>
              </View>
              <View style={{ flexDirection: 'row', marginTop: 5, marginLeft: 7 }}>
                <Text>Lain-lain:</Text>
                <TextInput onChangeText={(text) => setPasokanLain(text)} width={width / 1.7} height={height / 40} style={{ borderBottomWidth: 1, marginLeft: 5 }}></TextInput>
              </View>
            </View>

            {/* Sosialisasi */}
            <Text style={{ marginTop: 30 }}>Sosialisasi</Text>
            <View>
              <View style={{ justifyContent: 'flex-start', alignItems: 'center', flexDirection: 'row', marginTop: 5, marginHorizontal: 5 }}>
                <Checkbox
                  value={stateSosialisasi.asi_eksklusif}
                  onValueChange={(value) =>
                    setStateSosialisasi({
                      ...stateSosialisasi,
                      asi_eksklusif: value,
                    })
                  }
                />
                <Text style={{ fontSize: 16, color: '#000', marginLeft: 5 }}>Asi Ekslusif</Text>
              </View>
              <View style={{ justifyContent: 'flex-start', alignItems: 'center', flexDirection: 'row', marginTop: 5, marginHorizontal: 5 }}>
                <Checkbox
                  value={stateSosialisasi.kurang_gizi}
                  onValueChange={(value) =>
                    setStateSosialisasi({
                      ...stateSosialisasi,
                      kurang_gizi: value,
                    })
                  }
                />
                <Text style={{ fontSize: 16, color: '#000', marginLeft: 5 }}>Kurang Gizi/Gizi Buruk</Text>
              </View>
              <View style={{ flexDirection: 'row', marginTop: 5, marginLeft: 7 }}>
                <Text>Lain-lain:</Text>
                <TextInput onChangeText={(text) => setSosialisasiLain(text)} width={width / 1.7} height={height / 40} style={{ borderBottomWidth: 1, marginLeft: 5 }}></TextInput>
              </View>
            </View>

            {/* Sanitasi */}
            <Text style={{ marginTop: 30 }}>Sanitasi</Text>
            <View>
              <View style={{ justifyContent: 'flex-start', alignItems: 'center', flexDirection: 'row', marginTop: 5, marginHorizontal: 5 }}>
                <Checkbox
                  value={stateSanitasi.lingkungan}
                  onValueChange={(value) =>
                    setStateSanitasi({
                      ...stateSanitasi,
                      lingkungan: value,
                    })
                  }
                />
                <Text style={{ fontSize: 16, color: '#000', marginLeft: 5 }}>Lingkungan</Text>
              </View>
              <View style={{ justifyContent: 'flex-start', alignItems: 'center', flexDirection: 'row', marginTop: 5, marginHorizontal: 5 }}>
                <Checkbox
                  value={stateSanitasi.air}
                  onValueChange={(value) =>
                    setStateSanitasi({
                      ...stateSanitasi,
                      air: value,
                    })
                  }
                />
                <Text style={{ fontSize: 16, color: '#000', marginLeft: 5 }}>Air</Text>
              </View>
            </View>

            {/* Penanganan lainnya */}
            <Text style={{ marginTop: 30 }}>Penanganan Lainnya</Text>
            <View>
              <View style={{ marginTop: 5, marginLeft: 7 }}>
                <TextInput onChangeText={(text) => setPenangananLain(text)} width={width / 1.7} height={height / 40} style={{ borderBottomWidth: 1, marginLeft: 5 }}></TextInput>
              </View>
            </View>

            {/* Content add documentation */}
            <View style={{ borderWidth: 1, borderRadius: 10, marginTop: 30, padding: 20, backgroundColor: Colors.info }}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginBottom: 10 }}>
                {photo[0] === undefined ? (
                  <TouchableOpacity activeOpacity={0.8} onPress={() => setViewModal(true)}>
                    <View style={{ height: height / 10, width: width / 5, borderWidth: 1, justifyContent: 'center', alignItems: 'center' }}>
                      <Ionicons name="add-outline" size={40}></Ionicons>
                    </View>
                  </TouchableOpacity>
                ) : (
                  <Image source={{ uri: photo[0] }} style={{ height: height / 10, width: width / 5, borderWidth: 1, justifyContent: 'center', alignItems: 'center' }}></Image>
                )}
                {photo[1] === undefined ? (
                  <TouchableOpacity activeOpacity={0.8} onPress={() => setViewModal(true)}>
                    <View style={{ height: height / 10, width: width / 5, borderWidth: 1, justifyContent: 'center', alignItems: 'center' }}>
                      <Ionicons name="add-outline" size={40}></Ionicons>
                    </View>
                  </TouchableOpacity>
                ) : (
                  <Image source={{ uri: photo[1] }} style={{ height: height / 10, width: width / 5, borderWidth: 1, justifyContent: 'center', alignItems: 'center' }}></Image>
                )}
                {photo[2] === undefined ? (
                  <TouchableOpacity activeOpacity={0.8} onPress={() => setViewModal(true)}>
                    <View style={{ height: height / 10, width: width / 5, borderWidth: 1, justifyContent: 'center', alignItems: 'center' }}>
                      <Ionicons name="add-outline" size={40}></Ionicons>
                    </View>
                  </TouchableOpacity>
                ) : (
                  <Image source={{ uri: photo[2] }} style={{ height: height / 10, width: width / 5, borderWidth: 1, justifyContent: 'center', alignItems: 'center' }}></Image>
                )}
              </View>

              <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                {photo[3] === undefined ? (
                  <TouchableOpacity activeOpacity={0.8} onPress={() => setViewModal(true)}>
                    <View style={{ height: height / 10, width: width / 5, borderWidth: 1, justifyContent: 'center', alignItems: 'center' }}>
                      <Ionicons name="add-outline" size={40}></Ionicons>
                    </View>
                  </TouchableOpacity>
                ) : (
                  <Image source={{ uri: photo[3] }} style={{ height: height / 10, width: width / 5, borderWidth: 1, justifyContent: 'center', alignItems: 'center' }}></Image>
                )}
                {photo[4] === undefined ? (
                  <TouchableOpacity activeOpacity={0.8} onPress={() => setViewModal(true)}>
                    <View style={{ height: height / 10, width: width / 5, borderWidth: 1, justifyContent: 'center', alignItems: 'center' }}>
                      <Ionicons name="add-outline" size={40}></Ionicons>
                    </View>
                  </TouchableOpacity>
                ) : (
                  <Image source={{ uri: photo[4] }} style={{ height: height / 10, width: width / 5, borderWidth: 1, justifyContent: 'center', alignItems: 'center' }}></Image>
                )}
                {photo[5] === undefined ? (
                  <TouchableOpacity activeOpacity={0.8} onPress={() => setViewModal(true)}>
                    <View style={{ height: height / 10, width: width / 5, borderWidth: 1, justifyContent: 'center', alignItems: 'center' }}>
                      <Ionicons name="add-outline" size={40}></Ionicons>
                    </View>
                  </TouchableOpacity>
                ) : (
                  <Image source={{ uri: photo[5] }} style={{ height: height / 10, width: width / 5, borderWidth: 1, justifyContent: 'center', alignItems: 'center' }}></Image>
                )}
              </View>
            </View>

            {/* Button simpan */}
            <TouchableOpacity activeOpacity={0.8} onPress={() => submit()}>
              <View height={height / 15} style={{ marginTop: 30, alignItems: 'center', justifyContent: 'center', backgroundColor: Colors.PRIMARY_PURPLE, borderRadius: 10 }}>
                <Text style={{ color: Colors.DEFAULT_WHITE }}>Simpan</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      <Modal animationType="slide" transparent={true} visible={viewModal} onRequestClose={() => {}}>
        {modalView()}
      </Modal>
    </View>
  );
}

export default AksiPenanganan;
