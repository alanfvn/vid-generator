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

function getInputFiles(){
  const curDir = getDir()
  const inputDir = getPath(curDir, '../files/input/')
  const files = fs.readdirSync(inputDir)
    .filter(file => file.endsWith('.mp3'))

  const dirs = files.map(x => getPath(inputDir, x))
  return dirs
}

function getOutputFiles(){
  const curDir = getDir()
  const outputDir = getPath(curDir, '../files/output/')
  const files = fs.readdirSync(outputDir)
    .filter(file => file.endsWith('.mp4'))
  const dirs = files.map(x => getPath(outputDir, x))
  return dirs
}

export {getInputFiles, getOutputFiles}
