import React from 'react';
import { StyleSheet, Text, View, ScrollView, Image } from 'react-native';
import EventCard from './EventCard'
import ColorPicker from '../services/ColorPicker'
import DateSettings from '../services/DateSettings'
import DashedLine from 'react-native-dashed-line';

export default function SingleDayTimetable(props) {
  ds = new DateSettings(props.date)

  function getLabelByIndex(index){
    switch(index) {
      case 1:
        return 'Comming Next';
      case 2:
        return 'Completed';
    }
  }

  let events = ["now", "upcoming", "completed", null].map((status, status_index) => {
    let filtered_events = props.timetable.filter(event => event.status == status)
    return(
      <View>
        {filtered_events.length > 0 && ![0,3].includes(status_index)
          ?
            <View style={{position: "relative", marginTop: 20, marginBottom: 10}}>
              <View style={styles.separator_label}>
                <Text style={{color:"white", fontWeight:"bold"}}>{getLabelByIndex(status_index)}</Text>
              </View>
              <DashedLine
                dashLength={10}
                dashThickness={3}
                dashGap={5}
                dashColor='#c7c7c7'
              />
            </View>
          :
            null
        }
        {filtered_events.map((event, index) => {
          return(
            <EventCard
              key={index}
              color={ColorPicker.getLightColor(props.day_index)}
              subject={event.subject}
              teacher={event.teacher}
              location={event.location}
              time={event.time}
              type={event.type}
              status={props.status}
              step={event.status}
            />
          )
        })}
      </View>
    )
  })
  return (
    <View style={styles.container}>
      <View style={styles.datetime}>
        <Text style={styles.week_day}>{ds.getDayFromIndex(props.day_index)}</Text>
        <Text style={styles.date}>{ds.getMonth()} {ds.getDate()} {ds.getYear()}</Text>
      </View>

      <ScrollView style={{marginLeft: 15, marginRight: 15}} showsVerticalScrollIndicator={false}>
        <View style={styles.event_count}>
          <Text style={styles.event_count_text}>{props.timetable.length} Events:</Text>
        </View>
        {props.timetable.length > 0 ?
          events
        :
          <View style={{height: 300}}>
            <Image
              style={{width: "100%", height:"100%", resizeMode: 'contain'}}
              source={require('../assets/sleeping_img.jpeg')}
            />
          </View>
        }
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
    marginBottom: 15,
    height: 50,
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

  separator_label: {
    position:"absolute",
    backgroundColor:"#8cb8ff",
    zIndex: 1,
    borderRadius: 5,
    left: 20,
    top:-9,
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 2,
    paddingBottom: 2
  },

  event_count_text:{
    fontSize: 18,
    fontWeight: '500'
  }
});
