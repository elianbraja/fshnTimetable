import React from 'react';
import { useState, useEffect } from "react";
import { StyleSheet, Text, View, ScrollView, Dimensions, InteractionManager, Button, AsyncStorage } from 'react-native';
import DaySelector from '../components/DaySelector'
import SingleDayTimetable from '../components/SingleDayTimetable'
import DateSettings from '../services/DateSettings'
import { getStudentTimetable, getPedagogTimetable } from '../services/Api/Api'
import { DotIndicator } from 'react-native-indicators';


export default class Timetable extends React.Component {
  constructor(props) {
    super(props)
    this.scrollView = React.createRef();
    this.screenWidth = Dimensions.get('window').width
    this.ds = new DateSettings(new Date())
    this.state = {
      data: null,
      day_index: [0,6].includes(this.ds.getDayIndex()) ? 1 : this.ds.getDayIndex(),
      monday_date: this.ds.getMondayDate(),
      timetable: null
    };
  }

  componentDidMount = async () => {
    let storage_data = await this.importData()
    let data = null

    if(storage_data.length > 0){
       data = {
         status: await AsyncStorage.getItem('status'),
         academicYear: await AsyncStorage.getItem('academicYear'),
         group: await AsyncStorage.getItem('group'),
         subject: await AsyncStorage.getItem('subject'),
         professor: await AsyncStorage.getItem('professor')
       }
    }
    else{
       data = this.props.route.params
    }
    this.setState({data: data})
    this.getTimetable(data);
  }

  importData = async () => {
    try {
      const keys = await AsyncStorage.getAllKeys();
      const result = await AsyncStorage.multiGet(keys);
      return result
    } catch (error) {
      console.error(error)
    }
  }

  async getTimetable(data) {
    let timetable = []
    if(data.status == "student"){
      timetable = await getStudentTimetable(data.academicYear, data.group, data.subject);
    }
    else {
      timetable = await getPedagogTimetable(data.professor);
    }
    if(timetable.error)
      alert("Sorry, there was a problem!")
    else
      this.setState({
        timetable: timetable.data
      })
  }

  scrollToInitialPosition = (index, animated) => {
    this.scrollView.current.scrollTo({x: (index-1) * this.screenWidth + 5, y: 0, animated:animated })
  }

  changeDay = (index) => {
    this.scrollToInitialPosition(index, true)
    this.setState({
      day_index: index
    })
  }

  handleScroll = (event) => {
    const positionX = event.nativeEvent.contentOffset.x;
    const current_index = Math.floor(positionX/this.screenWidth)
    this.setState({
      day_index: current_index + 1
    })
  };

  render(){
    const scrollView = React.createRef();

    if(this.state.timetable){
    return (
      <View style={styles.container}>
        <DaySelector day_index={this.state.day_index} changeDay={(index) => this.changeDay(index)}/>
        <ScrollView
          horizontal={true}
          decelerationRate={0.5}
          snapToInterval={this.screenWidth}
          snapToAlignment={"center"}
          showsHorizontalScrollIndicator={false}
          ref={this.scrollView}
          onMomentumScrollEnd={this.handleScroll}
          onLayout={() => this.scrollToInitialPosition(this.state.day_index, false)}
        >
        {this.state.timetable.map((day_events_array) => {
          let index = day_events_array.day
          const next_day = new Date(this.state.monday_date)
          next_day.setDate(next_day.getDate() + index-1)
          return (
          <View key={index} style={{width: this.screenWidth, justifyContent: "center",alignItems: "center"}}>
            <SingleDayTimetable status={this.state.data.status} date={next_day} day_index={index} timetable={day_events_array.timetable}/>
          </View>
        )})}

        </ScrollView>
      </View>
  )}
  else{
    return <DotIndicator color='black' />
  }
};
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    margin: 5
  }
});
