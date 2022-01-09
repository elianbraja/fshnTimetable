import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, Button, TouchableWithoutFeedback, TouchableOpacity, AsyncStorage, KeyboardAvoidingView, Keyboard } from 'react-native';
import {SearchComponent} from '../components/SearchComponent';
import CheckBox from '@react-native-community/checkbox';
import { getSubjects } from '../services/Api/Api'
import { getProfessors } from '../services/Api/Api'
import SearchHeader from '../components/SearchHeader'

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
  const [status, setStatus] = useState(null)
  const [saveData, setSaveData] = useState(true)
  const [searchButtonActive, setSearchButtonActive] = useState(false)



  const childRef1 = useRef();
  const childRef2 = useRef();
  const childRef3 = useRef();
  const childRef4 = useRef();


  useEffect(async () => {
    try {
        const status = await AsyncStorage.getItem('status')
        if(status != null){
          setStatus(status)
          if(status == "professor"){
            setProfessor(await AsyncStorage.getItem('professor'))
          }
          else if(status == "student"){
            setSubject(await AsyncStorage.getItem('subject'))
            setAcademicYear(await AsyncStorage.getItem('academicYear'))
            setGroup(await AsyncStorage.getItem('group'))
          }
          navigation.navigate('Timetable')
        }
        else{
          setStatus("student")
        }
        callSubjects()
        callProfessors()
    }
    catch(e) {
        alert(e)
    }
  },[])

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
    setActiveDropdwon(null)
  }

  function handleActiveDropdown(index) {
    setActiveDropdwon(index)
  }

  function setToggleCheckBox(value) {
    setSaveData(value)
  }

  function checkValidity(...args) {
    for (let i=0; i<args.length; i++){
      if(!eval(args[i])){
        setSearchButtonActive(false)
        return
      }
    }
    setSearchButtonActive(true)
  }

  handleSearch = () => {
    navigation.navigate('Timetable', {
      status: status,
      subject: subject,
      professor: professor,
      academicYear: academicYear,
      group: group
    })
    if(saveData){
      storeData()
    }
    else{
      AsyncStorage.clear()
    }
  }

  storeData = async () => {
    try {
      let items = null
      if(status == "student"){
        items = [['subject', subject], ['academicYear', academicYear], ['group', group], ['status', 'student']]
      }
      else{
        items = [['professor', professor], ['status', 'professor']]
      }
      await AsyncStorage.multiSet(items)
    } catch (error) {
      console.log(error)
    }
  };

  return (
    <View style={{height:"100%"}}>
      {status ?
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          keyboardVerticalOffset = {100}
          style={{flex: 1, backgroundColor: "white"}}
        >
          <TouchableWithoutFeedback onPress={() => {closeDropdown(); Keyboard.dismiss}}>
            <View style={styles.parentView}>
              <SearchHeader/>
              <View style={styles.viewContainer}>

                  <View style={styles.stausSelector}>
                    <TouchableOpacity onPress={() => {setStatus("student"); callSubjects(); setActiveDropdwon(null); checkValidity("academicYear", "subject", "group");}}>
                      <View style={status == "student" ? styles.statusCardActive : styles.statusCard}>
                        <Text style={status == "student" ? styles.statusTextActive : styles.statusText}>STUDENT</Text>
                      </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => {setStatus("professor"); callProfessors(); setActiveDropdwon(null); checkValidity("professor");}}>
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
                      passSelectedToParent={(subject) => { setActiveDropdwon(null); setSubject(subject); checkValidity("academicYear", "group");}}
                      placeholder={"Select subject"}
                      setActiveDropdwon={(index) => handleActiveDropdown(index)}
                      defaultValue={status == "student" ? subject : null}
                    />
                  </View>

                  <View style={ status == "professor" ? {zIndex: 1} : {display: "none"}}>
                    <SearchComponent
                      searchable
                      index={2}
                      ref={childRef2}
                      active={activeDropdown==2}
                      items={professors}
                      passSelectedToParent={(professor) => { setActiveDropdwon(null); setProfessor(professor); checkValidity();}}
                      placeholder={"Select professor"}
                      setActiveDropdwon={(index) => handleActiveDropdown(index)}
                      defaultValue={status == "professor" ? professor : null}
                    />
                  </View>

                  <View style={status == "professor" ? {display:"none"} : {zIndex: activeDropdown==1 ? 0 : 1}}>
                    <SearchComponent
                      index={3}
                      ref={childRef3}
                      active={activeDropdown==3}
                      items={academicYears}
                      passSelectedToParent={(academicYear) => { setActiveDropdwon(null); setAcademicYear(academicYear); checkValidity("group", "subject");}}
                      placeholder={"Select year of course"} setActiveDropdwon={(index) => handleActiveDropdown(index)}
                      defaultValue={status == "student" ? academicYear : null}
                    />
                    <SearchComponent
                      index={4}
                      ref={childRef4}
                      active={activeDropdown==4}
                      items={groups}
                      passSelectedToParent={(group) => { setActiveDropdwon(null); setGroup(group); checkValidity("subject", "academicYear");}}
                      placeholder={"Select group"}
                      setActiveDropdwon={(index) => handleActiveDropdown(index)}
                      defaultValue={status == "student" ? group : null}
                    />
                  </View>

                  <View style={{flexDirection:"row", marginTop:20, marginLeft:5, alignItems: "center"}}>
                    <CheckBox
                      value={true}
                      onValueChange={null}
                      onCheckColor="#24A0ED"
                      tintColor="#24A0ED"
                      onTintColor="#24A0ED"
                      offAnimationType="bounce"
                      onAnimationType="bounce"
                      onValueChange={(value) => setToggleCheckBox(value)}
                    />
                    <Text style={{marginLeft:15}}>Remember selections</Text>
                  </View>

                  <View style={[styles.submitButton, searchButtonActive ? null : {opacity:0.5} ]}>
                    <Button
                      title="Search"
                      color= "white"
                      opacity = "1"
                      disabled = {searchButtonActive ? false : true}
                      onPress={() => handleSearch()}
                    />
                  </View>

                  <View style={{height:25}}></View>


              </View>

            </View>
          </TouchableWithoutFeedback>
          </KeyboardAvoidingView>
      :
        null
      }
    </View>
  );
}

const styles = StyleSheet.create({

  parentView:{
    flex: 1,
    backgroundColor: "white"
  },

  viewContainer: {
    height: "100%",
    display: "flex",
    flexDirection:"column",
    backgroundColor: "white",
    borderWidth:2,
    borderColor: "white",
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    padding: 10,
    flex: 1
  },

  welcome: {
    fontSize:30,
    fontWeight:"bold"
  },

  stausSelector: {
    marginTop: 20,
    flexDirection:"row",
    justifyContent: "space-between",
    marginBottom: 10
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
