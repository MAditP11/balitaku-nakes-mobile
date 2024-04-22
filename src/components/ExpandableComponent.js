import React, { useState, useEffect } from 'react';
import { Image, TouchableOpacity, View, Text, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
const { height, width } = Dimensions.get('window');

export const ExpandableComponent = ({ item, onClickFunction }) => {
  const [layoutHeight, setLayoutHeight] = useState(0);

  useEffect(() => {
    if (item.isExpanded) {
      setLayoutHeight(null);
    } else {
      setLayoutHeight(0);
    }
  }, [item.isExpanded]);

  return (
    <View width={width / 1.15} style={{ backgroundColor: 'red' }}>
      <TouchableOpacity activeOpacity={0.8} onPress={onClickFunction}>
        <View style={{ marginVertical: 10, borderRadius: 1, elevation: 1, paddingVertical: 5 }}>
          <View style={{ flexDirection: 'row' }}>
            <View width={width / 7} style={{ alignItems: 'center', justifyContent: 'center' }}>
              <Image source={require('../assets/images/logo.png')} style={{ width: 45, height: 45, borderRadius: 100, backgroundColor: Colors.grey }}></Image>
            </View>
            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
              <Text style={{ paddingHorizontal: 15, fontSize: 16, fontWeight: 'bold', height: 24 }}>{item.user}</Text>
            </View>
            <Ionicons style={{ position: 'absolute', right: 10, top: 15 }} name="caret-down-outline" size={15}></Ionicons>
          </View>
        </View>
      </TouchableOpacity>
      <View style={{ paddingHorizontal: 30, height: layoutHeight, overflow: 'hidden' }}>
        {item.children.map((item, key) => {
          <TouchableOpacity key={key} style={{ flexDirection: 'row' }}>
            <Text>
              {key}. {item.name}
            </Text>
          </TouchableOpacity>;
        })}
      </View>
    </View>
  );
};
