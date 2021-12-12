import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function Header() {
  return (
    <View style={styles.viewContainer}>
      <Text>{null}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  viewContainer: {
    height: 5,
    backgroundColor: '#24A0ED',
    alignItems:"center",
    justifyContent: "flex-end"
  },
});
