import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Timetable from './screens/Timetable'
import Header from './components/Header'

export default function App() {
  return (
    <View style={styles.container}>
      <Header/>
      <Timetable/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
});
