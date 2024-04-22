import React, { useEffect, useState } from 'react';
import { getMaster } from '../../../apis/Master';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from '../../../services/Axios';
import { Colors, Images } from '../../../constants';
import { View, LayoutAnimation, Text, Dimensions, StyleSheet, StatusBar, Image, TouchableOpacity, ScrollView, FlatList, TextInput } from 'react-native';
const { height, width } = Dimensions.get('window');
import { Ionicons } from '@expo/vector-icons';

const ExpandableComponent = ({ item, onClickFunction }) => {
  const [layoutHeight, setLayoutHeight] = useState(0);

  useEffect(() => {
    item.status === 'active';
    if (item.status === false) {
      setLayoutHeight(null);
    } else {
      setLayoutHeight(0);
    }
  }, [item.status]);

  const getUserImage = (value) => {
    if (value) {
      let uris = axios.defaults.baseURL + '/images/users/' + value;
      let uriss = uris.replace('api/', '');
      return <Image source={{ uri: uriss }} style={{ width: 45, height: 45, borderRadius: 100, borderWidth: 1 }} />;
    } else {
      return (
        <View style={{ width: 45, height: 45, borderRadius: 100, backgroundColor: Colors.info, alignItems: 'center', justifyContent: 'center' }}>
          <Ionicons name="person-outline" size={35} color={Colors.grey}></Ionicons>
        </View>
      );
    }
  };

  return (
    <View width={width / 1.15} style={{ marginVertical: 10, borderRadius: 5, borderWidth: 1, borderColor: Colors.grey, backgroundColor: Colors.info, paddingVertical: 5 }}>
      <TouchableOpacity activeOpacity={0.8} onPress={onClickFunction}>
        <View style={{ flexDirection: 'row', padding: 3 }}>
          {getUserImage(item ? item.photos : null)}
          <View style={{ flexDirection: 'column', justifyContent: 'center', paddingHorizontal: 10 }}>
            <Text style={{ fontSize: 16, fontWeight: 'bold', height: 24, textTransform: 'capitalize' }}>{item.name}</Text>
            {/* <TouchableOpacity activeOpacity={0.8} onPress={() => nav.navigate('DetailIbuAnak', { data: item })}>
                <Text style={{ fontSize: 10, color: Colors.grey, textDecorationLine: 'underline' }}>Lihat Detail</Text>
              </TouchableOpacity> */}
          </View>
          <Ionicons style={{ position: 'absolute', right: 10, top: 20 }} name="caret-down-outline" size={12}></Ionicons>
        </View>
      </TouchableOpacity>
      <View style={{ paddingLeft: 60, paddingRight: 20, height: layoutHeight, overflow: 'hidden' }}>
        {item.children.map((item, key) => (
          <View key={key} style={{ flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 4 }}>
            <View style={{ justifyContent: 'center', flexDirection: 'row', alignItems: 'center' }}>
              <Image style={{ height: 20, width: 20, marginRight: 5 }} source={item.sex === 'laki-laki' ? Images.laki_laki : item.sex === 'perempuan' ? Images.perempuan : null}></Image>
              <Text style={{ fontSize: 14, textTransform: 'capitalize' }}>{item.name}</Text>
            </View>

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                width: '40%',
                paddingVertical: 3,
                borderRadius: 5,
                alignItems: 'center',
                backgroundColor: item.checkup[0].status === 'normal' ? Colors.success : item.checkup[0].status === 'gejala' ? Colors.warning : Colors.danger,
              }}
            >
              <Image style={{ width: 15, height: 15 }} source={item.checkup[0].status === 'normal' ? Images.normal : item.checkup[0].status === 'gejala' ? Images.gejala : Images.stunting}></Image>
              <Text style={{ marginLeft: 5, color: Colors.DEFAULT_WHITE }}>{item.checkup[0].status}</Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
};

const Ibuu = () => {
  const [master, setMaster] = useState([]);
  const [master2, setMaster2] = useState([]);

  useEffect(() => {
    getMasters();
  }, []);

  const getMasters = async () => {
    await AsyncStorage.getItem('token').then(async (token) => {
      await getMaster(token).then((res) => {
        setMaster(res.data.data);
        setMaster2(res.data.data);
        // console.log("ibu", master);
      });
    });
  };

  const setFlatSearch = (key) => {
    if (key === '') {
      setMaster(master2);
    } else {
      let tempMother = [];
      master.filter((val) => {
        let name = val.name;
        if (name.toLowerCase().includes(key.toLowerCase())) {
          tempMother.push(val);
        }
      });
      setMaster(tempMother);
    }
  };

  console.log(master);

  const updateLayout = (index) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    const array = [...master];
    array.map((value, placeIndex) => {
      placeIndex === index ? (array[placeIndex]['status'] = !array[placeIndex]['status']) : (array[placeIndex]['status'] = true);
    });
    setMaster(array);
  };

  return (
    <View style={{ alignItems: 'center' }}>
      {/* Search button */}
      <View width={width / 1.15} height={height / 17} style={{ flexDirection: 'row', borderWidth: 1, borderRadius: 10, marginBottom: 20, marginTop: 10, borderColor: Colors.PRIMARY_PURPLE }}>
        <View width={width / 7} style={{ alignItems: 'center', justifyContent: 'center' }}>
          <Ionicons name="search-outline" size={24} color={Colors.grey}></Ionicons>
        </View>
        <TextInput keyboardType="default" placeholder="Cari" width={width / 1.39} onChangeText={(text) => setFlatSearch(text)} style={{ paddingHorizontal: 10, fontSize: 16 }}></TextInput>
      </View>

      <ScrollView width={width} style={{}}>
        <View height={height * 1} style={{ alignItems: 'center' }}>
          {/* Content Card */}
          {master === null ? (
            <Text>Maaf data ibu tidak tersedia atau belum dibuat</Text>
          ) : (
            master.map((item, key) => (
              <ExpandableComponent
                key={item.name}
                item={item}
                onClickFunction={() => {
                  updateLayout(key);
                }}
              />
            ))
          )}
        </View>
      </ScrollView>
    </View>
  );
};

export default Ibuu;
