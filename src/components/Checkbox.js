import { Pressable, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const CheckBox = (props) => {
  const iconName = props.isChecked ? 'checkbox-marked' : 'checkbox-blank-outline';

  return (
    <View style={{ justifyContent: 'flex-start', alignItems: 'center', flexDirection: 'row', marginTop: 5, marginHorizontal: 5 }}>
      <Pressable onPress={props.onPress}>
        <MaterialCommunityIcons name={iconName} size={24} color="#000" onTintColor="#007aff" />
      </Pressable>
      <Text style={{ fontSize: 16, color: '#000', marginLeft: 5 }}>{props.title}</Text>
    </View>
  );
};

export default CheckBox;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 5,
    marginHorizontal: 5,
  },
  title: {
    fontSize: 16,
    color: '#000',
    marginLeft: 5,
    // fontWeight: '600',
  },
});
