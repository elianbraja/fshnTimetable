import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Ionicon from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

export default function EventCard(props) {
  return (
    <View style={styles(props).cardContainer}>

      <View style={styles(props).cardView}>
        <Text style={styles(props).cardSubjectItem}>{props.subject}</Text>
      </View>

      <View style={styles(props).cardView}>
        <Text style={styles(props).cardItem}>{props.time}</Text>
      </View>

      <View style={styles(props).cardView}>
        <View style={styles(props).cardViewRowDir}>
          <Ionicon name="location-sharp" size={20} color="#eff2ed" />
          <Text style={[styles(props).cardItem, {marginRight:15, marginLeft:5}]}>{props.location}</Text>
          <FontAwesome name="user" size={20} color="#eff2ed" />
          <Text style={[styles(props).cardItem, {marginLeft:5}]}>{props.teacher}</Text>
          <View style={[styles(props).roundText, {marginLeft:5}]}><Text stye={{fontWeight:"500"}}>{props.type}</Text></View>
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

  roundText:{
    borderRadius:50,
    width:25,
    height:25,
    backgroundColor:"#eff2ed",
    justifyContent:"center",
    alignItems:"center"
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
