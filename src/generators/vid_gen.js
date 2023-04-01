import Ffmpeg from "fluent-ffmpeg"
import stream from 'stream'

function ffmpeg_async(image, audio_file, output_dir){
  return new Promise((resolve, reject)=>{
    const imgStream = new stream.PassThrough()
    imgStream.write(image, 'utf8')

    Ffmpeg()
      .input(imgStream)
      .loop()
      .input(audio_file)
      .videoCodec('libx264')
      .outputOptions([
        '-preset medium',
        '-tune stillimage',
        '-crf 18',
        '-pix_fmt yuv420p',
        // '-shortest'
      ])
      .on('err',(err)=>{
        console.log(err)
        return reject(err)
      })
      .on('end',(_fim)=>{
        return resolve()
      })
      .saveToFile(output_dir)
      imgStream.end()
  })
}

async function generateVideo(image, audio_file, output_dir){
  await ffmpeg_async(image, audio_file, output_dir)
}

export default generateVideo
