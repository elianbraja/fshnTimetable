import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import EventCard from './EventCard'
import ColorPicker from '../services/ColorPicker'
import DateSettings from '../services/DateSettings'

export default function SingleDayTimetable(props) {
  ds = new DateSettings(props.date)
  return (
    <View style={styles.container}>
      <View style={styles.datetime}>
        <Text style={styles.week_day}>{ds.getDayFromIndex(props.day_index)}</Text>
        <Text style={styles.date}>{ds.getMonth()} {ds.getDate()} {ds.getYear()}</Text>
      </View>
      <ScrollView style={{flex:1, marginLeft: 15, marginRight: 15}} showsVerticalScrollIndicator={false}>
        <View style={styles.event_count}>
          <Text style={styles.event_count_text}>{props.timetable.length} Events:</Text>
        </View>
          {props.timetable.map((event, index) => {
            return(
              <EventCard
                key={index}
                color={ColorPicker.getLightColor(props.day_index)}
                subject={event.subject}
                teacher={event.teacher}
                location={event.location}
                time={event.time}
                type={event.type}
              />
            )
          })}
          <View style={{height:25}}></View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container:{
    height:"100%",
    width:"100%",
    flex: 1
  },

  datetime: {
    marginTop: 15,
    height: "10%",
    fontFamily: "OpenSans-Bold",
    paddingLeft: 25
  },

  week_day: {
    fontSize:30,
    fontWeight:"bold"
  },

  date: {
    fontSize:15,
    opacity: 0.5,
    marginTop: 5
  },

  event_count: {
    borderWidth: 1,
    backgroundColor:"#edf0f5",
    borderColor: "#edf0f5",
    height: 40,
    borderRadius: 10,
    justifyContent:"center",
    paddingLeft: 10,
    marginTop: 10
  },

  event_count_text:{
    fontSize: 18,
    fontWeight: '500'
  }
});
