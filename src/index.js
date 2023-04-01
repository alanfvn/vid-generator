import "dotenv/config.js"
import generateText from "./generators/img_gen.js"
import generateVideo from "./generators/vid_gen.js"
import { getInputFile, getInputFileNames, getOutputFile} from "./util/dir_util.js"
import { extractData, validFile } from "./util/reg_util.js"
import uploadVideos from "./util/yt_uploader.js"


async function main(){
  const audioFiles = getInputFileNames().filter(x => validFile(x))
  const videoData = audioFiles.map(x => extractData(x))
  const toUpload = {}

  console.log(`\n💡 Found ${audioFiles.length} audio files to convert!`)

  for(const vdata of videoData){
    const fileDir = getInputFile(vdata.file)
    const outDir = getOutputFile(`${vdata.getOutName()}.mp4`)
    const img_buffer = await generateText(vdata.course, vdata.getDate())
    try{
      await generateVideo(img_buffer, fileDir, outDir)
    }catch(err){
      console.log(err)
      continue;
    }

    // save title and file loc
    toUpload[vdata.getOutName()] = outDir
  }
  uploadVideos(toUpload)
}


main()
