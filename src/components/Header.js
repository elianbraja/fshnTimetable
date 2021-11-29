import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function Header() {
  return (
    <View style={styles.viewContainer}>
      <Text>Header</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  viewContainer: {
    padding: 30,
    height: 80,
    backgroundColor: '#F8F8F8',
    alignItems:"center",
    justifyContent: "flex-end"
  },
});
