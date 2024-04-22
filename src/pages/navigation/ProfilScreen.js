import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Dimensions, TouchableOpacity, Image, StatusBar, Button, Modal, StyleSheet, Text, View, RefreshControl, Alert, ScrollView } from 'react-native';
import { Colors, Images } from '../../constants';
import { deleteUser } from '../../apis/Nakes';
import { deleteImage } from '../../apis/Nakes';
import { getUser } from '../../apis/Nakes';
import * as ImagePicker from 'expo-image-picker';
import { Camera, Constants } from 'expo-camera';
import TopBar from '../../components/TopBar';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from '../../services/Axios';
const { height, width } = Dimensions.get('window');

function ProfilScreen({ navigation }) {
  const [photo, setTakePhoto] = useState(null);
  const [me, setMe] = useState([]);

  const [permission, requestPermission] = Camera.useCameraPermissions();
  const cameraRef = useRef(null);

  const [viewModal, setViewModal] = useState(false);
  const [viewModal2, setViewModal2] = useState(false);
  const [viewModal3, setViewModal3] = useState(false);
  const [viewModal4, setViewModal4] = useState(false);
  const [viewModal5, setViewModal5] = useState(false);

  useEffect(() => {
    getNakesData();
  }, []);

  const getNakesData = async () => {
    await AsyncStorage.getItem('token').then(async (token) => {
      await getUser(token).then((res) => {
        setMe(res.data.data);
      });
    });
  };

  const logout = async () => {
    await AsyncStorage.clear().then(() => navigation.navigate('LoginScreen'));
  };

  const deleteUserr = async () => {
    await AsyncStorage.getItem('token').then(async (token) => {
      await deleteUser(token, me.user.id).then((res) => {});
    });
    navigation.navigate('LoginScreen');
  };

  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await getNakesData();
    setRefreshing(false);
  }, []);

  // useEffect(() => {
  //   (async () => {
  //     const { status } = await Camera.requestCameraPermissionsAsync();
  //     requestPermission(status === 'granted');
  //   })();
  // }, []);

  if (!permission) {
    // Camera permissions are still loading
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet
    return (
      <View style={{ flex: 1, backgroundColor: Colors.DEFAULT_WHITE, alignItems: 'center', justifyContent: 'center' }}>
        <Text style={{ textAlign: 'center' }}>We need your permission to show the camera</Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  const deletePhotos = async () => {
    await AsyncStorage.getItem('token').then(async (token) => {
      let dataa = {
        id: me.user.id,
        photos: null,
      };

      await deleteImage(token, dataa).then((res) => {
        getNakesData();
      });
    });
    setCloseModal();
    Alert.alert('Foto Profil Berhasil di Hapus');
    navigation.navigate('MainContainer');
  };

  // function for photo from camera
  const takePhoto = async () => {
    if (cameraRef) {
      try {
        await AsyncStorage.getItem('token').then(async (token) => {
          let photo = await cameraRef.current.takePictureAsync({
            quality: 1,
          });
          console.log(photo);

          const data = new FormData();
          data.append('image', {
            uri: photo.uri,
            name: 'image.jpg',
            type: 'imag/jpg',
          });
          if (token) {
            await axios
              .post('/nakes/me/change-photos', data, {
                headers: {
                  Authorization: `Bearer ${token}`,
                  'Content-Type': 'multipart/form-data',
                },
              })
              .then(async (res) => {
                console.log('gambar', res.data.image);
                getNakesData();
              })
              .catch((err) => {
                console.log(err);
              });
          }
          setViewModal5(false);
          setViewModal(false);
        });
      } catch (e) {
        console.log(e);
      }
    }
  };

  // function for add photo from galery
  const PickPhoto = async () => {
    await AsyncStorage.getItem('token').then(async (token) => {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });
      console.log(result);
      if (result.canceled) {
        return;
      }

      const data = new FormData();
      data.append('image', {
        uri: result.uri,
        name: 'image.jpeg',
        type: 'image/jpeg',
      });
      if (token) {
        await axios
          .post('/nakes/me/change-photos', data, {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'multipart/form-data',
            },
          })
          .then(async (res) => {
            console.log('gambar', res.data.image);
            getNakesData();
          })
          .catch((err) => {
            console.log(err);
          });
      }
    });
  };

  const getUserImage = (value) => {
    if (value) {
      let uris = axios.defaults.baseURL + '/images/users/' + value;
      let uriss = uris.replace('api/', '');
      return <Image source={{ uri: uriss }} style={styles.photoProfil} />;
    } else {
      return (
        <View style={styles.photoProfil}>
          <Ionicons name="person-outline" size={80} color={Colors.grey}></Ionicons>
        </View>
      );
    }
  };

  const setCloseModal = () => {
    if (viewModal) {
      setViewModal(false);
    } else if (viewModal2) {
      setViewModal2(false);
    } else if (viewModal3) {
      setViewModal3(false);
    } else if (viewModal4) {
      setViewModal4(false);
    } else if (viewModal5) {
      setViewModal5(false);
    }
  };

  // Function modal activation from camera
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
                  const r = await takePhoto();
                  Alert.alert('Berhasil Upload Foto Profil');
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

  // Modal option for add photo
  const modalAddPhoto = () => {
    return (
      <View
        style={{
          height: height,
          width: width,
          backgroundColor: 'rgba(0,0,0,0.7)',
        }}
      >
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => {
            setCloseModal();
          }}
          style={{ width: width, height: '80%' }}
        ></TouchableOpacity>
        <View
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            width: width,
            height: '20%',
          }}
        >
          <View
            style={{
              backgroundColor: '#fff',
              borderTopStartRadius: 20,
              borderTopEndRadius: 20,
              padding: 20,
              flex: 1,
            }}
          >
            <View>
              <Text style={{ color: Colors.grey, fontSize: 18, marginBottom: 10 }}>Foto Profil</Text>
              <TouchableOpacity activeOpacity={0.8} onPress={() => deletePhotos()} style={{ position: 'absolute', right: 10 }}>
                <Ionicons name="trash-outline" size={20} color={Colors.grey}></Ionicons>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => {
                  setViewModal5(true);
                }}
                style={{ flexDirection: 'row', alignItems: 'center', width: width / 3 }}
              >
                <Ionicons name="camera-outline" size={30} color={Colors.grey} style={{ marginRight: 7 }}></Ionicons>
                <Text style={{ color: Colors.grey, fontSize: 18 }}>Kamera</Text>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => {
                  PickPhoto();
                  setCloseModal();
                }}
                style={{ flexDirection: 'row', alignItems: 'center', width: width / 3 }}
              >
                <Ionicons name="images-outline" size={30} color={Colors.grey} style={{ marginRight: 7 }}></Ionicons>
                <Text style={{ color: Colors.grey, fontSize: 18 }}>Galeri</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <Modal animationType="slide" transparent={true} visible={viewModal5} onRequestClose={() => {}}>
          {modalCameraView()}
        </Modal>
      </View>
    );
  };

  // modal for exit account
  const modalExitAccount = () => {
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
        {/* <TouchableOpacity activeOpacity={0.8} onPress={() => setCloseModal()} style={{position:'absolute', width: width, height: '60%' }}></TouchableOpacity> */}
        <View
          style={{
            width: width / 1.3,
            height: '30%',
          }}
        >
          <View
            style={{
              backgroundColor: '#fff',
              borderRadius: 20,
              padding: 30,
              flex: 1,
              alignItems: 'center',
            }}
          >
            <View>
              <Text style={{ color: Colors.grey, fontSize: 18, marginBottom: 10, textAlign: 'center' }}>Anda yakin ingin keluar?</Text>
              <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', width: '100%' }}>
                <TouchableOpacity activeOpacity={0.8} onPress={() => setCloseModal()} style={{ paddingVertical: 5, width: width / 5, borderWidth: 1, borderRadius: 10, alignItems: 'center' }}>
                  <Text>Batal</Text>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={0.8} onPress={() => logout()} style={{ paddingVertical: 5, width: width / 5, borderWidth: 1, borderRadius: 10, alignItems: 'center' }}>
                  <Text>Keluar</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </View>
    );
    y67;
  };

  // modal for delete account
  const modalDeleteAccount = () => {
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
        {/* <TouchableOpacity activeOpacity={0.8} onPress={() => setCloseModal()} style={{position:'absolute', width: width, height: '60%' }}></TouchableOpacity> */}
        <View
          style={{
            width: width / 1.3,
            height: '30%',
          }}
        >
          <View
            style={{
              backgroundColor: '#fff',
              borderRadius: 20,
              padding: 25,
              flex: 1,
              alignItems: 'center',
            }}
          >
            <View>
              <Text style={{ color: Colors.grey, fontSize: 18, marginBottom: 10, textAlign: 'center' }}>Anda yakin ingin menghapus akun?</Text>
              <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', width: '100%' }}>
                <TouchableOpacity activeOpacity={0.8} onPress={() => setCloseModal()} style={{ paddingVertical: 5, width: width / 5, borderWidth: 1, borderRadius: 10, alignItems: 'center' }}>
                  <Text>Batal</Text>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={0.8} onPress={() => deleteUserr()} style={{ paddingVertical: 5, width: width / 5, borderWidth: 1, borderRadius: 10, alignItems: 'center' }}>
                  <Text>Hapus</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  };

  // modal option for exit or delete account
  const modalDrawer = () => {
    return (
      <View
        style={{
          height: height,
          width: width,
          backgroundColor: 'rgba(0,0,0,0.7)',
          alignItems: 'center',
        }}
      >
        <TouchableOpacity activeOpacity={0.8} onPress={() => setCloseModal()} style={{ position: 'absolute', width: width, height: '85%' }}></TouchableOpacity>
        <View
          style={{
            width: width,
            height: '15%',
            marginTop: 70,
          }}
        >
          <View
            style={{
              backgroundColor: '#fff',
              borderBottomStartRadius: 10,
              borderBottomEndRadius: 10,
              padding: 25,
              flex: 1,
            }}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <TouchableOpacity activeOpacity={0.8} onPress={() => setViewModal2(true)} style={{}}>
                <View style={{ flexDirection: 'row' }}>
                  <Ionicons name="exit-outline" size={20}></Ionicons>
                  <Text style={{ marginHorizontal: 5 }}>Keluar</Text>
                </View>
              </TouchableOpacity>
              <Text style={{ color: Colors.grey }}>{me.user ? me.user.name : '-'}</Text>
            </View>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={'transparent'} translucent />
      {/* Top content */}
      <TouchableOpacity activeOpacity={0.8} onPress={() => setViewModal4(true)} style={{ position: 'absolute', right: 30, top: 60, zIndex: 3 }}>
        <Ionicons name="ellipsis-vertical-circle-outline" size={24} color={Colors.DEFAULT_WHITE}></Ionicons>
      </TouchableOpacity>
      <TopBar
        height={height / 7}
        content={
          <View style={{ marginTop: 40, height: 25, marginLeft: 10 }}>
            <Text style={{ color: Colors.DEFAULT_WHITE, fontWeight: '700', fontSize: 18 }}>Profil</Text>
          </View>
        }
      />
      {/* Button for add or update profile photo */}
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => setViewModal(true)}
        style={{ position: 'absolute', left: 105, top: 185, backgroundColor: Colors.PRIMARY_PURPLE, borderRadius: 100, borderWidth: 5, borderColor: Colors.info, elevation: 5, zIndex: 5 }}
      >
        <Ionicons name="add-outline" size={20} color={Colors.info}></Ionicons>
      </TouchableOpacity>

      {/* Photo Profil */}
      {getUserImage(me.user ? me.user.photos : null)}
      <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
        {/* Container Data Profil */}
        <View elevation={1} width={width / 1.1} style={styles.editProfil}>
          {/* Button edit data profil */}
          <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate('EditProfilScreen', { data: me })} style={{ position: 'absolute', right: 10, top: 10 }}>
            <Image source={require('../../images/editButton.png')}></Image>
          </TouchableOpacity>
          {/* Content data profil */}
          <View style={{ marginTop: 35 }}>
            <Text style={{ fontSize: 20, fontWeight: '700', lineHeight: 25, textTransform: 'capitalize' }}>{me.user ? me.user.name : '-'}</Text>
            <Text style={{ fontSize: 14, fontWeight: '400', lineHeight: 17 }}>{me.user ? me.user.nik : '-'}</Text>
            {/* <Text style={{ fontSize: 14, fontWeight: '400', lineHeight: 17 }}> </Text> */}
          </View>
          <View style={styles.profilCon}>
            <View style={styles.dataProfil}>
              <Text style={{ fontSize: 16, fontWeight: '700', lineHeight: 20 }}>No.HP</Text>
              <Text style={{ fontSize: 16, fontWeight: '700', color: Colors.grey }}>{me.user ? me.user.phone : '-'}</Text>
            </View>
            <View style={styles.dataProfil}>
              <Text style={{ fontSize: 16, fontWeight: '700', lineHeight: 20 }}>Tanggal Lahir</Text>
              <Text style={{ fontSize: 16, fontWeight: '700', color: Colors.grey }}>{me.user ? new Date(me.user.birthDay).toISOString().substring(0, 10).split('-').reverse().join('-') : '-'}</Text>
            </View>
            <View style={styles.dataProfil}>
              <Text style={{ fontSize: 16, fontWeight: '700', lineHeight: 20 }}>Kecamatan</Text>
              <Text style={{ fontSize: 16, fontWeight: '700', color: Colors.grey }}>{me.user ? me.user.district : '-'}</Text>
            </View>
            <View style={styles.dataProfil}>
              <Text style={{ fontSize: 16, fontWeight: '700', lineHeight: 20 }}>Alamat</Text>
              <Text style={{ fontSize: 16, fontWeight: '700', color: Colors.grey }}>{me.user ? me.user.address : '-'}</Text>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10, marginBottom: 25 }}>
              <Text style={{ fontSize: 16, fontWeight: '700', lineHeight: 20 }}>Puskesmas</Text>
              <Text style={{ fontSize: 16, fontWeight: '700', color: Colors.grey }}>{me.puskesmas ? me.puskesmas.name : '-'}</Text>
            </View>
          </View>
        </View>
      </ScrollView>
      <Modal animationType="slide" transparent={true} visible={viewModal} onRequestClose={() => {}}>
        {modalAddPhoto()}
      </Modal>
      <Modal animationType="slide" transparent={true} visible={viewModal2} onRequestClose={() => {}}>
        {modalExitAccount()}
      </Modal>
      <Modal animationType="slide" transparent={true} visible={viewModal3} onRequestClose={() => {}}>
        {modalDeleteAccount()}
      </Modal>
      <Modal animationType="slide" transparent={true} visible={viewModal4} onRequestClose={() => {}}>
        {modalDrawer()}
      </Modal>
    </View>
  );
}

export default ProfilScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.DEFAULT_WHITE, alignItems: 'center' },
  photoProfil: { borderRadius: 100, backgroundColor: Colors.info, position: 'absolute', top: 125, left: 30, height: 100, width: 100, zIndex: 1, alignItems: 'center', paddingTop: 10 },
  editProfil: { marginTop: 70, paddingVertical: 20, paddingHorizontal: 10, borderRadius: 1.5, shadowOpacity: 0.1 },
  profilCon: { marginTop: 10, paddingHorizontal: 10, flexDirection: 'column' },
  dataProfil: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 },
});
