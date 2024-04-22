import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from '../pages/SplashScreen';
import WelcomeScreen from '../pages/WelcomeScreen';
import SlideScreen from '../pages/SlideScreen';
import LoginScreen from '../pages/LoginScreen';
import OtpScreen from '../pages/OtpScreen';
import MainContainer from '../pages/navigation/MainContainer';
import EditProfilScreen from '../pages/EditProfilScreen';

import LaporanPosyandu from '../pages/laporanPosyandu/LaporanPosyandu';
import AddLaporanPosyandu from '../pages/laporanPosyandu/AddLaporanPosyandu';
import DetailLaporanPosyandu from '../pages/laporanPosyandu/DetailLaporanPosyandu';
import EditLaporanPosyandu from '../pages/laporanPosyandu/EditLaporanPosyandu';

import LaporanPenanganan from '../pages/laporanPenanganan/LaporanPenanganan';
import AddLaporanPenanganan from '../pages/laporanPenanganan/AddLaporanPenanganan';
import DetailLaporanPenanganan from '../pages/laporanPenanganan/DetailLaporanPenanganan';
import EditLaporanPenanganan from '../pages/laporanPenanganan/EditLaporanPenanganan';

import DetailAnak from '../pages/ibuAnak/detailAnak';
import EditHasilPemeriksaan from '../pages/ibuAnak/detailAnak/EditHasilPemeriksaan';
import AksiPenanganan from '../pages/ibuAnak/detailAnak/AksiPenanganan';

import IbuAnak from '../pages/ibuAnak/IbuAnak';

import VAPage from '../pages/VAPages/VAPage';

const Stack = createStackNavigator();

const Route = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="SplashScreen" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="SplashScreen" component={SplashScreen} />
        <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} />
        <Stack.Screen name="SlideScreen" component={SlideScreen} />
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="OtpScreen" component={OtpScreen} />
        <Stack.Screen name="MainContainer" component={MainContainer} />
        <Stack.Screen name="EditProfilScreen" component={EditProfilScreen} />
        <Stack.Screen name="LaporanPosyandu" component={LaporanPosyandu} />
        <Stack.Screen name="AddLaporanPosyandu" component={AddLaporanPosyandu} />
        <Stack.Screen name="DetailLaporanPosyandu" component={DetailLaporanPosyandu} />
        <Stack.Screen name="EditLaporanPosyandu" component={EditLaporanPosyandu} />
        <Stack.Screen name="LaporanPenanganan" component={LaporanPenanganan} />
        <Stack.Screen name="AddLaporanPenanganan" component={AddLaporanPenanganan} />
        <Stack.Screen name="DetailLaporanPenanganan" component={DetailLaporanPenanganan} />
        <Stack.Screen name="EditLaporanPenanganan" component={EditLaporanPenanganan} />
        <Stack.Screen name="IbuDanAnak" component={IbuAnak} />
        <Stack.Screen name="DetailIbuAnak" component={DetailAnak} />
        <Stack.Screen name="EditDataAnak" component={EditHasilPemeriksaan} />
        <Stack.Screen name="AksiPenanganan" component={AksiPenanganan} />

        <Stack.Screen name="VAPage" component={VAPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default Route;
