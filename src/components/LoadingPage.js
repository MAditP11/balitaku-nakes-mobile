import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Modal, ActivityIndicator } from 'react-native';
import { Colors } from '../constants';

export default function LoadingPage({ show }) {
  const [loadingText, setLoadingText] = React.useState('Loading...');
  const textAniamtion = () => {
    setLoadingText('Loading . . .');
    if (show === true) {
      setLoadingText('Loading .');
      setTimeout(() => {
        setLoadingText('Loading . .');
        setTimeout(() => {
          setLoadingText('Loading . . .');
          setTimeout(() => {
            textAniamtion();
          }, 500);
        }, 500);
      }, 500);
    }
  };

  useEffect(() => {
    textAniamtion();
  }, []);

  return (
    <Modal visible={show} transparent={true} animationType="fade">
      <View style={styles.modalBody}>
        <View style={styles.modalContent}>
          <ActivityIndicator size="large" color="#fff" />
          <Text style={styles.loadingText}>{loadingText}</Text>
        </View>
      </View>
    </Modal>
  );
}

//stylesheet for the loading page
const styles = StyleSheet.create({
  modalBody: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '80%',
    backgroundColor: Colors.darkTransparent,
    padding: 20,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingText: {
    fontFamily: 'Mulish_600SemiBold',
    fontSize: 18,
    marginVertical: 10,
    color: Colors.light,
  },
});
