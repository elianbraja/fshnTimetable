import React from 'react';
import { useState, useEffect } from "react";
import { StyleSheet, Text, View, ScrollView, Dimensions, InteractionManager, Button } from 'react-native';
import DaySelector from '../components/DaySelector'
import SingleDayTimetable from '../components/SingleDayTimetable'
import DateSettings from '../services/DateSettings'

export default class Timetable extends React.Component {
  constructor(props) {
    super(props)
    this.scrollView = React.createRef();
    this.screenWidth = Dimensions.get('window').width
    this.ds = new DateSettings(new Date())
    this.state = {
      day_index: null,
      monday_date: this.ds.getMondayDate()
    };
  }

  componentDidMount = () => {
    this.setState({
      day_index: [0,6].includes(this.ds.getDayIndex()) ? 1 : this.ds.getDayIndex(),
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
    return (
      <View style={styles.container}>
        <DaySelector day_index={this.state.day_index} changeDay={(index) => this.changeDay(index)}/>
        <ScrollView
          horizontal={true}
          decelerationRate={0.5}
          snapToInterval={this.screenWidth}
          snapToAlignment={"center"}
          ref={this.scrollView}
          onMomentumScrollEnd={this.handleScroll}
          onLayout={() => this.scrollToInitialPosition(this.state.day_index, false)}
        >
        {[1,2,3,4,5].map((index) => {
          const next_day = new Date(this.state.monday_date)
          next_day.setDate(next_day.getDate() + index-1)
          return (
          <View style={{width: this.screenWidth, justifyContent: "center",alignItems: "center"}}>
            <SingleDayTimetable key={index} date={next_day} day_index={index}/>
          </View>
        )})}

        </ScrollView>
      </View>
  )};
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    margin: 5
  }
});
