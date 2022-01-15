import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { PulseIndicator } from 'react-native-indicators';

export default function EventCard(props) {
  const [currentFont, setCurrentFont] = useState(25);

  return (
    <View style={styles(props).cardContainer}>
      <View style={styles(props).cardView}>
        <View style={{flex: 1}}>
          <Text
            numberOfLines={ 1 }
            adjustsFontSizeToFit
            style={ [styles(props).cardSubjectItem, { fontSize: currentFont }] }
            onTextLayout={ (e) => {
              const { lines } = e.nativeEvent;
              if (lines.length > 1) {
                setCurrentFont(currentFont - 1);
              }
            }}
          >
            {props.subject}
          </Text>
        </View>
        <View>
          {props.step == "now" ? <PulseIndicator color='#d45920' size={30}/> : null}
        </View>
      </View>

      <View style={styles(props).cardViewRowDir}>
        <FontAwesome name="clock-o" size={20} color="#eff2ed" />
        <Text style={[styles(props).cardItem, {marginRight:15, marginLeft:5}]}>{props.time}</Text>
      </View>

      <View style={styles(props).cardView}>
        <View style={styles(props).cardViewRowDir}>

          <View style={styles(props).cardViewRowDir}>
            <FontAwesome name="map-marker" size={20} color="#eff2ed" />
            <Text style={[styles(props).cardItem, {marginRight:15, marginLeft:5}]}>{props.location}</Text>
            <FontAwesome name = {props.status=="student" ? "user" : "group"} size={20} color="#eff2ed" />
            <Text style={[styles(props).cardItem, {flex: 1, marginLeft:5}]}>{props.teacher}</Text>
          </View>

          <View>
            <View style={[styles(props).roundText, {marginLeft:5}]}><Text stye={{fontWeight:"500"}}>{props.type}</Text></View>
          </View>

        </View>
      </View>
    </View>
  );
}

const styles = (props) => StyleSheet.create({
  cardContainer: {
    borderWidth: 1,
    backgroundColor: props.step == "completed" ? "#d6d6d6" : props.color,
    borderColor: props.step == "completed" ? "#d6d6d6" : props.color,
    height: 100,
    borderRadius: 10,
    marginTop: 10,
    padding: 5,
    paddingLeft: 20,
    paddingRight: 20
  },

  cardView:{
    flex: 1,
    justifyContent:"center",
    flexDirection:"row"
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
