import React, { useEffect, useState } from 'react';
import { getChildren } from '../../../../apis/Children';
import { View, Text, Dimensions, Image, TouchableOpacity, FlatList, TextInput } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Colors, Images } from '../../../../constants';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import axios from '../../../../services/Axios';
const { height, width } = Dimensions.get('window');

const Normal = () => {
  const [normal, setNormal] = useState([]);
  const [normal2, setNormal2] = useState([]);
  const nav = useNavigation();
  useEffect(() => {
    getChildrenData();
  }, []);

  const getChildrenData = async () => {
    AsyncStorage.getItem('token').then((token) => {
      getChildren(token).then((res) => {
        setNormal(res.data.data.normal);
        setNormal2(res.data.data.normal);
      });
    });
  };

  const setFlatSearch = (key) => {
    if (key === '') {
      setNormal(normal2);
    } else {
      let tempNormal = [];
      normal.filter((val) => {
        let name = val.name;
        if (name.toLowerCase().includes(key.toLowerCase())) {
          tempNormal.push(val);
        }
      });
      setNormal(tempNormal);
    }
  };

  const kidsAge = (value) => {
    const today = new Date();
    const birthDate = new Date(value);
    const age_now = today.getFullYear() - birthDate.getFullYear();
    const m = (today.getMonth() - birthDate.getMonth()) * -1;
    if (age_now === 0) {
      return `${m} Bulan`;
    } else {
      return `${age_now} Tahun ${m} Bulan`;
    }
  };
  return (
    <View style={{ alignItems: 'center' }}>
      {/* Search button */}
      <View width={width / 1.15} height={height / 17} style={{ flexDirection: 'row', borderWidth: 1, borderRadius: 10, marginVertical: 10, borderColor: Colors.PRIMARY_PURPLE }}>
        <View width={width / 7} style={{ alignItems: 'center', justifyContent: 'center' }}>
          <Ionicons name="search-outline" size={24} color={Colors.grey}></Ionicons>
        </View>
        <TextInput keyboardType="default" placeholder="Cari" width={width / 1.39} onChangeText={(text) => setFlatSearch(text)} style={{ paddingHorizontal: 10, fontSize: 16 }}></TextInput>
      </View>
      {/* <ScrollView width={width} style={{ flex: 1 }}> */}
      <View style={{ alignItems: 'center', marginTop: 10 }}>
        <View width={width / 1.15} height={height * 1} style={{ alignItems: 'center' }}>
          {normal === undefined ? (
            <View height={height / 1.25} width={width / 1.15}>
              <Text>Maaf data anak tidak tersedia atau belum dibuat</Text>
            </View>
          ) : (
            <View height={height / 1.25} width={width / 1.15}>
              <FlatList
                data={normal}
                renderItem={(item) => {
                  return (
                    <TouchableOpacity activeOpacity={0.8} onPress={() => nav.navigate('DetailIbuAnak', { data: item.item })}>
                      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginVertical: 10, borderBottomWidth: 1, borderColor: Colors.grey, paddingVertical: 5, paddingHorizontal: 5 }}>
                        <View style={{ flexDirection: 'column' }}>
                          <Text style={{ textTransform: 'capitalize' }}>{item.item.name}</Text>
                          <Text style={{ color: Colors.grey }}>{kidsAge(item.item.birth_date)}</Text>
                        </View>
                        <View style={{ flexDirection: 'row', paddingVertical: 3, paddingHorizontal: 10, borderRadius: 5, alignItems: 'center', backgroundColor: Colors.success }}>
                          <Image style={{ height: 15, width: 15 }} source={Images.normal}></Image>
                          <Text style={{ marginLeft: 5, color: Colors.DEFAULT_WHITE }}>Normal</Text>
                        </View>
                      </View>
                    </TouchableOpacity>
                  );
                }}
                keyExtractor={(item, index) => item.id}
              />
            </View>
          )}
        </View>
      </View>
      {/* </ScrollView> */}
    </View>
  );
};

export default Normal;
