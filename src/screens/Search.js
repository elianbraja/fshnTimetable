import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, Button, TouchableWithoutFeedback, TouchableOpacity } from 'react-native';
import {SearchComponent} from '../components/SearchComponent';
import { getSubjects } from '../services/Api/Api'
import { getProfessors } from '../services/Api/Api'

export default function Search({navigation}) {

  const [subjects, setSubjects] = useState([])
  const [subject, setSubject] = useState(null)

  const [professors, setProfessors] = useState([])
  const [professor, setProfessor] = useState(null)

  const academicYears = [{label:"1", value:"1"}, {label:"2", value:"2"}, {label:"3", value:"3"}]
  const [academicYear, setAcademicYear] = useState(null)

  const groups = [{label:"A1", value:"A1"}, {label:"A2", value:"A2"}, {label:"B1", value:"B1"}, {label:"B2", value:"B2"}]
  const [group, setGroup] = useState(null)

  const [activeDropdown, setActiveDropdwon] = useState(null)
  const [status, setStatus] = useState("student")

  const childRef1 = useRef();
  const childRef2 = useRef();
  const childRef3 = useRef();
  const childRef4 = useRef();

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

  async function callProfessors() {
    const professors = await getProfessors()
    if(professors.error)
      alert("Sorry, there was a problem!")
    else
      setProfessors(professors.data.professors)
  }

  function closeDropdown() {
    childRef1.current.closeDropdown()
    childRef2.current.closeDropdown()
    childRef3.current.closeDropdown()
    childRef4.current.closeDropdown()
  }

  function handleActiveDropdown(index) {
    setActiveDropdwon(index)
  }

  return (
    <TouchableWithoutFeedback onPress={() => closeDropdown()}>
      <View style={styles.viewContainer}>
        <Text style={styles.welcome}>Welcome</Text>
        <View style={styles.stausSelector}>
          <TouchableOpacity onPress={() => {setStatus("student"); callSubjects(); setActiveDropdwon(null)}}>
            <View style={status == "student" ? styles.statusCardActive : styles.statusCard}>
              <Text style={status == "student" ? styles.statusTextActive : styles.statusText}>STUDENT</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {setStatus("professor"); callProfessors(); setActiveDropdwon(null)}}>
            <View style={status == "professor" ? styles.statusCardActive : styles.statusCard}>
              <Text style={status == "professor" ? styles.statusTextActive : styles.statusText}>PROFESSOR</Text>
            </View>
          </TouchableOpacity>
        </View>

        <View style={ status == "student" ? {zIndex: 1} : {display: "none"}}>
          <SearchComponent
            searchable
            index={1}
            ref={childRef1}
            active={activeDropdown==1}
            items={subjects}
            passSelectedToParent={(subject) => { setActiveDropdwon(null); setSubject(subject);}}
            placeholder={"Select subject"}
            setActiveDropdwon={(index) => handleActiveDropdown(index)}
          />
        </View>

        <View style={ status == "professor" ? {zIndex: 1} : {display: "none"}}>
          <SearchComponent
            searchable
            index={2}
            ref={childRef2}
            active={activeDropdown==2}
            items={professors}
            passSelectedToParent={(professor) => { setActiveDropdwon(null); setProfessor(professor);}}
            placeholder={"Select professor"}
            setActiveDropdwon={(index) => handleActiveDropdown(index)}
          />
        </View>

        <View style={status == "professor" ? {display:"none"} : {zIndex: activeDropdown==1 ? 0 : 1}}>
          <SearchComponent
            index={3}
            ref={childRef3}
            active={activeDropdown==3}
            items={academicYears}
            passSelectedToParent={(academicYear) => { setActiveDropdwon(null); setAcademicYear(academicYear)}}
            placeholder={"Select year of course"} setActiveDropdwon={(index) => handleActiveDropdown(index)}
          />
          <SearchComponent
            index={4}
            ref={childRef4}
            active={activeDropdown==4}
            items={groups}
            passSelectedToParent={(group) => { setActiveDropdwon(null); setGroup(group)}}
            placeholder={"Select group"}
            setActiveDropdwon={(index) => handleActiveDropdown(index)}
          />
        </View>


        <View style={styles.submitButton}>
          <Button
            title="Search"
            color= "white"
            onPress={() =>
              navigation.navigate('Timetable', {
                status: status,
                subject: subject,
                professor: professor,
                academicYear: academicYear,
                group: group
              })
            }
          />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  viewContainer: {
    height: "100%",
    display: "flex",
    flexDirection:"column",
    margin: 15
  },

  welcome: {
    fontSize:30,
    fontWeight:"bold"
  },

  stausSelector: {
    marginTop: 20,
    flexDirection:"row",
    justifyContent: "space-between"
  },

  statusCard: {
    borderWidth:2,
    borderColor: "#24A0ED",
    borderRadius: 10,
    height: 70,
    width: 170,
    alignItems: "center",
    justifyContent:"center"
  },

  statusCardActive: {
    borderWidth:2,
    borderColor: "#24A0ED",
    borderRadius: 10,
    height: 70,
    width: 170,
    alignItems: "center",
    justifyContent:"center",
    color: "white",
    backgroundColor:"#24A0ED"
  },

  statusText: {
    color:"black"
  },

  statusTextActive: {
    color:"white"
  },

  submitButton: {
    marginTop: 20,
    borderWidth:2,
    backgroundColor: "#24A0ED",
    borderColor: "#24A0ED",
    borderRadius: 10
  }
});
