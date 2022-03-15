import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  //전체 화면 style
  container: {
    flex: 1,
    backgroundColor: '#40E0D0',
    alignContent: 'space-between',
  },

  //사용자 선택 화면 style
  page_component: {
    width: wp('100%'),
    height: hp('81%'),
    backgroundColor: '#fff',
  },

  //하단 메뉴 컴포넌트 style
  menu_component: {
    width: wp('100%'),
    height: hp('7%'),
    flexDirection: 'row',
    alignItems: 'center',
  },
});
