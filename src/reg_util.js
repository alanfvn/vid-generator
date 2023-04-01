import VideoData from "./models/video_data.js";

const FILE_PATTERN = /(\d+-\d+-\d+)_([\w]+)/
const COURSES = [
  "Admin. de tecnologías de la información", 
  "Ingeniería de software",
  "Inteligencia artificial",
  "Proyecto de graduación I",
  "Redes de computadoras II",
]

function normalizeString(str){
  str = str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  str = str.toLowerCase().replace('.', '');
  return str
}

function getWords(sentence){
  const split = sentence.split(' ');
  const words =split.map(x => normalizeString(x))
  return words
}

function findCourse(name){
  const c_words = COURSES.map(x => getWords(x))
  const f_words = getWords(name)
  let course_id = null 

  for(let i=0; i < c_words.length; i++){
    const words = c_words[i]
    const subset = f_words.every(x => words.includes(x))
    if (subset){
      course_id = i
      break
    }
  }
  // return name
  return course_id == null ? null : COURSES[course_id]
}

function validFile(file){
  return FILE_PATTERN.test(file)
}

function extractData(file){
  // we assume the file passed is correct
  const match = FILE_PATTERN.exec(file)
  const cdate = match[1]
  const cname = match[2].replace('_', ' ');

  // try to find the course name
  const course = findCourse(cname)
  if(course === null){
    throw new Error(`Invalid course name with file: ${file}`)
  }
  // try to parse the date
  const time = Date.parse(cdate)
  if(isNaN(time)){
    throw new Error(`Invalid date with file: ${file}`)
  }
  const date = new Date(time)
  // all data is ok
  return new VideoData(course, date, file)
}

export {validFile, extractData}
