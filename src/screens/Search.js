import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import SearchComponent from '../components/SearchComponent';
import { getSubjects } from '../services/Api/Api'

export default function Search({navigation}) {

  const [subjects, setSubjects] = useState([])

  const [subject, setSubject] = useState(null)
  const [academicYear, setAcademicYear] = useState(null)
  const [group, setGroup] = useState(null)

  const academicYears = [{id:"1", name:"1"}, {id:"2", name:"2"}, {id:"3", name:"3"}]
  const groups = [{id:"1", name:"A1"}, {id:"2", name:"A2"}, {id:"3", name:"B1"}, {id:"4", name:"B2"}, {id:"5", name:"C1"}, {id:"6", name:"C2"}]


  useEffect(() => {
    callSubjects()
  }, []);

  async function callSubjects() {
    const subjects = await getSubjects()
    if(subjects.error)
      alert("Sorry, there was a problem!")
    else
      setSubjects(subjects.data.subjects)
  }

  return (
    <View style={styles.viewContainer}>
      <SearchComponent data={subjects} placeholder={"Subject"} passSelectedToParent={(subject) => setSubject(subject)}/>
      <SearchComponent data={academicYears} placeholder={"Academic Year"} passSelectedToParent={(academicYear) => setAcademicYear(academicYear)}/>
      <SearchComponent data={groups} placeholder={"Group"} passSelectedToParent={(group) => setGroup(group)}/>
      <View style={{width: "100%"}}>
        <Button
          title="Search"
          onPress={() =>
            navigation.navigate('Timetable', {
              subject: subject,
              academicYear: academicYear,
              group: group
            })
          }
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  viewContainer: {
    display: "flex",
    flexDirection:"column",
    marginTop: 15,
    fontFamily: "OpenSans-Bold"
  }
});
