import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function Header() {
  return (
    <View style={styles.viewContainer}>
      <View style={styles.bottomEffect}><Text>elian</Text></View>
    </View>
  );
}

const styles = StyleSheet.create({
  viewContainer: {
    height: 5,
    backgroundColor: '#24A0ED',
    alignItems:"flex-end",
    justifyContent: "flex-end"
  },
  bottomEffect: {
    backgroundColor:"red",
    width:"100%",
    height:20
  }
});
