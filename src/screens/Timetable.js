import React from 'react';
import { useState, useEffect } from "react";
import { StyleSheet, Text, View, Dimensions, InteractionManager, Button, AsyncStorage } from 'react-native';
import { ScrollView} from 'react-native-gesture-handler'
import DaySelector from '../components/DaySelector'
import SingleDayTimetable from '../components/SingleDayTimetable'
import DateSettings from '../services/DateSettings'
import { getStudentTimetable, getProfessorTimetable } from '../services/Api/Api'
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

  componentDidMount = () => {
    this.receiveData()
  }

  receiveData = async () => {
    let storage_data = await this.importData()
    let data = null

    if(storage_data.length > 0){
       data = {
         status: await AsyncStorage.getItem('status'),
         academicYear: await AsyncStorage.getItem('academicYear'),
         group: await AsyncStorage.getItem('group'),
         study_field: await AsyncStorage.getItem('study_field'),
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
      timetable = await getStudentTimetable(data.academicYear, data.group, data.study_field);
    }
    else {
      timetable = await getProfessorTimetable(data.professor);
    }
    if(timetable.error)
      return
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
  }

  isCloseToEnd = (event) => {
    let screen_width = this.screenWidth
    let x = event.nativeEvent.contentOffset.x

    this.setState({
      day_index: Math.round(x/screen_width) + 1
    })
  }

  render(){
    const scrollView = React.createRef();

    return (
      <View style={styles.parentView}>
          <View style={styles.container}>
            {this.state.timetable ?
              <View style={{height: "100%"}}>
                <DaySelector day_index={this.state.day_index} changeDay={(index) => this.changeDay(index)}/>
                <ScrollView
                  pagingEnabled
                  scrollEventThrottle={16}
                  horizontal={true}
                  decelerationRate={"fast"}
                  snapToInterval={this.screenWidth}
                  snapToAlignment={"center"}
                  showsHorizontalScrollIndicator={false}
                  ref={this.scrollView}
                  onScroll={this.isCloseToEnd}
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
            :
              <DotIndicator/>
            }
          </View>
      </View>
  )
};
}

const styles = StyleSheet.create({

  parentView:{
    flex: 1,
    backgroundColor: "#24A0ED"
  },

  container: {
    flex:1,
    backgroundColor: "white",
    borderWidth:2,
    borderColor: "white",
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20
  }
});
