import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, Button, TouchableWithoutFeedback, TouchableOpacity, AsyncStorage} from 'react-native';
import {SearchComponent} from '../components/SearchComponent';
import CheckBox from '@react-native-community/checkbox';
import { getStudyFields } from '../services/Api/Api'
import { getProfessors } from '../services/Api/Api'
import SearchHeader from '../components/SearchHeader'
import normalize from 'react-native-normalize';


export default function Search({navigation}) {

  const [study_fields, setStudyFields] = useState([])
  const [study_field, setStudyField] = useState(null)
  const [professors, setProfessors] = useState([])
  const [professor, setProfessor] = useState(null)
  const academicYears = [{label:"1", value:"1"}, {label:"2", value:"2"}, {label:"3", value:"3"}]
  const [academicYear, setAcademicYear] = useState(null)
  const groups = [{label:"A1", value:"A1"}, {label:"A2", value:"A2"}, {label:"B1", value:"B1"}, {label:"B2", value:"B2"}]
  const [group, setGroup] = useState(null)
  const [activeDropdown, setActiveDropdwon] = useState(null)
  const [status, setStatus] = useState(null)
  const [saveData, setSaveData] = useState(true)
  const [checked, setChecked] = useState(true)
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
            setStudyField(await AsyncStorage.getItem('study_field'))
            setAcademicYear(await AsyncStorage.getItem('academicYear'))
            setGroup(await AsyncStorage.getItem('group'))
          }
          navigation.navigate('Timetable')
        }
        else{
          setStatus("student")
        }
        callStudyFields()
        callProfessors()
    }
    catch(e) {
        return
    }
  },[])

  async function callStudyFields() {
    const study_fields = await getStudyFields()
    if(study_fields.error)
      return
    else
      setStudyFields(study_fields.data.study_fields)
  }

  async function callProfessors() {
    const professors = await getProfessors()
    if(professors.error)
      return
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
    setChecked(!checked)
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
      study_field: study_field,
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
        items = [['study_field', study_field], ['academicYear', academicYear], ['group', group], ['status', 'student']]
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
    <View style={{height:"100%", backgroundColor:"white"}}>
      {status ?
        <TouchableWithoutFeedback onPress={() => closeDropdown()}>
          <View style={styles.parentView}>
            <View style={styles.viewContainer}>
              <Text style={styles.headerLabel}>Welcome</Text>
              <View style={styles.stausSelector}>
                <TouchableOpacity style={{flex: 1, marginRight:normalize(5)}} onPress={() => {setStatus("student"); callStudyFields(); setActiveDropdwon(null); checkValidity("academicYear", "study_field", "group");}}>
                  <View style={status == "student" ? styles.statusCardActive : styles.statusCard}>
                    <Text style={status == "student" ? styles.statusTextActive : styles.statusText}>STUDENT</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity style={{flex: 1, marginLeft: normalize(5)}} onPress={() => {setStatus("professor"); callProfessors(); setActiveDropdwon(null); checkValidity("professor");}}>
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
                  items={study_fields}
                  passSelectedToParent={(study_field) => { setActiveDropdwon(null); setStudyField(study_field); checkValidity("academicYear", "group");}}
                  placeholder={"Select field of study"}
                  setActiveDropdwon={(index) => handleActiveDropdown(index)}
                  defaultValue={status == "student" ? study_field : null}
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
                  passSelectedToParent={(academicYear) => { setActiveDropdwon(null); setAcademicYear(academicYear); checkValidity("group", "study_field");}}
                  placeholder={"Select year of course"} setActiveDropdwon={(index) => handleActiveDropdown(index)}
                  defaultValue={status == "student" ? academicYear : null}
                />
                <SearchComponent
                  index={4}
                  ref={childRef4}
                  active={activeDropdown==4}
                  items={groups}
                  passSelectedToParent={(group) => { setActiveDropdwon(null); setGroup(group); checkValidity("study_field", "academicYear");}}
                  placeholder={"Select group"}
                  setActiveDropdwon={(index) => handleActiveDropdown(index)}
                  defaultValue={status == "student" ? group : null}
                />
              </View>

              <View style={{flexDirection:"row", marginTop:normalize(20), marginLeft:normalize(5), alignItems: "center"}}>
                <CheckBox
                  value={checked}
                  onValueChange={null}
                  onCheckColor="#24A0ED"
                  tintColor="#24A0ED"
                  onTintColor="#24A0ED"
                  offAnimationType="bounce"
                  onAnimationType="bounce"
                  tintColors={{ true: '#24A0ED', false: '#24A0ED' }}
                  onValueChange={(value) => setToggleCheckBox(value)}
                />
                <Text style={{marginLeft:normalize(15), fontSize: normalize(12)}}>Remember selections</Text>
              </View>

              <TouchableOpacity onPress={() => handleSearch()} disabled = {searchButtonActive ? false : true}>
                <View style={[styles.submitButton, searchButtonActive ? null : {opacity:0.5} ]}>
                  <Text style={{fontSize:normalize(18), color: "white"}}>Search</Text>
                </View>
              </TouchableOpacity>
            </View>
            <View style={{flex: 3}}>
              <SearchHeader/>
            </View>
          </View>
        </TouchableWithoutFeedback>
      :
        null
      }
    </View>
  );
}

const styles = StyleSheet.create({
  headerLabel:{
    fontSize: normalize(25),
    fontWeight: "bold",
    color:"#24A0ED"
  },

  parentView:{
    flex: 1,
    backgroundColor: "white",
    marginTop: normalize(30)
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
    padding: normalize(10),
    flex: 5
  },

  stausSelector: {
    marginTop: normalize(20),
    flexDirection:"row",
    marginBottom: normalize(10),
    width: "100%"
  },

  statusCard: {
    borderWidth:2,
    borderColor: "#24A0ED",
    borderRadius: 10,
    height: normalize(50),
    width: "100%",
    alignItems: "center",
    justifyContent:"center"
  },

  statusCardActive: {
    borderWidth:2,
    borderColor: "#24A0ED",
    borderRadius: 10,
    height: normalize(50),
    width:"100%",
    alignItems: "center",
    justifyContent:"center",
    color: "white",
    backgroundColor:"#24A0ED"
  },

  statusText: {
    color:"black",
    fontWeight: "500",
    fontSize: normalize(14)
  },

  statusTextActive: {
    color:"white",
    fontWeight:"500",
    fontSize: normalize(14)
  },

  submitButton: {
    marginTop: 20,
    borderWidth:2,
    backgroundColor: "#24A0ED",
    borderColor: "#24A0ED",
    borderRadius: 10,
    height: normalize(40),
    alignItems: "center",
    justifyContent: "center"
  }
});
