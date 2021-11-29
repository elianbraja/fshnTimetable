import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function DaySelector(props) {

  function changeDay(index){
    props.changeDay(index)
  }

  return (
    <View style={styles.viewContainer}>
    {["Mon", "Tue", "Wed", "Thu", "Fri"].map((day, index) => (
      <Text style={[styles.elements, props.day_index == index+1 ? {fontWeight:"bold", opacity:null} : null]} onPress={() => changeDay(index+1)}>{day}</Text>
    ))}
    </View>
  );
}

const styles = StyleSheet.create({
  viewContainer: {
    display: "flex",
    flexDirection:"row",
    marginTop: 15,
    fontFamily: "OpenSans-Bold"
  },
  elements: {
    flex: 1,
    textAlign:"center",
    opacity:0.5
  }
});
