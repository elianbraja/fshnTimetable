import axios from 'axios';
import { resolve } from './Resolver.js';

export async function getCreator() {
  return await resolve(axios.get('https://fshn-timetable.herokuapp.com/creator').then(res => res.data));
}

export async function getStudentTimetable(academic_year, group, subject) {
  return await resolve(axios.get(`https://fshn-timetable.herokuapp.com/timetable/student?academic_year=${academic_year}&group=${group}&subject=${subject}`).then(res => res.data));
}

export async function getProfessorTimetable(email) {
  return await resolve(axios.get(`https://fshn-timetable.herokuapp.com/timetable/professor?email=${email}`).then(res => res.data));
}

export async function getSubjects() {
  return await resolve(axios.get('https://fshn-timetable.herokuapp.com/timetable/subjects').then(res => res.data));
}

export async function getProfessors() {
  return await resolve(axios.get('https://fshn-timetable.herokuapp.com/timetable/professors').then(res => res.data));
}
