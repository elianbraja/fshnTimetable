import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Ionicon from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

export default function EventCard(props) {
  return (
    <View style={styles(props).cardContainer}>

      <View style={styles(props).cardView}>
        <Text style={styles(props).cardSubjectItem}>Network</Text>
      </View>

      <View style={styles(props).cardView}>
        <Text style={styles(props).cardItem}>{"09:00 --> 10:00"}</Text>
      </View>

      <View style={styles(props).cardView}>
        <View style={styles(props).cardViewRowDir}>
          <Ionicon name="location-sharp" size={20} color="#eff2ed" />
          <Text style={[styles(props).cardItem, {marginRight:15, marginLeft:5}]}>C302</Text>
          <FontAwesome name="user" size={20} color="#eff2ed" />
          <Text style={[styles(props).cardItem, {marginLeft:5}]}>{props.color}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = (props) => StyleSheet.create({
  cardContainer: {
    borderWidth: 1,
    backgroundColor: props.color,
    borderColor: props.color,
    height: 100,
    borderRadius: 10,
    marginTop: 10,
    padding: 5,
    paddingLeft: 20
  },

  cardView:{
    flex: 1,
    justifyContent:"center"
  },

  cardViewRowDir:{
    flex: 1,
    flexDirection:"row",
    alignItems:"center"
  },

  cardSubjectItem: {
    color: "#eff2ed",
    fontWeight: "bold",
    height:"100%",
    fontSize: 25
  },

  cardItem:{
    color: "#eff2ed",
    fontWeight: "bold"
  }
});
