import axios from 'axios';
import { resolve } from './Resolver.js';

export async function getCreator() {
  return await resolve(axios.get('http://localhost:3000/creator').then(res => res.data));
}

export async function getTimetable() {
  return await resolve(axios.get('http://localhost:3000/timetable').then(res => res.data));
}
