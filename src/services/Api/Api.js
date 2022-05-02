import axios from 'axios';
import { resolve } from './Resolver.js';

export async function getCreator() {
  return await resolve(axios.get('http://localhost:3000/creator').then(res => res.data));
}

export async function getStudentTimetable(academic_year, group, study_field) {
  return await resolve(axios.get(`http://localhost:3000/timetable/student?academic_year=${academic_year}&group=${group}&study_field=${study_field}`).then(res => res.data));
}

export async function getProfessorTimetable(email) {
  return await resolve(axios.get(`http://localhost:3000/timetable/professor?email=${email}`).then(res => res.data));
}

export async function getStudyFields() {
  return await resolve(axios.get('http://localhost:3000/timetable/study_fields').then(res => res.data));
}

export async function getProfessors() {
  return await resolve(axios.get('http://localhost:3000/timetable/professors').then(res => res.data));
}

export async function getAcademicYears(study_field) {
  return await resolve(axios.get(`http://localhost:3000/timetable/academic_years?study_field=${study_field}`).then(res => res.data));
}

export async function getGroups(study_field, academic_year) {
  return await resolve(axios.get(`http://localhost:3000/timetable/groups?study_field=${study_field}&academic_year=${academic_year}`).then(res => res.data));
}
