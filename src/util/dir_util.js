import {fileURLToPath} from 'url'
import path from 'path'
import fs from 'fs'

function getPath(dir1, dir2){
  return path.join(dir1, dir2)
}

function getDir(){
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  return __dirname
}

function getInputDir(){
  const curDir = getDir()
  return getPath(curDir, '../../files/input/')
}

function getOuputDir(){
  const curDir = getDir()
  return getPath(curDir, '../../files/output/')
}

function getInputFileNames(){
  // get only the file names in the input folder
  const inputDir = getInputDir()
  return fs.readdirSync(inputDir).filter(file => file.endsWith('.mp3'))
}

function getInputFile(file){
  // get full path of a input file
  return getPath(getInputDir(), file)
}

function getOutputFile(file){
  // get full path for a output file
  return getPath(getOuputDir(), file)
}

export {
  getInputFileNames, 
  getInputFile, 
  getOutputFile
}
