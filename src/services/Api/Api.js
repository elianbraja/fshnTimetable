import axios from 'axios';
import { resolve } from './Resolver.js';

export async function getCreator() {
  return await resolve(axios.get('http://localhost:3000/creator').then(res => res.data));
}

export async function getStudentTimetable(academic_year, group, subject) {
  return await resolve(axios.get(`http://localhost:3000/timetable/student?academic_year=${academic_year}&group=${group}&subject=${subject}`).then(res => res.data));
}

export async function getPedagogTimetable(email) {
  return await resolve(axios.get(`http://localhost:3000/timetable/pedagog?email=${email}`).then(res => res.data));
}
